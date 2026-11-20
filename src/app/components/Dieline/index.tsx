import { dieline } from "@/content/dieline";

// The flat box net that Kotakita computes, drawn from its own model output
// (src/content/dieline.ts). Cuts solid, creases dashed, lock slots filled.
// Decorative: the card text says the same, so it is hidden from screen readers.
export default function Dieline() {
  const pad = 8;
  return (
    <div aria-hidden="true" className="hidden sm:flex flex-col gap-2 justify-center">
      <svg
        viewBox={`${-pad} ${-pad} ${dieline.width + pad * 2} ${dieline.height + pad * 2}`}
        className="w-full h-auto"
        fill="none"
        strokeLinecap="round"
      >
        <path d={dieline.crease} className="stroke-accent" strokeWidth={1.25} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        <path d={dieline.cut} className="stroke-muted" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
        <path d={dieline.slot} className="fill-muted" />
      </svg>
      <p className="font-mono text-xs text-muted flex flex-wrap gap-x-4">
        <span>{dieline.size}</span>
        <span>
          <span className="text-accent">- -</span> fold
        </span>
        <span>&mdash; cut</span>
      </p>
    </div>
  );
}
