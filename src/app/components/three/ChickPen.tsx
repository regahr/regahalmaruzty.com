"use client";

import { useLazyScene } from "./useLazyScene";

const load = () => import("./chickScene").then((m) => m.mountChicks);

// Decorative: hidden from screen readers. The story it tells is in the text.
export default function ChickPen({ className = "" }: { className?: string }) {
  const { wrapRef, canvasRef, status } = useLazyScene(load);
  if (status === "unsupported") return null;
  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full touch-pan-y" />
      <p className="font-mono text-xs text-muted text-right mt-1 select-none">
        {"// day-old chicks. they don't like cursors."}
      </p>
    </div>
  );
}
