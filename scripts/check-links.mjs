// Verifies every external URL in src/data/*.yaml returns 200/301/302 (CLAUDE.md §2.6).
// Writes failures to stdout; add them to TODO.md and remove the link from the data.
import fs from 'node:fs';
const urls = new Set();
for (const f of fs.readdirSync('src/data')) {
  const txt = fs.readFileSync(`src/data/${f}`, 'utf8');
  for (const m of txt.matchAll(/https?:\/\/[^\s"'<>)]+/g)) urls.add(m[0]);
  for (const m of txt.matchAll(/^\s*(?:doi|paper_doi):\s*"?(10\.[^\s"]+)"?/gm)) urls.add(`https://doi.org/${m[1]}`);
}
let bad = 0;
for (const u of [...urls].filter((u) => !u.includes('palslab.github.io'))) {
  try {
    const r = await fetch(u, { method: 'HEAD', redirect: 'manual' });
    let s = r.status;
    if (s === 405 || s === 403) s = (await fetch(u, { redirect: 'manual' })).status;
    const ok = [200, 301, 302, 303, 307, 308].includes(s);
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${s} ${u}`); if (!ok) bad++;
  } catch (e) { console.log(`FAIL ERR ${u} (${e.cause?.code ?? e.message})`); bad++; }
}
console.log(`${urls.size} URL(s) checked, ${bad} failed.`);
process.exit(bad ? 1 : 0);
