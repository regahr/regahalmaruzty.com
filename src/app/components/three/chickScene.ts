// A straw pen with day-old chicks for the About section. They wander and
// peck, run from the cursor, and hop when you click near them. A hatched
// eggshell sits in the corner. Decorative: it tells the farm story.
import * as THREE from "three";
import { contactShadow, createStage, damp, readTheme, type MountOptions, type SceneHandle } from "./kit";

export type ChickHandle = SceneHandle;

type Chick = {
  root: THREE.Group; // floor position + heading
  body: THREE.Group; // bob and hop
  head: THREE.Group;
  wings: THREE.Mesh[];
  legs: THREE.Group[];
  shadow: THREE.Mesh;
  pos: THREE.Vector2;
  vel: THREE.Vector2;
  target: THREE.Vector2;
  heading: number;
  mode: "walk" | "peck" | "flee";
  timer: number;
  hop: number;
  hopVel: number;
  phase: number;
  pace: number;
  seed: number;
  peck: number;
};

const FLEE_RADIUS = 1.05;
const WALK_SPEED = 0.42;
const FLEE_SPEED = 1.9;
const SPACING = 0.42;

export function mountChicks(canvas: HTMLCanvasElement, { animate }: MountOptions): ChickHandle {
  const theme = readTheme();
  const narrow = canvas.clientWidth < 560;
  // Pen half-size: wide strip on desktop, squarer on phones.
  const HW = narrow ? 1.55 : 2.75;
  const HD = narrow ? 1.05 : 0.95;
  const COUNT = narrow ? 3 : 5;
  const MARGIN = 0.22;

  const stage = createStage(canvas, { fov: 30, camera: [0, 3, 5], target: [0, 0, 0], animate });
  const { scene, camera } = stage;

  // Seeded random, so the pen looks the same on every visit.
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const range = (a: number, b: number) => a + rnd() * (b - a);

  // ---- Pen ---------------------------------------------------------------------
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(HW * 2 + 0.2, HD * 2 + 0.2),
    new THREE.MeshStandardMaterial({ color: "#e6d29b", roughness: 0.95 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const penShadow = contactShadow(1, theme.dark ? 0.55 : 0.18);
  penShadow.scale.set((HW * 2 + 1.2) * 1.0, (HD * 2 + 1.2) * 1.0, 1);
  penShadow.position.y = -0.005;
  scene.add(penShadow);

  // Loose straw: instanced thin strands.
  const STRAW = narrow ? 160 : 300;
  const straw = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.11, 0.006, 0.012),
    new THREE.MeshStandardMaterial({ color: "#d4b45e", roughness: 0.9 }),
    STRAW,
  );
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  for (let i = 0; i < STRAW; i++) {
    q.setFromEuler(new THREE.Euler(0, range(0, Math.PI), 0));
    m4.compose(new THREE.Vector3(range(-HW, HW), 0.004, range(-HD, HD)), q, new THREE.Vector3(range(0.6, 1.4), 1, 1));
    straw.setMatrixAt(i, m4);
  }
  scene.add(straw);

  // Low wooden fence: posts and two rails per side.
  const wood = new THREE.MeshStandardMaterial({ color: "#b07a48", roughness: 0.8 });
  const postGeo = new THREE.CylinderGeometry(0.03, 0.034, 0.32, 8);
  const fx = HW + 0.08;
  const fz = HD + 0.08;
  const sides: [THREE.Vector3, THREE.Vector3][] = [
    [new THREE.Vector3(-fx, 0, -fz), new THREE.Vector3(fx, 0, -fz)],
    [new THREE.Vector3(-fx, 0, fz), new THREE.Vector3(fx, 0, fz)],
    [new THREE.Vector3(-fx, 0, -fz), new THREE.Vector3(-fx, 0, fz)],
    [new THREE.Vector3(fx, 0, -fz), new THREE.Vector3(fx, 0, fz)],
  ];
  for (const [a, b] of sides) {
    const len = a.distanceTo(b);
    const posts = Math.max(2, Math.round(len / 0.7) + 1);
    for (let i = 0; i < posts; i++) {
      const p = new THREE.Mesh(postGeo, wood);
      p.position.lerpVectors(a, b, i / (posts - 1)).setY(0.16);
      scene.add(p);
    }
    for (const y of [0.12, 0.25]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.035, 0.025), wood);
      rail.position.lerpVectors(a, b, 0.5).setY(y);
      rail.rotation.y = Math.abs(a.x - b.x) < 1e-6 ? Math.PI / 2 : 0;
      scene.add(rail);
    }
  }

  // Hatched eggshell in the back-left corner: the bottom half of an egg.
  const shellProfile: THREE.Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = (i / 24) * Math.PI * 0.56;
    shellProfile.push(new THREE.Vector2(Math.max(0.0001, 0.12 * Math.sin(t) * (1 + 0.13 * Math.cos(t))), -Math.cos(t) * 0.16));
  }
  const shell = new THREE.Mesh(
    new THREE.LatheGeometry(shellProfile, 32),
    new THREE.MeshStandardMaterial({ color: "#f1e9dc", roughness: 0.6, side: THREE.DoubleSide }),
  );
  shell.position.set(-HW + 0.35, 0.13, -HD + 0.3);
  shell.rotation.set(0.5, 0.4, 0.35);
  scene.add(shell);

  // Feeder dish with grain in the back-right corner.
  const dish = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.16, 0.07, 24),
    new THREE.MeshStandardMaterial({ color: "#d9534f", roughness: 0.5 }),
  );
  dish.position.set(HW - 0.35, 0.035, -HD + 0.3);
  scene.add(dish);
  const grain = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, 0.02, 24),
    new THREE.MeshStandardMaterial({ color: "#c9a14a", roughness: 1 }),
  );
  grain.position.set(dish.position.x, 0.065, dish.position.z);
  scene.add(grain);

  // ---- Chicks ------------------------------------------------------------------
  const fluff = new THREE.MeshPhysicalMaterial({
    color: "#ffcc29",
    roughness: 0.95,
    sheen: 1,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color("#ffe27a"),
    envMapIntensity: 0.3,
  });
  const orange = new THREE.MeshStandardMaterial({ color: "#f59e0b", roughness: 0.55 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.2 });
  const bodyGeo = new THREE.SphereGeometry(0.15, 28, 20);
  const headGeo = new THREE.SphereGeometry(0.1, 24, 16);
  const beakGeo = new THREE.ConeGeometry(0.026, 0.055, 12);
  const eyeGeo = new THREE.SphereGeometry(0.015, 10, 8);
  const wingGeo = new THREE.SphereGeometry(0.06, 14, 10);
  const legGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.07, 6);
  const toeGeo = new THREE.BoxGeometry(0.045, 0.008, 0.05);

  const shadowTpl = contactShadow(0.42, theme.dark ? 0.5 : 0.22);

  function randomPoint(out: THREE.Vector2) {
    return out.set(range(-HW + MARGIN, HW - MARGIN), range(-HD + MARGIN, HD - MARGIN));
  }

  function makeChick(i: number): Chick {
    const root = new THREE.Group();
    const body = new THREE.Group();
    root.add(body);

    const torso = new THREE.Mesh(bodyGeo, fluff);
    torso.scale.set(1, 0.9, 1.1);
    torso.position.y = 0.2;
    body.add(torso);

    const head = new THREE.Group();
    head.position.set(0, 0.33, 0.08);
    const skull = new THREE.Mesh(headGeo, fluff);
    head.add(skull);
    const beak = new THREE.Mesh(beakGeo, orange);
    beak.rotation.x = Math.PI / 2; // cone points forward (+z)
    beak.position.set(0, -0.01, 0.105);
    head.add(beak);
    for (const s of [-1, 1]) {
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(s * 0.048, 0.022, 0.08);
      head.add(eye);
    }
    body.add(head);

    const wings = [-1, 1].map((s) => {
      const w = new THREE.Mesh(wingGeo, fluff);
      w.scale.set(0.35, 0.7, 1);
      w.position.set(s * 0.14, 0.21, -0.01);
      w.rotation.z = s * 0.25;
      body.add(w);
      return w;
    });

    const legs = [-1, 1].map((s) => {
      const hip = new THREE.Group();
      hip.position.set(s * 0.05, 0.075, 0);
      const leg = new THREE.Mesh(legGeo, orange);
      leg.position.y = -0.035;
      const toe = new THREE.Mesh(toeGeo, orange);
      toe.position.set(0, -0.07, 0.012);
      hip.add(leg, toe);
      root.add(hip);
      return hip;
    });

    const shadow = shadowTpl.clone();
    shadow.position.y = 0.006;
    scene.add(shadow);

    const pos = new THREE.Vector2(range(-HW + MARGIN, HW - MARGIN), range(-HD + MARGIN, HD - MARGIN));
    const scale = range(0.92, 1.08) * (narrow ? 1.1 : 1.22);
    root.scale.setScalar(scale);
    scene.add(root);

    return {
      root,
      body,
      head,
      wings,
      legs,
      shadow,
      pos,
      vel: new THREE.Vector2(),
      target: randomPoint(new THREE.Vector2()),
      heading: range(-Math.PI, Math.PI),
      mode: i % 2 === 0 ? "peck" : "walk",
      timer: range(0.3, 1.5),
      hop: 0,
      hopVel: 0,
      phase: range(0, 10),
      pace: range(0.8, 1.15),
      seed: range(0, 100),
      peck: 0,
    };
  }

  const chicks = Array.from({ length: COUNT }, (_, i) => makeChick(i));

  // ---- Camera fit: keep the whole pen in frame at any aspect -------------------
  // Project the pen's corners (floor and fence top) and solve for the camera
  // distance and aim point that fit them, so nothing is clipped and there is
  // no dead space, whatever the canvas shape.
  const ELEV = THREE.MathUtils.degToRad(narrow ? 40 : 32);
  const corners: THREE.Vector3[] = [];
  for (const x of [-fx - 0.04, fx + 0.04])
    for (const z of [-fz - 0.04, fz + 0.04]) for (const y of [0, 0.33]) corners.push(new THREE.Vector3(x, y, z));
  const proj = new THREE.Vector3();
  let lastAspect = 0;
  function fitCamera() {
    if (camera.aspect === lastAspect) return;
    lastAspect = camera.aspect;
    let dist = 6;
    let aimY = 0.06;
    for (let iter = 0; iter < 6; iter++) {
      camera.position.set(0, Math.sin(ELEV) * dist, Math.cos(ELEV) * dist + 0);
      camera.lookAt(0, aimY, 0);
      camera.updateMatrixWorld();
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const c of corners) {
        proj.copy(c).project(camera);
        minX = Math.min(minX, proj.x); maxX = Math.max(maxX, proj.x);
        minY = Math.min(minY, proj.y); maxY = Math.max(maxY, proj.y);
      }
      const extent = Math.max((maxX - minX) / 2, (maxY - minY) / 2);
      dist *= extent / 0.92;
      // Re-aim so the pen is centred vertically.
      aimY += ((minY + maxY) / 2) * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.5;
    }
    camera.position.set(0, Math.sin(ELEV) * dist, Math.cos(ELEV) * dist);
    camera.lookAt(0, aimY, 0);
  }

  // ---- Cursor on the floor ------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  const threat = { active: false, until: 0, p: new THREE.Vector2() };
  let now = 0;

  function floorPoint(e: PointerEvent): boolean {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    if (!raycaster.ray.intersectPlane(floorPlane, hit)) return false;
    threat.p.set(hit.x, hit.z);
    return true;
  }
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (floorPoint(e)) {
      threat.active = true;
      threat.until = Infinity;
    }
  };
  const onLeave = () => {
    threat.active = false;
  };
  const onDown = (e: PointerEvent) => {
    if (!floorPoint(e)) return;
    threat.active = true;
    threat.until = e.pointerType === "mouse" ? Infinity : now + 1.2;
    for (const c of chicks) {
      if (c.pos.distanceTo(threat.p) < 1.3 && c.hop === 0) c.hopVel = range(1.6, 2.3);
    }
  };
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("pointerdown", onDown);
  canvas.style.cursor = "crosshair";

  // ---- Behaviour ------------------------------------------------------------------
  const desired = new THREE.Vector2();
  const tmp = new THREE.Vector2();

  function angleDamp(a: number, b: number, rate: number, dt: number) {
    let d = b - a;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    return a + d * (1 - Math.exp(-rate * dt));
  }

  function stepChick(c: Chick, dt: number, t: number) {
    desired.set(0, 0);
    const scared = threat.active && t < threat.until;

    // Run from the cursor.
    if (scared) {
      tmp.copy(c.pos).sub(threat.p);
      const d = tmp.length();
      if (d < FLEE_RADIUS) {
        const push = (FLEE_SPEED * (1 - d / FLEE_RADIUS) + 0.7) * c.pace;
        desired.add(tmp.normalize().multiplyScalar(push));
        c.mode = "flee";
        c.timer = 0.5;
      }
    }

    if (c.mode === "flee") {
      c.timer -= dt;
      if (c.timer <= 0 && desired.lengthSq() === 0) {
        c.mode = "peck";
        c.timer = range(0.6, 1.4);
      }
    } else if (c.mode === "walk") {
      tmp.copy(c.target).sub(c.pos);
      if (tmp.length() < 0.08) {
        c.mode = "peck";
        c.timer = range(0.8, 2.2);
      } else {
        desired.add(tmp.normalize().multiplyScalar(WALK_SPEED * c.pace));
      }
    } else {
      c.timer -= dt;
      if (c.timer <= 0) {
        c.mode = "walk";
        randomPoint(c.target);
      }
    }

    // Keep apart from each other.
    for (const o of chicks) {
      if (o === c) continue;
      tmp.copy(c.pos).sub(o.pos);
      const d = tmp.length();
      if (d > 0 && d < SPACING) desired.add(tmp.normalize().multiplyScalar((SPACING - d) * 5));
    }

    // Soft walls, then a hard clamp. A cornered chick slides along the fence.
    const lx = HW - MARGIN;
    const lz = HD - MARGIN;
    if (c.pos.x > lx - 0.15) desired.x -= (c.pos.x - (lx - 0.15)) * 9;
    if (c.pos.x < -lx + 0.15) desired.x -= (c.pos.x + (lx - 0.15)) * 9;
    if (c.pos.y > lz - 0.15) desired.y -= (c.pos.y - (lz - 0.15)) * 9;
    if (c.pos.y < -lz + 0.15) desired.y -= (c.pos.y + (lz - 0.15)) * 9;

    c.vel.x = damp(c.vel.x, desired.x, 7, dt);
    c.vel.y = damp(c.vel.y, desired.y, 7, dt);
    c.pos.addScaledVector(c.vel, dt);
    c.pos.x = THREE.MathUtils.clamp(c.pos.x, -lx, lx);
    c.pos.y = THREE.MathUtils.clamp(c.pos.y, -lz, lz);

    const speed = c.vel.length();
    if (speed > 0.05) c.heading = angleDamp(c.heading, Math.atan2(c.vel.x, c.vel.y), 10, dt);

    // Hop.
    if (c.hopVel !== 0 || c.hop > 0) {
      c.hopVel -= 9.8 * dt;
      c.hop = Math.max(0, c.hop + c.hopVel * dt);
      if (c.hop === 0) c.hopVel = 0;
    }

    // Pose: legs swing with speed, body bobs, head pecks when idle, wings flap when fleeing.
    const gait = Math.min(1, speed * 3);
    c.phase += dt * (6 + speed * 22);
    c.legs[0].rotation.x = Math.sin(c.phase) * 0.8 * gait;
    c.legs[1].rotation.x = -Math.sin(c.phase) * 0.8 * gait;
    c.body.position.y = Math.abs(Math.sin(c.phase)) * 0.018 * gait + c.hop;
    const pecking = c.mode === "peck" && Math.sin(t * 2.3 + c.seed) > 0.2;
    c.peck = damp(c.peck, pecking ? (Math.sin(t * 16 + c.seed) > 0 ? 1 : 0.4) : 0, 14, dt);
    c.head.rotation.x = c.peck * 0.9;
    c.head.position.z = 0.08 + c.peck * 0.04;
    c.head.rotation.y = c.mode === "peck" ? Math.sin(t * 0.9 + c.seed) * 0.4 * (1 - c.peck) : 0;
    const flap = c.mode === "flee" || c.hop > 0 ? 0.35 + Math.sin(t * 34 + c.seed) * 0.45 : 0;
    c.wings[0].rotation.z = -0.25 - flap;
    c.wings[1].rotation.z = 0.25 + flap;

    c.root.position.set(c.pos.x, 0, c.pos.y);
    c.root.rotation.y = c.heading;
    c.shadow.position.set(c.pos.x, 0.006, c.pos.y);
    c.shadow.scale.setScalar(1 - Math.min(0.4, c.hop * 1.5));
  }

  stage.onUpdate((dt, t) => {
    now = t;
    fitCamera();
    for (const c of chicks) stepChick(c, dt, t);
  });

  // First frame: settle the poses without running any behaviour.
  fitCamera();
  for (const c of chicks) {
    c.root.position.set(c.pos.x, 0, c.pos.y);
    c.root.rotation.y = c.heading;
    c.shadow.position.set(c.pos.x, 0.006, c.pos.y);
  }
  stage.render();

  return {
    start: stage.handle.start,
    stop: stage.handle.stop,
    dispose() {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      shadowTpl.geometry.dispose();
      (shadowTpl.material as THREE.MeshBasicMaterial).map?.dispose();
      (shadowTpl.material as THREE.MeshBasicMaterial).dispose();
      stage.handle.dispose();
    },
  };
}
