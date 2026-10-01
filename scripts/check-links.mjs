// Verifies external links (CLAUDE.md §2.6).
//   node scripts/check-links.mjs          report only
//   node scripts/check-links.mjs --write  also mark passing DOIs/URLs in publications.yaml
//                                         (doi_verified / url_verified: true) so they render as links
// DOIs are checked at doi.org (a 30x redirect means the DOI is registered).
// Run this on your own computer: some sandboxes block doi.org.
import fs from 'node:fs';
const WRITE = process.argv.includes('--write');
const pubFile = 'src/data/publications.yaml';

async function status(u) {
  try {
    let r = await fetch(u, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(20000) });
    if ([403, 405, 429].includes(r.status)) r = await fetch(u, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    return r.status;
  } catch (e) { return `ERR ${e.cause?.code ?? e.name}`; }
}
const ok = (s) => [200, 301, 302, 303, 307, 308].includes(s);

const urls = new Map(); // url -> kind
for (const f of fs.readdirSync('src/data')) {
  const txt = fs.readFileSync(`src/data/${f}`, 'utf8');
  for (const m of txt.matchAll(/https?:\/\/[^\s"'<>,}]+/g)) urls.set(m[0], f);
  for (const m of txt.matchAll(/\b(?:doi|paper_doi):\s*"?(10\.[^\s",}]+)"?/g)) urls.set(`https://doi.org/${m[1]}`, f);
}
let bad = 0; const passedDoi = new Set(), passedUrl = new Set();
for (const [u, f] of urls) {
  if (u.includes('palslab.github.io')) continue;
  const s = await status(u);
  console.log(`${ok(s) ? 'OK  ' : 'FAIL'} ${s} ${u}  (${f})`);
  if (!ok(s)) { bad++; continue; }
  if (u.startsWith('https://doi.org/')) passedDoi.add(u.slice(16)); else passedUrl.add(u);
}
if (WRITE) {
  let y = fs.readFileSync(pubFile, 'utf8'), n = 0;
  for (const d of passedDoi) {
    const esc = d.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
    // block style:  doi: X\n  (no doi_verified yet)
    y = y.replace(new RegExp(`^(\\s*)doi: ${esc}\\n(?!\\s*doi_verified)`, 'm'), (m, ind) => { n++; return `${m}${ind}doi_verified: true\n`; });
    // flow style:  { ..., doi: X, ... }
    y = y.replace(new RegExp(`doi: ${esc}, (?!doi_verified)`), (m) => { n++; return `${m}doi_verified: true, `; });
  }
  for (const u of passedUrl) {
    const esc = u.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
    y = y.replace(new RegExp(`url: "${esc}", (?!url_verified)`), (m) => { n++; return `${m}url_verified: true, `; });
  }
  fs.writeFileSync(pubFile, y);
  console.log(`Marked ${n} new verified link(s) in ${pubFile}.`);
}
console.log(`${urls.size} URL(s) checked, ${bad} failed.${bad ? ' Add failures to TODO.md.' : ''}`);
process.exit(bad ? 1 : 0);
