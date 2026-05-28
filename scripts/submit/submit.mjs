/**
 * Playwright submitter — runs in GitHub Actions.
 * Pulls application data from /api/applications/[id]/payload, routes to the
 * right ATS filler (Ashby or Greenhouse), screenshots, and (unless DRY_RUN)
 * submits. Posts result to /api/applications/[id]/result.
 *
 * Required env:
 *   BASE_URL         — e.g. https://www.digitalfish.io
 *   APPLICATION_ID   — numeric
 *   CANCEL_TOKEN     — auth for payload + result endpoints
 *   RESUME_PDF_PATH  — absolute path to resume.pdf
 *   DRY_RUN          — "false" to actually submit; anything else = prefill only
 */
import { chromium } from "playwright";
import path from "node:path";

const BASE_URL = process.env.BASE_URL;
const APPLICATION_ID = process.env.APPLICATION_ID;
const CANCEL_TOKEN = process.env.CANCEL_TOKEN;
const RESUME_PDF_PATH = process.env.RESUME_PDF_PATH;
const DRY_RUN = process.env.DRY_RUN !== "false";

if (!BASE_URL || !APPLICATION_ID || !CANCEL_TOKEN) {
  console.error("Missing env: BASE_URL, APPLICATION_ID, CANCEL_TOKEN");
  process.exit(1);
}

async function reportResult(ok, error, log, extra = {}) {
  await fetch(`${BASE_URL}/api/applications/${APPLICATION_ID}/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-cancel-token": CANCEL_TOKEN },
    body: JSON.stringify({ ok, error, log, ...extra }),
  });
}

async function tryFill(page, selector, value, log, label) {
  if (!value) return;
  const el = page.locator(selector).first();
  if (await el.isVisible({ timeout: 2000 }).catch(() => false)) {
    await el.fill(value).catch(() => {});
    log.steps.push({ at: new Date().toISOString(), step: `filled_${label}` });
  }
}

async function uploadResume(page, log) {
  const fileInput = page.locator('input[type="file"]').first();
  if ((await fileInput.isVisible({ timeout: 3000 }).catch(() => false)) && RESUME_PDF_PATH) {
    try {
      await fileInput.setInputFiles(RESUME_PDF_PATH);
      log.steps.push({ at: new Date().toISOString(), step: "uploaded_resume" });
    } catch (err) {
      log.steps.push({ at: new Date().toISOString(), step: "resume_upload_skipped", reason: String(err) });
    }
  }
}

async function fillAshby(page, { application, standing }, log) {
  const applyBtn = page.locator('a:has-text("Apply"), button:has-text("Apply")').first();
  if (await applyBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await applyBtn.click().catch(() => {});
    await page.waitForLoadState("domcontentloaded").catch(() => {});
  }
  await tryFill(page, 'input[name="_systemfield_name"]', standing.name ?? "Matt Hicks", log, "name");
  await tryFill(page, 'input[name="_systemfield_email"]', standing.email ?? "matt@digitalfish.io", log, "email");
  await tryFill(page, 'input[type="tel"], input[name*="phone"]', standing.phone, log, "phone");
  await tryFill(page, 'input[name*="linkedin"], input[placeholder*="inkedin"]', standing.linkedin_url, log, "linkedin");
  await tryFill(page, 'input[name*="portfolio"], input[name*="website"]', standing.portfolio_url, log, "portfolio");
  await uploadResume(page, log);
  await tryFill(page, 'textarea[name*="cover"], textarea[placeholder*="cover"]', application.coverLetterMd, log, "cover_letter");
}

async function fillGreenhouse(page, { application, standing }, log) {
  // Greenhouse hosted boards: form is on the page (sometimes behind an Apply button).
  const applyBtn = page.locator('a:has-text("Apply"), button:has-text("Apply")').first();
  if (await applyBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await applyBtn.click().catch(() => {});
    await page.waitForLoadState("domcontentloaded").catch(() => {});
  }
  const fullName = standing.name ?? "Matt Hicks";
  const [first, ...rest] = fullName.split(" ");
  const last = rest.join(" ") || "Hicks";
  await tryFill(page, '#first_name, input[name="first_name"], input[autocomplete="given-name"]', first, log, "first_name");
  await tryFill(page, '#last_name, input[name="last_name"], input[autocomplete="family-name"]', last, log, "last_name");
  await tryFill(page, '#email, input[name="email"], input[type="email"]', standing.email ?? "matt@digitalfish.io", log, "email");
  await tryFill(page, '#phone, input[name="phone"], input[type="tel"]', standing.phone, log, "phone");
  await tryFill(page, 'input[name*="linkedin" i], input[id*="linkedin" i]', standing.linkedin_url, log, "linkedin");
  await tryFill(page, 'input[name*="website" i], input[id*="website" i], input[name*="portfolio" i]', standing.portfolio_url, log, "portfolio");
  await uploadResume(page, log);
  await tryFill(page, 'textarea[id*="cover" i], textarea[name*="cover" i], textarea[aria-label*="cover" i]', application.coverLetterMd, log, "cover_letter");
}

const FILLERS = { ashby: fillAshby, greenhouse: fillGreenhouse };

async function main() {
  console.log(`[submit] application=${APPLICATION_ID} base=${BASE_URL} dryRun=${DRY_RUN}`);

  const payloadRes = await fetch(`${BASE_URL}/api/applications/${APPLICATION_ID}/payload`, {
    headers: { "x-cancel-token": CANCEL_TOKEN },
  });
  if (!payloadRes.ok) {
    const text = await payloadRes.text();
    await reportResult(false, `payload fetch failed: ${payloadRes.status} ${text}`);
    process.exit(1);
  }
  const { application, role, standing } = await payloadRes.json();
  console.log(`[submit] ${role.company} — ${role.title} (${role.atsPlatform})`);

  const filler = FILLERS[role.atsPlatform];
  if (!filler) {
    // Not an auto-fillable ATS (company page, LinkedIn, Glassdoor link, etc.).
    // Not a failure to retry — flag for manual apply so the UI can guide Matt.
    await reportResult(
      false,
      `Manual apply required — ${role.atsPlatform || "unknown ATS"}. Open the posting and apply directly.`,
      { steps: [{ at: new Date().toISOString(), step: "manual_apply_required", ats: role.atsPlatform, url: role.sourceUrl }] },
      { manualRequired: true }
    );
    return; // exit 0 — handled, not an error
  }

  if (!role.sourceUrl) {
    await reportResult(false, "role.sourceUrl is empty — cannot open application form", null, { manualRequired: true });
    return;
  }

  const log = { steps: [] };
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: false });
  const page = await context.newPage();

  try {
    await page.goto(role.sourceUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    log.steps.push({ at: new Date().toISOString(), step: "loaded", url: page.url() });

    await filler(page, { application, role, standing }, log);

    const screenshotPath = path.join(process.cwd(), `scripts/submit/${APPLICATION_ID}-prefill.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
    log.steps.push({ at: new Date().toISOString(), step: "screenshot", path: screenshotPath });

    if (DRY_RUN) {
      log.steps.push({ at: new Date().toISOString(), step: "dry_run_stop_before_submit" });
      // Successful prefill: report ok:true + dryRun so the dashboard shows
      // "dry-run passed" (not "failed"). Set DRY_RUN=false to submit for real.
      await reportResult(true, undefined, log, { dryRun: true });
      await browser.close();
      return;
    }

    const submitBtn = page
      .locator('button[type="submit"], button:has-text("Submit application"), button:has-text("Submit")')
      .first();
    await submitBtn.click();
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    log.steps.push({ at: new Date().toISOString(), step: "submitted", url: page.url() });

    const finalShot = path.join(process.cwd(), `scripts/submit/${APPLICATION_ID}-final.png`);
    await page.screenshot({ path: finalShot, fullPage: true }).catch(() => {});
    log.steps.push({ at: new Date().toISOString(), step: "final_screenshot", path: finalShot });

    await reportResult(true, undefined, log);
  } catch (err) {
    const errShot = path.join(process.cwd(), `scripts/submit/${APPLICATION_ID}-error.png`);
    await page.screenshot({ path: errShot, fullPage: true }).catch(() => {});
    log.steps.push({ at: new Date().toISOString(), step: "error", error: String(err) });
    await reportResult(false, String(err), log);
  } finally {
    await browser.close();
  }
}

main().catch(async (err) => {
  console.error(err);
  await reportResult(false, String(err)).catch(() => {});
  process.exit(1);
});
