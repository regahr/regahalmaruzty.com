"use client";

import { useEffect, useRef, useState } from "react";
import type { MountOptions, SceneHandle } from "./kit";
import { perfEnabled, perfRecord } from "./perf";

export type Mount<H extends SceneHandle> = (canvas: HTMLCanvasElement, opts: MountOptions) => H;

// Three steps, so the visitor never waits on an empty box:
// 1. Fetch the code when the browser is idle after page load (or earlier if
//    the visitor scrolls fast). The import is cached, so both scenes share it.
// 2. Mount while the scene is still MOUNT_AHEAD away. Mount builds the scene
//    and draws the first frame, which is where WebGL compiles its shaders.
// 3. Run the animation only while the scene is on screen.
// Reduced-motion visitors get the single first frame. Without WebGL, or if
// the download fails, the scene reports "unsupported" and the caller hides it.
const MOUNT_AHEAD = "900px 0px";
const RUN_MARGIN = "100px 0px";

export function useLazyScene<H extends SceneHandle>(load: () => Promise<Mount<H>>, name = "scene") {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<H | null>(null);
  const [status, setStatus] = useState<"pending" | "live" | "unsupported">("pending");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let visible = false;
    let mounting = false;

    let loadStart = 0;
    let loadEnd = 0;
    let loading: Promise<Mount<H>> | null = null;
    const fetchCode = () => {
      if (!loading) {
        loadStart = performance.now();
        loading = load().then((m) => {
          loadEnd = performance.now();
          return m;
        });
      }
      return loading;
    };

    // Step 1: idle prefetch after the page has loaded.
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const prefetch = () => {
      const run = () => fetchCode().catch(() => {}); // a failure surfaces again in mount()
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(run, { timeout: 3000 });
      else timeoutId = setTimeout(run, 1500);
    };
    if (document.readyState === "complete") prefetch();
    else window.addEventListener("load", prefetch, { once: true });

    // Step 2: mount ahead of view.
    const mount = async () => {
      if (mounting || handleRef.current) return;
      mounting = true;
      const triggeredAt = performance.now();
      let mountFn: Mount<H>;
      try {
        mountFn = await fetchCode();
      } catch {
        if (!cancelled) setStatus("unsupported");
        return;
      }
      if (cancelled) return;
      const codeReadyAt = performance.now();
      try {
        handleRef.current = mountFn(canvas, { animate: !reduce });
      } catch {
        setStatus("unsupported");
        return;
      }
      if (perfEnabled()) {
        // Wait for the GPU to finish the first frame, so the timing includes shader compile.
        const gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null;
        gl?.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
        perfRecord(name, {
          download: (loadEnd || codeReadyAt) - loadStart,
          waitedForCode: codeReadyAt - triggeredAt,
          setup: performance.now() - codeReadyAt,
        });
      }
      setStatus("live");
      if (visible) handleRef.current.start();
    };
    const mountIO = new IntersectionObserver(([e]) => e.isIntersecting && mount(), { rootMargin: MOUNT_AHEAD });
    mountIO.observe(wrap);

    // Step 3: animate only while on screen.
    const runIO = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        const h = handleRef.current;
        if (!h) return;
        if (visible) h.start();
        else h.stop();
      },
      { rootMargin: RUN_MARGIN },
    );
    runIO.observe(wrap);

    return () => {
      cancelled = true;
      window.removeEventListener("load", prefetch);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      mountIO.disconnect();
      runIO.disconnect();
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, [load, name]);

  return { wrapRef, canvasRef, handleRef, status };
}
