// Static charts for the flat-rate-harness note. Every chart is a still SVG:
// no motion, no transition, no hover state. Colours are site tokens only, so
// each chart flips with the theme: --line for rules, tracks and frames,
// --muted for the secondary series and its labels, --fg for value labels,
// --accent for the one highlighted series (never more than one per chart).
// Drawn at 340 units wide and scaled down, so 9-10px labels stay legible at
// 340 CSS px. Same register as InputBars: flat rects, hairline rules, mono
// numerals, no shadows, no gradients, no legend box.
import type { ReactNode } from "react";

const W = 340;

type FrameProps = {
  id: string;
  title: string;
  desc: string;
  height: number;
  children: ReactNode;
};

// Shared frame: one still SVG, a title and a desc that carry the numbers so a
// screen reader gets the data without the picture. The caller wraps it in a
// <figure> and supplies the mono caption line.
export function ChartFrame({ id, title, desc, height, children }: FrameProps) {
  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className="w-full h-auto"
      fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
      fontSize={10}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{desc}</desc>
      {children}
    </svg>
  );
}

// 1. CacheShare: one bar split at the real share of input.
export function CacheShare() {
  const cacheW = W * 0.879;
  const restMid = (cacheW + W) / 2;
  return (
    <ChartFrame
      id="chart-cache-share"
      title="Share of all input that was a cache read"
      desc="All input split in two parts. 87.9 percent was a cache read. 12.1 percent was the rest."
      height={64}
    >
      <defs>
        <clipPath id="chart-cache-share-bar">
          <rect x={0} y={16} width={W} height={18} rx={3} />
        </clipPath>
      </defs>
      <text x={0} y={10} className="fill-muted">
        all input
      </text>
      <g clipPath="url(#chart-cache-share-bar)">
        <rect x={0} y={16} width={cacheW} height={18} className="fill-accent" />
        <rect x={cacheW} y={16} width={W - cacheW} height={18} className="fill-muted" />
      </g>
      <text x={8} y={29} className="fill-on-accent">
        87.9% cache read
      </text>
      <line x1={restMid} y1={34} x2={restMid} y2={42} stroke="var(--line)" strokeWidth={1} />
      <text x={W} y={54} textAnchor="end" className="fill-muted">
        12.1% the rest
      </text>
    </ChartFrame>
  );
}

// 2. BaseReread: one bar split at the share of one repeated base.
export function BaseReread() {
  const baseW = W * 0.6;
  const restMid = (baseW + W) / 2;
  return (
    <ChartFrame
      id="chart-base-reread"
      title="Share of all input that was one base re-read"
      desc="All input split in two parts. 60 percent was the same 32.5K base re-read on every call. 40 percent was everything else."
      height={64}
    >
      <defs>
        <clipPath id="chart-base-reread-bar">
          <rect x={0} y={16} width={W} height={18} rx={3} />
        </clipPath>
      </defs>
      <text x={0} y={10} className="fill-muted">
        all input
      </text>
      <g clipPath="url(#chart-base-reread-bar)">
        <rect x={0} y={16} width={baseW} height={18} className="fill-accent" />
        <rect x={baseW} y={16} width={W - baseW} height={18} className="fill-muted" />
      </g>
      <text x={8} y={29} className="fill-on-accent">
        60% the same 32.5K base
      </text>
      <line x1={restMid} y1={34} x2={restMid} y2={42} stroke="var(--line)" strokeWidth={1} />
      <text x={restMid} y={54} textAnchor="middle" className="fill-muted">
        40% the rest
      </text>
    </ChartFrame>
  );
}

// 3. CallsPerMessage: two bars on a shared zero. Values sit above the bars;
// the axis label says what is being counted.
export function CallsPerMessage() {
  const base = 118;
  const top = 26;
  const scale = (base - top) / 13;
  const before = 13 * scale;
  const after = 9.5 * scale;
  return (
    <ChartFrame
      id="chart-calls-per-message"
      title="Median calls per message before and after batching"
      desc="Median calls per message was 13 before batching and 9.5 after."
      height={156}
    >
      <line x1={0} y1={base} x2={W} y2={base} stroke="var(--line)" strokeWidth={1} />
      <rect x={72} y={base - before} width={56} height={before} rx={3} className="fill-muted" />
      <rect x={212} y={base - after} width={56} height={after} rx={3} className="fill-accent" />
      <text x={100} y={base - before - 6} textAnchor="middle" className="fill-fg">
        13
      </text>
      <text x={240} y={base - after - 6} textAnchor="middle" className="fill-fg">
        9.5
      </text>
      <text x={100} y={132} textAnchor="middle" className="fill-muted" fontSize={9}>
        before batching
      </text>
      <text x={240} y={132} textAnchor="middle" className="fill-muted" fontSize={9}>
        after
      </text>
      <text x={0} y={148} className="fill-muted" fontSize={9}>
        median calls per message
      </text>
    </ChartFrame>
  );
}

// 4. BatchingLadder: four rules replayed. The fourth is a ceiling, so it is
// outlined and hatched rather than filled, never sold as the plan.
export function BatchingLadder() {
  const plotW = 240;
  const unit = plotW / 44;
  const rows = [
    { label: "2 reads per call", value: 23 },
    { label: "3 reads per call", value: 30 },
    { label: "5 reads per call", value: 36 },
    { label: "every read", value: 44 },
  ];
  return (
    <ChartFrame
      id="chart-batching-ladder"
      title="Share of input saved by each batching rule"
      desc="Share of input saved by batching: 2 reads per call 23 percent, 3 reads per call 30 percent, 5 reads per call 36 percent, every read 44 percent. The 44 percent is a ceiling, not a plan."
      height={156}
    >
      {rows.map((r, i) => {
        const t = 10 + i * 34;
        const barY = t + 5;
        const barW = r.value * unit;
        const ceiling = r.value === 44;
        return (
          <g key={r.label}>
            <text x={0} y={t} className="fill-muted" fontSize={9}>
              {r.label}
            </text>
            {ceiling ? (
              <>
                <rect
                  x={0}
                  y={barY}
                  width={barW}
                  height={14}
                  rx={3}
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth={1}
                />
                {Array.from({ length: Math.floor((barW - 4) / 6) }, (_, k) => (
                  <line
                    key={k}
                    x1={6 + k * 6}
                    y1={barY + 2}
                    x2={6 + k * 6}
                    y2={barY + 12}
                    stroke="var(--fg)"
                    strokeWidth={1}
                  />
                ))}
              </>
            ) : (
              <rect x={0} y={barY} width={barW} height={14} rx={3} className="fill-muted" />
            )}
            <text x={barW + 6} y={barY + 11} className="fill-fg" fontSize={9}>
              {r.value}%
            </text>
            {ceiling && (
              <text x={barW + 34} y={barY + 11} className="fill-muted" fontSize={9}>
                ceiling
              </text>
            )}
          </g>
        );
      })}
      <text x={0} y={148} className="fill-muted" fontSize={9}>
        percent of input saved
      </text>
    </ChartFrame>
  );
}

// 5. NotMeasured: attempt 1 has no before and no after. An empty framed box
// with a zero rule and two "not taken" ticks, so the blank looks deliberate.
export function NotMeasured() {
  return (
    <ChartFrame
      id="chart-not-measured"
      title="Attempt 1 was not measured"
      desc="Attempt 1 has no measurement before or after. Before: not taken. After: not taken. Both readings are zero because they do not exist."
      height={104}
    >
      <text x={0} y={10} className="fill-muted" fontSize={9}>
        attempt 1
      </text>
      <rect x={0} y={16} width={W} height={80} rx={3} fill="none" stroke="var(--line)" strokeWidth={1} />
      <text x={170} y={54} textAnchor="middle" className="fill-muted">
        no measurement before or after
      </text>
      <line x1={8} y1={78} x2={332} y2={78} stroke="var(--line)" strokeWidth={1} />
      <line x1={95} y1={78} x2={95} y2={70} stroke="var(--muted)" strokeWidth={1} />
      <line x1={245} y1={78} x2={245} y2={70} stroke="var(--muted)" strokeWidth={1} />
      <text x={95} y={90} textAnchor="middle" className="fill-muted" fontSize={9}>
        before: not taken
      </text>
      <text x={245} y={90} textAnchor="middle" className="fill-muted" fontSize={9}>
        after: not taken
      </text>
    </ChartFrame>
  );
}

// 6. PluginCost: the plugin measurement on one token axis. Bare mode is short
// and stays short. No accent: this is a plain measurement, and bare mode was
// rejected, so nothing here should read as the recommendation.
export function PluginCost() {
  const plotW = 210;
  const max = 22381;
  const px = (v: number) => (v / max) * plotW;
  const rows = [
    { label: "plugins on", value: "22,381", width: px(22381), note: "" },
    { label: "plugins off", value: "19,998", width: px(19998), note: "" },
    { label: "bare mode", value: "1,234", width: px(1234), note: "rejected" },
  ];
  return (
    <ChartFrame
      id="chart-plugin-cost"
      title="Input cost of the plugin and bare mode"
      desc="Input tokens in thousands. Plugins on 22,381. Plugins off 19,998. Bare mode 1,234, which was rejected."
      height={152}
    >
      {rows.map((r, i) => {
        const t = 10 + i * 36;
        const barY = t + 5;
        return (
          <g key={r.label}>
            <text x={0} y={t} className="fill-muted" fontSize={9}>
              {r.label}
            </text>
            <rect x={0} y={barY} width={r.width} height={14} rx={3} className="fill-muted" />
            <text x={r.width + 6} y={barY + 11} className="fill-fg" fontSize={9}>
              {r.value}
            </text>
            {r.note && (
              <text x={r.width + 40} y={barY + 11} className="fill-muted" fontSize={9}>
                {r.note}
              </text>
            )}
          </g>
        );
      })}
      <line x1={0} y1={110} x2={plotW} y2={110} stroke="var(--line)" strokeWidth={1} />
      {(
        [
          { x: 0, label: "0", anchor: "start" },
          { x: px(10000), label: "10", anchor: "middle" },
          { x: plotW, label: "20", anchor: "end" },
        ] as const
      ).map((t) => (
        <g key={t.label}>
          <line x1={t.x} y1={110} x2={t.x} y2={115} stroke="var(--line)" strokeWidth={1} />
          <text x={t.x} y={126} textAnchor={t.anchor} className="fill-muted" fontSize={9}>
            {t.label}
          </text>
        </g>
      ))}
      <text x={0} y={142} className="fill-muted" fontSize={9}>
        thousands of tokens
      </text>
    </ChartFrame>
  );
}

// 7. DelegationProbes: two pairs. Before is muted, after is the one accent.
// The smaller values keep all three decimals so no number is rounded.
export function DelegationProbes() {
  const base = 142;
  const perMillion = 100 / 1.51;
  const groups = [
    {
      name: "probe one",
      centre: 82,
      before: { value: 1.19, label: "1.19M" },
      after: { value: 0.358, label: "0.358M" },
    },
    {
      name: "probe two",
      centre: 254,
      before: { value: 1.51, label: "1.51M" },
      after: { value: 0.456, label: "0.456M" },
    },
  ];
  return (
    <ChartFrame
      id="chart-delegation-probes"
      title="Input tokens before and after delegation, two probes"
      desc="Probe one input fell from 1.19 million tokens to 358 thousand. Probe two fell from 1.51 million tokens to 456 thousand."
      height={164}
    >
      {[1.0, 1.5].map((v) => {
        const y = base - v * perMillion;
        return (
          <g key={v}>
            <line x1={24} y1={y} x2={336} y2={y} stroke="var(--line)" strokeWidth={1} />
            <text x={0} y={y + 3} className="fill-muted" fontSize={9}>
              {v.toFixed(1)}
            </text>
          </g>
        );
      })}
      <line x1={24} y1={base} x2={336} y2={base} stroke="var(--line)" strokeWidth={1} />
      <text x={0} y={base + 3} className="fill-muted" fontSize={9}>
        0
      </text>
      {groups.map((g) => {
        const beforeH = g.before.value * perMillion;
        const afterH = g.after.value * perMillion;
        return (
          <g key={g.name}>
            <text x={g.centre} y={12} textAnchor="middle" className="fill-muted" fontSize={9}>
              {g.name}
            </text>
            <rect
              x={g.centre - 48}
              y={base - beforeH}
              width={44}
              height={beforeH}
              rx={3}
              className="fill-muted"
            />
            <rect
              x={g.centre + 4}
              y={base - afterH}
              width={44}
              height={afterH}
              rx={3}
              className="fill-accent"
            />
            <text
              x={g.centre - 26}
              y={base - beforeH - 5}
              textAnchor="middle"
              className="fill-fg"
              fontSize={9}
            >
              {g.before.label}
            </text>
            <text
              x={g.centre + 26}
              y={base - afterH - 5}
              textAnchor="middle"
              className="fill-fg"
              fontSize={9}
            >
              {g.after.label}
            </text>
          </g>
        );
      })}
      <text x={0} y={158} className="fill-muted" fontSize={9}>
        input tokens, millions
      </text>
    </ChartFrame>
  );
}

// 8. TheNight: messages per hour, 19:00 through 08:59. Zero hours keep a flat
// mark on the baseline so they read as measured zero, not as missing.
export function TheNight() {
  const base = 100;
  const scale = 80 / 13;
  const hours = [
    { h: "19", v: 9 },
    { h: "20", v: 3 },
    { h: "21", v: 4 },
    { h: "22", v: 2 },
    { h: "23", v: 1 },
    { h: "00", v: 5 },
    { h: "01", v: 13 },
    { h: "02", v: 3 },
    { h: "03", v: 7 },
    { h: "04", v: 4 },
    { h: "05", v: 0 },
    { h: "06", v: 0 },
    { h: "07", v: 2 },
    { h: "08", v: 11 },
  ];
  const slot = 312 / hours.length;
  const barW = 16;
  const xOf = (i: number) => 22 + i * slot + (slot - barW) / 2;
  const axisHours = [0, 4, 5, 9, 13];
  return (
    <ChartFrame
      id="chart-the-night"
      title="Messages per hour across the night"
      desc="Messages per hour through the night. 19h 9, 20h 3, 21h 4, 22h 2, 23h 1, 00h 5, 01h 13, 02h 3, 03h 7, 04h 4, 05h 0, 06h 0, 07h 2, 08h 11."
      height={138}
    >
      <line x1={22} y1={base} x2={334} y2={base} stroke="var(--line)" strokeWidth={1} />
      {hours.map((d, i) => {
        const x = xOf(i);
        const h = d.v * scale;
        if (d.v === 0) {
          return <rect key={d.h} x={x} y={base - 2} width={barW} height={2} className="fill-muted" />;
        }
        const accent = d.v === 13;
        return (
          <g key={d.h}>
            <rect
              x={x}
              y={base - h}
              width={barW}
              height={h}
              rx={3}
              className={accent ? "fill-accent" : "fill-muted"}
            />
            {accent && (
              <text x={x + barW / 2} y={base - h - 5} textAnchor="middle" className="fill-accent">
                13
              </text>
            )}
          </g>
        );
      })}
      {axisHours.map((i) => (
        <text
          key={hours[i].h}
          x={xOf(i) + barW / 2}
          y={116}
          textAnchor="middle"
          className="fill-muted"
          fontSize={9}
        >
          {hours[i].h}
        </text>
      ))}
      <text x={0} y={132} className="fill-muted" fontSize={9}>
        messages per hour
      </text>
    </ChartFrame>
  );
}

// 9. FilmTokens: the two film windows on one token axis, with the total stated.
export function FilmTokens() {
  const plotW = 220;
  const px = (v: number) => (v / 128586166) * plotW;
  return (
    <ChartFrame
      id="chart-film-tokens"
      title="Tokens used by the two film windows"
      desc="The two film windows used 128,586,166 and 60,208,130 tokens. 188,794,296 in total."
      height={150}
    >
      <text x={0} y={12} className="fill-muted" fontSize={9}>
        film window 1
      </text>
      <rect x={0} y={18} width={px(128586166)} height={16} rx={3} className="fill-muted" />
      <text x={px(128586166) + 6} y={29} className="fill-fg" fontSize={9}>
        128,586,166
      </text>
      <text x={0} y={58} className="fill-muted" fontSize={9}>
        film window 2
      </text>
      <rect x={0} y={64} width={px(60208130)} height={16} rx={3} className="fill-muted" />
      <text x={px(60208130) + 6} y={75} className="fill-fg" fontSize={9}>
        60,208,130
      </text>
      <line x1={0} y1={90} x2={plotW} y2={90} stroke="var(--line)" strokeWidth={1} />
      <text x={0} y={104} className="fill-fg">
        188,794,296 in total
      </text>
      <line x1={0} y1={114} x2={plotW} y2={114} stroke="var(--line)" strokeWidth={1} />
      {(
        [
          { x: 0, label: "0", anchor: "start" },
          { x: px(50000000), label: "50", anchor: "middle" },
          { x: px(100000000), label: "100", anchor: "middle" },
        ] as const
      ).map((t) => (
        <g key={t.label}>
          <line x1={t.x} y1={114} x2={t.x} y2={119} stroke="var(--line)" strokeWidth={1} />
          <text x={t.x} y={130} textAnchor={t.anchor} className="fill-muted" fontSize={9}>
            {t.label}
          </text>
        </g>
      ))}
      <text x={0} y={144} className="fill-muted" fontSize={9}>
        tokens, millions
      </text>
    </ChartFrame>
  );
}

// 10. FilmTargets: a gap chart, not a bar chart. Each short scale carries a
// target tick and a measured tick, so "close but not on target" is visible.
export function FilmTargets() {
  const start = 60;
  const end = 280;
  const at = (v: number, lo: number, hi: number) => start + ((v - lo) / (hi - lo)) * (end - start);
  // Each scale spans target plus or minus 20 percent of the target, so the two
  // gaps can be read against each other without one being exaggerated.
  const peakTarget = at(-2.0, -2.4, -1.6);
  const peakMeasured = at(-1.8, -2.4, -1.6);
  const lraTarget = at(7.0, 5.6, 8.4);
  const lraMeasured = at(6.4, 5.6, 8.4);
  return (
    <ChartFrame
      id="chart-film-targets"
      title="v3 true peak and loudness range against target"
      desc="True peak measured -1.8 dBFS against a target of -2.0 dBFS. Loudness range measured 6.4 LU against a target of 7 LU. Both are close to target and both are off it. Each scale spans the target plus or minus 20 percent."
      height={132}
    >
      <text x={0} y={10} className="fill-muted" fontSize={9}>
        true peak, dBFS · scale -2.4 to -1.6
      </text>
      <text x={peakTarget} y={26} textAnchor="middle" className="fill-muted" fontSize={9}>
        target -2.0
      </text>
      <line x1={start} y1={36} x2={end} y2={36} stroke="var(--line)" strokeWidth={1} />
      <line x1={peakTarget} y1={30} x2={peakTarget} y2={42} stroke="var(--muted)" strokeWidth={1} />
      <line x1={peakMeasured} y1={28} x2={peakMeasured} y2={44} stroke="var(--accent)" strokeWidth={2} />
      <text x={peakMeasured} y={56} textAnchor="middle" className="fill-accent" fontSize={9}>
        measured -1.8
      </text>

      <text x={0} y={78} className="fill-muted" fontSize={9}>
        loudness range, LU · scale 5.6 to 8.4
      </text>
      <text x={lraTarget} y={94} textAnchor="middle" className="fill-muted" fontSize={9}>
        target 7.0
      </text>
      <line x1={start} y1={104} x2={end} y2={104} stroke="var(--line)" strokeWidth={1} />
      <line x1={lraTarget} y1={98} x2={lraTarget} y2={110} stroke="var(--muted)" strokeWidth={1} />
      <line x1={lraMeasured} y1={96} x2={lraMeasured} y2={112} stroke="var(--accent)" strokeWidth={2} />
      <text x={lraMeasured} y={124} textAnchor="middle" className="fill-accent" fontSize={9}>
        measured 6.4
      </text>
    </ChartFrame>
  );
}