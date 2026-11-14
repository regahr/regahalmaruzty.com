"use client";

import { useLazyScene } from "./useLazyScene";
import { chickPenUrl } from "@/content/site";

const load = () => import("./chickScene").then((m) => m.mountChicks);

const ExternalIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

// The scene is decorative and hidden from screen readers; the link to the
// full game is real content, so it sits outside the hidden part and stays
// even when WebGL is unavailable.
export default function ChickPen({ className = "" }: { className?: string }) {
  const { wrapRef, canvasRef, status } = useLazyScene(load);
  const live = status !== "unsupported";
  return (
    <div className={className}>
      {live && (
        <div ref={wrapRef} aria-hidden="true" className="w-full h-[200px] sm:h-[260px]">
          <canvas ref={canvasRef} className="block w-full h-full touch-pan-y" />
        </div>
      )}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 font-mono text-xs text-muted">
        {live && (
          <p aria-hidden="true" className="select-none">
            {"// day-old chicks. they don't like cursors."}
          </p>
        )}
        <a
          href={chickPenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 min-h-[44px] text-accent hover:underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          play the full version
          {ExternalIcon}
          <span className="sr-only"> of Chick Pen (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
