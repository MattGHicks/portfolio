/**
 * Zero-API starter cover-letter generation.
 *
 * Produces a grounded, ready-to-review draft for any scored role so the
 * dashboard always has something to approve — no Claude-in-the-loop required.
 * The letter stays strictly within Matt's documented facts (no embellishment,
 * per the ops plan's principle #1). Claude can refine for top picks.
 */

import type { NarrativeBucket } from "@/lib/scoring";

const BUCKET_HOOK: Record<NarrativeBucket, string> = {
  ai_devtools:
    "Your team is building for people with an AI-native design workflow — which is exactly how I already work. Claude Code, MCP, and Figma AI are default tools for me, not novelties, and I've used them to ship real product at pace.",
  b2b_infra_fintech:
    "I make complex, compliance-heavy systems understandable. Across 190+ government websites I've turned dense requirements and multi-stakeholder constraints into clear, accessible interfaces — the same muscle B2B and fintech products demand.",
  govtech_civic:
    "I've shipped accessible civic UX at scale: 190+ government websites, WCAG-AA throughout, designed for the widest possible public audience. This is the work I know best.",
  other:
    "I pair strong product-design craft with an AI-native workflow and real front-end fluency — I design, prototype, and ship, and I've earned 3× Gold Horizon Interactive awards as designer-of-record doing it.",
};

export type AutoDraftInput = {
  company: string;
  title: string;
  bucket: NarrativeBucket;
};

export function generateCoverLetter({ company, title, bucket }: AutoDraftInput): string {
  const hook = BUCKET_HOOK[bucket] ?? BUCKET_HOOK.other;
  return `Hi team,

I'm Matt Hicks, a Product Designer in Tampa, FL, applying for the ${title} role at ${company}.

${hook}

A few proof points relevant to ${company}:
• 3+ years product/UX design at Revize — 190+ government websites shipped
• 3× Gold, 1× Best in Category, 1× Silver Horizon Interactive awards as designer-of-record (2024–2025)
• Design-system contributor: variables, tokens, modes, WCAG-AA accessibility, handoff docs
• AI-native workflow (Claude Code, MCP, Figma AI) + HTML/CSS/Next.js fluency — I built and ship digitalfish.io myself

Portfolio: https://digitalfish.io · Resume attached.

I'd welcome the chance to talk.

Matt Hicks
matt@digitalfish.io · 678.362.2116`;
}

/** Standard custom-answer prefill drawn from standing answers. */
export function defaultCustomAnswers(standing: Record<string, string>): Record<string, string> {
  return {
    linkedin: standing.linkedin_url ?? "https://linkedin.com/in/matthicksfl",
    portfolio: standing.portfolio_url ?? "https://digitalfish.io",
    work_authorization:
      standing.work_authorization === "yes"
        ? "Yes — authorized to work in the US, no sponsorship needed now or in the future"
        : "",
    remote_only: standing.remote_only === "yes" ? "Yes" : "",
    salary_expectation: `$${Number(standing.salary_target_min_usd ?? 140000) / 1000}K–${
      Number(standing.salary_target_max_usd ?? 180000) / 1000
    }K base (open to discussion based on total comp)`,
  };
}
