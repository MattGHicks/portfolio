import { chromium } from "playwright";

const OUT = "/Users/matt/Library/CloudStorage/Dropbox/My Coding Projects/portfolio/public/images/cs/poolpilot";
const BASE = "http://localhost:4010";
const SCREENS = [
  ["/", "live"],
  ["/schedule", "schedule"],
  ["/energy", "energy"],
  ["/settings", "settings"],
];

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  colorScheme: "dark",
});
const page = await ctx.newPage();
for (const [path, name] of SCREENS) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(4500);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`captured ${name}`);
}
await browser.close();
