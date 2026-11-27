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
// numbers; either can be "not measured", which renders as a dashed slot.
export type ArticleDatum = {
  label: string;
  before?: string;
  after: string;
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
    rule: string;
  };
};

export const articles: Record<string, Article> = {
  "flat-rate-harness": {
    slug: "flat-rate-harness",
    title: "Flat rate vs my agent harness",
    deck: "I ran my agent harness on a flat rate plan with a billion tokens a month. Four harness attempts, three failed films, one night without sleep.",
    opener: [
      "I subscribed to a flat rate plan with a billion tokens a month and thought, ok, this is it, I can run my whole agent harness on it and stop counting tokens. There's a catch though: cache counts like fresh input, so every call sends the whole conversation again and pays for it again. I spent the next weeks trying to make my harness fit that plan, four attempts, then three films, and honestly, it didn't work out.",
      "The setup: deepseek on nibie, my harness profile, on that massive token subscription. Cache included, and that's the big catch.",
    ],
    catchSection: {
      heading: "The catch",
      paragraphs: [
        "The work here ran on a flat rate token plan. I pay a fixed rate and the plan makes no distinction between a token I send fresh and a token it already holds. On this plan a cache read bills like fresh input.",
        "The bill tracks calls times context. New work barely moves it. Every call sends the conversation again, and the plan charges for the whole of it, so a thread that runs all day pays for its own history all day. The rate is flat and the usage is not capped. A call that does nothing still sends the base. A call that reads one line still sends the base.",
        "The log says where the input went. 87.9 percent of all input was a cache read, and most of that read was the same text. 60 percent of all input was one 32.5K base, sent again on every call. The base is the instruction set, the tool list and the history the harness carries. I did not add to it between calls. It went out anyway, charged as fresh input each time.",
        "Heads up, that 87.9 percent comes from one 104-call window, not the whole run.",
        "I measured the token numbers myself, from the harness log on this machine. The harness counted its own calls and its own tokens, and that count is what every figure here rests on. The plan's meter is a separate count, and I have not checked one against the other. I will not print a figure for the bill, because I cannot check it against an invoice. The mechanism is the part I can stand behind.",
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
          "Before this change the harness ran in a mode where a small model judged every command before it ran. That judge timed out four times in one day. A timeout is not free. The retry sends the whole context again, so a slow judge turns into a bill with a delay attached.",
          "So the provider windows stopped using it. In nufra commit 9c9160b (11-26 14:18) the gateway windows start in accept edits, with Bash, Read, Edit and Write allowed. The global default is still auto. Why: my own line at 12:25 was \"timed out four times today\".",
          "I replaced the judge with four permission wildcards, one for each kind of call the harness makes. Those four covered 273 of the 275 tool uses in the run. For the shell commands the wildcards did not cover, the rule became mine to approve, and my line to the harness was: \"ok 1+2, if u need permission, dont stop on terminal, ask me here with bash script like `! ~/example/script.ts` so i can run it and u can try again\"",
        ],
        data: [
          { label: "judge timeouts in one day", before: "4", after: "not measured" },
          { label: "tool uses covered by the allow list", after: "273 / 275" },
          { label: "tokens per call, before and after", after: "not measured" },
        ],
        charts: ["permission-cover"],
        effect: [
          "Nothing was measured. I have no before and after for this change. I did not take a token count before the wildcards went in and I did not take one after, so I cannot say what the judge cost or what the wildcards saved. A timeout is visible when it happens and invisible a week later, because the log records the retry and not the reason for it.",
          "What I can say is what did not change. The 32.5K base still went out on every call, and it was 60 percent of all input. The wildcards removed a source of retries. They did nothing to the context that went out on every call.",
        ],
        worked: ["The retries stopped, and I stopped being interrupted."],
        didNot: ["The bill, because the base was never the judge's fault.", "The base stayed the same size."],
      },
      {
        id: "attempt-2",
        tag: "attempt 2 / 4",
        outcome: "fewer calls",
        heading: "Batching, econ mode",
        changed: [
          "The baseline was the window before batching. The median was 13 calls per message, and the mean was 22.5, so a few heavy messages pulled the average up. The window held 178 tool calls at 1.39 calls per tool call. 143 of those tool calls were one small script each, so the calls multiplied faster than the work did. The median message pulled 951,168 input tokens through the plan. Each of those calls carried the whole base again.",
          "The change was simple to state. One call now carries every independent read of a phase. The reads go out together and the base goes out once for the lot.",
          "I called it econ mode, and then I asked for it to stay always on for nibie.",
        ],
        data: [
          { label: "mean calls per message", before: "22.5", after: "9.5 (n=2)" },
          { label: "median calls per message", before: "13", after: "not measured" },
          { label: "replay ceiling, input saved", after: "44%" },
        ],
        charts: ["calls-per-message", "batching-ladder"],
        effect: [
          "The first reading after batching began was 9.5 calls per message, against the baseline mean of 22.5. That 9.5 is a mean of 2 messages, 19 calls, so n=2. The base did not shrink with batching. What shrank was the number of times it went out.",
          "I then replayed the calls to see what full batching would buy. At 2 reads per call the saving came to 23 percent. At 3 reads per call it was 30 percent. At 5 it was 36 percent. If every single read batched, the saving was 44 percent, and that is a ceiling. No real phase reads in that tidy a pattern, so I do not plan with 44. The replay is arithmetic over the calls already in the log. It is not a fresh run with batching on.",
          "The real reading I promised after more messages never happened. I never got a measured number for a fully batched window, so 9.5 calls per message is the only figure from the live harness, and everything above it is arithmetic on old calls.",
        ],
        worked: ["The call count, which is the thing I can see in the log without a replay."],
        didNot: ["The base, which is still the largest single line in every call."],
      },
      {
        id: "attempt-3",
        tag: "attempt 3 / 4",
        outcome: "cost kept",
        heading: "Shrink the floor",
        note: "I didn't remember this one, so I said \"you name it\". Claude named it from the logs.",
        changed: [
          "This is the one I could not name at the time. Something in the base cost tokens on every call, and I had no figure for which part. So I measured the plugins, at 19:24. With them on, a call carried 22,381 tokens at the median. With them off, 19,998. That put the plugins at 2,383 tokens per call. Against the floor of the base it was 10.6 percent, and against the whole bill it was 4.5 percent. Those are medians of four runs.",
        ],
        data: [
          { label: "median tokens per call, plugins on → off", before: "22,381", after: "19,998" },
          { label: "plugins per call, share of the bill", after: "2,383 · 4.5%" },
          { label: "fresh windows: 7 hand-overs, saving", after: "not measured" },
        ],
        charts: ["floor-split", "plugin-cost"],
        effect: [
          "I left the plugins on. So the measurement stands on its own and no change followed it. What I had at the end was a number for a cost I chose to keep. Plugins earn their tokens in what they let the harness do, and I wanted that behaviour.",
          "Two alternatives sat under that decision. A fresh window at a gate drops the context back to 32.5K and starts clean, and it loses the session with it. I did use that one: 7 hand-overs to a fresh nibie window that night, and I never measured what they saved. A bare mode came to 1,234 tokens against the 22,381, 94.5 percent lower. I rejected it because it is a different product. On this harness it would be a rewrite, and I wanted a setting.",
          "So the third attempt ends with a measurement and a decision, and the decision was to keep paying the cost. That is a poorer result than the first two. It is also the honest one, because a saving I do not take is not a saving I can claim.",
        ],
        worked: ["The measurement, which told me where 10.6 percent of the floor sat.", "Fresh windows through hand-over, 7 that night."],
        didNot: ["Everything downstream of it, because I kept the cost.", "The hand-overs were never measured."],
      },
      {
        id: "attempt-4",
        tag: "attempt 4 / 4",
        outcome: "300 a day",
        heading: "Delegate tool calls to free subagents",
        changed: [
          "The change was narrow. Only the subagent slot moved to a free model. Every other slot stayed on the paid one, so the orchestrator kept the thread and the subagents did the wide reading.",
        ],
        data: [
          { label: "probe 1 input", before: "1.19M", after: "358K" },
          { label: "probe 2 input", before: "1.51M", after: "456K" },
          { label: "tokens on hy4-flash:free before the cap", after: "12,061,469" },
        ],
        charts: ["delegation-probes"],
        effect: [
          "I ran two probes to see what the move was worth. In the first, input fell from 1.19M tokens to 358K. In the second, it fell from 1.51M to 456K. Both are the harness log's own count, over the window each probe covered.",
          "Then the wall. 12,061,469 tokens ran on hy4-flash:free, and at 01:26 the call failed with \"daily free quota exceeded (300/day)\". The quota resets at midnight, which was about 22.5 hours away. A running window cannot pick the change up, because the environment variable is read at launch, so the setting applies to the next window and not the one in front of me.",
          "My own line at the time was \"which are not really felt it since only 300 call\", and that is the honest summary. The saving showed up in the probes. It never really showed up in a working day, because the free capacity ran out before the day did. Free capacity is useful to have. On the thread that carries the work, it did not lower anything I could see.",
        ],
        worked: ["The probes, and the proof that a free subagent really does the reading."],
        didNot: ["A working day, because the free capacity ran out before the day did."],
      },
    ],
    part2: "part 2 · the films, on the cheapest model available",
    filmsIntro: [
      "I made three attempts and all three fail, in my own words at the time. They go on this page as lessons.",
      "Why they failed, in my words: \"the model i choose didn't have the art direction\".",
    ],
    films: [
      {
        id: "film-1",
        tag: "film 1 / 3",
        outcome: "failed",
        heading: "hy4-flash, no audio",
        note: "My words at the time: \"with free hy4-fast\".",
        changed: [
          "The subagent was hy4-flash. The free tier had stopped at 01:26, so I said \"just strip the :free then continue\" at 01:30, and film 1 ran on paid hy4-flash. Built 02:03 to 02:12.",
        ],
        data: [
          { label: "length", after: "36 s" },
          { label: "audio", after: "none" },
          { label: "tokens", after: "not split" },
        ],
        film: 0,
        effect: [
          "The first ran 36 seconds and had no audio track at all. A hy4-flash subagent built it, and the missing sound was not a choice I made. It was missing, and I did not catch it in the file check. Four stills were sampled in review.",
        ],
        worked: ["It ran end to end and made a 36 s file."],
        didNot: ["No sound at all, and no art direction."],
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
          { label: "tokens", after: "not split" },
        ],
        film: 1,
        effect: [
          "The second ran 39 seconds and had sound. The same hy4-flash built it, and this time a taste document was written first, so the look had a brief behind it. The sound is the only thing I can point at as an improvement. The picture still came from a scene nobody had checked.",
        ],
        worked: ["Sound, and a brief behind the look."],
        didNot: ["A taste doc and a reference are not art direction. The picture was still off."],
      },
      {
        id: "film-3",
        tag: "film 3 / 3",
        outcome: "failed, 128.6M",
        heading: "deepseek-v4.1-flash-1017",
        note: "My words at the time: \"spent 150M out of 1B token i subscribed for a month\".",
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
          "The third ran 84 seconds and a deepseek-v4.1-flash-1017 subagent built it. It is the one I measured properly. True peak landed at -1.8 dBFS against a -2.0 target. Loudness range came to 6.4 LU against a 7 target. Both are close and neither is on target.",
          "It failed in three ways, and I said them plainly: \"the palette put the subject in almost the same colour as the ground\", \"the 3D was nine hundred primitives and no material\", \"I never looked at a single frame before rendering 2,520\".",
        ],
        effectCharts: ["film-targets"],
        worked: ["The sound came close to target, and it is the one I measured properly."],
        didNot: ["The picture: palette, no material, no art direction. And 128.6M tokens for it."],
      },
    ],
    filmMedia: [
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
          "Second attempt, 39 seconds, built by a hy4-flash subagent from a taste document and a video reference. It has sound.",
        mp4: "/video/page-v2.mp4",
        poster: "/video/poster-v2.jpg",
        posterAlt: "Poster frame: on a near-black background, a large amber zero sits at the left edge.",
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
    bill: {
      heading: "150M out of 1B",
      paragraphs: [
        "The three films together processed 188,794,296 tokens, cache included, measured from the logs. Film 3 alone was 128,586,166. Films 1 and 2 shared one window of 60,208,130, and I can't split it.",
        "I said \"spent 150M out of 1B\". The log says 188.8M, and that's before this article.",
      ],
      charts: ["film-attempts", "quota-burn"],
      pull: "not worth it right?",
    },
    night: {
      heading: "The night",
      paragraphs: [
        "The work ran from 19:02 on Nov 26 to 08:04 on Nov 27. My last prompt went in at 04:14 and the next one at 08:04. The three films finished at 02:12, 03:17 and 07:58.",
        "That is one night of work, run through the dark. It was a night without sleep. I did not plan it that way. The queue kept running and each film ended late. The last one closed at 07:58, and I had been awake since the evening before.",
        "No sleep, and it ruined my next day. The log counts tokens. It has no column for the hours.",
      ],
      chart: "the-night",
    },
    verdict: {
      heading: "Verdict: not built for heavy agentic work",
      thesis:
        "A generous flat rate is still the champion for a chatbot, a school-level coding assistant, a coding assistant in VS Code, a one-file editor or a one-shot HTML page, but it is not built for a heavy agentic workflow, and for me, it fails at the moment.",
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
        "The plan charged for input, and it charged the same rate for a cache read as for new text, and it said so. What it did was make the inefficiency visible in one number. 87.9 percent of input was a cache read, and the median message pulled 951,168 tokens. On a metered plan the same waste would have spread over small charges and never shown its shape.",
        "So the number is a mirror. I did not fix all of it. I left the plugins on, and I never got the measured reading for a fully batched window. If you run an agent on a flat rate plan, count the calls before you count the words.",
        "Not to mention this article itself cost 61,840,287 tokens, more than 50M, because the first iterations forgot my instructions.",
        "This is a note. The work section of this site holds client work and each piece ends with a result. This one has no result at the end. It is one run of an agent harness, written down while the numbers are fresh and the films are still bad.",
      ],
      rule: "The rule I take out of it is the order: one still before the queue.",
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
