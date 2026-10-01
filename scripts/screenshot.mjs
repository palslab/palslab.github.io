// Full-page screenshots at 1280 and 390 px, plus layout sanity checks.
// Usage: npm run build && npx astro preview &  then  node scripts/screenshot.mjs review/phase-N [baseURL]
// Requires Playwright (npm i -D playwright; npx playwright install chromium).
import { chromium } from 'playwright';
import fs from 'node:fs';
const out = process.argv[2] ?? 'review/latest';
const base = process.argv[3] ?? 'http://localhost:4321';
fs.mkdirSync(out, { recursive: true });
const pages = [['home', '/'], ['publications', '/publications/'], ['news', '/news/']];
const browser = await chromium.launch();
let problems = 0;
for (const width of [1280, 390, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) { console.log(`HSCROLL ${width}px ${path}: ${overflow}px`); problems++; }
    // scroll through the page so lazy-loaded images load before the full-page capture
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }));
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 400)); });
    await page.waitForLoadState('networkidle');
    if (width !== 360) await page.screenshot({ path: `${out}/${name}-${width}.png`, fullPage: true });
  }
  if (width === 1280) {
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const missing = await page.evaluate(() => [...document.querySelectorAll('nav a[href^="/#"]')]
      .map((a) => a.getAttribute('href').slice(2)).filter((id) => !document.getElementById(id)));
    if (missing.length) { console.log('Nav targets missing:', missing); problems++; } else console.log('All nav anchors resolve.');
  }
  await page.close();
}
await browser.close();
console.log(problems ? `${problems} problem(s)` : 'No layout problems found.');
