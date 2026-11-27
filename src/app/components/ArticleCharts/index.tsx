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
      desc="All input in one 104-call window, split in two parts. 87.9 percent was a cache read. 12.1 percent was the rest."
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

// 3. CallsPerMessage: mean against mean, the only pair that exists. The
// after bar is a mean of 2 messages, so n=2 is printed on it. The baseline
// median sits as a dashed rule, because there is no median after.
export function CallsPerMessage() {
  const base = 118;
  const top = 22;
  const scale = (base - top) / 22.5;
  const before = 22.5 * scale;
  const after = 9.5 * scale;
  const medianY = base - 13 * scale;
  return (
    <ChartFrame
      id="chart-calls-per-message"
      title="Mean calls per message before and after batching"
      desc="Mean calls per message was 22.5 before batching and 9.5 after. The 9.5 is a mean of 2 messages, 19 calls, so n=2. The baseline median was 13."
      height={156}
    >
      <line x1={0} y1={base} x2={W} y2={base} stroke="var(--line)" strokeWidth={1} />
      <line x1={60} y1={medianY} x2={140} y2={medianY} stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 3" />
      <text x={W} y={148} textAnchor="end" className="fill-muted" fontSize={9}>
        - - - median before: 13
      </text>
      <rect x={72} y={base - before} width={56} height={before} rx={3} className="fill-muted" />
      <rect x={212} y={base - after} width={56} height={after} rx={3} className="fill-accent" />
      <text x={100} y={base - before - 6} textAnchor="middle" className="fill-fg">
        22.5
      </text>
      <text x={240} y={base - after - 6} textAnchor="middle" className="fill-fg">
        9.5 · n=2
      </text>
      <text x={100} y={132} textAnchor="middle" className="fill-muted" fontSize={9}>
        before batching
      </text>
      <text x={240} y={132} textAnchor="middle" className="fill-muted" fontSize={9}>
        after
      </text>
      <text x={0} y={148} className="fill-muted" fontSize={9}>
        mean calls per message
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

// 5. PermissionCover: attempt 1. Before: 4 judge timeouts in one day. After:
// 273 of 275 tool uses covered by the allow list.
export function PermissionCover() {
  const cover = (273 / 275) * W;
  return (
    <ChartFrame
      id="chart-permission-cover"
      title="Attempt 1: judge timeouts before, allow list cover after"
      desc="Before the change the auto mode judge timed out 4 times in one day. After the change the allow list for Bash, Read, Edit and Write covered 273 of 275 tool uses, 2 were left for approval."
      height={80}
    >
      <text x={0} y={10} className="fill-muted" fontSize={9}>
        judge timeouts in one day, before
      </text>
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={k * 22} y={16} width={16} height={16} rx={3} className="fill-muted" />
      ))}
      <text x={96} y={28} className="fill-fg" fontSize={9}>
        4
      </text>
      <text x={0} y={52} className="fill-muted" fontSize={9}>
        tool uses covered by the allow list, after
      </text>
      <rect x={0} y={58} width={W} height={16} rx={3} fill="none" stroke="var(--line)" strokeWidth={1} />
      <rect x={0} y={58} width={cover} height={16} rx={3} className="fill-accent" />
      <text x={8} y={70} className="fill-on-accent" fontSize={9}>
        273 / 275
      </text>
    </ChartFrame>
  );
}

// 5b. FloorSplit: attempt 3. One stacked bar of the median call: the plugins
// are the accent slice; the other 19,998 tokens are everything else.
export function FloorSplit() {
  const total = 22381;
  const plug = (2383 / total) * W;
  return (
    <ChartFrame
      id="chart-floor-split"
      title="Attempt 3: the plugin slice of one median call"
      desc="A median call carried 22,381 tokens with plugins on. 2,383 tokens were the plugins, 10.6 percent of that floor and 4.5 percent of the whole bill. The other 19,998 were everything else."
      height={78}
    >
      <text x={0} y={10} className="fill-muted" fontSize={9}>
        one median call, 22,381 tokens
      </text>
      <rect x={0} y={16} width={plug} height={20} rx={3} className="fill-accent" />
      <rect x={plug + 2.5} y={16.5} width={W - plug - 3} height={19} rx={3} fill="none" stroke="var(--muted)" strokeWidth={1} />
      <text x={(plug + W) / 2} y={30} textAnchor="middle" className="fill-muted" fontSize={9}>
        19,998 everything else
      </text>
      <text x={0} y={52} className="fill-fg" fontSize={9}>
        2,383 plugins
      </text>
      <text x={0} y={68} className="fill-muted" fontSize={9}>
        10.6% of the floor · 4.5% of the bill
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

// 7. DelegationProbes: two pairs. Before is muted, after is the one accent,
// and each bar says "before" or "after" in words, so colour is not the only signal.
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
      desc="Probe one input fell from 1.19 million tokens before delegation to 358 thousand after. Probe two fell from 1.51 million tokens before to 456 thousand after."
      height={180}
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
            <text x={g.centre - 26} y={base + 12} textAnchor="middle" className="fill-muted" fontSize={9}>
              before
            </text>
            <text x={g.centre + 26} y={base + 12} textAnchor="middle" className="fill-fg" fontSize={9}>
              after
            </text>
          </g>
        );
      })}
      <text x={0} y={174} className="fill-muted" fontSize={9}>
        input tokens, millions
      </text>
    </ChartFrame>
  );
}

// 8. TheNight: Rega's typed prompts per hour, 19:00 Nov 26 through 08:04
// Nov 27 WIB, recounted from the session logs (article/night-count.md). Zero
// hours keep a flat mark on the baseline so they read as measured zero. The
// silent stretch from 04:14 to 08:04 is bracketed and labelled.
export function TheNight() {
  const base = 100;
  const peak = 12;
  const scale = 72 / peak;
  const hours = [
    { h: "19", v: 2 },
    { h: "20", v: 1 },
    { h: "21", v: 11 },
    { h: "22", v: 7 },
    { h: "23", v: 12 },
    { h: "00", v: 10 },
    { h: "01", v: 8 },
    { h: "02", v: 3 },
    { h: "03", v: 2 },
    { h: "04", v: 1 },
    { h: "05", v: 0 },
    { h: "06", v: 0 },
    { h: "07", v: 0 },
    { h: "08", v: 1 },
  ];
  const slot = 312 / hours.length;
  const barW = 16;
  const xOf = (i: number) => 22 + i * slot + (slot - barW) / 2;
  const axisHours = [0, 4, 6, 9, 13];
  const gapX1 = xOf(9) + barW + (slot - barW) / 2;
  const gapX2 = xOf(13) - (slot - barW) / 2;
  return (
    <ChartFrame
      id="chart-the-night"
      title="Prompts per hour across the night"
      desc="Prompts Rega typed per hour, 19:02 Nov 26 to 08:04 Nov 27 WIB. 19h 2, 20h 1, 21h 11, 22h 7, 23h 12, 00h 10, 01h 8, 02h 3, 03h 2, 04h 1, 05h 0, 06h 0, 07h 0, 08h 1. 58 in total. No prompt between 04:14 and 08:04."
      height={152}
    >
      <line x1={22} y1={base} x2={334} y2={base} stroke="var(--line)" strokeWidth={1} />
      <line x1={gapX1} y1={16} x2={gapX1} y2={base - 6} stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 3" />
      <line x1={gapX2} y1={16} x2={gapX2} y2={base - 6} stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 3" />
      <text x={(gapX1 + gapX2) / 2} y={14} textAnchor="middle" className="fill-muted" fontSize={9}>
        04:14 → 08:04
      </text>
      <text x={(gapX1 + gapX2) / 2} y={26} textAnchor="middle" className="fill-muted" fontSize={9}>
        no prompt
      </text>
      {hours.map((d, i) => {
        const x = xOf(i);
        const h = d.v * scale;
        if (d.v === 0) {
          return <rect key={d.h} x={x} y={base - 2} width={barW} height={2} className="fill-muted" />;
        }
        const accent = d.v === peak;
        return (
          <g key={d.h}>
            <rect x={x} y={base - h} width={barW} height={h} rx={3} className={accent ? "fill-accent" : "fill-muted"} />
            <text x={x + barW / 2} y={base - h - 4} textAnchor="middle" className={accent ? "fill-accent" : "fill-fg"} fontSize={8}>
              {d.v}
            </text>
          </g>
        );
      })}
      {axisHours.map((i) => (
        <text key={hours[i].h} x={xOf(i) + barW / 2} y={116} textAnchor="middle" className="fill-muted" fontSize={9}>
          {hours[i].h}
        </text>
      ))}
      <text x={0} y={134} className="fill-muted" fontSize={9}>
        prompts per hour, WIB
      </text>
      <text x={0} y={147} className="fill-muted" fontSize={9}>
        58 prompts in total
      </text>
    </ChartFrame>
  );
}

// 9. FilmAttempts: three rows, one per film, each marked "failed" in words.
// Films 1 and 2 ran in one shared window, so their rows are a dashed bracket
// over the window total, not two invented bars.
export function FilmAttempts() {
  const plotW = 200;
  const px = (v: number) => (v / 128586166) * plotW;
  const shared = px(60208130);
  return (
    <ChartFrame
      id="chart-film-attempts"
      title="Three films, three failures, and their tokens"
      desc="Film 1 failed and film 2 failed; they ran in one shared window of 60,208,130 tokens. Film 3 failed and used 128,586,166 tokens. 188,794,296 tokens in total for the three films."
      height={170}
    >
      {["film 1", "film 2"].map((name, k) => {
        const t = 12 + k * 34;
        return (
          <g key={name}>
            <text x={0} y={t} className="fill-muted" fontSize={9}>
              {name}
            </text>
            <text x={W} y={t} textAnchor="end" className="fill-fg" fontSize={9}>
              failed
            </text>
            <rect x={0.5} y={t + 5.5} width={shared} height={13} rx={3} fill="none" stroke="var(--muted)" strokeWidth={1} strokeDasharray="4 3" />
            <text x={shared + 6} y={t + 15} className="fill-muted" fontSize={9}>
              shared
            </text>
          </g>
        );
      })}
      <text x={0} y={80} className="fill-muted" fontSize={9}>
        films 1 + 2 share one window: 60,208,130
      </text>
      <text x={0} y={98} className="fill-muted" fontSize={9}>
        film 3
      </text>
      <text x={W} y={98} textAnchor="end" className="fill-fg" fontSize={9}>
        failed
      </text>
      <rect x={0} y={103} width={px(128586166)} height={14} rx={3} className="fill-accent" />
      <text x={px(128586166) + 6} y={114} className="fill-fg" fontSize={9}>
        128,586,166
      </text>
      <line x1={0} y1={128} x2={W} y2={128} stroke="var(--line)" strokeWidth={1} />
      <text x={0} y={144} className="fill-fg">
        188,794,296 in total
      </text>
      <text x={0} y={162} className="fill-muted" fontSize={9}>
        tokens, cache included
      </text>
    </ChartFrame>
  );
}

// 9b. QuotaBurn: one 100% bar of the 1B monthly plan. Films are the one
// accent, the unused rest is a plain outline.
export function QuotaBurn() {
  const plan = 1_000_000_000;
  const films = (188794296 / plan) * W;
  return (
    <ChartFrame
      id="chart-quota-burn"
      title="Film tokens against the 1B monthly plan"
      desc="The monthly plan is 1,000,000,000 tokens. The three films used 188,794,296, 18.9 percent. Rega's own estimate was 150M out of 1B."
      height={90}
    >
      <text x={0} y={10} className="fill-muted" fontSize={9}>
        1B tokens a month
      </text>
      <rect x={0.5} y={16.5} width={W - 1} height={21} rx={3} fill="none" stroke="var(--line)" strokeWidth={1} />
      <rect x={0} y={16} width={films} height={22} rx={3} className="fill-accent" />
      <text x={0} y={54} className="fill-fg" fontSize={9}>
        films 188.8M · 18.9%
      </text>
      <text x={W} y={54} textAnchor="end" className="fill-muted" fontSize={9}>
        rest of the month
      </text>
      <text x={0} y={78} className="fill-muted" fontSize={9}>
        I said &quot;150M out of 1B&quot;
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