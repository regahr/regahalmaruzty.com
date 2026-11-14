// Three stations (client, API, ledger) and one message travelling between
// them. Visual state is derived from retrySteps.ts on every frame, so the
// picture can never drift from the captions.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createStage, damp, makeLabel, pointerTracker, readTheme, type MountOptions, type SceneHandle } from "./kit";
import { STEPS, settledState, type Mode, type Station } from "./retrySteps";

const DECK = 0.28; // top of the station blocks
const LANE = 0.95; // height the message travels at
const STEP_SECONDS = 1.15;
const RED = "#ef4444";

export type RetryHandle = SceneHandle & {
  // step = index of the step being played; -1 shows the idle start.
  show: (mode: Mode, step: number, animateStep: boolean) => void;
};

export function mountRetry(canvas: HTMLCanvasElement, { animate }: MountOptions): RetryHandle {
  const theme = readTheme();
  // Narrow screens (phones): stations closer together, bigger labels.
  const narrow = canvas.clientWidth < 520;
  const gap = narrow ? 2.05 : 2.7;
  const X: Record<Station, number> = { client: -gap, api: 0, ledger: gap };
  const stage = createStage(canvas, { fov: 30, camera: [0, 2.6, 6.6], target: [0, 0.15, 0], animate });
  const { scene } = stage;

  const blockMat = new THREE.MeshPhysicalMaterial({
    color: theme.dark ? "#1e293b" : "#e7e5e4",
    roughness: 0.55,
    envMapIntensity: 0.4,
  });
  const ok = new THREE.Color(theme.accent);
  const bad = new THREE.Color(RED);

  // Stations and labels.
  const font = theme.mono;
  for (const s of ["client", "api", "ledger"] as Station[]) {
    const block = new THREE.Mesh(new RoundedBoxGeometry(narrow ? 1.3 : 1.5, 0.56, 1.1, 4, 0.08), blockMat);
    block.position.set(X[s], 0, 0);
    scene.add(block);
    const label = makeLabel(s, { color: theme.muted, font, height: 0.3 });
    label.sprite.position.set(X[s], -0.62, 0.4);
    scene.add(label.sprite);
  }

  // Dashed lane between stations.
  const laneGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(X.client, LANE, 0),
    new THREE.Vector3(X.ledger, LANE, 0),
  ]);
  const lane = new THREE.Line(
    laneGeo,
    new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.5 }),
  );
  lane.computeLineDistances();
  scene.add(lane);

  // Idempotency key chip that sits on the API block.
  const keyChip = new THREE.Mesh(
    new RoundedBoxGeometry(0.62, 0.1, 0.36, 2, 0.04),
    new THREE.MeshStandardMaterial({ color: ok, emissive: ok, emissiveIntensity: 0.3, roughness: 0.4 }),
  );
  keyChip.position.set(X.api, DECK + 0.05, 0);
  scene.add(keyChip);
  const keyLabel = makeLabel("k-42", { color: theme.accent, font, height: 0.24 });
  keyLabel.sprite.position.set(X.api, DECK + 0.38, 0.1);
  scene.add(keyLabel.sprite);

  // Ledger entries (up to 2) stacked on the ledger block.
  const entryMat = [0, 1].map(
    () => new THREE.MeshStandardMaterial({ color: ok, emissive: ok, emissiveIntensity: 0.25, roughness: 0.45 }),
  );
  const entries = entryMat.map((m, i) => {
    const e = new THREE.Mesh(new RoundedBoxGeometry(0.95, 0.09, 0.6, 2, 0.03), m);
    e.position.set(X.ledger, DECK + 0.05 + i * 0.13, 0);
    scene.add(e);
    return e;
  });
  const countLabel = makeLabel("0 charges", { color: theme.fg, font, height: 0.26 });
  countLabel.sprite.position.set(X.ledger, -0.95, 0.4);
  scene.add(countLabel.sprite);

  // The travelling message and the timeout mark.
  const msgMat = new THREE.MeshStandardMaterial({ color: ok, emissive: ok, emissiveIntensity: 0.8, transparent: true });
  const msg = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 16), msgMat);
  scene.add(msg);
  const timeout = makeLabel("× timeout", { color: RED, font, height: 0.28 });
  timeout.sprite.position.set((X.client + X.api) / 2, LANE + 0.45, 0);
  scene.add(timeout.sprite);

  // ---- State -------------------------------------------------------------------
  let mode: Mode = "key";
  let step = -1;
  let progress = 1; // 0..1 through the current step
  let pulse = 0;
  let shownCount = 0;

  const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

  function apply() {
    const steps = STEPS[mode];
    const cur = step >= 0 ? steps[step] : null;
    const done = cur && progress >= 1;
    const settled = settledState(mode, step < 0 ? 0 : done ? step + 1 : step);

    keyChip.visible = keyLabel.sprite.visible = settled.keyStored;
    const chipGlow = 0.3 + pulse * 1.2;
    (keyChip.material as THREE.MeshStandardMaterial).emissiveIntensity = chipGlow;

    entries.forEach((e, i) => {
      const kind = settled.ledger[i];
      e.visible = !!kind;
      if (kind) {
        const c = kind === "dup" ? bad : ok;
        entryMat[i].color.copy(c);
        entryMat[i].emissive.copy(c);
      }
    });
    const n = settled.ledger.length;
    if (n !== shownCount) {
      shownCount = n; // redraw the label texture only when the count changes
      countLabel.set(`${n} charge${n === 1 ? "" : "s"}`, n > 1 ? RED : theme.fg);
    }

    // Message: travels on a low arc; a lost one fades out halfway.
    const travelling = cur && progress < 1;
    msg.visible = !!travelling;
    if (cur && travelling) {
      const p = ease(progress);
      const x = THREE.MathUtils.lerp(X[cur.from], X[cur.to], p);
      msg.position.set(x, LANE + Math.sin(p * Math.PI) * 0.35, 0);
      const retry = step === 3;
      const c = mode === "nokey" && retry ? new THREE.Color(theme.fg) : ok;
      msgMat.color.copy(c);
      msgMat.emissive.copy(c);
      msgMat.opacity = cur.lost ? THREE.MathUtils.clamp(1 - (progress - 0.4) / 0.15, 0, 1) : 1;
    }
    timeout.sprite.visible = !!cur && !!cur.lost && progress > 0.5;
  }

  // The camera backs off just enough to keep all three stations in frame at
  // any aspect ratio.
  if (narrow) {
    scene.traverse((o) => {
      if (o instanceof THREE.Sprite) o.scale.multiplyScalar(1.45);
    });
  }
  const HALF_WIDTH = gap + (narrow ? 0.85 : 1.4);
  let lastAspect = 0;
  function fitCamera() {
    const aspect = stage.camera.aspect;
    if (aspect === lastAspect) return;
    lastAspect = aspect;
    const halfFov = THREE.MathUtils.degToRad(stage.camera.fov / 2);
    const dist = HALF_WIDTH / (Math.tan(halfFov) * aspect);
    stage.camera.position.set(0, dist * 0.4, dist);
    stage.camera.lookAt(0, narrow ? -0.05 : 0.15, 0);
  }

  const pointer = pointerTracker(canvas);
  let yaw = 0;

  stage.onUpdate((dt) => {
    if (step >= 0 && progress < 1) {
      progress = Math.min(1, progress + dt / STEP_SECONDS);
      const cur = STEPS[mode][step];
      if (progress >= 1 && cur.keyHit) pulse = 1;
    }
    pulse = Math.max(0, pulse - dt * 1.4);
    fitCamera();
    yaw = damp(yaw, pointer.state.x * 0.12, 3, dt);
    scene.rotation.y = yaw;
    apply();
  });

  apply();
  fitCamera();
  stage.render();

  return {
    start: stage.handle.start,
    stop: stage.handle.stop,
    dispose() {
      pointer.dispose();
      stage.handle.dispose();
    },
    show(nextMode, nextStep, animateStep) {
      mode = nextMode;
      step = nextStep;
      progress = animate && animateStep && nextStep >= 0 ? 0 : 1;
      if (progress >= 1 && step >= 0 && STEPS[mode][step].keyHit) pulse = animate ? 1 : 0;
      apply();
      fitCamera();
      stage.render();
    },
  };
}
