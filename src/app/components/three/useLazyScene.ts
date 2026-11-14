"use client";

import { useEffect, useRef, useState } from "react";
import type { MountOptions, SceneHandle } from "./kit";

export type Mount<H extends SceneHandle> = (canvas: HTMLCanvasElement, opts: MountOptions) => H;

// Same loading pattern as the denrose earring: Three.js is fetched only when
// the scene comes within 200px of the viewport, runs only while visible, and
// renders a single still frame for reduced-motion visitors. Without WebGL the
// scene reports "unsupported" and the caller hides it.
export function useLazyScene<H extends SceneHandle>(load: () => Promise<Mount<H>>) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<H | null>(null);
  const [status, setStatus] = useState<"pending" | "live" | "unsupported">("pending");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false;
    let loading = false;
    let cancelled = false;

    const io = new IntersectionObserver(
      async ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !handleRef.current && !loading) {
          loading = true;
          const mount = await load();
          if (cancelled) return;
          try {
            handleRef.current = mount(canvas, { animate: !reduce });
            setStatus("live");
          } catch {
            setStatus("unsupported");
            return;
          }
        }
        const h = handleRef.current;
        if (!h) return;
        if (visible) h.start();
        else h.stop();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(wrap);

    return () => {
      cancelled = true;
      io.disconnect();
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, [load]);

  return { wrapRef, canvasRef, handleRef, status };
}
