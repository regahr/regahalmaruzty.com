// Static schematic for "What the money went to": two proportional bars, no
// motion. Colours are site tokens (fill-accent / fill-on-accent / fill-line /
// fill-muted), so it flips with the theme. Drawn at 340 units wide and scaled,
// so 12px labels stay legible down to 340px.
const TOTAL = 340;
const CACHE_READ = 0.879;
const BASE_REPEAT = 0.6;

export default function InputBars() {
  const readW = TOTAL * CACHE_READ;
  const baseW = TOTAL * BASE_REPEAT;

  return (
    <figure className="mt-7">
      <svg
        viewBox="0 0 340 96"
        role="img"
        aria-labelledby="input-bars-title input-bars-desc"
        className="w-full h-auto max-w-[340px]"
        fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
        fontSize={12}
      >
        <title id="input-bars-title">Where the input went</title>
        <desc id="input-bars-desc">
          87.9 percent of all input was a cache read. 60 percent of all input was the same 32.5K base, sent again on
          every call.
        </desc>

        <text x={0} y={12} className="fill-muted">
          all input
        </text>
        <rect x={0} y={20} width={TOTAL} height={18} rx={3} className="fill-line" />
        <rect x={0} y={20} width={readW} height={18} rx={3} className="fill-accent" />
        <text x={8} y={33} className="fill-on-accent">
          87.9% cache read
        </text>

        <text x={0} y={62} className="fill-muted">
          the same 32.5K base, re-read
        </text>
        <rect x={0} y={70} width={TOTAL} height={18} rx={3} className="fill-line" />
        <rect x={0} y={70} width={baseW} height={18} rx={3} className="fill-accent" />
        <text x={8} y={83} className="fill-on-accent">
          60% of all input
        </text>
      </svg>
      <figcaption className="mt-3 text-[16px] leading-relaxed text-muted">
        87.9 percent of all input was a cache read. 60 percent of all input was the same 32.5K base, sent again on
        every call.
      </figcaption>
    </figure>
  );
}