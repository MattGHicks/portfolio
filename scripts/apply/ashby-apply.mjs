// Ashby application submitter — fills a hosted Ashby form from a JSON config and submits.
// Usage: node scripts/apply/ashby-apply.mjs <config.json> [--dry]
// Config: { url, name, email, resumePath, screenshotDir, fields: [{label, value}], radios: [{label, option}] }
// --dry fills everything + screenshots but does NOT click Submit.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const [configPath, ...flags] = process.argv.slice(2);
const DRY = flags.includes("--dry");
const cfg = JSON.parse(readFileSync(configPath, "utf8"));
const shotDir = cfg.screenshotDir || "/tmp";
const slug = new URL(cfg.url).pathname.split("/")[1];
const shot = (n) => resolve(shotDir, `${slug}-${n}.png`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
try {
  await page.goto(cfg.url, { waitUntil: "networkidle", timeout: 45000 });

  const fieldByLabel = async (labelText) => {
    const label = page.locator("label", { hasText: labelText }).first();
    const forId = await label.getAttribute("for");
    if (forId) return page.locator(`#${CSS.escape ? forId : forId}`).first();
    return label.locator("input, textarea").first();
  };

  // resume FIRST — Ashby's autofill repopulates fields from it; our values then overwrite
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(cfg.resumePath);
  await page.waitForTimeout(4000); // allow autofill to finish before we write fields
  console.log("resume attached (autofill settled)");

  // optional cover letter -> the LAST file input (Ashby order: autofill, resume, cover letter)
  if (cfg.coverLetterPath) {
    const count = await page.locator('input[type="file"]').count();
    if (count >= 3) {
      const clInput = page.locator('input[type="file"]').last();
      await clInput.setInputFiles(cfg.coverLetterPath);
      await page.waitForTimeout(2500);
      console.log(`cover letter attached to input #${count - 1} of ${count}`);
    } else console.log(`WARNING: expected >=3 file inputs for cover letter, found ${count} — skipping CL`);
  }

  // core identity
  for (const [labelText, value] of [["Name", cfg.name], ["Email", cfg.email]]) {
    const f = page.locator(`label:has-text("${labelText}")`).first();
    const forId = await f.getAttribute("for");
    const input = forId ? page.locator(`[id="${forId}"]`) : f.locator("xpath=following::input[1]");
    await input.fill(value);
    console.log(`filled ${labelText}`);
  }

  // custom text fields
  for (const { label, value } of cfg.fields || []) {
    const lbl = page.locator(`label:has-text("${label}")`).first();
    const forId = await lbl.getAttribute("for");
    const input = forId ? page.locator(`[id="${forId}"]`) : lbl.locator("xpath=following::*[self::input or self::textarea][1]");
    await input.fill(value);
    console.log(`filled ${label}`);
  }

  // radio answers (e.g., sponsorship No) — Ashby renders Yes/No as buttons or radio labels
  for (const { label, option } of cfg.radios || []) {
    const container = page.locator(`div:has(> label:has-text("${label}")), fieldset:has-text("${label}")`).first();
    const btn = container.locator(`button:text-is("${option}"), [role="radio"]:text-is("${option}"), label:text-is("${option}")`).first();
    await btn.click();
    await page.waitForTimeout(500);
    const state = await btn.evaluate((el) => ({
      ariaChecked: el.getAttribute("aria-checked"),
      ariaPressed: el.getAttribute("aria-pressed"),
      cls: (el.className || "").toString().slice(0, 80),
      inputChecked: el.querySelector("input") ? el.querySelector("input").checked : (el.previousElementSibling && el.previousElementSibling.checked) || null,
    }));
    console.log(`radio "${label}" -> ${option}`, JSON.stringify(state));
  }

  await page.screenshot({ path: shot("filled"), fullPage: true });
  console.log("pre-submit screenshot:", shot("filled"));

  if (DRY) {
    console.log("DRY RUN — not submitting.");
  } else {
    const submitBtn = page.locator('button:has-text("Submit Application"), button[type="submit"]').first();
    await submitBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await submitBtn.click({ force: true });
    await page.waitForTimeout(1500);
    // fallback: if still on form, dispatch a native click on the button element
    if (await submitBtn.count() && (await page.locator("text=/successfully submitted|thank you/i").count()) === 0) {
      await submitBtn.evaluate((b) => b.click()).catch(() => {});
    }
    // success = green confirmation banner ("successfully submitted") appears
    try {
      await page.waitForSelector("text=/successfully submitted|application was.*submitted|thank you|we'll contact you/i", { timeout: 25000 });
      console.log("SUBMIT CONFIRMED");
    } catch {
      console.log("SUBMIT UNCONFIRMED — check screenshot");
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: shot("after-submit"), fullPage: true });
    console.log("post-submit screenshot:", shot("after-submit"));
  }
} finally {
  await browser.close();
}
