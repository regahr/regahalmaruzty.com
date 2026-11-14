// All page copy lives here, so a CV update does not touch layout code.

// The address that serves the page directly; the bare domain 307-redirects here.
export const siteUrl = "https://www.regahalmaruzty.com";
export const chickPenUrl = "https://chick-pen.regahalmaruzty.com";

export const profile = {
  name: "Rega Halma Ruzty",
  title: "Senior Backend Engineer",
  titleSuffix: "former Engineering Lead",
  tagline: "product-minded. backend-deep. building ai-assisted delivery workflows.",
  lede: {
    lead: "I build backend systems that move money and can't afford to be wrong.",
    years: "9+ years",
    rest: "across fintech, banking, healthcare and enterprise: Node.js, TypeScript, PostgreSQL, distributed systems, and the boring parts that keep them correct, like idempotency, retries and reconciliation.",
  },
  typingWords: [
    "food reviewer",
    "offlaner",
    "product engineer",
    "ai workflow builder",
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
  { prefix: "<", value: "100", unit: "ms", label: "timing-out query after a CTE rewrite" },
  { prefix: "~", value: "4", unit: "x", label: "weekly ticket output with my AI-assisted workflow" },
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
    wide: true,
  },
  {
    slug: "ai-assisted-delivery",
    meta: "ai · workflow · 2026",
    title: "Shipping with an AI-assisted delivery workflow",
    problem: "One API ticket used to take me 2-3 days, mostly testing it myself before I trusted it.",
    approach:
      "My own workflow that pairs AI agents with human sign-off at each step, and leaves tests and recorded evidence behind every change.",
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
    slug: "never-double-charge",
    meta: "payments · backend · now",
    title: "Backends that never double-charge",
    problem: "Bank GIRO collections and refunds, plus migrations on data that can't be wrong.",
    approach: "Idempotency keys, queued retries, reconciliation; parallel-run validation before every cutover.",
    result: "100% data integrity across production migrations, zero-downtime releases.",
    stack: ["NestJS", "PostgreSQL", "Redis", "NSQ"],
    points: [
      "Idempotency keys, so a retried request returns the first result instead of charging again.",
      "Queued retries instead of retrying inline.",
      "Reconciliation against the bank.",
      "Migrations run in parallel with the old path and are compared before cutover.",
      "A timing-out query rewritten with a CTE, now under 100 ms.",
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
    repo: "denrose",
    title: "Denrose",
    description: "Storefront for handmade clay earrings, with a CMS for the catalogue and a 3D clay earring.",
    stack: ["Next.js 14", "Sanity", "Three.js"],
    live: "https://denrose.store",
  },
  {
    repo: "doc-gen",
    title: "Doc Gen",
    description: "Turborepo monorepo for DOCX to PDF conversion, S3 storage and e-signing via Docuseal.",
    stack: ["NestJS", "Next.js", "S3", "Turborepo"],
    code: "https://github.com/regahr/doc-gen",
  },
  {
    repo: "appointment-api",
    title: "Appointment API",
    description: "Scheduling API with slot constraints, documented system and database design.",
    stack: ["NestJS", "TypeScript", "SQLite"],
    code: "https://github.com/regahr/appointment-api",
  },
];

export const moreProjects = [
  { name: "chick-pen", note: "the chicks from the about section, as a game", href: chickPenUrl },
  { name: "loop_station", note: "browser audio looper", href: "https://loop-station-nu.vercel.app" },
  {
    name: "fullstack-turborepo-starter",
    note: "Nest + Next starter",
    href: "https://github.com/regahr/fullstack-turborepo-starter",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "backend", items: ["Node.js", "NestJS", "Express", "TypeORM", "REST"] },
  { group: "data", items: ["PostgreSQL", "MongoDB", "Redis", "query tuning", "migrations"] },
  { group: "distributed", items: ["NSQ", "Kafka", "idempotency", "distributed locks", "reconciliation"] },
  { group: "cloud & ops", items: ["AWS ECS/EC2/S3", "Docker", "GitHub Actions", "Grafana"] },
  { group: "frontend", items: ["React", "Next.js", "TypeScript"] },
  { group: "ai-assisted", items: ["Claude Code", "Codex", "workflow orchestration"] },
  { group: "certified", items: ["MongoDB C100DBA", "MongoDB C100DEV"] },
];
