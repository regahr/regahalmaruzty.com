"use client";

import { useEffect, useState } from "react";
import { perfEnabled, type PerfEntry } from "./perf";

const ms = (n: number) => `${Math.round(n)} ms`;

// Fixed corner box, shown only with ?perf. Made to be screenshotted on a phone.
export default function PerfReadout() {
  const [on, setOn] = useState(false);
  const [rows, setRows] = useState<Record<string, PerfEntry>>({});
  const [page, setPage] = useState("");

  useEffect(() => {
    if (!perfEnabled()) return;
    setOn(true);
    const update = () => setRows({ ...window.__rhrPerf });
    update();
    window.addEventListener("rhr-perf", update);
    const nav = () => {
      const n = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (n && n.loadEventEnd) setPage(ms(n.loadEventEnd));
    };
    if (document.readyState === "complete") nav();
    else window.addEventListener("load", () => setTimeout(nav), { once: true });
    return () => window.removeEventListener("rhr-perf", update);
  }, []);

  if (!on) return null;
  const names = ["chick pen", "concepts"];
  return (
    <div
      role="status"
      style={{ background: "var(--bg)" }}
      className="fixed bottom-3 left-3 right-3 sm:right-auto z-50 rounded-lg border border-accent p-3 font-mono text-[12px] leading-relaxed text-fg shadow-lg"
    >
      <p className="text-accent">?perf · dpr {typeof window !== "undefined" ? window.devicePixelRatio : ""} · page load {page || "…"}</p>
      {names.map((n) => {
        const r = rows[n];
        return (
          <p key={n} className="mt-1">
            <span className="text-accent">{n}</span>
            <br />
            {r ? (
              <>
                download {ms(r.download)} · waited {ms(r.waitedForCode)} · <b>setup {ms(r.setup)}</b>
              </>
            ) : (
              <span className="text-muted">scroll down to load</span>
            )}
          </p>
        );
      })}
      <p className="mt-1 text-muted">setup = build + lighting + shader compile, GPU finished</p>
    </div>
  );
}
