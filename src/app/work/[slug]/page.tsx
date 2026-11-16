import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, profile, siteUrl } from "@/content/site";
import { TrackedLink } from "../../components/Track";

// One static page per case study, so each has its own URL to share and index.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Search results cut long descriptions; lead with the result and stop at a word.
const clip = (text: string, max: number) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "")}…`;
};

const find = (slug: string) => caseStudies.find((c) => c.slug === slug);

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = find(params.slug);
  if (!c) return {};
  const title = `${c.title} · ${profile.name}`;
  const description = clip(`${c.result} ${c.problem}`, 160);
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
          <div className="flex items-center gap-5 text-[13px]">
            <a href="/#work" className="inline-flex items-center min-h-[44px] text-muted hover:text-fg transition-colors">
              &larr; <span className="hidden sm:inline">&nbsp;all case studies</span><span className="sm:hidden">&nbsp;work</span>
            </a>
            <TrackedLink kind="email" from={`case-${c.slug}-nav`} href={`mailto:${profile.email}`} className="inline-flex items-center min-h-[44px] text-accent hover:underline underline-offset-4">
              email me
            </TrackedLink>
          </div>
        </div>
      </nav>

      <main className="max-w-page mx-auto px-6 pt-14 md:pt-20 pb-16">
        <article className="max-w-[720px]">
          <p className="font-mono text-[13px] text-accent mb-3">
            {"// "}case study {String(i + 1).padStart(2, "0")}/{String(caseStudies.length).padStart(2, "0")} · {c.meta}
          </p>
          <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-tight">{c.title}</h1>
          {/* The result leads: a hiring manager arriving from a link sees the outcome first. */}
          <div className="mt-7 border-l-2 border-accent pl-4 sm:pl-5">
            <p className="font-mono text-xs text-accent mb-1.5">result</p>
            <p className="text-[21px] sm:text-[24px] leading-snug font-medium text-fg">{c.result}</p>
          </div>
          <dl className="mt-10 grid gap-6 text-[17px] leading-relaxed">
            <div>
              <dt className="font-mono text-xs text-accent mb-1">problem</dt>
              <dd>{c.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-accent mb-1">approach</dt>
              <dd>{c.approach}</dd>
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
            <TrackedLink kind="email" from={`case-${c.slug}`} href={`mailto:${profile.email}`} className={`${btn} bg-accent text-on-accent border-accent font-medium hover:brightness-110`}>
              Talk about this work
            </TrackedLink>
            <TrackedLink kind="cv" from={`case-${c.slug}`} href={profile.cv} download className={`${btn} border-line hover:border-muted`}>
              Download CV
            </TrackedLink>
          </div>
        </article>

        <nav aria-label="More case studies" className="mt-16 pt-8 border-t border-line grid sm:grid-cols-2 gap-4 font-mono text-sm">
          <a href={`/work/${prev.slug}`} className="group transition-opacity duration-150 active:opacity-70">
            <span className="block text-xs text-muted mb-1">&larr; previous</span>
            <span className="group-hover:text-accent transition-colors">{prev.title}</span>
          </a>
          <a href={`/work/${next.slug}`} className="group transition-opacity duration-150 active:opacity-70 sm:text-right">
            <span className="block text-xs text-muted mb-1">next &rarr;</span>
            <span className="group-hover:text-accent transition-colors">{next.title}</span>
          </a>
        </nav>
      </main>

      <footer className="border-t border-line pt-10 pb-14 font-mono text-[13px] text-muted">
        <div className="max-w-page mx-auto px-6 flex flex-wrap justify-between gap-4">
          <span>
            <TrackedLink kind="email" from={`case-${c.slug}-footer`} href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </TrackedLink>{" "}
            · {profile.location}
          </span>
          <a href="/" className="hover:text-accent">
            regahalmaruzty.com
          </a>
        </div>
        <p className="max-w-page mx-auto px-6 mt-4 text-[12px] text-muted">
          No cookies. Anonymous page counts via Vercel Analytics.
        </p>
      </footer>
    </>
  );
}
