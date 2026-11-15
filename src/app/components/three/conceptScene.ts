// One canvas for every concept in the "how it works" showcase. The scene is
// rebuilt from concepts.ts when the concept changes, and every frame is
// derived from (concept, variant, step, elapsed), so the picture can never
// drift from the captions.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createStage, damp, makeLabel, pointerTracker, readTheme, type MountOptions, type SceneHandle } from "./kit";
import { CONCEPTS, type Packet, type Snapshot, type Tone } from "./concepts";

export type VariantKey = "right" | "naive";
export type ConceptHandle = SceneHandle & {
  // step = index of the step being played; -1 shows the idle start.
  show: (concept: number, variant: VariantKey, step: number, animateStep: boolean) => void;
};

const DECK = 0.25; // top of the station blocks
const LANE = 0.95; // height messages travel at
const TRAVEL = 0.9; // seconds per message
const MAX_PACKETS = 8;
const MAX_STACK = 3;

type StationView = {
  x: number;
  block: THREE.Mesh;
  mat: THREE.MeshPhysicalMaterial;
  name: ReturnType<typeof makeLabel>;
  note: ReturnType<typeof makeLabel>;
  chip: THREE.Mesh;
  chipMat: THREE.MeshStandardMaterial;
  chipLabel: ReturnType<typeof makeLabel>;
  stack: THREE.Mesh[];
  stackMats: THREE.MeshStandardMaterial[];
  shown: { note: string; chip: string };
};

type Flight = Packet & { start: number };

export function mountConcepts(canvas: HTMLCanvasElement, { animate }: MountOptions): ConceptHandle {
  const theme = readTheme();
  const narrow = canvas.clientWidth < 560;
  const stage = createStage(canvas, { fov: 28, camera: [0, 2.4, 8], target: [0, 0.2, 0], animate });
  const { scene, camera } = stage;
  const font = theme.mono;

  const toneHex: Record<Tone, string> = { ok: theme.accent, bad: "#ef4444", warn: "#f59e0b", fg: theme.fg };
  const baseBlock = new THREE.Color(theme.dark ? "#1e293b" : "#cbc6c1");

  // ---- Shared pieces -------------------------------------------------------------
  const lanePts = [new THREE.Vector3(-1, LANE, 0), new THREE.Vector3(1, LANE, 0)];
  const lane = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(lanePts),
    new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.45 }),
  );
  scene.add(lane);

  const packetGeo = new THREE.SphereGeometry(0.12, 24, 16);
  const packets = Array.from({ length: MAX_PACKETS }, () => {
    const mat = new THREE.MeshStandardMaterial({ emissiveIntensity: 0.8, transparent: true, roughness: 0.4 });
    const mesh = new THREE.Mesh(packetGeo, mat);
    mesh.visible = false;
    scene.add(mesh);
    const label = makeLabel("", { color: theme.fg, font, height: narrow ? 0.42 : 0.34 });
    label.sprite.visible = false;
    scene.add(label.sprite);
    return { mesh, mat, label, text: "" };
  });

  // ---- Per-concept stations ------------------------------------------------------
  let root = new THREE.Group();
  scene.add(root);
  let views: Record<string, StationView> = {};
  let fitPoints: THREE.Vector3[] = [];
  let builtFor = -1;

  function disposeGroup(g: THREE.Group) {
    g.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Sprite) {
        o.geometry.dispose();
        const m = o.material as THREE.Material & { map?: THREE.Texture | null };
        m.map?.dispose();
        m.dispose();
      }
    });
  }

  function build(index: number) {
    if (builtFor === index) return;
    builtFor = index;
    scene.remove(root);
    disposeGroup(root);
    root = new THREE.Group();
    scene.add(root);
    views = {};

    const stations = CONCEPTS[index].stations;
    const n = stations.length;
    const gap = narrow ? (n === 4 ? 1.62 : 2.05) : n === 4 ? 2.55 : 2.9;
    const bw = narrow ? 1.12 : 1.4;
    const labelH = narrow ? 0.5 : 0.42;
    const xs = stations.map((_, i) => (i - (n - 1) / 2) * gap);

    stations.forEach((st, i) => {
      const x = xs[i];
      const mat = new THREE.MeshPhysicalMaterial({ color: baseBlock.clone(), roughness: 0.55, envMapIntensity: 0.4 });
      const block = new THREE.Mesh(new RoundedBoxGeometry(bw, 0.5, 1.0, 4, 0.08), mat);
      block.position.set(x, 0, 0);
      root.add(block);

      const name = makeLabel(st.label, { color: theme.muted, font, height: labelH });
      name.sprite.position.set(x, -0.52, 0.45);
      root.add(name.sprite);
      const note = makeLabel("", { color: theme.fg, font, height: labelH * 0.9, weight: 500, px: 56 });
      note.sprite.position.set(x, -0.52 - labelH * 1.05, 0.45);
      root.add(note.sprite);

      const chipMat = new THREE.MeshStandardMaterial({ roughness: 0.4, emissiveIntensity: 0.3 });
      const chip = new THREE.Mesh(new RoundedBoxGeometry(bw * 0.62, 0.09, 0.46, 2, 0.035), chipMat);
      chip.position.set(x, DECK + 0.045, 0);
      root.add(chip);
      const chipLabel = makeLabel("", { color: theme.fg, font, height: labelH * 0.85, px: 52 });
      chipLabel.sprite.position.set(x, DECK + 0.36, 0.1);
      root.add(chipLabel.sprite);

      const stackMats: THREE.MeshStandardMaterial[] = [];
      const stack = Array.from({ length: MAX_STACK }, (_, k) => {
        const m = new THREE.MeshStandardMaterial({ roughness: 0.45, emissiveIntensity: 0.25 });
        stackMats.push(m);
        const slab = new THREE.Mesh(new RoundedBoxGeometry(bw * 0.66, 0.085, 0.58, 2, 0.03), m);
        slab.position.set(x, DECK + 0.045 + k * 0.12, 0);
        root.add(slab);
        return slab;
      });

      views[st.id] = { x, block, mat, name, note, chip, chipMat, chipLabel, stack, stackMats, shown: { note: "", chip: "" } };
    });

    // Lane spans the stations.
    const left = xs[0];
    const right = xs[n - 1];
    lane.geometry.setFromPoints([new THREE.Vector3(left, LANE, 0), new THREE.Vector3(right, LANE, 0)]);
    lane.computeLineDistances();

    // What must stay in frame: blocks, labels below, message arcs above.
    fitPoints = [];
    for (const x of [left - bw / 2 - 0.1, right + bw / 2 + 0.1])
      for (const y of [-0.52 - labelH * 1.55, LANE + 0.42 + 0.3 + 0.12]) for (const z of [-0.5, 0.5]) fitPoints.push(new THREE.Vector3(x, y, z));
    lastAspect = 0;
  }

  // ---- Camera: fit the real content, no dead space above or below ---------------
  const ELEV = THREE.MathUtils.degToRad(narrow ? 20 : 16);
  const proj = new THREE.Vector3();
  let lastAspect = 0;
  function fitCamera() {
    if (camera.aspect === lastAspect || fitPoints.length === 0) return;
    lastAspect = camera.aspect;
    let dist = 9;
    let aimY = 0.2;
    for (let iter = 0; iter < 8; iter++) {
      camera.position.set(0, aimY + Math.sin(ELEV) * dist, Math.cos(ELEV) * dist);
      camera.lookAt(0, aimY, 0);
      camera.updateMatrixWorld();
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const p of fitPoints) {
        proj.copy(p).project(camera);
        minX = Math.min(minX, proj.x);
        maxX = Math.max(maxX, proj.x);
        minY = Math.min(minY, proj.y);
        maxY = Math.max(maxY, proj.y);
      }
      dist *= Math.max((maxX - minX) / 2, (maxY - minY) / 2) / 0.94;
      aimY += ((minY + maxY) / 2) * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.5;
    }
  }

  // ---- State ------------------------------------------------------------------------
  let conceptIdx = 0;
  let variant: VariantKey = "naive"; // matches ConceptShowcase's first state
  let step = -1;
  let elapsed = 0;
  let flights: Flight[] = [];
  let duration = 0;

  function plan() {
    const steps = CONCEPTS[conceptIdx][variant].steps;
    const cur = step >= 0 ? steps[step] : null;
    flights = [];
    for (const p of cur?.packets ?? []) {
      const count = p.count ?? 1;
      for (let i = 0; i < count; i++) flights.push({ ...p, start: (p.delay ?? 0) + i * 0.12 });
    }
    flights = flights.slice(0, MAX_PACKETS);
    duration = flights.length ? Math.max(...flights.map((f) => f.start)) + TRAVEL : 0;
  }

  function setLabel(view: ReturnType<typeof makeLabel>, key: "note" | "chip", sv: StationView, text: string, tone: Tone) {
    const id = `${text}|${tone}`;
    if (sv.shown[key] === id) return;
    sv.shown[key] = id;
    view.set(text, tone === "fg" ? theme.fg : toneHex[tone]);
  }

  const tint = new THREE.Color();
  function apply() {
    const steps = CONCEPTS[conceptIdx][variant].steps;
    const done = step >= 0 && elapsed >= duration;
    const snap: Snapshot = step < 0 ? {} : done ? steps[step].after : step > 0 ? steps[step - 1].after : {};

    for (const [id, sv] of Object.entries(views)) {
      const chip = snap.chips?.[id];
      sv.chip.visible = sv.chipLabel.sprite.visible = !!chip;
      if (chip) {
        const c = new THREE.Color(toneHex[chip.tone]);
        sv.chipMat.color.copy(c);
        sv.chipMat.emissive.copy(c);
        setLabel(sv.chipLabel, "chip", sv, chip.text, chip.tone);
      }
      const stack = snap.stacks?.[id] ?? [];
      sv.stack.forEach((slab, k) => {
        slab.visible = k < stack.length;
        if (k < stack.length) {
          const c = new THREE.Color(toneHex[stack[k] === "fg" ? "ok" : stack[k]]);
          sv.stackMats[k].color.copy(c);
          sv.stackMats[k].emissive.copy(c);
        }
      });
      // A chip and a stack on the same block: lift the chip above the stack.
      sv.chip.position.y = DECK + 0.045 + stack.length * 0.12;
      sv.chipLabel.sprite.position.y = DECK + 0.36 + stack.length * 0.12;

      const note = snap.notes?.[id];
      sv.note.sprite.visible = !!note;
      if (note) setLabel(sv.note, "note", sv, note.text, note.tone);

      const alert = snap.alert?.[id];
      tint.copy(baseBlock);
      if (alert) tint.lerp(new THREE.Color(toneHex[alert]), theme.dark ? 0.45 : 0.35);
      sv.mat.color.copy(tint);
    }

    // Messages.
    packets.forEach((pk, i) => {
      const f = flights[i];
      if (!f || step < 0 || !views[f.from] || !views[f.to]) {
        pk.mesh.visible = false;
        pk.label.sprite.visible = false;
        return;
      }
      const local = THREE.MathUtils.clamp((elapsed - f.start) / TRAVEL, 0, 1);
      const moving = elapsed > f.start && local < 1;
      const x0 = views[f.from].x;
      const x1 = views[f.to].x;
      const e = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2;
      const arc = Math.min(0.42, 0.2 + 0.05 * Math.abs(x1 - x0)); // capped so labels stay in frame
      const x = THREE.MathUtils.lerp(x0, x1, e);
      const y = LANE + Math.sin(e * Math.PI) * arc;
      const c = new THREE.Color(f.tone === "fg" || !f.tone ? theme.fg : toneHex[f.tone]);
      pk.mat.color.copy(c);
      pk.mat.emissive.copy(c);
      pk.mesh.position.set(x, y, 0);

      if (f.lost) {
        pk.mat.opacity = THREE.MathUtils.clamp(1 - (local - 0.42) / 0.12, 0, 1);
        pk.mesh.visible = moving && pk.mat.opacity > 0;
        const deathX = THREE.MathUtils.lerp(x0, x1, 0.5);
        pk.label.sprite.position.set(deathX, LANE + arc + 0.3, 0.05);
        pk.label.sprite.visible = !!f.label && local >= 0.5 && i === flights.findIndex((g) => g.label === f.label);
      } else {
        pk.mat.opacity = 1;
        pk.mesh.visible = moving;
        pk.label.sprite.position.set(x, y + 0.3, 0.05);
        pk.label.sprite.visible = !!f.label && moving;
      }
      if (f.label && pk.text !== `${f.label}|${f.tone}`) {
        pk.text = `${f.label}|${f.tone}`;
        pk.label.set(f.label, f.tone === "fg" || !f.tone ? theme.fg : toneHex[f.tone]);
      }
    });
  }

  const pointer = pointerTracker(canvas);
  let yaw = 0;
  stage.onUpdate((dt) => {
    if (step >= 0 && elapsed < duration) elapsed = Math.min(duration, elapsed + dt);
    fitCamera();
    yaw = damp(yaw, pointer.state.x * 0.08, 3, dt);
    scene.rotation.y = yaw;
    apply();
  });

  build(0);
  plan();
  fitCamera();
  apply();
  stage.render();

  return {
    start: stage.handle.start,
    stop: stage.handle.stop,
    dispose() {
      pointer.dispose();
      disposeGroup(root);
      stage.handle.dispose();
    },
    show(nextConcept, nextVariant, nextStep, animateStep) {
      // Mount already built this exact state; React calls show() again when
      // the scene reports ready, so skip the rebuild.
      if (nextConcept === conceptIdx && nextVariant === variant && nextStep === step) return;
      conceptIdx = nextConcept;
      variant = nextVariant;
      step = nextStep;
      build(conceptIdx);
      plan();
      elapsed = animate && animateStep ? 0 : duration;
      fitCamera();
      apply();
      stage.render();
    },
  };
}
