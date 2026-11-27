// All page copy lives here, so a CV update does not touch layout code.

// The address that serves the page directly; the bare domain 307-redirects here.
export const siteUrl = "https://www.regahalmaruzty.com";
export const chickPenUrl = "https://chick-pen.regahalmaruzty.com";

export const profile = {
  name: "Rega Halma Ruzty",
  title: "Senior Backend Engineer",
  titleSuffix: "former Engineering Lead",
  tagline: "product-minded. backend-deep. ships fast without breaking money.",
  lede: {
    lead: "I build backend systems that move money and can't afford to be wrong.",
    years: "9+ years",
    rest: "across fintech, banking, healthcare and enterprise: Node.js, TypeScript, PostgreSQL, distributed systems, and the boring parts that keep them correct, like idempotency, retries and reconciliation.",
  },
  // Opens on the work; the personal words stay in the middle of the loop.
  typingWords: [
    "payments backend",
    "food reviewer",
    "offlaner",
    "idempotency nerd",
    "engineering lead",
    "senior backend engineer",
  ],
  email: "rega.hruzty@gmail.com",
  location: "Bandung, Indonesia",
  cv: "/Rega-Halma-Ruzty-CV.pdf",
  github: "https://github.com/regahr",
  linkedin: "https://linkedin.com/in/regahr",
};

export type Stat = { value: string; unit?: string; prefix?: string; label: string };

export const stats: Stat[] = [
  { value: "9", unit: "+", label: "years building production systems" },
  { value: "12", unit: "mo", label: "empty repo to production, business banking platform" },
  { value: "100", unit: "+", label: "enterprise SMEs onboarded" },
  { value: "10", label: "engineers, team scaled and mentored" },
  { prefix: "<", value: "100", unit: "ms", label: "a query that used to time out, after a CTE rewrite" },
  { prefix: "~", value: "4", unit: "x", label: "weekly ticket output, from my own delivery process" },
];

export const about = {
  farm: "6 houses, 60,000 grandparent-stock layers",
  team: "12 workers and an assistant supervisor",
  closing:
    "That's still how I build software. Find where the process leaks, measure it, fix it, and make sure the fix survives a bad day. Money-moving backends just raise the stakes.",
};

export type Role = {
  period: string;
  place: string;
  title: string;
  company: string;
  points: string[];
  current?: boolean;
};

export const experience: Role[] = [
  {
    period: "2025 - now",
    place: "Singapore, remote",
    title: "Senior Backend Engineer",
    company: "Littlelives",
    current: true,
    points: [
      "Multi-tenant workflows on NestJS, TypeORM and PostgreSQL, with safe rollouts",
      "Bank GIRO collection and refund integrations with idempotency and reconciliation",
    ],
  },
  {
    period: "2021 - 2025",
    place: "Singapore, remote",
    title: "Engineering Lead",
    company: "Grof",
    points: [
      "Led a business banking platform from an empty repo to production in 12 months",
      "Grew the team to 10 engineers; replaced manual deploys with GitHub Actions",
    ],
  },
  {
    period: "2021",
    place: "Jakarta, remote",
    title: "Full-Stack Developer",
    company: "Bithealth",
    points: ["Healthcare web apps for clinical staff, API contracts to hospital platforms"],
  },
  {
    period: "2019 - 2021",
    place: "Jakarta, remote",
    title: "Full-Stack Developer, Squad Lead",
    company: "Multipolar Technology",
    points: ["White-label mobile banking platform for 2 banks: ISO 8583, video KYC, Kafka"],
  },
  {
    period: "2017 - 2018",
    place: "Bandung",
    title: "Full-Stack Developer",
    company: "Tabel Data Indonesia",
    points: ["Ported DB2 query logic to Java for a multithreaded bank clearing batch"],
  },
];

export const earlyCareer = {
  period: "2014 - 2017",
  text: "Operations Supervisor @ Charoen Pokphand.",
};

export type CaseStudy = {
  slug: string;
  meta: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  // Key decisions, shown on the case study's own page.
  points: string[];
  wide?: boolean;
};

export const caseStudies: CaseStudy[] = [
  // Payments proof first: it backs the headline claim.
  {
    slug: "never-double-charge",
    meta: "payments · backend · now",
    title: "Backends that never double-charge",
    problem: "Bank GIRO collections and refunds, plus migrations on data that can't be wrong.",
    approach: "Idempotency keys, queued retries, reconciliation; parallel-run validation before every cutover.",
    result: "100% data integrity across production migrations, each one validated by a parallel run before cutover. Zero-downtime releases.",
    stack: ["NestJS", "PostgreSQL", "Redis", "NSQ"],
    points: [
      "Idempotency keys, so a retried request returns the first result instead of charging again.",
      "Queued retries instead of retrying inline.",
      "Reconciliation against the bank.",
      "Migrations run in parallel with the old path and are compared before cutover.",
      "A timing-out query rewritten with a CTE, now under 100 ms.",
    ],
    wide: true,
  },
  {
    slug: "business-banking-platform",
    meta: "fintech · lead · 2021-2025",
    title: "A business banking platform from an empty repo",
    problem:
      "An idea, no code: business accounts, free international transfers and virtual corporate cards for SMEs.",
    approach:
      "Shaped the technical requirements, set up AWS and CI/CD myself, modular monolith on Nium for transfers and cards, KYC for people and KYB business-profile checks via Cynopsis Artemis.",
    result: "Production in 12 months, 100+ SMEs onboarded, team grown to 10.",
    stack: ["Next.js", "Node", "MongoDB", "AWS", "Nium"],
    points: [
      "Started from an idea and an empty repo, and shaped the technical requirements before any code existed.",
      "Set up AWS and the CI/CD pipeline myself.",
      "A modular monolith: one deployable for a small team, with clear module boundaries.",
      "International transfers and virtual corporate cards built on Nium.",
      "KYC for people, and KYB business-profile checks via Cynopsis Artemis.",
      "Tenant-aware authentication across businesses.",
      "Grew and mentored the team to 10 engineers.",
    ],
  },
  {
    slug: "white-label-mobile-banking",
    meta: "banking · architect",
    title: "White-label mobile banking",
    problem: "Two banks, one platform, core banking and video KYC.",
    approach: "Independent modules, ISO 8583 core integration, Kafka events, Jitsi video calls.",
    result: "Shipped for 2 enterprise banks.",
    stack: ["FeathersJS", "Kotlin", "Kafka"],
    points: [
      "One platform shipped for two enterprise banks.",
      "Independent modules per concern.",
      "ISO 8583 integration with the core banking system.",
      "Kafka events between services.",
      "Video KYC calls on Jitsi.",
      "FeathersJS services and Kotlin mobile apps.",
    ],
  },
  {
    slug: "shipping-faster",
    meta: "delivery · process · 2026",
    title: "Shipping full-stack tickets 4x faster",
    problem: "One API ticket used to take me 2-3 days, mostly testing it myself before I trusted it.",
    approach:
      "A tested, recorded delivery process I built, with my sign-off at each step and evidence behind every change.",
    result:
      "About 4x my old weekly output: 200+ tickets in 4 months. Each one now spans API, web and often mobile, with every case on recording.",
    stack: ["Claude Code", "Playwright", "PostgreSQL"],
    points: [
      "Before: about one API ticket every 2-3 days, most of it spent testing my own work.",
      "Now: one ticket covers the API, the web app and often mobile.",
      "A person signs off at each step.",
      "Every change leaves tests and a recording of each case behind.",
    ],
  },
  {
    slug: "ops-without-an-engineer",
    meta: "internal tools · now",
    title: "Ops answers \"what happened?\" without an engineer",
    problem: "Every stuck record or odd status meant pinging an engineer or PM.",
    approach:
      "17 Retool tools across the app's modules that show live status, triage the issue and retry failed processes.",
    result: "Operations and Customer Success reach a conclusion on their own.",
    stack: ["Retool", "PostgreSQL", "REST"],
    points: [
      "17 Retool tools across the app's modules.",
      "Each one shows live status for its area.",
      "Triage and retry of failed processes, built in.",
      "Operations and Customer Success reach a conclusion without an engineer or PM.",
    ],
  },
];

export type Project = {
  repo: string;
  title: string;
  description: string;
  stack: string[];
  code?: string; // omitted for private repos
  live?: string;
  // Full-width card. With "dieline", it shows the box net from the Kotakita model next to the text.
  wide?: boolean;
  preview?: "dieline";
};

export const projects: Project[] = [
  {
    repo: "hierarchical-locations-api",
    title: "Hierarchical Locations API",
    description:
      "REST API for infinitely nested location trees, with automatic parent detection and recursive reads.",
    stack: ["NestJS", "Prisma", "PostgreSQL"],
    code: "https://github.com/regahr/hierarchical-locations-api",
  },
  {
    repo: "doc-gen",
    title: "Doc Gen",
    description: "Turborepo monorepo for DOCX to PDF conversion, S3 storage and e-signing via Docuseal.",
    stack: ["NestJS", "Next.js", "S3", "Turborepo"],
    code: "https://github.com/regahr/doc-gen",
  },
  {
    repo: "kotakita",
    title: "Kotakita",
    description:
      "Box-sticker designer for small sellers. Computes a 15-panel mailer dieline from L×W×H in mm, shows it in 3D, and exports a true-scale PDF. Client-side, no account.",
    stack: ["React 19", "three.js", "pdf-lib", "Playwright"],
    live: "https://kotakita.regahalmaruzty.com/en/",
    wide: true,
    preview: "dieline",
  },
  {
    repo: "denrose",
    title: "Denrose",
    description: "Storefront for a handmade clay shop: WhatsApp checkout, per-item stock limits, Sanity CMS.",
    stack: ["Next.js 14", "Sanity"],
    live: "https://denrose.store",
    wide: true,
  },
];

export const moreProjects = [
  { name: "chick-pen", note: "the chicks from the about section, as a game", href: chickPenUrl },
  { name: "appointment-api", note: "scheduling API with slot constraints", href: "https://github.com/regahr/appointment-api" },
  { name: "loop_station", note: "browser audio looper", href: "https://loop-station-nu.vercel.app" },
  {
    name: "fullstack-turborepo-starter",
    note: "Nest + Next starter",
    href: "https://github.com/regahr/fullstack-turborepo-starter",
  },
];

// Notes are standalone pages, not case studies: no result at the end, and they
// never appear in `caseStudies`, the work grid or the sitemap.
// One id per chart component in components/ArticleCharts.
export type ArticleChartId =
  | "cache-share"
  | "base-reread"
  | "calls-per-message"
  | "batching-ladder"
  | "not-measured"
  | "plugin-cost"
  | "delegation-probes"
  | "the-night"
  | "film-tokens"
  | "film-targets";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  // One diagram or the film strip, rendered after this paragraph index.
  media?: "input-bars" | "films";
  mediaAfter?: number;
  // Charts rendered directly after a paragraph, in this order.
  charts?: { after: number; id: ArticleChartId }[];
};

export type ArticleFilm = {
  attempt: string;
  // Mono label line: attempt name and its numbers.
  label: string;
  caption: string;
  mp4: string;
  poster: string;
  posterAlt: string;
  captions?: string;
};

export type Article = {
  slug: string;
  title: string;
  deck: string;
  sections: ArticleSection[];
  films: ArticleFilm[];
};

export const articles: Record<string, Article> = {
  "flat-rate-harness": {
    slug: "flat-rate-harness",
    title: "Flat rate made my waste visible",
    deck: "I ran an agent harness on a flat rate token plan, and the bill grew with every call I made, whatever the call did.",
    sections: [
      {
        heading: "2,520 frames",
        paragraphs: [
          "I rendered 2,520 frames before I saw a single one. The film ran 84 seconds. When it finished I watched it once and knew it was wrong. If I had looked at one still first, I would have known in a minute. I never looked at a single frame before rendering 2,520. Nobody made me skip that step. The harness was fast enough to hide the gap, and I let it. The order was wrong, and the speed made the order easy to ignore. This note is about that order, and about what the speed cost in calls and in a bill I did not understand.",
        ],
      },
      {
        heading: "The plan and the mechanism",
        paragraphs: [
          "The work here ran on a flat rate token plan. I pay a fixed rate and the plan makes no distinction between a token I send fresh and a token it already holds. On this plan a cache read bills like fresh input.",
          "The bill tracks calls times context. New work barely moves it. Every call sends the conversation again, and the plan charges for the whole of it, so a thread that runs all day pays for its own history all day. The rate is flat and the usage is not capped. A call that does nothing still sends the base. A call that reads one line still sends the base.",
          "I measured the token numbers myself, from the harness log on this machine. The harness counted its own calls and its own tokens, and that count is what every figure here rests on. The plan's meter is a separate count, and I have not checked one against the other. I will not print a figure for the bill, because I cannot check it against an invoice. The mechanism is the part I can stand behind.",
          "The log says where the input went. 87.9 percent of all input was a cache read, and most of that read was the same text. 60 percent of all input was one 32.5K base, sent again on every call. The base is the instruction set, the tool list and the history the harness carries. I did not add to it between calls. It went out anyway, charged as fresh input each time. I checked tool output as the other suspect. The largest tool result in the whole run was 1,950 tokens, one result in a run of hundreds of calls. One result that size, across hundreds of calls, is not where the tokens went.",
        ],
        charts: [
          { after: 3, id: "cache-share" },
          { after: 3, id: "base-reread" },
        ],
      },
      {
        heading: "Attempt 1: permissions",
        paragraphs: [
          "Before this change the harness ran in a mode where a small model judged every command before it ran. That judge timed out four times in one day. A timeout is not free. The retry sends the whole context again, so a slow judge turns into a bill with a delay attached.",
          "I replaced the judge with four permission wildcards, one for each kind of call the harness makes. Those four covered 273 of the 275 tool uses in the run. For the shell commands the wildcards did not cover, the rule became mine to approve, and my line to the harness was: \"ok 1+2, if u need permission, dont stop on terminal, ask me here with bash script like `! ~/example/script.ts` so i can run it and u can try again\"",
          "Nothing was measured. I have no before and after for this change. I did not take a token count before the wildcards went in and I did not take one after, so I cannot say what the judge cost or what the wildcards saved. A timeout is visible when it happens and invisible a week later, because the log records the retry and not the reason for it.",
          "What I can say is what did not change. The 32.5K base still went out on every call, and it was 60 percent of all input. The wildcards removed a source of retries. They did nothing to the context that went out on every call.",
          "What worked: the retries stopped, and I stopped being interrupted. What did not: the bill, because the base was never the judge's fault.",
        ],
        charts: [{ after: 2, id: "not-measured" }],
      },
      {
        heading: "Attempt 2: fewer calls",
        paragraphs: [
          "The baseline was the window before batching. The median was 13 calls per message, and the mean was 22.5, so a few heavy messages pulled the average up. The window held 178 tool calls at 1.39 calls per tool call. 143 of those tool calls were one small script each, so the calls multiplied faster than the work did. The median message pulled 951,168 input tokens through the plan. Each of those calls carried the whole base again.",
          "The change was simple to state. One call now carries every independent read of a phase. The reads go out together and the base goes out once for the lot. The first reading after batching began was 9.5 calls per message, against the baseline median of 13. The base did not shrink with batching. What shrank was the number of times it went out.",
          "I then replayed the calls to see what full batching would buy. At 2 reads per call the saving came to 23 percent. At 3 reads per call it was 30 percent. At 5 it was 36 percent. If every single read batched, the saving was 44 percent, and that is a ceiling. No real phase reads in that tidy a pattern, so I do not plan with 44. The replay is arithmetic over the calls already in the log. It is not a fresh run with batching on.",
          "The real reading I promised after more messages never happened. I never got a measured number for a fully batched window, so 9.5 calls per message is the only figure from the live harness, and everything above it is arithmetic on old calls.",
          "What worked: the call count, which is the thing I can see in the log without a replay. What did not: the base, which is still the largest single line in every call.",
        ],
        charts: [
          { after: 0, id: "calls-per-message" },
          { after: 2, id: "batching-ladder" },
        ],
      },
      {
        heading: "Attempt 3: the base itself",
        paragraphs: [
          "This is the one I could not name at the time. Something in the base cost tokens on every call, and I had no figure for which part. So I measured the plugins. With them on, a call carried 22,381 tokens at the median. With them off, 19,998. That put the plugins at 2,383 tokens per call. Against the floor of the base it was 10.6 percent, and against the whole bill it was 4.5 percent. Those are medians of four runs.",
          "I left the plugins on. So the measurement stands on its own and no change followed it. What I had at the end was a number for a cost I chose to keep. Plugins earn their tokens in what they let the harness do, and I wanted that behaviour.",
          "Two alternatives sat under that decision and I did not take either. A fresh window at a gate drops the context back to 32.5K and starts clean, and it loses the session with it. A bare mode came to 1,234 tokens against the 22,381, 94.5 percent lower. I rejected it because it is a different product. On this harness it would be a rewrite, and I wanted a setting.",
          "So the third attempt ends with a measurement and a decision, and the decision was to keep paying the cost. That is a poorer result than the first two. It is also the honest one, because a saving I do not take is not a saving I can claim.",
          "What worked: the measurement, which told me where 10.6 percent of the floor sat. What did not: everything downstream of it, because I kept the cost.",
        ],
        charts: [{ after: 0, id: "plugin-cost" }],
      },
      {
        heading: "Attempt 4: delegation",
        paragraphs: [
          "The change was narrow. Only the subagent slot moved to a free model. Every other slot stayed on the paid one, so the orchestrator kept the thread and the subagents did the wide reading.",
          "I ran two probes to see what the move was worth. In the first, input fell from 1.19M tokens to 358K. In the second, it fell from 1.51M to 456K. Both are the harness log's own count, over the window each probe covered.",
          "Then the wall. At 01:27 the free tier answered 429, daily free quota exceeded. The quota was 300 a day and it resets at midnight, which was about 22.5 hours away. A running window cannot pick the change up, because the environment variable is read at launch, so the setting applies to the next window and not the one in front of me. All the free models share one bucket, so a second free slot would have hit the same ceiling on the same day.",
          "My own line at the time was \"which are not really felt it since only 300 call\", and that is the honest summary. The saving showed up in the probes. It never really showed up in a working day, because the free capacity ran out before the day did. Free capacity is useful to have. On the thread that carries the work, it did not lower anything I could see.",
          "What worked: the probes, and the proof that a free subagent really does the reading. What did not: a working day, because the free capacity ran out before the day did.",
        ],
        charts: [{ after: 1, id: "delegation-probes" }],
      },
      {
        heading: "The three films",
        paragraphs: [
          "I made three attempts and all three fail, in my own words at the time. They go on this page as lessons.",
          "The first ran 36 seconds and had no audio track at all. A hy4-flash subagent built it, and the missing sound was not a choice I made. It was missing, and I did not catch it in the file check. Four stills were sampled in review.",
          "The second ran 39 seconds and had sound. The same hy4-flash built it, and this time a taste document was written first, so the look had a brief behind it. The sound is the only thing I can point at as an improvement. The picture still came from a scene nobody had checked.",
          "The third ran 84 seconds and a deepseek-v4.1-flash-1017 subagent built it. It is the one I measured properly. True peak landed at -1.8 dBFS against a -2.0 target. Loudness range came to 6.4 LU against a 7 target. Both are close and neither is on target.",
          "The two film windows together processed 188,794,296 tokens, cache included, measured from the logs.",
          "It failed in three ways, and I said them plainly: \"the palette put the subject in almost the same colour as the ground\", \"the 3D was nine hundred primitives and no material\", \"I never looked at a single frame before rendering 2,520\".",
          "One still would have shown the palette before the queue.",
        ],
        charts: [
          { after: 3, id: "film-targets" },
          { after: 4, id: "film-tokens" },
        ],
        media: "films",
        mediaAfter: 0,
      },
      {
        heading: "The night",
        paragraphs: [
          "The work ran from 19:00 on Nov 26 to 08:57 on Nov 27. Thirteen messages went in during the 01:00 hour. The three films finished at 02:11, 03:16 and 07:58.",
          "That is one night of work, run through the dark. It was a night without sleep. I did not plan it that way. The queue kept running and each film ended late, so I stayed up to watch it end. The last one closed at 07:58, and I had been awake since the evening before.",
          "I am not going to dress that up. The harness did not need me awake for the render. I stayed because I wanted to see it, and because a bad render at 03:16 meant another queue and another wait. The work ran most of a night. The log counts tokens. It has no column for the hours.",
        ],
        charts: [{ after: 0, id: "the-night" }],
      },
      {
        heading: "What this says about flat rate",
        paragraphs: [
          "The judgement, and it is a judgement. A generous flat rate suits a chatbot. It suits a one-shot page. It suits a small coding assistant inside an editor, where the context stays short and the calls stay few. It does not suit an agentic workflow that re-sends its whole context hundreds of times, because that workflow pays the flat rate on a growing history on every call.",
          "The plan was not doing anything wrong. It charged for input, and it charged the same rate for a cache read as for new text, and it said so. What it did was make the inefficiency visible in one number. 87.9 percent of input was a cache read, and the median message pulled 951,168 tokens. On a metered plan the same waste would have spread over small charges and never shown its shape.",
          "So the number is a mirror. The harness was the thing to fix, and the plan is the thing that let me see it. I did not fix all of it. I left the plugins on, and I never got the measured reading for a fully batched window. If you run an agent on a flat rate plan, count the calls before you count the words.",
          "This is a note. The work section of this site holds client work and each piece ends with a result. This one has no result at the end. It is one run of an agent harness, written down while the numbers are fresh and the films are still bad.",
          "The rule I take out of it is the order. Screen draft first. One still before the queue, then render.",
        ],
      },
    ],
    films: [
      {
        attempt: "v1",
        label: "v1 · 36 s · no audio",
        caption:
          "First attempt, 36 seconds, built by a hy4-flash subagent with no audio stream at all. Four stills were sampled for review.",
        mp4: "/video/page-v1.mp4",
        poster: "/video/poster-v1.jpg",
        posterAlt:
          "Poster frame: on a near-black background, white text reads 'every token of context, re-sent on every call.' above a short thin horizontal rule.",
      },
      {
        attempt: "v2",
        label: "v2 · 39 s · sound",
        caption:
          "Second attempt, 39 seconds, built by a hy4-flash subagent from a taste document written first. It has sound.",
        mp4: "/video/page-v2.mp4",
        poster: "/video/poster-v2.jpg",
        posterAlt: "Poster frame: on a near-black background, a large amber '$0' sits at the left edge.",
      },
      {
        attempt: "v3",
        label: "v3 · 84 s · measured",
        caption:
          "Third attempt, 84 seconds, built by a deepseek-v4.1-flash-1017 subagent. True peak landed at -1.8 dBFS against a -2.0 target, with a loudness range of 6.4 LU against 7.",
        mp4: "/video/page-v3.mp4",
        poster: "/video/poster-v3.jpg",
        posterAlt:
          "Poster frame: a 3D scene of layered slate-blue panels with one small amber ellipse; boxes read '11.2M', 'The main window still re-sends its own context. That part is not free.' and 'nufra, from nucifraga, the nutcracker.'",
        captions: "/video/captions-v3.vtt",
      },
    ],
  },
};

export const skills: { group: string; items: string[] }[] = [
  { group: "backend", items: ["Node.js", "NestJS", "Express", "TypeORM", "REST"] },
  { group: "data", items: ["PostgreSQL", "MongoDB", "Redis", "query tuning", "migrations"] },
  { group: "distributed", items: ["NSQ", "Kafka", "idempotency", "distributed locks", "reconciliation"] },
  { group: "cloud & ops", items: ["AWS ECS/EC2/S3", "Docker", "GitHub Actions", "Grafana"] },
  { group: "frontend", items: ["React", "Next.js", "TypeScript"] },
  { group: "tooling", items: ["Claude Code", "Codex", "workflow orchestration"] },
  { group: "certified", items: ["MongoDB C100DBA", "MongoDB C100DEV"] },
];
