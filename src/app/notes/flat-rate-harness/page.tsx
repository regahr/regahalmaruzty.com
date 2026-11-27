import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { articles, profile, type ArticleBlock, type ArticleChartId, type ArticleDatum } from "@/content/site";
import { FilmCell } from "../../components/ArticleFilmStrip";
import {
  BatchingLadder,
  BaseReread,
  CacheShare,
  CallsPerMessage,
  DelegationProbes,
  FilmAttempts,
  FilmTargets,
  FloorSplit,
  PermissionCover,
  PluginCost,
  QuotaBurn,
  TheNight,
} from "../../components/ArticleCharts";

const SLUG = "flat-rate-harness";
const a = articles[SLUG];

export function generateMetadata(): Metadata {
  if (!a) return {};
  const title = `${a.title} · ${profile.name}`;
  const url = `/notes/${SLUG}`;
  return {
    title,
    description: a.deck,
    alternates: { canonical: url },
    openGraph: { title, description: a.deck, url, siteName: profile.name, type: "article", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description: a.deck },
  };
}

// One caption line per chart: a label, not a second sentence of the paragraph.
const CHARTS: Record<ArticleChartId, { caption: string; chart: ReactNode }> = {
  "cache-share": { caption: "share of input that was a cache read · one 104-call window", chart: <CacheShare /> },
  "base-reread": { caption: "share of all input that was one base, re-read", chart: <BaseReread /> },
  "permission-cover": { caption: "attempt 1 · what exists, and what was never measured", chart: <PermissionCover /> },
  "calls-per-message": { caption: "mean calls per message, before and after batching · after is n=2", chart: <CallsPerMessage /> },
  "batching-ladder": { caption: "input saved per batching rule, replayed · 44% is a ceiling", chart: <BatchingLadder /> },
  "floor-split": { caption: "one median call, split where it was measured", chart: <FloorSplit /> },
  "plugin-cost": { caption: "median tokens per call, four runs", chart: <PluginCost /> },
  "delegation-probes": { caption: "probe input, before and after delegation", chart: <DelegationProbes /> },
  "film-targets": { caption: "film 3 true peak and loudness range against target", chart: <FilmTargets /> },
  "film-attempts": { caption: "three films, all failed · tokens where measured", chart: <FilmAttempts /> },
  "quota-burn": { caption: "films and this article against the 1B monthly plan", chart: <QuotaBurn /> },
  "the-night": { caption: "prompts per hour, 19:02 Nov 26 to 08:04 Nov 27 (WIB)", chart: <TheNight /> },
};

// A chart fills the reading column and keeps its own mono caption. Static: no
// motion, nothing to press.
function ChartFigure({ id }: { id: ArticleChartId }) {
  const { caption, chart } = CHARTS[id];
  return (
    <figure className="mt-8 mb-8">
      <div className="max-w-[560px]">{chart}</div>
      <figcaption className="mt-3 font-mono text-[11px] leading-snug text-muted">{caption}</figcaption>
    </figure>
  );
}

const body = "max-w-[68ch] text-[17px] leading-relaxed";

function Paras({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i} className={`${body}${i === 0 ? "" : " mt-4"}`}>
          {p}
        </p>
      ))}
    </>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 mb-3 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{children}</h3>;
}

// "not measured" is never a grey fill: a dashed outline with the words.
function Value({ v, dim }: { v: string; dim?: boolean }) {
  if (v === "not measured" || v === "not split") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded border border-dashed border-muted font-mono text-[12px] text-muted">
        {v}
      </span>
    );
  }
  return <span className={`font-mono text-[20px] leading-tight font-medium ${dim ? "text-muted" : "text-fg"}`}>{v}</span>;
}

function DataStrip({ data }: { data: ArticleDatum[] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
      {data.map((d) => (
        <div key={d.label} className="bg-surface px-4 py-4 flex flex-col gap-2">
          <dt className="font-mono text-[11px] leading-snug text-muted">{d.label}</dt>
          <dd className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {d.before && (
              <>
                <Value v={d.before} dim />
                <span aria-label="to" className="font-mono text-muted">
                  →
                </span>
              </>
            )}
            <Value v={d.after} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Block({ b }: { b: ArticleBlock }) {
  const film = b.film !== undefined ? a!.filmMedia[b.film] : undefined;
  return (
    <section id={b.id} aria-labelledby={`${b.id}-h`} className="mt-16 scroll-mt-20">
      <p className="font-mono text-[13px] text-accent">{b.tag}</p>
      <h2 id={`${b.id}-h`} className="mt-1 text-[24px] md:text-[28px] leading-tight font-semibold tracking-tight">
        {b.heading}
      </h2>
      {b.note && <p className="mt-3 max-w-[68ch] text-[15px] italic text-muted">{b.note}</p>}

      <Label>What I changed</Label>
      <Paras items={b.changed} />

      <Label>Data</Label>
      <DataStrip data={b.data} />

      <Label>{film ? "Film" : "Chart"}</Label>
      {film ? (
        <div className="max-w-[340px]">
          <FilmCell film={film} />
        </div>
      ) : (
        b.charts?.map((id) => <ChartFigure key={id} id={id} />)
      )}

      <Label>Effect</Label>
      <Paras items={b.effect} />
      {b.effectCharts?.map((id) => <ChartFigure key={id} id={id} />)}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
        <div className="bg-surface p-5">
          <h3 className="font-mono text-[12px] text-accent mb-2">worked</h3>
          <ul className="grid gap-1.5 text-[15px] leading-relaxed">
            {b.worked.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <div className="bg-surface p-5">
          <h3 className="font-mono text-[12px] text-muted mb-2">did not</h3>
          <ul className="grid gap-1.5 text-[15px] leading-relaxed">
            {b.didNot.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PartRule({ label }: { label: string }) {
  return (
    <div className="mt-20 border-t-2 border-fg pt-4">
      <p className="font-mono text-[13px] text-fg">{label}</p>
    </div>
  );
}

export default function FlatRateHarnessNote() {
  if (!a) notFound();
  const rail = [...a.attempts, ...a.films];
  const catchBefore = a.catchSection.paragraphs.slice(0, 3);
  const catchAfter = a.catchSection.paragraphs.slice(3);

  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-line bg-bg/85 backdrop-blur">
        <div className="max-w-page mx-auto px-6 h-[60px] flex items-center justify-between font-mono text-sm">
          <a href="/" className="inline-flex items-center min-h-[44px]">
            <span className="text-accent">~/</span>rega
          </a>
          <a href="/" className="inline-flex items-center min-h-[44px] text-muted hover:text-fg transition-colors">
            &larr; home
          </a>
        </div>
      </nav>

      <main className="max-w-page mx-auto px-6 pt-14 md:pt-20 pb-16">
        <article className="max-w-[720px]">
          <p className="font-mono text-[13px] text-accent mb-3">{"// "}note · nov 2026 · 13 min read</p>
          <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-tight">{a.title}</h1>

          {/* Progress rail: 7 jump links, then the verdict. Wraps on phones, never scrolls the page sideways. */}
          <nav aria-label="Attempts and films" className="mt-8">
            <ol className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {rail.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#${b.id}`}
                    className="flex flex-col justify-center min-h-[52px] h-full px-2.5 py-2 rounded-lg border border-line bg-surface hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                  >
                    <span className="font-mono text-[11px] text-muted">{b.tag.replace(/ \/ \d$/, "")}</span>
                    <span className="font-mono text-[12px] leading-tight text-fg">{b.outcome}</span>
                  </a>
                </li>
              ))}
            </ol>
            <a
              href="#verdict"
              className="mt-2 inline-flex items-center min-h-[44px] font-mono text-[13px] text-accent hover:underline"
            >
              then the verdict &darr;
            </a>
          </nav>

          <div className="mt-8">
            <p className="max-w-[68ch] text-[20px] sm:text-[22px] leading-snug font-medium text-fg">{a.opener[0]}</p>
            {a.opener.slice(1).map((p) => (
              <p key={p} className={`${body} mt-5`}>
                {p}
              </p>
            ))}
          </div>

          <section aria-labelledby="catch-h" className="mt-14">
            <h2 id="catch-h" className="mb-4 text-xl font-semibold">
              {a.catchSection.heading}
            </h2>
            <Paras items={catchBefore} />
            {a.catchSection.charts.map((id) => (
              <ChartFigure key={id} id={id} />
            ))}
            <Paras items={catchAfter} />
          </section>

          <PartRule label={a.part1} />
          {a.attempts.map((b) => (
            <Block key={b.id} b={b} />
          ))}

          <PartRule label={a.part2} />
          <div className="mt-6">
            <Paras items={a.filmsIntro} />
          </div>
          {a.films.map((b) => (
            <Block key={b.id} b={b} />
          ))}

          <section aria-labelledby="bill-h" className="mt-16">
            <h2 id="bill-h" className="mb-4 text-xl font-semibold">
              {a.bill.heading}
            </h2>
            <Paras items={a.bill.paragraphs} />
            {a.bill.charts.map((id) => (
              <ChartFigure key={id} id={id} />
            ))}
            <p className="mt-6 text-[24px] md:text-[28px] font-semibold tracking-tight">{a.bill.pull}</p>
          </section>

          {/* The night: a quiet band. Chart first, then a few lines. No data strip, no box. */}
          <section
            aria-labelledby="night-h"
            className="mt-16 -mx-6 px-6 py-10 sm:mx-0 sm:px-8 sm:rounded-xl bg-surface border-y sm:border border-line"
          >
            <h2 id="night-h" className="mb-2 text-xl font-semibold">
              {a.night.heading}
            </h2>
            <ChartFigure id={a.night.chart} />
            <div className="text-muted">
              <Paras items={a.night.paragraphs} />
            </div>
          </section>

          <section id="verdict" aria-labelledby="verdict-h" className="mt-16 scroll-mt-20">
            <h2 id="verdict-h" className="text-[24px] md:text-[28px] leading-tight font-semibold tracking-tight">
              {a.verdict.heading}
            </h2>
            <p className="mt-5 max-w-[68ch] text-[19px] leading-snug font-medium">
              The judgement, and it is a judgement. {a.verdict.thesis}
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
              <div className="bg-surface p-5">
                <h3 className="font-mono text-[12px] text-accent mb-2">still the champion for</h3>
                <ul className="grid gap-1.5 text-[15px] leading-relaxed list-disc pl-5 marker:text-muted">
                  {a.verdict.championFor.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface p-5">
                <h3 className="font-mono text-[12px] text-muted mb-2">fails me for</h3>
                <ul className="grid gap-1.5 text-[15px] leading-relaxed list-disc pl-5 marker:text-muted">
                  {a.verdict.failsFor.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <Paras items={a.verdict.paragraphs} />
            </div>
            <p className="mt-8 font-mono text-[15px] text-accent">{a.verdict.rule}</p>
          </section>
        </article>
      </main>

      <footer className="border-t border-line pt-10 pb-14 font-mono text-[13px] text-muted">
        <div className="max-w-page mx-auto px-6 flex flex-wrap justify-between gap-4">
          <span>
            {profile.email} · {profile.location}
          </span>
          <a href="/" className="hover:text-accent">
            regahalmaruzty.com
          </a>
        </div>
      </footer>
    </>
  );
}
