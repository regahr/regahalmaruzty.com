// Timing readout for real devices: open the site with ?perf to see it.
// Off by default; nothing is recorded or shown without the query flag.
export type PerfEntry = { download: number; waitedForCode: number; setup: number };

declare global {
  interface Window {
    __rhrPerf?: Record<string, PerfEntry>;
  }
}

export const perfEnabled = () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("perf");

export function perfRecord(name: string, entry: PerfEntry) {
  window.__rhrPerf = { ...window.__rhrPerf, [name]: entry };
  window.dispatchEvent(new Event("rhr-perf"));
}
