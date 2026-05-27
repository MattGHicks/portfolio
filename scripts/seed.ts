/**
 * Seed the career dashboard from the existing vault state.
 * Sources: career/applications.md, career/job-search-ops-plan.md (standing defaults).
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";
import { sql } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL not set");

const client = postgres(connectionString, { prepare: false, max: 5 });
const db = drizzle(client, { schema });

type SubmittedSeed = {
  company: string;
  title: string;
  sourceUrl?: string;
  atsPlatform: typeof schema.atsPlatformEnum.enumValues[number];
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  remotePolicy: typeof schema.remotePolicyEnum.enumValues[number];
  notes?: string;
  glassdoorRating?: string;
  submittedAt: string;
  tier: typeof schema.roleTierEnum.enumValues[number];
  narrativeBucket: typeof schema.narrativeBucketEnum.enumValues[number];
};

const SUBMITTED: SubmittedSeed[] = [
  {
    company: "WorkOS",
    title: "Product Designer",
    atsPlatform: "company_page",
    remotePolicy: "remote_us",
    glassdoorRating: "4.2",
    notes: '4.2★ · 74% recommend · fully remote w/ bi-annual meetups · "Kindness" as operating principle',
    submittedAt: "2026-05-08",
    tier: "A",
    narrativeBucket: "b2b_infra_fintech",
  },
  {
    company: "Figma",
    title: "Product Designer — Design, Dev, & AI Tools",
    sourceUrl: "https://job-boards.greenhouse.io/figma/jobs/5711468004",
    atsPlatform: "greenhouse",
    salaryMin: 135000,
    salaryMax: 303000,
    location: "Remote US",
    remotePolicy: "remote_us",
    notes: "Required: 3+ yrs (Matt has 3.25) — exact fit. AI tools experience preferred = direct hit.",
    submittedAt: "2026-05-09",
    tier: "S",
    narrativeBucket: "ai_devtools",
  },
  {
    company: "Spotify",
    title: "Product Designer — Advertising",
    sourceUrl: "https://www.lifeatspotify.com/jobs/product-designer-advertising",
    atsPlatform: "company_page",
    salaryMin: 119000,
    salaryMax: 170000,
    remotePolicy: "remote_with_restrictions",
    notes: "Right tier · AI tools in JD · Minuteman Press 6 yrs in-house ad design = direct hit · ⚠️ Verify Tampa-remote eligibility",
    submittedAt: "2026-05-09",
    tier: "A",
    narrativeBucket: "b2b_infra_fintech",
  },
  {
    company: "OnePay",
    title: "Product Designer",
    sourceUrl: "https://jobs.ashbyhq.com/oneapp/eadee5e1-633c-48db-9176-548e6856afdc",
    atsPlatform: "ashby",
    salaryMin: 130000,
    salaryMax: 180000,
    remotePolicy: "remote_us",
    notes: "Right tier (3-7 yrs · Matt 3.25) · band dead-center · Walmart + Ribbit Capital backed",
    submittedAt: "2026-05-09",
    tier: "A",
    narrativeBucket: "b2b_infra_fintech",
  },
  {
    company: "Supabase",
    title: "Design Engineer",
    sourceUrl: "https://jobs.ashbyhq.com/supabase/2e6ee4b3-6573-477f-9c95-d1221cd9f9f9",
    atsPlatform: "ashby",
    remotePolicy: "remote_global",
    notes: "⚠️ Stretch — role is engineer-leaning · Matt's AI fluency + self-built portfolio addressed in answers · OSS-contributions filter risk · Born-remote · 280+ ppl across 55+ countries",
    submittedAt: "2026-05-09",
    tier: "A",
    narrativeBucket: "ai_devtools",
  },
  {
    company: "Upstart",
    title: "Product Designer, Unsecured Lending",
    sourceUrl: "https://careers.upstart.com/jobs/product-designer-unsecured-lending",
    atsPlatform: "greenhouse",
    salaryMin: 138600,
    salaryMax: 192000,
    remotePolicy: "remote_us",
    notes: "Strong fit · 3+ yrs (Matt 3.25) · GenAI fluency required · Fintech preferred · #LI-MidSenior · borrower-facing flows",
    submittedAt: "2026-05-09",
    tier: "A",
    narrativeBucket: "b2b_infra_fintech",
  },
  {
    company: "Modea",
    title: "Product Designer II",
    atsPlatform: "jazzhr",
    remotePolicy: "remote_with_restrictions",
    notes: "Right tier · ⚠️ remote is VA/TN/NC only (Tampa out of scope) · agency PD II typically <$130K",
    submittedAt: "2026-05-09",
    tier: "B",
    narrativeBucket: "other",
  },
  {
    company: "Hopper (HTS)",
    title: "Sr Product Designer — Fintech",
    sourceUrl: "https://jobs.ashbyhq.com/hopper/5a17cdcd-1c39-40fc-a009-0cdc0e10df34",
    atsPlatform: "ashby",
    remotePolicy: "remote_us",
    notes: "⚠️ Stretch (Senior vs. 3.25 yrs) but strong narrative: multi-tenant embedded fintech-travel = parallel to Revize · 2026 Agentic AI award winner",
    submittedAt: "2026-05-09",
    tier: "A",
    narrativeBucket: "b2b_infra_fintech",
  },
  {
    company: "Ramp",
    title: "Product Designer",
    sourceUrl: "https://jobs.ashbyhq.com/ramp/eca54d0e-232a-4c3e-bfcc-d6c6add393f5",
    atsPlatform: "ashby",
    salaryMin: 172000,
    salaryMax: 440000,
    remotePolicy: "remote_us",
    notes: '🔥 Strongest fit. JD literally describes Matt\'s workflow ("design starts in an LLM, moves into Cursor or Claude Code, then Figma"). Submitted with custom 1-page cover letter PDF + 3 essay answers.',
    submittedAt: "2026-05-10",
    tier: "S",
    narrativeBucket: "ai_devtools",
  },
  {
    company: "Experian",
    title: "Product Designer (Remote)",
    atsPlatform: "linkedin",
    salaryMin: 71000,
    salaryMax: 124000,
    remotePolicy: "remote_us",
    notes: "LinkedIn Easy Apply · Full Sail alumni at Experian = real warm-network angle",
    submittedAt: "2026-05-09",
    tier: "B",
    narrativeBucket: "b2b_infra_fintech",
  },
];

type ShortlistSeed = {
  company: string;
  title: string;
  sourceUrl?: string;
  atsPlatform: typeof schema.atsPlatformEnum.enumValues[number];
  salaryMin?: number;
  salaryMax?: number;
  remotePolicy: typeof schema.remotePolicyEnum.enumValues[number];
  tier: typeof schema.roleTierEnum.enumValues[number];
  narrativeBucket: typeof schema.narrativeBucketEnum.enumValues[number];
  status: typeof schema.roleStatusEnum.enumValues[number];
  score?: number;
  scoreReasoning?: string;
  notes?: string;
};

const SHORTLIST: ShortlistSeed[] = [
  {
    company: "OpenRouter",
    title: "Product Designer",
    sourceUrl: "https://jobs.ashbyhq.com/openrouter/8cbbb823-11d0-4c26-ab41-41419361060c",
    atsPlatform: "ashby",
    remotePolicy: "remote_us",
    tier: "S",
    narrativeBucket: "ai_devtools",
    status: "drafting",
    score: 16,
    scoreReasoning:
      "Title: 3 (plain Product Designer · 3-8 years) · Salary: 2 (not posted, said competitive) · Narrative: 3 (bullseye — LLM marketplace, model discovery, dev docs) · AI fluency: 3 (their core product is AI infra) · Health: 2 (small high-bar team, need verification) · Remote: 3 (remote US verified)",
    notes: "Draft exists at career/drafts/2026-05-24-openrouter-product-designer.md (primary voice anchor)",
  },
  {
    company: "Ditto",
    title: "Product Designer",
    sourceUrl: "https://www.ycombinator.com/companies/ditto/jobs/ZnYSN1L-product-designer",
    atsPlatform: "yc",
    salaryMin: 140000,
    salaryMax: 200000,
    remotePolicy: "remote_us",
    tier: "S",
    narrativeBucket: "ai_devtools",
    status: "drafting",
    score: 14,
    scoreReasoning: "Title: 3 · Salary: 3 · Narrative: 2 · AI fluency: 2 (product-copy infra design→prod) · Health: 2 (YC) · Remote: 3",
    notes: "Email-based application · draft at career/drafts/2026-05-24-ditto-product-designer.md",
  },
  {
    company: "Railway",
    title: "Product Designer",
    sourceUrl: "https://jobs.ashbyhq.com/Railway/6fb07755-acd8-4400-9de3-fa598e4eeb7d",
    atsPlatform: "ashby",
    remotePolicy: "remote_us",
    tier: "A",
    narrativeBucket: "ai_devtools",
    status: "scored",
    score: 13,
    scoreReasoning: "Title: 3 (plain Product Designer) · Salary: 1 (not posted, verify) · Narrative: 3 (deploy infra) · AI: 2 · Health: 2 (~21 ppl, limited Glassdoor) · Remote: 2",
    notes: "Confirm comp floor and remote-FL specifically before deep prep.",
  },
  {
    company: "Hugging Face",
    title: "UX/UI Designer (US Remote)",
    sourceUrl: "https://www.glassdoor.com/job-listing/ux-ui-designer-us-remote-hugging-face-JV_IC1132348_KO0,24_KE25,37.htm",
    atsPlatform: "company_page",
    remotePolicy: "remote_global",
    tier: "A",
    narrativeBucket: "ai_devtools",
    status: "scored",
    score: 14,
    scoreReasoning: "Title: 2 · Salary: 1 (not posted, comp rated 3.9 = modest) · Narrative: 3 (open-source AI ecosystem) · AI: 3 (default fluency) · Health: 3 (4.4★ · 84% recommend) · Remote: 2",
    notes: "Verify base ≥ $130K floor in screening before investing time.",
  },
  {
    company: "Coinbase",
    title: "Product Designer II — Platform (Remote USA)",
    sourceUrl: "https://www.coinbase.com/careers/positions/5958223",
    atsPlatform: "company_page",
    remotePolicy: "remote_us",
    tier: "B",
    narrativeBucket: "b2b_infra_fintech",
    status: "scored",
    score: 10,
    scoreReasoning: "Title: 3 (exact PD II) · Salary: 0 (not posted) · Narrative: 2 (fintech B2B platform) · AI: 1 · Health: 0 (3.7★ but 54% recommend, 2.9 WLB, layoff exposure) · Remote: 3",
    notes: "⚠️ Sits right at the edge of culture filter. Fallback only.",
  },
  {
    company: "Finta",
    title: "Founding Designer",
    sourceUrl: "https://www.ycombinator.com/companies/finta/jobs/awUE3Ik-founding-designer",
    atsPlatform: "yc",
    salaryMin: 140000,
    salaryMax: 220000,
    remotePolicy: "remote_us",
    tier: "B",
    narrativeBucket: "b2b_infra_fintech",
    status: "scored",
    score: 9,
    scoreReasoning: "Founding Designer = senior-ownership feel · 1-5% equity · employee #3",
    notes: "Optional startup swing, not a mainline target",
  },
];

const WATCHLIST = [
  { name: "Mixpanel", priority: "S" as const, notes: "Sr PD currently $202.5-247.5K · MCP launched recently = narrative match. Watch for non-Sr." },
  { name: "Linear", priority: "S" as const, notes: "Sr/Staff only · revered design culture · watch for mid-level" },
  { name: "Vercel", priority: "S" as const, notes: "Sr PD ($156-234K) + Design Eng Sr · watch for mid-level" },
  { name: "Plaid", priority: "A" as const, notes: "Consumer fintech, similar to OnePay · top-of-market" },
  { name: "Atlassian", priority: "A" as const, notes: "Team Anywhere · $100-220K · only Design Intern open currently" },
  { name: "GitHub", priority: "A" as const, notes: "Microsoft-owned · strong design org · Copilot AI focus" },
  { name: "Postman", priority: "A" as const, notes: "Remote-first dev tools · PD roles common" },
  { name: "1Password", priority: "A" as const, notes: "Fully remote · Sr PD $148-181K · watch for mid-level" },
  { name: "Automattic", priority: "A" as const, notes: "Fully distributed · watch for mid-level" },
  { name: "Sourcegraph", priority: "A" as const, notes: "Historically all-remote · AI dev tools · zero design roles currently" },
  { name: "GitLab", priority: "B" as const, notes: "Sr PD AI ($140-200K) · strategic stretch" },
  { name: "Reddit", priority: "A" as const, notes: "Mid-level PD postings (Sr requires 5+ yrs)" },
  { name: "Sentry", priority: "A" as const, notes: "Fully remote dev tools" },
  { name: "Ramp", priority: "S" as const, notes: "Already submitted 2026-05-10 — keep watching for new postings" },
  { name: "OpenRouter", priority: "S" as const, notes: "Currently drafting" },
  { name: "Railway", priority: "A" as const, notes: "Currently scored, awaiting comp verification" },
];

const ASHBY_SLUG: Record<string, string> = {
  Ramp: "ramp",
  OpenRouter: "openrouter",
  Railway: "Railway",
  Hopper: "hopper",
  OnePay: "oneapp",
  Supabase: "supabase",
};

const STANDING_ANSWERS = [
  { key: "name", value: "Matt Hicks", label: "Full name", category: "identity" },
  { key: "location", value: "Tampa, FL", label: "Location", category: "identity" },
  { key: "phone", value: "678.362.2116", label: "Phone", category: "identity" },
  { key: "email", value: "matt@digitalfish.io", label: "Email (career)", category: "identity" },
  { key: "portfolio_url", value: "https://digitalfish.io", label: "Portfolio", category: "identity" },
  { key: "linkedin_url", value: "https://linkedin.com/in/matthicksfl", label: "LinkedIn", category: "identity" },
  { key: "work_authorization", value: "yes", label: "Authorized to work in US", category: "eligibility" },
  { key: "visa_sponsorship_needed", value: "no", label: "Need visa sponsorship now or in the future", category: "eligibility" },
  { key: "veteran_status", value: "no", label: "Veteran status", category: "eeoc" },
  { key: "disability_status", value: "no", label: "Disability / history of disability", category: "eeoc" },
  { key: "eeoc_default", value: "decline_to_answer", label: "EEOC demographic default", category: "eeoc" },
  { key: "remote_only", value: "yes", label: "Remote-only", category: "logistics" },
  { key: "relocation_open", value: "no", label: "Open to relocation", category: "logistics" },
  { key: "salary_floor_usd", value: "100000", label: "Practical salary floor (base)", category: "compensation" },
  { key: "salary_target_min_usd", value: "140000", label: "Target band min (base)", category: "compensation" },
  { key: "salary_target_max_usd", value: "180000", label: "Target band max (base)", category: "compensation" },
  { key: "submission_cap_per_day", value: "3", label: "Daily submission cap", category: "guardrails" },
  { key: "submission_cap_per_week", value: "10", label: "Weekly submission cap", category: "guardrails" },
  { key: "system.paused", value: "false", label: "System paused (kill switch)", category: "guardrails" },
  { key: "cover_letter_voice_anchor_primary", value: "openrouter", label: "Primary voice anchor for auto-drafts", category: "drafting" },
  { key: "cover_letter_voice_anchor_secondary", value: "ramp_2026-05-10", label: "Secondary voice anchor", category: "drafting" },
];

async function main() {
  console.log("→ Clearing existing seed data...");
  await db.execute(sql`TRUNCATE TABLE applications, drafts, inbox_messages, outreach_log, roles, watchlist_companies, standing_answers RESTART IDENTITY CASCADE`);

  console.log(`→ Seeding ${STANDING_ANSWERS.length} standing answers...`);
  await db.insert(schema.standingAnswers).values(STANDING_ANSWERS);

  console.log(`→ Seeding ${WATCHLIST.length} watchlist companies...`);
  await db.insert(schema.watchlistCompanies).values(
    WATCHLIST.map((w) => ({
      name: w.name,
      priority: w.priority,
      atsPlatform: ASHBY_SLUG[w.name] ? ("ashby" as const) : ("other" as const),
      atsBoardSlug: ASHBY_SLUG[w.name] ?? null,
      atsBoardUrl: ASHBY_SLUG[w.name] ? `https://jobs.ashbyhq.com/${ASHBY_SLUG[w.name]}` : null,
      notes: w.notes,
      active: true,
    }))
  );

  console.log(`→ Seeding ${SUBMITTED.length} submitted applications...`);
  for (const sub of SUBMITTED) {
    const submittedAt = new Date(sub.submittedAt + "T12:00:00-04:00");
    const [role] = await db
      .insert(schema.roles)
      .values({
        company: sub.company,
        title: sub.title,
        sourceUrl: sub.sourceUrl,
        atsPlatform: sub.atsPlatform,
        salaryMin: sub.salaryMin,
        salaryMax: sub.salaryMax,
        location: sub.location ?? null,
        remotePolicy: sub.remotePolicy,
        notes: sub.notes,
        glassdoorRating: sub.glassdoorRating,
        status: "submitted",
        tier: sub.tier,
        narrativeBucket: sub.narrativeBucket,
        scoredAt: submittedAt,
      })
      .returning();

    await db.insert(schema.applications).values({
      roleId: role.id,
      status: "submitted",
      submittedAt,
      approvedAt: submittedAt,
      submissionLog: [
        { at: submittedAt.toISOString(), event: "submitted_manually", data: { source: "seed_from_vault" } },
      ],
    });
  }

  console.log(`→ Seeding ${SHORTLIST.length} shortlist roles...`);
  await db.insert(schema.roles).values(
    SHORTLIST.map((s) => ({
      company: s.company,
      title: s.title,
      sourceUrl: s.sourceUrl,
      atsPlatform: s.atsPlatform,
      salaryMin: s.salaryMin,
      salaryMax: s.salaryMax,
      remotePolicy: s.remotePolicy,
      notes: s.notes,
      status: s.status,
      tier: s.tier,
      narrativeBucket: s.narrativeBucket,
      score: s.score,
      scoreReasoning: s.scoreReasoning,
      scoredAt: new Date(),
    }))
  );

  console.log("✓ Seed complete");
  await client.end();
}

main().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
