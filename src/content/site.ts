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
  | "permission-cover"
  | "calls-per-message"
  | "batching-ladder"
  | "floor-split"
  | "plugin-cost"
  | "delegation-probes"
  | "film-targets"
  | "film-attempts"
  | "quota-burn"
  | "the-night";

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

// One number in a block's data strip. `before` and `after` are big mono
// numbers. `feel` marks `after` as Rega's own impression, not a number.
export type ArticleDatum = {
  label: string;
  before?: string;
  after: string;
  feel?: boolean;
};

// The block that repeats for 4 attempts and 3 films: tag, heading, what I
// changed, data strip, chart (or the film), effect, worked / did not.
export type ArticleBlock = {
  id: string;
  tag: string;
  // Rail chip: one or two words for the outcome.
  outcome: string;
  heading: string;
  note?: string;
  changed: string[];
  data: ArticleDatum[];
  charts?: ArticleChartId[];
  film?: number;
  effect: string[];
  effectCharts?: ArticleChartId[];
  worked: string[];
  didNot: string[];
};

export type Article = {
  slug: string;
  title: string;
  // Meta description and OG text.
  deck: string;
  opener: string[];
  catchSection: { heading: string; paragraphs: string[]; charts: ArticleChartId[] };
  part1: string;
  attempts: ArticleBlock[];
  part2: string;
  filmsIntro: string[];
  films: ArticleBlock[];
  filmMedia: ArticleFilm[];
  bill: { heading: string; paragraphs: string[]; charts: ArticleChartId[]; pull: string };
  night: { heading: string; paragraphs: string[]; chart: ArticleChartId };
  verdict: {
    heading: string;
    thesis: string;
    championFor: string[];
    failsFor: string[];
    paragraphs: string[];
  };
};

export const articles: Record<string, Article> = {
  "flat-rate-harness": {
    slug: "flat-rate-harness",
    title: "Flat rate vs my agent harness",
    deck: "I ran my agent harness on a flat rate plan with a billion tokens a month. Four harness attempts, three failed films, one night without sleep.",
    opener: [
      "I subscribed to a flat rate plan with a billion tokens a month and thought, ok, this is it, I can run my whole agent harness on it and stop counting tokens.",
      "The setup: deepseek through a model aggregator, on that massive token subscription. Cache included though, and that's the big catch. I spent the next weeks trying to make my harness fit that plan, four attempts, then three films. And yeah, it didn't work out.",
    ],
    catchSection: {
      heading: "The catch",
      paragraphs: [
        "The provider bill cache read as the same with normal input. Every call send the whole conversation again and the plan charge for all of it, so a thread that runs all day pays for its own history all day.",
        "A call that does nothing still sends the base. A call that reads one line still sends the base. The base is the instruction set, the tool list and the history the harness carries, 32.5K of it, and I didn't add anything to it between calls.",
        "I kept asking \"how much read cache now? i bet it's over 2M\", and then \"do we actually need to include the session own log as a whole?\" with a skull emoji. This is where it went.",
        "\"i really can't afford it\", that was me that day.",
      ],
      charts: ["cache-share", "base-reread"],
    },
    part1: "part 1 · the harness, before any film",
    attempts: [
      {
        id: "attempt-1",
        tag: "attempt 1 / 4",
        outcome: "fewer stops",
        heading: "Auto mode → accept edits",
        changed: [
          "Before this, the harness ran in auto mode, where a small model judge every command before it runs. At 12:25 i wrote \"timed out four times today\". Every retry sends the whole context again, so a slow judge is basically a bill with a delay attached.",
          "So I asked for accept edits as the default on the provider windows, not auto mode. In nufra commit 9c9160b (11-26 14:18) the gateway windows start in accept edits, with Bash, Read, Edit and Write allowed. The global default is still auto.",
          "On top of that, four permission wildcards, one for each kind of call the harness makes. For anything outside them: \"if u need permission, dont stop on terminal, ask me here with bash script like `! ~/example/script.ts` so i can run it and u can try again\"",
        ],
        data: [
          { label: "judge timeouts in one day", before: "4", after: "stopped bugging me", feel: true },
          { label: "tool uses covered by the allow list", after: "273 / 275" },
        ],
        charts: ["permission-cover"],
        effect: [
          "It felt way smoother. I stopped babysitting the terminal, and when it needed something outside the list it just asked me and I ran the script myself.",
        ],
        worked: ["My flow. No more stops on the terminal."],
        didNot: ["The bill. The 32.5K base still went out on every call, 60 percent of all input. Never the judge's fault, so on the bill all that changed nothing."],
      },
      {
        id: "attempt-2",
        tag: "attempt 2 / 4",
        outcome: "fewer calls",
        heading: "Batching, econ mode",
        changed: [
          "Before batching, a few heavy messages pulled the average way up. That window had 178 tool calls at 1.39 calls per tool call, and 143 of them were one small script each. So the calls multiplied faster than the work did. The median message pulled 951,168 input tokens through the plan, and every one of those calls carried the whole base again.",
          "The fix was simple: one call carries every independent read of a phase. The reads go out together and the base goes out once for the lot. I called it econ mode, and then asked for it to stay always on for the aggregator windows.",
        ],
        data: [
          { label: "mean calls per message", before: "22.5", after: "9.5 (n=2)" },
          { label: "median calls per message, before", after: "13" },
          { label: "replay ceiling, input saved", after: "44%" },
        ],
        charts: ["calls-per-message", "batching-ladder"],
        effect: [
          "That 9.5 is 2 messages, 19 calls, so still eyeballing it lol.",
          "Then I asked it to simulate a benchmark over the calls I already had. 44 percent is if every single read batched, and no real phase reads that tidy, so I don't plan with 44.",
        ],
        worked: ["Fewer calls per message."],
        didNot: ["The base. Still the biggest line in every call, whatever I did."],
      },
      {
        id: "attempt-3",
        tag: "attempt 3 / 4",
        outcome: "cost kept",
        heading: "Shrink the floor",
        changed: [
          "Something in the base cost tokens on every call and I had no idea which part. So at 19:24 I checked the plugins, on and off, median of four runs.",
        ],
        data: [
          { label: "median tokens per call, plugins on → off", before: "22,381", after: "19,998" },
          { label: "plugins per call, share of the bill", after: "2,383 · 4.5%" },
          { label: "7 hand-overs to a fresh window, saving", after: "felt like a lot", feel: true },
        ],
        charts: ["floor-split", "plugin-cost"],
        effect: [
          "I left the plugins on. They earn their tokens in what they let the harness do, and I wanted that.",
          "Two other ways sat there. A fresh window at a gate drops the context back to 32.5K and starts clean, but you lose the session with it. That one I did use, every time a thread got heavy I just said handover.",
          "A bare mode came to 1,234 tokens against the 22,381, 94.5 percent lower. I rejected it, it's a different product. On this harness it would be a rewrite, and I wanted a setting.",
        ],
        worked: ["Knowing where 10.6 percent of the floor sat.", "Fresh windows, 7 that night."],
        didNot: ["The bill. I ended up just keeping the cost."],
      },
      {
        id: "attempt-4",
        tag: "attempt 4 / 4",
        outcome: "300 a day",
        heading: "Delegate tool calls to free subagents",
        changed: [
          "Narrow change. Only the subagent slot moved to a free model, every other slot stayed on the paid one. The orchestrator keep the thread and the subagents do the wide reading.",
        ],
        data: [
          { label: "probe 1 input", before: "1.19M", after: "358K" },
          { label: "probe 2 input", before: "1.51M", after: "456K" },
          { label: "tokens on hy4-flash:free before the cap", after: "12,061,469" },
        ],
        charts: ["delegation-probes"],
        effect: [
          "Two probes, and the drop looked great.",
          "Then the wall. At 01:26: \"daily free quota exceeded (300/day)\". The quota resets at midnight, about 22.5 hours away. And a running window can't pick the change up, the environment variable is read at launch, so it only applies to the next window, not the one in front of me.",
          "My line at the time: \"which are not really felt it since only 300 call\".",
        ],
        worked: ["The probes. A free subagent really does the reading."],
        didNot: ["A working day. The free capacity ran out way before the day did."],
      },
    ],
    part2: "part 2 · the films, on the cheapest model available",
    filmsIntro: [
      "Then I tried my usual workflow, making a short video, on the cheapest model available. All three fail totally, so they go here as lessons.",
      "Why, in my words: \"the model i choose didn't have the art direction\".",
    ],
    films: [
      {
        id: "film-1",
        tag: "film 1 / 3",
        outcome: "failed",
        heading: "hy4-flash, no audio",
        note: "My words at the time: \"with free hy4-fast\".",
        changed: [
          "The free tier had stopped at 01:26, so at 01:30 I said \"just strip the :free then continue\", and film 1 ran on paid hy4-flash. Built 02:03 to 02:12.",
        ],
        data: [
          { label: "length", after: "36 s" },
          { label: "audio", after: "none" },
          { label: "tokens, one window with film 2", after: "60,208,130" },
        ],
        film: 0,
        effect: [
          "No sound at all. Not a choice, it just went missing and I didn't catch it in the file check. Four stills got sampled in review, that's it.",
        ],
        worked: ["It ran end to end."],
        didNot: ["No art direction, not even sound."],
      },
      {
        id: "film-2",
        tag: "film 2 / 3",
        outcome: "failed",
        heading: "hy4-flash + taste + video reference",
        changed: [
          "Same hy4-flash, plus a taste doc and a video reference: nufra-demo-v2b.mp4, written down as video/taste-reference-v2b.json. Built 02:49 to 03:17.",
        ],
        data: [
          { label: "length", after: "39 s" },
          { label: "audio", after: "yes" },
        ],
        film: 1,
        effect: [
          "This time the taste doc came first, so the look had something behind it, and it had sound. But the picture still came from a scene nobody had checked.",
        ],
        worked: ["Sound."],
        didNot: ["A taste doc and a reference are not art direction, turns out."],
      },
      {
        id: "film-3",
        tag: "film 3 / 3",
        outcome: "failed, 128.6M",
        heading: "deepseek-v4.1-flash-1017",
        changed: [
          "I changed the subagent model to deepseek-v4.1-flash-1017 and handed over. Built 06:36 to 07:58.",
        ],
        data: [
          { label: "tokens, film 3", after: "128,586,166" },
          { label: "length", after: "84 s" },
          { label: "true peak, dBFS (target -2.0)", after: "-1.8" },
        ],
        film: 2,
        effect: [
          "My first reaction: \"the video is so bad\". The sound came close, the picture didn't.",
          "The palette put the subject in almost the same colour as the ground, the 3D was nine hundred primitives and no material, and nobody looked at a single frame before rendering 2,520.",
        ],
        effectCharts: ["film-targets"],
        worked: ["The sound, close to target."],
        didNot: ["The picture. 128.6M tokens for that, ugh."],
      },
    ],
    filmMedia: [
      {
        attempt: "v1",
        label: "v1 · 36 s · no audio",
        caption:
          "First attempt, 36 seconds, built by a hy4-flash subagent with no audio stream at all.",
        mp4: "/video/page-v1.mp4",
        poster: "/video/poster-v1.jpg",
        posterAlt:
          "Poster frame: on a near-black background, white text reads 'every token of context, re-sent on every call.' above a short thin horizontal rule.",
      },
      {
        attempt: "v2",
        label: "v2 · 39 s · sound",
        caption:
          "Second attempt, 39 seconds, built by a hy4-flash subagent from a taste document and a video reference.",
        mp4: "/video/page-v2.mp4",
        poster: "/video/poster-v2.jpg",
        posterAlt: "Poster frame: on a near-black background, a large amber zero sits at the left edge.",
      },
      {
        attempt: "v3",
        label: "v3 · 84 s · sound close to target",
        caption:
          "Third attempt, 84 seconds, built by a deepseek-v4.1-flash-1017 subagent. True peak -1.8 dBFS against -2.0, loudness range 6.4 LU against 7.",
        mp4: "/video/page-v3.mp4",
        poster: "/video/poster-v3.jpg",
        posterAlt:
          "Poster frame: a 3D scene of layered slate-blue panels with one small amber ellipse; boxes read '11.2M', 'The main window still re-sends its own context. That part is not free.' and 'nufra, from nucifraga, the nutcracker.'",
        captions: "/video/captions-v3.vtt",
      },
    ],
    bill: {
      heading: "Where my 1B went",
      paragraphs: [
        "I said \"spent 150M out of 1B token i subscribed for a month\". Turns out the three films alone were 188.8M, cache included.",
      ],
      charts: ["film-attempts", "quota-burn"],
      pull: "not worth it right?",
    },
    night: {
      heading: "The night",
      paragraphs: [
        "My last prompt went in at 04:14 and the next one at 08:04. The films finished at 02:12 and 03:17, then in between the queue just kept running until the last one closed at 07:58.",
        "I didn't plan it that way, I just kept waiting for one of them to come out good. None did. No sleep, and it ruin my next day.",
      ],
      chart: "the-night",
    },
    verdict: {
      heading: "Verdict: not built for heavy agentic work",
      thesis:
        "A generous flat rate is still a champion, just not for a heavy agentic workflow, and for me, it fails at the moment.",
      championFor: [
        "a chatbot",
        "a school-level coding assistant",
        "a coding assistant in VS Code",
        "a one-file editor",
        "a one-shot HTML page",
      ],
      failsFor: [
        "an agent harness that re-sends its whole context hundreds of times",
        "a film pipeline run by subagents through the night",
      ],
      paragraphs: [
        "Honestly? I didn't fix all of it. The plugins are still on, and the main window still re-sends its own context.",
        "What frustrates me the most is knowing each session cost me like 10%-20% of the subscription I bought, 100M-200M out of the 1B. I got lured by that massive token number, and I didn't even know it also count the cache token usage.",
        "A billion tokens sounded like a lot. For this kind of work it just wasn't, and I lost a night finding out.",
      ],
    },
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
