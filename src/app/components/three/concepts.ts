// The authoritative content for the "how it works" showcase. Each concept has
// a naive version and the right version; each step lists the messages that
// move during it and the full picture after it. The 3D scene only draws this.
// These are teaching illustrations of common patterns, not simulations.

export type Tone = "ok" | "bad" | "warn" | "fg";

export type Packet = {
  from: string;
  to: string;
  tone?: Tone;
  lost?: boolean; // fades out halfway; `label` shows where it died
  label?: string;
  delay?: number; // seconds after the step starts
  count?: number; // a burst of identical messages
};

export type Snapshot = {
  chips?: Record<string, { text: string; tone: Tone }>; // small block on top of a station
  stacks?: Record<string, Tone[]>; // stacked records on a station
  notes?: Record<string, { text: string; tone: Tone }>; // line under the station name
  alert?: Record<string, Tone>; // tint the whole station
};

export type Step = { caption: string; packets: Packet[]; after: Snapshot };
export type Variant = { label: string; steps: Step[] };
export type Concept = {
  id: string;
  kicker: string;
  title: string;
  stations: { id: string; label: string }[];
  right: Variant;
  naive: Variant;
};

const charge = (n: number, tone: Tone = "fg") => ({ ledger: { text: `${n} charge${n === 1 ? "" : "s"}`, tone } });

export const CONCEPTS: Concept[] = [
  {
    id: "idempotency",
    kicker: "payments",
    title: "A retry that never double-charges",
    stations: [
      { id: "client", label: "client" },
      { id: "api", label: "api" },
      { id: "ledger", label: "ledger" },
    ],
    right: {
      label: "with idempotency key",
      steps: [
        {
          caption: "Customer taps Pay. The client sends POST /charge with Idempotency-Key: k-42.",
          packets: [{ from: "client", to: "api", tone: "ok" }],
          after: { chips: { api: { text: "k-42", tone: "ok" } } },
        },
        {
          caption: "API hasn't seen k-42. It saves the key and the result, and writes one charge.",
          packets: [{ from: "api", to: "ledger", tone: "ok" }],
          after: { chips: { api: { text: "k-42", tone: "ok" } }, stacks: { ledger: ["ok"] }, notes: charge(1) },
        },
        {
          caption: "The response is lost on the way back. The client times out.",
          packets: [{ from: "api", to: "client", tone: "ok", lost: true, label: "× timeout" }],
          after: { chips: { api: { text: "k-42", tone: "ok" } }, stacks: { ledger: ["ok"] }, notes: charge(1) },
        },
        {
          caption: "The client retries with the same key, k-42.",
          packets: [{ from: "client", to: "api", tone: "ok" }],
          after: { chips: { api: { text: "k-42 seen", tone: "ok" } }, stacks: { ledger: ["ok"] }, notes: charge(1) },
        },
        {
          caption: "API finds k-42 and replays the saved result. Still one charge.",
          packets: [{ from: "api", to: "client", tone: "ok" }],
          after: {
            chips: { api: { text: "k-42 seen", tone: "ok" } },
            stacks: { ledger: ["ok"] },
            notes: { ...charge(1, "ok"), client: { text: "paid", tone: "ok" } },
          },
        },
      ],
    },
    naive: {
      label: "no key",
      steps: [
        {
          caption: "Customer taps Pay. The client sends POST /charge, with no idempotency key.",
          packets: [{ from: "client", to: "api", tone: "fg" }],
          after: {},
        },
        {
          caption: "API writes one charge.",
          packets: [{ from: "api", to: "ledger", tone: "fg" }],
          after: { stacks: { ledger: ["ok"] }, notes: charge(1) },
        },
        {
          caption: "The response is lost on the way back. The client times out.",
          packets: [{ from: "api", to: "client", tone: "fg", lost: true, label: "× timeout" }],
          after: { stacks: { ledger: ["ok"] }, notes: charge(1) },
        },
        {
          caption: "The client retries. To the API it looks like a brand-new request.",
          packets: [{ from: "client", to: "api", tone: "fg" }],
          after: { stacks: { ledger: ["ok"] }, notes: charge(1) },
        },
        {
          caption: "API writes a second charge. The customer paid twice.",
          packets: [{ from: "api", to: "ledger", tone: "bad" }],
          after: { stacks: { ledger: ["ok", "bad"] }, notes: charge(2, "bad") },
        },
      ],
    },
  },
  {
    id: "lock",
    kicker: "concurrency",
    title: "Two workers, one job, one result",
    stations: [
      { id: "a", label: "worker a" },
      { id: "redis", label: "redis" },
      { id: "b", label: "worker b" },
      { id: "invoices", label: "invoices" },
    ],
    right: {
      label: "with a lock",
      steps: [
        {
          caption: "Two workers wake up for the same job: the 1 Dec invoice run. Both ask Redis for the lock (SET NX, 30s TTL).",
          packets: [
            { from: "a", to: "redis", tone: "ok" },
            { from: "b", to: "redis", tone: "fg", delay: 0.08 },
          ],
          after: { chips: { redis: { text: "held by a", tone: "ok" } } },
        },
        {
          caption: "SET NX is atomic, so exactly one wins. A gets the lock; B is told no and skips the run.",
          packets: [
            { from: "redis", to: "a", tone: "ok", label: "OK" },
            { from: "redis", to: "b", tone: "bad", label: "taken" },
          ],
          after: {
            chips: { redis: { text: "held by a", tone: "ok" } },
            notes: { a: { text: "running", tone: "ok" }, b: { text: "skipped", tone: "warn" } },
          },
        },
        {
          caption: "Worker A creates the invoices, once.",
          packets: [{ from: "a", to: "invoices", tone: "ok" }],
          after: {
            chips: { redis: { text: "held by a", tone: "ok" } },
            stacks: { invoices: ["ok"] },
            notes: { a: { text: "running", tone: "ok" }, b: { text: "skipped", tone: "warn" }, invoices: { text: "1 run", tone: "fg" } },
          },
        },
        {
          caption: "A releases the lock. If A had crashed, the 30s TTL would free it, so the job can't stay stuck.",
          packets: [{ from: "a", to: "redis", tone: "ok", label: "DEL" }],
          after: {
            stacks: { invoices: ["ok"] },
            notes: { redis: { text: "free", tone: "fg" }, invoices: { text: "1 run", tone: "ok" } },
          },
        },
      ],
    },
    naive: {
      label: "no lock",
      steps: [
        {
          caption: "Two workers wake up for the 1 Dec invoice run. Nothing tells either one the other exists.",
          packets: [],
          after: { notes: { a: { text: "starting", tone: "fg" }, b: { text: "starting", tone: "fg" } } },
        },
        {
          caption: "Both check \"already invoiced?\" at the same moment. Both read no.",
          packets: [
            { from: "a", to: "invoices", tone: "fg", label: "read" },
            { from: "b", to: "invoices", tone: "fg", delay: 0.08, label: "read" },
          ],
          after: { notes: { a: { text: "sees none", tone: "fg" }, b: { text: "sees none", tone: "fg" } } },
        },
        {
          caption: "Both write invoices. Every customer is billed twice for December.",
          packets: [
            { from: "a", to: "invoices", tone: "fg" },
            { from: "b", to: "invoices", tone: "bad", delay: 0.12 },
          ],
          after: { stacks: { invoices: ["ok", "bad"] }, notes: { invoices: { text: "2 runs", tone: "bad" } } },
        },
      ],
    },
  },
  {
    id: "retry",
    kicker: "reliability",
    title: "Retrying a flaky bank without making it worse",
    stations: [
      { id: "queue", label: "queue" },
      { id: "worker", label: "worker" },
      { id: "bank", label: "bank api" },
      { id: "dlq", label: "dead letter" },
    ],
    right: {
      label: "backoff + dead letter",
      steps: [
        {
          caption: "A refund message arrives. The worker calls the bank.",
          packets: [
            { from: "queue", to: "worker", tone: "ok" },
            { from: "worker", to: "bank", tone: "ok", delay: 0.6 },
          ],
          after: { notes: { bank: { text: "503", tone: "bad" } }, alert: { bank: "warn" } },
        },
        {
          caption: "The bank answers 503. The worker hands the message back to the queue: try again in 1s.",
          packets: [
            { from: "bank", to: "worker", tone: "bad", label: "503" },
            { from: "worker", to: "queue", tone: "warn", delay: 0.6 },
          ],
          after: { chips: { queue: { text: "retry in 1s", tone: "warn" } }, notes: { bank: { text: "503", tone: "bad" } }, alert: { bank: "warn" } },
        },
        {
          caption: "Still 503. Each wait doubles, 2s, 4s, 8s, so the bank gets room to recover instead of more load.",
          packets: [
            { from: "queue", to: "worker", tone: "warn" },
            { from: "worker", to: "bank", tone: "warn", delay: 0.5 },
            { from: "bank", to: "worker", tone: "bad", delay: 1.0, label: "503" },
          ],
          after: { chips: { queue: { text: "try 5, wait 8s", tone: "warn" } }, notes: { bank: { text: "503", tone: "bad" } }, alert: { bank: "warn" } },
        },
        {
          caption: "After 5 tries it stops and parks the message in the dead-letter queue, with the error attached.",
          packets: [{ from: "worker", to: "dlq", tone: "warn" }],
          after: { stacks: { dlq: ["warn"] }, notes: { dlq: { text: "1 parked", tone: "warn" }, bank: { text: "503", tone: "bad" } }, alert: { bank: "warn" } },
        },
        {
          caption: "Ops gets an alert, and replays it once the bank is back. Nothing lost, and the bank was never hammered.",
          packets: [
            { from: "dlq", to: "worker", tone: "ok" },
            { from: "worker", to: "bank", tone: "ok", delay: 0.6 },
          ],
          after: { notes: { dlq: { text: "0 parked", tone: "ok" }, bank: { text: "200", tone: "ok" }, worker: { text: "refunded", tone: "ok" } } },
        },
      ],
    },
    naive: {
      label: "retry instantly",
      steps: [
        {
          caption: "A refund message arrives. The worker calls the bank.",
          packets: [
            { from: "queue", to: "worker", tone: "fg" },
            { from: "worker", to: "bank", tone: "fg", delay: 0.6 },
          ],
          after: { notes: { bank: { text: "503", tone: "bad" } }, alert: { bank: "warn" } },
        },
        {
          caption: "503. The worker retries at once, in a tight loop.",
          packets: [{ from: "worker", to: "bank", tone: "fg", count: 6 }],
          after: { notes: { bank: { text: "503, 300 req/s", tone: "bad" } }, alert: { bank: "bad" } },
        },
        {
          caption: "Every worker does the same. The bank rate-limits your whole account, so other payments fail too.",
          packets: [{ from: "worker", to: "bank", tone: "bad", count: 6, lost: true, label: "429" }],
          after: { notes: { bank: { text: "blocked", tone: "bad" } }, alert: { bank: "bad" } },
        },
        {
          caption: "The loop gives up and the message is dropped. The customer never gets the refund.",
          packets: [{ from: "worker", to: "dlq", tone: "bad", lost: true, label: "× dropped" }],
          after: { notes: { bank: { text: "blocked", tone: "bad" }, worker: { text: "dropped", tone: "bad" } }, alert: { bank: "bad" } },
        },
      ],
    },
  },
  {
    id: "migration",
    kicker: "data integrity",
    title: "Moving live data without losing any",
    stations: [
      { id: "app", label: "app" },
      { id: "old", label: "old table" },
      { id: "new", label: "new table" },
      { id: "compare", label: "compare job" },
    ],
    right: {
      label: "parallel run",
      steps: [
        {
          caption: "The app writes every change to both the old table and the new one.",
          packets: [
            { from: "app", to: "old", tone: "ok" },
            { from: "app", to: "new", tone: "ok", delay: 0.1 },
          ],
          after: { stacks: { old: ["ok"], new: ["ok"] }, chips: { old: { text: "serving reads", tone: "ok" } } },
        },
        {
          caption: "Reads still come from old. A job compares old and new, row by row, every night.",
          packets: [
            { from: "old", to: "compare", tone: "fg" },
            { from: "new", to: "compare", tone: "fg", delay: 0.1 },
          ],
          after: {
            stacks: { old: ["ok"], new: ["ok"] },
            chips: { old: { text: "serving reads", tone: "ok" } },
            notes: { compare: { text: "3 diffs", tone: "bad" } },
          },
        },
        {
          caption: "A diff means a bug in the new path. Fix it, backfill, compare again until it stays at zero.",
          packets: [{ from: "app", to: "new", tone: "warn", label: "backfill" }],
          after: {
            stacks: { old: ["ok"], new: ["ok"] },
            chips: { old: { text: "serving reads", tone: "ok" } },
            notes: { compare: { text: "0 diffs, 7 days", tone: "ok" } },
          },
        },
        {
          caption: "Only then do reads switch to new. Old stays as a fallback for a while.",
          packets: [{ from: "new", to: "app", tone: "ok" }],
          after: {
            stacks: { old: ["ok"], new: ["ok"] },
            chips: { new: { text: "serving reads", tone: "ok" } },
            notes: { old: { text: "fallback", tone: "fg" }, compare: { text: "0 diffs", tone: "ok" } },
          },
        },
      ],
    },
    naive: {
      label: "big-bang switch",
      steps: [
        {
          caption: "Stop the app, copy everything from old to new, switch over.",
          packets: [{ from: "old", to: "new", tone: "fg", count: 3 }],
          after: { stacks: { old: ["ok"], new: ["ok"] }, chips: { new: { text: "serving reads", tone: "fg" } } },
        },
        {
          caption: "Back online. A mapping bug in the copy was never compared against anything.",
          packets: [{ from: "new", to: "app", tone: "fg" }],
          after: { stacks: { old: ["ok"], new: ["bad"] }, chips: { new: { text: "serving reads", tone: "fg" } } },
        },
        {
          caption: "Customers see wrong balances. Old has stopped getting writes, so there's no clean way back.",
          packets: [],
          after: {
            stacks: { old: ["ok"], new: ["bad"] },
            chips: { new: { text: "serving reads", tone: "bad" } },
            notes: { app: { text: "wrong balances", tone: "bad" }, old: { text: "stale", tone: "warn" } },
          },
        },
      ],
    },
  },
];
