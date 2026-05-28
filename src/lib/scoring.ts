/**
 * Deterministic, zero-API role scoring.
 *
 * Encodes Matt's documented job-search filters (career/job-search-ops-plan.md +
 * career/applications.md) into a rule-based score so discovered roles surface
 * RANKED immediately — no Claude-in-the-loop required for the common case.
 * Claude can still refine high-value picks, but the dashboard is self-sufficient.
 *
 * Inputs come straight off the `roles` row. Output is { score, tier, bucket,
 * reasoning } ready to write back.
 *
 * Tunables live in SCORING_CONFIG so the rubric can move without code surgery.
 */

export type ScoreableRole = {
  title: string;
  company?: string | null;
  jdText?: string | null;
  jdSnippet?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  remotePolicy?: string | null;
  postedAt?: Date | string | null;
  location?: string | null;
};

export type RoleTier = "S" | "A" | "B" | "drop";
export type NarrativeBucket = "ai_devtools" | "b2b_infra_fintech" | "govtech_civic" | "other";

export type ScoreResult = {
  score: number; // 0–100
  tier: RoleTier;
  bucket: NarrativeBucket;
  reasoning: string;
  hardDrop: boolean;
};

export const SCORING_CONFIG = {
  salaryFloor: 100_000,
  salaryTargetMin: 140_000,
  salaryTargetMax: 180_000,
  tierCutoffs: { S: 90, A: 72, B: 50 }, // below B → drop. S = bullseye (right-tier + remote + target salary + narrative); A = strong but something unverified (often salary not posted); B = workable with caveats.
  freshDays: 7,
};

// ---------------------------------------------------------------------------
// Keyword banks
// ---------------------------------------------------------------------------

const RIGHT_TIER_TITLE =
  /\b(product designer|ux designer|ui designer|ux\/ui designer|ux\/?ui|product design ii|product designer ii|experience designer|interaction designer|design engineer)\b/i;

const SENIOR_TITLE = /\b(senior|sr\.?|staff|lead|principal|head of|director|manager)\b/i;
const FOUNDING_TITLE = /\bfounding\b/i;

// Roles that are not product/UX design at all → hard drop
const NON_DESIGN_TITLE =
  /\b(engineer|engineering|developer|backend|frontend dev|software|sales|recruiter|account exec|marketing|finance|legal|data scientist|researcher|content|writer|program manager|product manager)\b/i;

const AI_DEVTOOLS = /\b(ai|a\.i\.|llm|genai|gen ai|generative|copilot|ml|machine learning|developer tool|dev tool|devtool|sdk|api|infrastructure|platform|open source|open-source)\b/i;
const FINTECH = /\b(fintech|payments?|banking|lending|financial|treasury|invoic|spend management|card issuing)\b/i;
const GOVTECH = /\b(government|govtech|civic|public sector|municipal|gov\b|public-sector)\b/i;

const SIGNAL_DESIGN_SYSTEM = /\b(design system|design systems|tokens?|variables|component library)\b/i;
const SIGNAL_FIGMA = /\bfigma\b/i;
const SIGNAL_A11Y = /\b(accessib|wcag|a11y|ada compliance)\b/i;
const SIGNAL_CODE = /\b(prototyp|html|css|front[- ]?end|react|next\.js|code|developer handoff|design-to-code|ships? code)\b/i;
const SIGNAL_AI_WORK = /\b(ai workflow|ai-native|ai native|prompt|claude|cursor|midjourney|design with ai)\b/i;

// Experience requirements
const EXP_HIGH = /\b([5-9]|1[0-9])\+?\s*(?:years?|yrs?)\b/i; // 5+ years
const EXP_RIGHT = /\b([1-4])\+?\s*(?:years?|yrs?)\b/i; // 1-4 years

// ---------------------------------------------------------------------------

function haystack(role: ScoreableRole): string {
  return [role.title, role.jdText, role.jdSnippet, role.location].filter(Boolean).join("  ").toLowerCase();
}

function countMatches(re: RegExp, s: string): number {
  const m = s.match(new RegExp(re.source, "gi"));
  return m ? m.length : 0;
}

export function classifyBucket(role: ScoreableRole): NarrativeBucket {
  // Weighted scoring instead of first-match: the title is the strongest signal
  // (×4), JD body is supporting evidence (×1). This stops a single stray
  // "government" in a benefits blurb from mislabeling an AI-tools role as govtech.
  const title = (role.title ?? "").toLowerCase();
  const body = [role.jdText, role.jdSnippet, role.location].filter(Boolean).join("  ").toLowerCase();

  const scoreBucket = (re: RegExp) => countMatches(re, title) * 4 + countMatches(re, body);
  const scores: Array<[NarrativeBucket, number]> = [
    ["ai_devtools", scoreBucket(AI_DEVTOOLS)],
    ["b2b_infra_fintech", scoreBucket(FINTECH)],
    ["govtech_civic", scoreBucket(GOVTECH)],
  ];
  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][1] > 0 ? scores[0][0] : "other";
}

function tierForScore(score: number): RoleTier {
  if (score >= SCORING_CONFIG.tierCutoffs.S) return "S";
  if (score >= SCORING_CONFIG.tierCutoffs.A) return "A";
  if (score >= SCORING_CONFIG.tierCutoffs.B) return "B";
  return "drop";
}

function daysSince(d: Date | string | null | undefined): number | null {
  if (!d) return null;
  const t = typeof d === "string" ? Date.parse(d) : d.getTime();
  if (Number.isNaN(t)) return null;
  return (Date.now() - t) / (1000 * 60 * 60 * 24);
}

export function scoreRole(role: ScoreableRole): ScoreResult {
  const h = haystack(role);
  const title = role.title ?? "";
  const reasons: string[] = [];
  let score = 50;
  let hardDrop = false;

  const bucket = classifyBucket(role);
  const isAiDevtools = bucket === "ai_devtools";

  // --- Title tier -----------------------------------------------------------
  const isRightTier = RIGHT_TIER_TITLE.test(title);
  const isSenior = SENIOR_TITLE.test(title);
  const isFounding = FOUNDING_TITLE.test(title);
  // A title with no design word at all and matching a non-design role → not for us.
  const looksDesign = /design/i.test(title);

  if (!looksDesign && NON_DESIGN_TITLE.test(title)) {
    hardDrop = true;
    reasons.push("Not a product/UX design role");
  }

  if (isRightTier && !isSenior) {
    score += 20;
    reasons.push("Right-tier title (Product/UX Designer)");
  } else if (isSenior) {
    if (isAiDevtools) {
      score -= 6;
      reasons.push("Senior/Staff title — moonshot, but strong AI/devtools fit softens it");
    } else {
      score -= 18;
      reasons.push("Senior/Staff title without an AI/devtools reason to stretch");
    }
  } else if (isFounding) {
    score -= 4;
    reasons.push("Founding/first-designer role — high ownership");
  }

  // --- Remote policy --------------------------------------------------------
  switch (role.remotePolicy) {
    case "remote_us":
      score += 14;
      reasons.push("Remote US");
      break;
    case "remote_global":
      score += 12;
      reasons.push("Remote (global)");
      break;
    case "remote_with_restrictions":
      score += 4;
      reasons.push("Remote with restrictions — verify Tampa/FL eligibility");
      break;
    case "hybrid":
      hardDrop = true;
      reasons.push("Hybrid — Matt won't relocate");
      break;
    case "onsite":
      hardDrop = true;
      reasons.push("Onsite — Matt won't relocate");
      break;
    default:
      reasons.push("Remote policy unknown — verify before applying");
  }

  // --- Salary ---------------------------------------------------------------
  const { salaryMin, salaryMax } = role;
  if (salaryMax != null && salaryMax > 0) {
    if (salaryMax < SCORING_CONFIG.salaryFloor) {
      hardDrop = true;
      reasons.push(`Top of band $${(salaryMax / 1000).toFixed(0)}K is below the $100K floor`);
    } else if (salaryMax >= SCORING_CONFIG.salaryTargetMin) {
      score += 12;
      reasons.push(`Salary reaches target band (max $${(salaryMax / 1000).toFixed(0)}K)`);
    } else {
      score += 4;
      reasons.push(`Salary $${(salaryMax / 1000).toFixed(0)}K clears floor but under target`);
    }
  } else {
    reasons.push("Salary not posted — verify in screen");
  }
  if (salaryMin != null && salaryMin >= SCORING_CONFIG.salaryTargetMax) {
    reasons.push(`Band starts high ($${(salaryMin / 1000).toFixed(0)}K) — likely senior-leaning`);
  }

  // --- Experience requirement ----------------------------------------------
  if (EXP_HIGH.test(h)) {
    score -= 16;
    reasons.push("Requires 5+ years — above Matt's 3.25");
  } else if (EXP_RIGHT.test(h)) {
    score += 6;
    reasons.push("1–4 yr requirement — exact fit");
  }

  // --- Narrative bucket -----------------------------------------------------
  if (bucket === "ai_devtools") {
    score += 10;
    reasons.push("AI / dev-tools — Matt's strongest narrative ('I'm the power user you're building for')");
  } else if (bucket === "b2b_infra_fintech") {
    score += 7;
    reasons.push("B2B / infra / fintech — complex-systems narrative");
  } else if (bucket === "govtech_civic") {
    score += 8;
    reasons.push("Govtech / civic — direct Revize parallel (190+ gov sites)");
  }

  // --- JD signal keywords (capped) -----------------------------------------
  let signalBoost = 0;
  const signals: string[] = [];
  if (SIGNAL_AI_WORK.test(h)) { signalBoost += 6; signals.push("AI-native workflow"); }
  if (SIGNAL_DESIGN_SYSTEM.test(h)) { signalBoost += 5; signals.push("design systems"); }
  if (SIGNAL_CODE.test(h)) { signalBoost += 4; signals.push("code/prototyping"); }
  if (SIGNAL_A11Y.test(h)) { signalBoost += 3; signals.push("accessibility"); }
  if (SIGNAL_FIGMA.test(h)) { signalBoost += 2; signals.push("Figma"); }
  signalBoost = Math.min(signalBoost, 16);
  if (signals.length) {
    score += signalBoost;
    reasons.push(`JD matches: ${signals.join(", ")}`);
  }

  // --- Freshness ------------------------------------------------------------
  const age = daysSince(role.postedAt);
  if (age != null && age <= SCORING_CONFIG.freshDays) {
    score += 5;
    reasons.push(`Fresh posting (${age < 1 ? "today" : `${Math.round(age)}d ago`})`);
  }

  // --- Clamp + finalize -----------------------------------------------------
  score = Math.max(0, Math.min(100, Math.round(score)));
  const tier: RoleTier = hardDrop ? "drop" : tierForScore(score);
  if (hardDrop && score > SCORING_CONFIG.tierCutoffs.B) {
    // A hard-drop reason overrides an otherwise-decent score.
    reasons.unshift("HARD DROP");
  }

  const reasoning =
    `${tier === "drop" ? "Drop" : `Tier ${tier}`} · score ${score}. ` +
    reasons.join(". ") +
    ". [auto-scored — Claude can refine]";

  return { score, tier, bucket, reasoning, hardDrop };
}
