/**
 * Playwright submitter — runs in GitHub Actions.
 * Pulls application data from /api/applications/[id]/payload,
 * routes to the right ATS submitter (Ashby v1 only currently),
 * posts result to /api/applications/[id]/result.
 *
 * Required env:
 *   BASE_URL         — e.g. https://digitalfish.io
 *   APPLICATION_ID   — numeric
 *   CANCEL_TOKEN     — auth for payload + result endpoints
 *   RESUME_PDF_PATH  — absolute path to resume.pdf
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL;
const APPLICATION_ID = process.env.APPLICATION_ID;
const CANCEL_TOKEN = process.env.CANCEL_TOKEN;
const RESUME_PDF_PATH = process.env.RESUME_PDF_PATH;

if (!BASE_URL || !APPLICATION_ID || !CANCEL_TOKEN) {
  console.error("Missing env: BASE_URL, APPLICATION_ID, CANCEL_TOKEN");
  process.exit(1);
}

async function reportResult(ok, error, log) {
  await fetch(`${BASE_URL}/api/applications/${APPLICATION_ID}/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-cancel-token": CANCEL_TOKEN },
    body: JSON.stringify({ ok, error, log }),
  });
}

async function main() {
  console.log(`[submit] application=${APPLICATION_ID} base=${BASE_URL}`);

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

  if (role.atsPlatform !== "ashby") {
    await reportResult(false, `ATS '${role.atsPlatform}' not yet supported by submitter`);
    process.exit(1);
  }

  if (!role.sourceUrl) {
    await reportResult(false, "role.sourceUrl is empty");
    process.exit(1);
  }

  const log = { steps: [] };
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: false });
  const page = await context.newPage();

  try {
    await page.goto(role.sourceUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    log.steps.push({ at: new Date().toISOString(), step: "loaded", url: page.url() });

    // Ashby form selectors are stable: input[name="_systemfield_name"], input[name="_systemfield_email"], etc.
    // Click "Apply for this job" if not on the form already
    const applyBtn = page.locator('a:has-text("Apply"), button:has-text("Apply")').first();
    if (await applyBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await applyBtn.click();
      await page.waitForLoadState("domcontentloaded");
    }

    await page.fill('input[name="_systemfield_name"]', standing.name ?? "Matt Hicks");
    await page.fill('input[name="_systemfield_email"]', standing.email ?? "matt@digitalfish.io");
    log.steps.push({ at: new Date().toISOString(), step: "filled_basic" });

    // Phone (optional)
    const phoneInput = page.locator('input[type="tel"], input[name*="phone"]').first();
    if (await phoneInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await phoneInput.fill(standing.phone ?? "");
    }

    // LinkedIn
    const linkedinInput = page.locator('input[name*="linkedin"], input[placeholder*="linkedin"]').first();
    if (await linkedinInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await linkedinInput.fill(standing.linkedin_url ?? "");
    }

    // Portfolio
    const portfolioInput = page.locator('input[name*="portfolio"], input[name*="website"]').first();
    if (await portfolioInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await portfolioInput.fill(standing.portfolio_url ?? "");
    }

    // Resume upload
    const fileInput = page.locator('input[type="file"]').first();
    if (await fileInput.isVisible({ timeout: 3000 }).catch(() => false) && RESUME_PDF_PATH) {
      try {
        await fileInput.setInputFiles(RESUME_PDF_PATH);
        log.steps.push({ at: new Date().toISOString(), step: "uploaded_resume" });
      } catch (err) {
        log.steps.push({ at: new Date().toISOString(), step: "resume_upload_skipped", reason: String(err) });
      }
    }

    // Cover letter (textarea or file)
    const coverTextarea = page.locator('textarea[name*="cover"], textarea[placeholder*="cover"]').first();
    if (await coverTextarea.isVisible({ timeout: 2000 }).catch(() => false)) {
      await coverTextarea.fill(application.coverLetterMd ?? "");
      log.steps.push({ at: new Date().toISOString(), step: "filled_cover_letter" });
    }

    // Pause before submitting — first 5 supervised submissions get a manual intervention point.
    // For now, snapshot the form and do NOT click submit.
    const screenshotPath = path.join(process.cwd(), `scripts/submit/${APPLICATION_ID}-prefill.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    log.steps.push({ at: new Date().toISOString(), step: "screenshot", path: screenshotPath });

    // ENABLED submission requires DRY_RUN=false env. Default: prefill and stop.
    const dryRun = process.env.DRY_RUN !== "false";
    if (dryRun) {
      log.steps.push({ at: new Date().toISOString(), step: "dry_run_stop_before_submit" });
      await reportResult(false, "dry-run: form prefilled, did not submit. Set DRY_RUN=false to submit for real.", log);
      await browser.close();
      return;
    }

    const submitBtn = page.locator('button[type="submit"], button:has-text("Submit application"), button:has-text("Submit")').first();
    await submitBtn.click();
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    log.steps.push({ at: new Date().toISOString(), step: "submitted", url: page.url() });

    const finalShot = path.join(process.cwd(), `scripts/submit/${APPLICATION_ID}-final.png`);
    await page.screenshot({ path: finalShot, fullPage: true });
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
