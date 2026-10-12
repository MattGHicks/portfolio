import { chromium } from "playwright";
const [,, ...args] = process.argv;
const routes = args.length ? args : ["/"];
const out = process.env.OUT;
const browser = await chromium.launch();
for (const vp of [{ name: "desk", width: 1440, height: 900 }, { name: "mob", width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: "reduce", deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  for (const r of routes) {
    await page.goto("http://localhost:3000" + r, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
    const name = (r === "/" ? "home" : r.replace(/\//g, "_").replace(/^_/, "")) + "-" + vp.name + ".png";
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    console.log("shot", name);
  }
  if (errors.length) console.log("ERRORS", vp.name, errors);
  await ctx.close();
}
await browser.close();
