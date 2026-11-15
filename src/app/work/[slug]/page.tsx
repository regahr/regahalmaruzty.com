import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, profile, siteUrl } from "@/content/site";

// One static page per case study, so each has its own URL to share and index.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

const find = (slug: string) => caseStudies.find((c) => c.slug === slug);

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = find(params.slug);
  if (!c) return {};
  const title = `${c.title} · ${profile.name}`;
  const description = `${c.problem} ${c.result}`;
  const url = `/work/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: profile.name, type: "article", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const chip = "font-mono text-xs px-2 py-[3px] border border-line rounded-md text-muted";
const btn =
  "lift inline-flex items-center gap-2 min-h-[44px] px-[18px] rounded-lg font-mono text-sm border transition-[border-color,transform,filter] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-px active:scale-[0.97]";

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const i = caseStudies.findIndex((c) => c.slug === params.slug);
  if (i < 0) notFound();
  const c = caseStudies[i];
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const url = `${siteUrl}/work/${c.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.title,
      description: `${c.problem} ${c.result}`,
      url,
      mainEntityOfPage: url,
      image: `${url}/opengraph-image`,
      keywords: c.stack.join(", "),
      author: { "@type": "Person", name: profile.name, url: `${siteUrl}/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: profile.name, item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Case studies", item: `${siteUrl}/#work` },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav className="sticky top-0 z-10 border-b border-line bg-bg/85 backdrop-blur">
        <div className="max-w-page mx-auto px-6 h-[60px] flex items-center justify-between font-mono text-sm">
          <a href="/">
            <span className="text-accent">~/</span>rega
          </a>
          <a href="/#work" className="text-[13px] text-muted hover:text-fg transition-colors">
            &larr; all case studies
          </a>
        </div>
      </nav>

      <main className="max-w-page mx-auto px-6 pt-14 md:pt-20 pb-16">
        <article className="max-w-[720px]">
          <p className="font-mono text-[13px] text-accent mb-3">
            {"// "}case study {String(i + 1).padStart(2, "0")}/{String(caseStudies.length).padStart(2, "0")} · {c.meta}
          </p>
          <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-tight">{c.title}</h1>
          <dl className="mt-10 grid gap-6 text-[17px] leading-relaxed">
            <div>
              <dt className="font-mono text-xs text-accent mb-1">problem</dt>
              <dd>{c.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-accent mb-1">approach</dt>
              <dd>{c.approach}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-accent mb-1">result</dt>
              <dd>{c.result}</dd>
            </div>
          </dl>

          <h2 className="mt-12 mb-4 text-xl font-semibold">Key decisions</h2>
          <ul className="grid gap-3 text-[16px] leading-relaxed">
            {c.points.map((p) => (
              <li key={p} className="relative pl-6 text-muted">
                <span aria-hidden="true" className="absolute left-0 top-0 font-mono text-accent">
                  &gt;
                </span>
                {p}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 mb-4 text-xl font-semibold">Stack</h2>
          <div className="flex flex-wrap gap-1.5">
            {c.stack.map((s) => (
              <span key={s} className={chip}>
                {s}
              </span>
            ))}
          </div>

          {c.slug === "never-double-charge" && (
            <p className="mt-10 font-mono text-sm">
              <a href="/#how" className="text-accent hover:underline">
                see idempotency, locks and retries animated &rarr;
              </a>
            </p>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={`${btn} bg-accent text-on-accent border-accent font-medium hover:brightness-110`}>
              Talk about this work
            </a>
            <a href={profile.cv} download className={`${btn} border-line hover:border-muted`}>
              Download CV
            </a>
          </div>
        </article>

        <nav aria-label="More case studies" className="mt-16 pt-8 border-t border-line grid sm:grid-cols-2 gap-4 font-mono text-sm">
          <a href={`/work/${prev.slug}`} className="group">
            <span className="block text-xs text-muted mb-1">&larr; previous</span>
            <span className="group-hover:text-accent transition-colors">{prev.title}</span>
          </a>
          <a href={`/work/${next.slug}`} className="group sm:text-right">
            <span className="block text-xs text-muted mb-1">next &rarr;</span>
            <span className="group-hover:text-accent transition-colors">{next.title}</span>
          </a>
        </nav>
      </main>

      <footer className="border-t border-line pt-10 pb-14 font-mono text-[13px] text-muted">
        <div className="max-w-page mx-auto px-6 flex flex-wrap justify-between gap-4">
          <span>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </a>{" "}
            · {profile.location}
          </span>
          <a href="/" className="hover:text-accent">
            regahalmaruzty.com
          </a>
        </div>
      </footer>
    </>
  );
}
