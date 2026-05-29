/**
 * Which ATS platforms the Playwright submitter can auto-fill + submit.
 * Kept in sync with the FILLERS map in scripts/submit/submit.mjs and the
 * submittable providers in lib/discovery/providers.ts.
 *
 * Everything else (workday, company_page, linkedin, indeed, jazzhr, yc, email,
 * other) is "manual apply": the dashboard sends you to the posting and lets you
 * mark it applied in one click — no misleading auto-submit affordance.
 */
export const AUTO_SUBMITTABLE_PLATFORMS = new Set(["ashby", "greenhouse", "lever"]);

export function isAutoSubmittable(platform: string | null | undefined): boolean {
  return !!platform && AUTO_SUBMITTABLE_PLATFORMS.has(platform);
}
