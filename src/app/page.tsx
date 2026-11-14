import type { ReactNode } from "react";
import TypingAnimation from "./components/TypingAnimation";
import CodePuzzle from "./components/CodePuzzle";
import Reveal from "./components/Reveal";
import ChickPen from "./components/three/ChickPen";
import ConceptShowcase from "./components/three/ConceptShowcase";
import {
  about,
  caseStudies,
  earlyCareer,
  experience,
  moreProjects,
  profile,
  projects,
  skills,
  stats,
  siteUrl,
} from "@/content/site";

// Person structured data: helps search engines tie the site, GitHub and LinkedIn to one person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: `${siteUrl}/`,
  jobTitle: profile.title,
  description:
    "Senior Backend Engineer with 9+ years in fintech, banking, healthcare and enterprise systems.",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Padjadjaran University" },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "MongoDB Certified DBA Associate (C100DBA)" },
    { "@type": "EducationalOccupationalCredential", name: "MongoDB Certified Developer Associate (C100DEV)" },
  ],
  knowsAbout: ["Backend engineering", "Node.js", "TypeScript", "PostgreSQL", "Distributed systems", "Payments", "AI-assisted software delivery"],
  sameAs: [profile.github, profile.linkedin],
};

const btn =
  "lift inline-flex items-center gap-2 min-h-[44px] px-[18px] rounded-lg font-mono text-sm border transition-[border-color,transform,filter] duration-200 hover:-translate-y-px";
const chip = "font-mono text-xs px-2 py-[3px] border border-line rounded-md text-muted";
const card =
  "lift bg-surface border border-line rounded-xl p-6 flex flex-col gap-3 transition-[border-color,transform] duration-200 hover:border-muted hover:-translate-y-0.5";

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-t border-line py-16 md:py-[88px] scroll-mt-16">
      <div className="max-w-page mx-auto px-6">
        <p className="font-mono text-[13px] text-accent mb-3">{`// ${label}`}</p>
        <h2 id={`${id}-h`} className="text-[28px] md:text-[32px] leading-tight font-semibold tracking-tight mb-10">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span key={s} className={chip}>
          {s}
        </span>
      ))}
    </div>
  );
}

const Icon = {
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="w-4 h-4">
      <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="w-4 h-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
};

const navLinks = ["about", "experience", "work", "projects", "contact"];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <nav className="sticky top-0 z-10 border-b border-line bg-bg/85 backdrop-blur">
        <div className="max-w-page mx-auto px-6 h-[60px] flex items-center justify-between">
          <a href="#top" className="font-mono text-sm">
            <span className="text-accent">~/</span>rega
          </a>
          <ul className="hidden sm:flex gap-6 font-mono text-[13px]">
            {navLinks.map((l) => (
              <li key={l}>
                <a href={`#${l}`} className="text-muted hover:text-fg transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main id="top">
        <header className="pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-page mx-auto px-6">
            <TypingAnimation words={profile.typingWords} />
            <h1 className="text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] font-semibold tracking-[-0.02em] mt-5 mb-2">
              {profile.name}
            </h1>
            <p className="text-xl md:text-[26px] font-medium text-muted">
              <span className="text-fg">{profile.title}</span> · {profile.titleSuffix}
            </p>
            <p className="font-mono text-sm text-accent mt-2.5">{profile.tagline}</p>
            <p className="max-w-[62ch] mt-6 text-muted">
              {profile.lede.lead} <strong className="text-fg font-medium">{profile.lede.years}</strong>{" "}
              {profile.lede.rest}
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <a href={profile.cv} download className={`${btn} bg-accent text-on-accent border-accent font-medium hover:brightness-110`}>
                {Icon.download}Download CV
              </a>
              <a href={`mailto:${profile.email}`} className={`${btn} border-line hover:border-muted`}>
                {Icon.mail}Email
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`${btn} border-line hover:border-muted`}>
                {Icon.github}GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`${btn} border-line hover:border-muted`}>
                {Icon.linkedin}LinkedIn
              </a>
            </div>
          </div>
        </header>

        <Section id="impact" label="impact" title="Numbers, not adjectives">
          <Reveal className="grid grid-cols-1 min-[421px]:grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface px-6 py-7">
                <div className="font-mono text-[34px] font-medium tracking-tight">
                  {s.prefix && <span className="text-accent">{s.prefix}</span>}
                  {s.value}
                  {s.unit && <span className="text-accent">{s.unit}</span>}
                </div>
                <p className="text-muted text-[15px] mt-1">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </Section>

        <Section id="about" label="about" title="I didn't start in software">
          <Reveal className="grid gap-4 max-w-[68ch] text-muted">
            <p>
              I studied animal husbandry, then spent three years running a breeding farm:{" "}
              <strong className="text-fg font-medium">{about.farm}</strong> producing day-old chicks, with a team of{" "}
              <strong className="text-fg font-medium">{about.team}</strong>. Targets were daily and misses were expensive.
            </p>
            <p>{about.closing}</p>
          </Reveal>
          <ChickPen className="mt-8 w-full h-[200px] sm:h-[260px]" />
        </Section>

        <Section id="experience" label="experience" title="Where I've worked">
          <Reveal>
            <ol className="border-l border-line ml-1.5">
              {experience.map((r) => (
                <li key={r.company + r.period} className="relative pl-8 pb-10">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[6px] top-2 w-[11px] h-[11px] rounded-full border-2 ${
                      r.current ? "bg-accent border-accent" : "bg-bg border-muted"
                    }`}
                  />
                  <p className="font-mono text-[13px] text-muted">
                    {r.period} · {r.place}
                  </p>
                  <h3 className="text-xl font-semibold mt-0.5 mb-2">
                    {r.title} <span className="text-muted font-medium">@ {r.company}</span>
                  </h3>
                  <ul className="list-disc pl-[18px] text-muted marker:text-line">
                    {r.points.map((p) => (
                      <li key={p} className="mb-1">
                        {p}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="relative pl-8 text-muted text-[15px]">
                <span aria-hidden="true" className="absolute -left-[6px] top-2 w-[11px] h-[11px] rounded-full border-2 bg-bg border-muted" />
                {earlyCareer.period} · {earlyCareer.text}{" "}
                <a href="#about" className="text-accent hover:underline">
                  the short version &rarr;
                </a>
              </li>
            </ol>
          </Reveal>
        </Section>

        <Section id="work" label="selected work" title="Case studies">
          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {caseStudies.map((c) => (
              <article key={c.slug} className={`${card} relative ${c.wide ? "md:col-span-2" : ""}`}>
                <p className="font-mono text-[13px] text-muted">{c.meta}</p>
                <h3 className="text-xl font-semibold leading-snug">
                  {/* The ::after covers the card, so the whole card opens the case study. */}
                  <a href={`/work/${c.slug}`} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent">
                    {c.title}
                  </a>
                </h3>
                <dl className="grid gap-2 text-[15px]">
                  <dt className="font-mono text-xs text-accent">problem</dt>
                  <dd className="text-muted">{c.problem}</dd>
                  <dt className="font-mono text-xs text-accent">approach</dt>
                  <dd className="text-muted">{c.approach}</dd>
                  <dt className="font-mono text-xs text-accent">result</dt>
                  <dd className="text-muted">{c.result}</dd>
                </dl>
                <div className="mt-auto pt-1 flex flex-wrap items-end justify-between gap-3">
                  <Chips items={c.stack} />
                  <span aria-hidden="true" className="font-mono text-[13px] text-accent">read the case study &rarr;</span>
                </div>
              </article>
            ))}
          </Reveal>
        </Section>

        <Section id="how" label="how it works" title="The patterns behind the work">
          <ConceptShowcase />
        </Section>

        <Section id="projects" label="projects" title="Open source">
          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <article key={p.repo} className={card}>
                <p className="font-mono text-[13px] text-muted">
                  <span className="text-accent">~/</span>regahr/{p.repo}
                </p>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-muted text-[15px]">{p.description}</p>
                <Chips items={p.stack} />
                <div className="flex gap-[18px] font-mono text-[13px] mt-auto">
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className="border-b border-line hover:border-accent transition-colors">
                    code &rarr;<span className="sr-only"> for {p.title}</span>
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="border-b border-line hover:border-accent transition-colors">
                      live &rarr;<span className="sr-only"> demo of {p.title}</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </Reveal>
          <ul className="mt-8 grid gap-1.5 font-mono text-sm text-muted">
            {moreProjects.map((m) => (
              <li key={m.name}>
                + <a href={m.href} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors">{m.name}</a> · {m.note}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="stack" label="stack" title="What I work with">
          <Reveal>
            <dl className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-x-8 gap-y-1.5 sm:gap-y-3.5">
              {skills.map((s) => (
                <div key={s.group} className="contents">
                  <dt className="font-mono text-sm pt-[3px]">{s.group}</dt>
                  <dd className="mb-3.5 sm:mb-0">
                    <Chips items={s.items} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        <Section id="cozzle" label="co-zzle" title="Puzzle of the day">
          <CodePuzzle />
        </Section>
      </main>

      <footer id="contact" className="border-t border-line pt-10 pb-14 font-mono text-[13px] text-muted">
        <div className="max-w-page mx-auto px-6 flex flex-wrap justify-between gap-4">
          <span>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </a>{" "}
            · {profile.location}
          </span>
          <span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              github
            </a>{" "}
            ·{" "}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              linkedin
            </a>{" "}
            · built with next.js
          </span>
        </div>
      </footer>
    </>
  );
}
