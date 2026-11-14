// Shared Three.js setup for the site's small scenes. Imported only through
// dynamic import(), so none of this reaches the first page load.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type SceneHandle = {
  start: () => void;
  stop: () => void;
  dispose: () => void;
};

export type MountOptions = { animate: boolean };

export type Theme = {
  accent: string;
  fg: string;
  muted: string;
  surface: string;
  line: string;
  dark: boolean;
  mono: string;
};

// Colours and font come from the page's CSS tokens, so scenes follow the theme.
export function readTheme(): Theme {
  const root = getComputedStyle(document.documentElement);
  const body = getComputedStyle(document.body);
  const v = (name: string, fallback: string) => root.getPropertyValue(name).trim() || fallback;
  const mono = body.getPropertyValue("--font-jetbrains-mono").trim();
  return {
    accent: v("--accent", "#22c55e"),
    fg: v("--fg", "#e2e8f0"),
    muted: v("--muted", "#94a3b8"),
    surface: v("--surface", "#111a2e"),
    line: v("--line", "#1f2a44"),
    dark: !window.matchMedia("(prefers-color-scheme: light)").matches,
    mono: mono ? `${mono}, ui-monospace, monospace` : "ui-monospace, monospace",
  };
}

export type Stage = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  clock: THREE.Clock;
  render: () => void;
  onUpdate: (fn: (dt: number, t: number) => void) => void;
  handle: SceneHandle;
  track: <T extends { dispose: () => void }>(x: T) => T;
};

export function createStage(
  canvas: HTMLCanvasElement,
  { fov = 30, camera: camPos = [0, 0, 6], target = [0, 0, 0], animate = true }: {
    fov?: number;
    camera?: [number, number, number];
    target?: [number, number, number];
    animate?: boolean;
  },
): Stage {
  const theme = readTheme();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = theme.dark ? 1.0 : 0.95;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 60);
  camera.position.set(...camPos);
  camera.lookAt(...target);

  // Soft key from upper left, cool sky/slate fill, faint green rim for the
  // "terminal" accent. Same structure as the denrose clay profile.
  const key = new THREE.DirectionalLight("#fff4e8", 2.4);
  key.position.set(-3.5, 5, 4.5);
  scene.add(key);
  scene.add(new THREE.HemisphereLight("#dbe4ee", theme.dark ? "#1e293b" : "#d6d3d1", theme.dark ? 0.9 : 1.1));
  const rim = new THREE.DirectionalLight(theme.accent, theme.dark ? 0.6 : 0.25);
  rim.position.set(3, 1.5, -4);
  scene.add(rim);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  const updates: ((dt: number, t: number) => void)[] = [];
  const clock = new THREE.Clock(false);
  let running = false;
  let raf = 0;
  let lastT = 0;

  const render = () => renderer.render(scene, camera);

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(() => {
    resize();
    if (!running) render();
  });
  ro.observe(canvas);

  function frame() {
    const t = clock.getElapsedTime();
    const dt = Math.min(0.05, t - lastT);
    lastT = t;
    for (const fn of updates) fn(dt, t);
    render();
    raf = requestAnimationFrame(frame);
  }

  const handle: SceneHandle = {
    start() {
      if (running || !animate) return;
      running = true;
      clock.start();
      lastT = clock.getElapsedTime();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      clock.stop();
      cancelAnimationFrame(raf);
    },
    dispose() {
      handle.stop();
      ro.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Line || o instanceof THREE.Sprite) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of mats) {
            for (const val of Object.values(m)) if (val instanceof THREE.Texture) val.dispose();
            m.dispose();
          }
        }
      });
      for (const d of disposables) d.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };

  return { renderer, scene, camera, clock, render, onUpdate: (fn) => updates.push(fn), handle, track };
}

// Soft round contact shadow, so objects sit on something instead of floating.
export function contactShadow(size: number, opacity: number): THREE.Mesh {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(0,0,0,1)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, opacity, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

// A text label drawn to a canvas, shown as a sprite that always faces the camera.
export function makeLabel(
  text: string,
  {
    color,
    font,
    height = 0.26,
    weight = 400,
    px = 64,
  }: { color: string; font: string; height?: number; weight?: number; px?: number },
) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const g = c.getContext("2d")!;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sprite.scale.set(height * 4, height, 1);

  function set(next: string, nextColor = color) {
    g.clearRect(0, 0, 512, 128);
    g.font = `${weight} ${px}px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = nextColor;
    g.fillText(next, 256, 66);
    tex.needsUpdate = true;
  }
  set(text);
  return { sprite, set };
}

// Pointer position relative to the canvas centre, in roughly [-1, 1].
export function pointerTracker(canvas: HTMLCanvasElement) {
  const state = { x: 0, y: 0, inside: false };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = canvas.getBoundingClientRect();
    state.x = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1.5, 1.5);
    state.y = THREE.MathUtils.clamp((e.clientY - (r.top + r.height / 2)) / r.height, -1.5, 1.5);
    state.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return { state, dispose: () => window.removeEventListener("pointermove", onMove) };
}

export const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));
