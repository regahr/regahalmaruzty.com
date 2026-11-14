// The authoritative model for the "retry without a double charge" explainer.
// The 3D scene only illustrates these steps; captions come from here too.
// This is a teaching illustration, not a simulation of any real system.

export type Mode = "key" | "nokey";
export type Station = "client" | "api" | "ledger";

export type Step = {
  from: Station;
  to: Station;
  lost?: boolean; // the message never arrives (timeout)
  storeKey?: boolean; // API saves the idempotency key on arrival
  keyHit?: boolean; // API finds the key and replays the saved result
  charge?: "ok" | "dup"; // a ledger entry is written on arrival
  caption: string;
};

export const STEPS: Record<Mode, Step[]> = {
  key: [
    {
      from: "client",
      to: "api",
      storeKey: true,
      caption: "Customer taps Pay. The client sends POST /charge with Idempotency-Key: k-42.",
    },
    { from: "api", to: "ledger", charge: "ok", caption: "API hasn't seen k-42. It saves the key and writes one charge." },
    { from: "api", to: "client", lost: true, caption: "The response is lost on the way back. The client times out." },
    { from: "client", to: "api", keyHit: true, caption: "The client retries with the same key, k-42." },
    { from: "api", to: "client", caption: "API finds k-42 and replays the saved result. Still one charge." },
  ],
  nokey: [
    { from: "client", to: "api", caption: "Customer taps Pay. The client sends POST /charge, with no idempotency key." },
    { from: "api", to: "ledger", charge: "ok", caption: "API writes one charge." },
    { from: "api", to: "client", lost: true, caption: "The response is lost on the way back. The client times out." },
    { from: "client", to: "api", caption: "The client retries. To the API it looks like a brand-new request." },
    { from: "api", to: "ledger", charge: "dup", caption: "API writes a second charge. The customer paid twice." },
  ],
};

// State after steps [0, upTo) have fully completed.
export function settledState(mode: Mode, upTo: number) {
  let keyStored = false;
  const ledger: ("ok" | "dup")[] = [];
  for (const s of STEPS[mode].slice(0, upTo)) {
    if (s.storeKey) keyStored = true;
    if (s.charge) ledger.push(s.charge);
  }
  return { keyStored, ledger };
}
