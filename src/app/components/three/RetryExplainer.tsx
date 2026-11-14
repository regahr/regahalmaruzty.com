"use client";

import { useEffect, useState } from "react";
import { useLazyScene } from "./useLazyScene";
import { STEPS, type Mode } from "./retrySteps";
import type { RetryHandle } from "./retryScene";

const load = () => import("./retryScene").then((m) => m.mountRetry);
const AUTO_MS = 2400;

// The captions and controls are plain HTML, so the explainer works for screen
// readers and keyboards; the 3D view only illustrates the current step.
export default function RetryExplainer() {
  const { wrapRef, canvasRef, handleRef, status } = useLazyScene<RetryHandle>(load);
  const [mode, setMode] = useState<Mode>("key");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const last = STEPS[mode].length - 1;

  // Push the authoritative step into the scene whenever it changes.
  useEffect(() => {
    handleRef.current?.show(mode, step, true);
  }, [mode, step, status, handleRef]);

  // Auto-play advances one step at a time and stops at the end.
  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => s + 1), step < 0 ? 200 : AUTO_MS);
    return () => clearTimeout(id);
  }, [playing, step, last]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setStep(-1);
    setPlaying(false);
  };

  const caption =
    step < 0
      ? "Press play to watch one payment, one lost response, and one retry."
      : STEPS[mode][step].caption;

  const btn =
    "inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3.5 rounded-lg font-mono text-sm border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default";

  return (
    <article className="md:col-span-2 bg-surface border border-line rounded-xl p-6 flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="font-mono text-[13px] text-muted">payments · how it works</p>
          <h3 className="text-xl font-semibold leading-snug mt-1">Watch a retry hit an idempotency key</h3>
        </div>
        <div role="group" aria-label="Scenario" className="flex rounded-lg border border-line overflow-hidden font-mono text-[13px]">
          {(["key", "nokey"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => switchMode(m)}
              className={`min-h-[44px] px-3.5 cursor-pointer transition-colors ${
                mode === m ? "bg-accent text-on-accent" : "text-muted hover:text-fg"
              }`}
            >
              {m === "key" ? "with key" : "without key"}
            </button>
          ))}
        </div>
      </div>

      {status !== "unsupported" && (
        <div ref={wrapRef} aria-hidden="true" className="w-full aspect-[4/3] sm:aspect-[16/8] md:aspect-[16/6] -mx-2">
          <canvas ref={canvasRef} className="block w-full h-full touch-pan-y" />
        </div>
      )}

      <p aria-live="polite" className="font-mono text-sm min-h-[3em] text-fg">
        <span className="text-accent">{step < 0 ? "$" : `${step + 1}/${last + 1}`}</span> {caption}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={`${btn} border-line hover:border-muted`} onClick={() => setStep((s) => Math.max(-1, s - 1))} disabled={step < 0} aria-label="Previous step">
          ◀
        </button>
        <button
          type="button"
          className={`${btn} bg-accent text-on-accent border-accent font-medium hover:brightness-110`}
          onClick={() => {
            if (step >= last) setStep(-1);
            setPlaying((p) => !p || step >= last);
          }}
        >
          {playing ? "pause" : step >= last ? "replay" : "play"}
        </button>
        <button type="button" className={`${btn} border-line hover:border-muted`} onClick={() => setStep((s) => Math.min(last, s + 1))} disabled={step >= last} aria-label="Next step">
          ▶
        </button>
        <span className="font-mono text-xs text-muted ml-auto">illustration, not a simulation</span>
      </div>
    </article>
  );
}
