// Greenhouse (job-boards.greenhouse.io) application submitter.
// Usage: node scripts/apply/greenhouse-apply.mjs <config.json> [--dry]
// Config: { url, firstName, lastName, email, phone, resumePath, screenshotDir,
//           texts: [{label, value}], selects: [{label, option}] }
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const [configPath, ...flags] = process.argv.slice(2);
const DRY = flags.includes("--dry");
const HEADED = flags.includes("--headed");
const cfg = JSON.parse(readFileSync(configPath, "utf8"));
const shotDir = cfg.screenshotDir || "/tmp";
const slug = new URL(cfg.url).pathname.split("/")[1];
const shot = (n) => resolve(shotDir, `${slug}-${n}.png`);

const browser = await chromium.launch({ headless: !HEADED });
const page = await browser.newPage({ viewport: { width: 1280, height: 1800 } });
try {
  await page.goto(cfg.url, { waitUntil: "networkidle", timeout: 45000 });

  const fillByLabel = async (labelText, value) => {
    const lbl = page.locator(`label:has-text("${labelText}")`).first();
    const forId = await lbl.getAttribute("for");
    const input = forId ? page.locator(`[id="${forId}"]`) : lbl.locator("xpath=following::*[self::input or self::textarea][1]");
    await input.fill(value);
    console.log(`filled ${labelText}`);
  };

  // resume first (some boards autofill from it)
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(cfg.resumePath);
  await page.waitForTimeout(4000);
  console.log("resume attached");

  await fillByLabel("First Name", cfg.firstName);
  await fillByLabel("Last Name", cfg.lastName);
  await fillByLabel("Email", cfg.email);
  if (cfg.phone) await fillByLabel("Phone", cfg.phone);
  for (const { label, value } of cfg.texts || []) await fillByLabel(label, value);

  // selects: native <select> OR GH React combobox (input[role=combobox] → option list)
  for (const { label, option } of cfg.selects || []) {
    const lbl = page.locator(`label:has-text("${label}")`).first();
    const forId = await lbl.getAttribute("for");
    const ctl = forId ? page.locator(`[id="${forId}"]`) : lbl.locator("xpath=following::*[self::select or @role='combobox'][1]");
    const tag = await ctl.evaluate((el) => el.tagName);
    if (tag === "SELECT") {
      await ctl.selectOption({ label: option });
    } else {
      await ctl.click();
      await page.waitForTimeout(400);
      await page.locator(`[role="option"]:text-is("${option}"), li:text-is("${option}")`).first().click();
    }
    console.log(`select "${label}" -> ${option}`);
    await page.waitForTimeout(300);
  }

  await page.screenshot({ path: shot("filled"), fullPage: true });
  console.log("pre-submit screenshot:", shot("filled"));

  // captcha guard — never attempt to bypass
  const captcha = await page.locator('iframe[src*="recaptcha"], iframe[src*="hcaptcha"], [class*="captcha"]').count();
  if (captcha > 0) console.log("CAPTCHA PRESENT — manual submission required");

  if (DRY) {
    console.log("DRY RUN — not submitting.");
  } else if (captcha > 0) {
    console.log("Refusing to submit past a captcha — handing back to Matt.");
  } else {
    await page.locator('button:has-text("Submit application"), button:has-text("Submit Application"), input[type="submit"]').first().click();
    try {
      await Promise.race([
        page.waitForURL((u) => /confirmation|thank/i.test(u.toString()), { timeout: 20000 }),
        page.waitForSelector("text=/thank you|application.*(submitted|received)/i", { timeout: 20000 }),
      ]);
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
