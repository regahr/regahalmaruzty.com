import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { articles, profile, type ArticleChartId } from "@/content/site";
import Reveal from "../../components/Reveal";
import ArticleFilmStrip from "../../components/ArticleFilmStrip";
import {
  BatchingLadder,
  BaseReread,
  CacheShare,
  CallsPerMessage,
  DelegationProbes,
  FilmTargets,
  FilmTokens,
  NotMeasured,
  PluginCost,
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
  "cache-share": { caption: "share of all input that was a cache read", chart: <CacheShare /> },
  "base-reread": { caption: "share of all input that was one base, re-read", chart: <BaseReread /> },
  "calls-per-message": { caption: "median calls per message, before and after batching", chart: <CallsPerMessage /> },
  "batching-ladder": { caption: "input saved per batching rule · 44% is a ceiling", chart: <BatchingLadder /> },
  "not-measured": { caption: "attempt 1 · no reading before, no reading after", chart: <NotMeasured /> },
  "plugin-cost": { caption: "median tokens per call, four runs", chart: <PluginCost /> },
  "delegation-probes": { caption: "probe input, before and after", chart: <DelegationProbes /> },
  "the-night": { caption: "messages per hour, 19:00 Nov 26 to 08:59 Nov 27", chart: <TheNight /> },
  "film-tokens": { caption: "tokens in the two film windows, cache included", chart: <FilmTokens /> },
  "film-targets": { caption: "v3 true peak and loudness range against target", chart: <FilmTargets /> },
};

// A chart fills the reading column, wider than the 68ch body text, and keeps
// its own mono caption. Static: no motion, nothing to press.
function ChartFigure({ id }: { id: ArticleChartId }) {
  const { caption, chart } = CHARTS[id];
  return (
    <figure className="mt-10 mb-10">
      {chart}
      <figcaption className="mt-3 font-mono text-[11px] leading-snug text-muted">{caption}</figcaption>
    </figure>
  );
}

export default function FlatRateHarnessNote() {
  if (!a) notFound();

  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-line bg-bg/85 backdrop-blur">
        <div className="max-w-page mx-auto px-6 h-[60px] flex items-center justify-between font-mono text-sm">
          <a href="/">
            <span className="text-accent">~/</span>rega
          </a>
          <a href="/" className="inline-flex items-center min-h-[44px] text-muted hover:text-fg transition-colors">
            &larr; home
          </a>
        </div>
      </nav>

      <main className="max-w-page mx-auto px-6 pt-14 md:pt-20 pb-16">
        <article className="max-w-[720px]">
          <p className="font-mono text-[13px] text-accent mb-3">{"// "}note · flat rate harness</p>
          <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-tight">{a.title}</h1>
          <p className="mt-7 max-w-[68ch] text-[21px] sm:text-[24px] leading-snug font-medium text-fg">{a.deck}</p>

          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mt-12 mb-4 text-xl font-semibold">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <div key={i}>
                  <p className={`max-w-[68ch] text-[17px] leading-relaxed${i === 0 ? "" : " mt-4"}`}>{p}</p>
                  {s.media === "films" && i === s.mediaAfter && (
                    <Reveal className="mt-7">
                      <ArticleFilmStrip films={a.films} />
                    </Reveal>
                  )}
                  {s.charts
                    ?.filter((c) => c.after === i)
                    .map((c) => <ChartFigure key={c.id} id={c.id} />)}
                </div>
              ))}
            </section>
          ))}
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