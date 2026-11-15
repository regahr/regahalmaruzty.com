"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { useLazyScene } from "./useLazyScene";
import ScenePoster from "./ScenePoster";
import { CONCEPTS } from "./concepts";
import type { ConceptHandle, VariantKey } from "./conceptScene";

const load = () => import("./conceptScene").then((m) => m.mountConcepts);
const AUTO_MS = 2600;

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
    <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
  </svg>
);

// Captions, controls and concept switching are plain HTML, so the showcase
// works with a keyboard and a screen reader; the 3D view only illustrates.
export default function ConceptShowcase() {
  const { wrapRef, canvasRef, handleRef, status } = useLazyScene<ConceptHandle>(load, "concepts");
  const [concept, setConcept] = useState(0);
  const [variant, setVariant] = useState<VariantKey>("naive");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const c = CONCEPTS[concept];
  const steps = c[variant].steps;
  const last = steps.length - 1;

  useEffect(() => {
    handleRef.current?.show(concept, variant, step, true);
  }, [concept, variant, step, status, handleRef]);

  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => s + 1), step < 0 ? 150 : AUTO_MS);
    return () => clearTimeout(id);
  }, [playing, step, last]);

  const goConcept = (next: number) => {
    setConcept((next + CONCEPTS.length) % CONCEPTS.length);
    setVariant("naive"); // show the problem first, then the fix
    setStep(-1);
    setPlaying(false);
  };
  const goVariant = (v: VariantKey) => {
    setVariant(v);
    setStep(-1);
    setPlaying(false);
  };
  const onKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
    if (e.key === "ArrowLeft") goConcept(concept - 1);
    if (e.key === "ArrowRight") goConcept(concept + 1);
  };

  const caption =
    step < 0
      ? variant === "naive"
        ? "Press play to watch the naive version break, then switch to the fix."
        : "Press play to watch the fix handle the same situation."
      : steps[step].caption;

  const dots = (
    <div className="flex items-center gap-1" role="group" aria-label="Choose a concept">
      {CONCEPTS.map((k, i) => (
        <button
          key={k.id}
          type="button"
          onClick={() => goConcept(i)}
          aria-label={`Concept ${i + 1}: ${k.title}`}
          aria-current={i === concept}
          className="w-11 h-11 grid place-items-center cursor-pointer group"
        >
          <span className={`block h-2 rounded-full transition-all ${i === concept ? "w-6 bg-accent" : "w-2 bg-line group-hover:bg-muted"}`} />
        </button>
      ))}
    </div>
  );

  const btn =
    "inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3.5 rounded-lg font-mono text-sm border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="How it works: engineering concepts"
      onKeyDown={onKey}
      className="bg-surface border border-line rounded-xl p-5 sm:p-6 flex flex-col gap-3"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div aria-live="polite">
          <p className="font-mono text-[13px] text-muted">
            {String(concept + 1).padStart(2, "0")}/{String(CONCEPTS.length).padStart(2, "0")} · {c.kicker}
          </p>
          <h3 className="text-xl font-semibold leading-snug mt-1">{c.title}</h3>
        </div>
        <div role="group" aria-label="Version" className="flex rounded-lg border border-line overflow-hidden font-mono text-[13px]">
          {(["naive", "right"] as VariantKey[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={variant === v}
              onClick={() => goVariant(v)}
              className={`min-h-[44px] px-3.5 cursor-pointer transition-colors ${
                variant === v ? (v === "right" ? "bg-accent text-on-accent" : "bg-line text-fg") : "text-muted hover:text-fg"
              }`}
            >
              {c[v].label}
            </button>
          ))}
        </div>
      </div>

      {/* Side gutters (desktop) keep the round buttons off the stations. */}
      <div className="relative sm:px-16">
        {status !== "unsupported" && (
          <div ref={wrapRef} aria-hidden="true" aria-busy={status === "pending"} className="relative w-full aspect-[16/10] sm:aspect-[16/7] md:aspect-[3/1]">
            <ScenePoster name="concepts" live={status === "live"} />
            <canvas
              ref={canvasRef}
              className={`relative block w-full h-full touch-pan-y transition-opacity duration-300 motion-reduce:transition-none ${status === "live" ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => goConcept(concept - 1)}
          aria-label="Previous concept"
          className="glass-btn absolute left-0 inset-y-0 my-auto w-14 h-14 rounded-full hidden sm:grid place-items-center cursor-pointer"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => goConcept(concept + 1)}
          aria-label="Next concept"
          className="glass-btn absolute right-0 inset-y-0 my-auto w-14 h-14 rounded-full hidden sm:grid place-items-center cursor-pointer"
        >
          <Chevron dir="right" />
        </button>
      </div>

      {/* Phones: the round buttons sit under the scene, so it gets the full width. */}
      <div className="flex sm:hidden items-center justify-between">
        <button type="button" onClick={() => goConcept(concept - 1)} aria-label="Previous concept" className="glass-btn w-12 h-12 rounded-full grid place-items-center cursor-pointer">
          <Chevron dir="left" />
        </button>
        {dots}
        <button type="button" onClick={() => goConcept(concept + 1)} aria-label="Next concept" className="glass-btn w-12 h-12 rounded-full grid place-items-center cursor-pointer">
          <Chevron dir="right" />
        </button>
      </div>

      <p aria-live="polite" className="font-mono text-sm min-h-[3em] text-fg">
        <span className={variant === "right" ? "text-accent" : "text-muted"}>{step < 0 ? "$" : `${step + 1}/${last + 1}`}</span>{" "}
        {caption}
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
        <div className="hidden sm:flex ml-auto">{dots}</div>
      </div>
      <p className="font-mono text-xs text-muted -mt-1">illustrations of common patterns, not simulations · ← → to switch</p>
    </section>
  );
}
