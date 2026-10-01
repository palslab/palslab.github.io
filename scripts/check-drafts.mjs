// Fails if any draft / hidden content leaks into dist/ (CLAUDE.md §6).
//  1. Local-only guard terms (scripts/private-guards.txt) must not appear while the draft is unpublished
//  2. Titles of publications with show:false / in-preparation must not appear
//  3. Themes with status: draft must not appear
//  4. Trainees without consent:true must not appear
import fs from 'node:fs';
import path from 'node:path';
import { load as yamlLoad } from 'js-yaml';

const dist = 'dist';
if (!fs.existsSync(dist)) { console.error('dist/ not found — run `npm run build` first.'); process.exit(2); }

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|xml|txt|json|js|css)$/.test(e.name)) files.push(p);
  }
})(dist);
const corpus = files.map((f) => [f, fs.readFileSync(f, 'utf8')]);

const banned = [];
const draft = fs.readFileSync('src/content/drafts/virtual-cells.md', 'utf8');
if (/^status:\s*draft\s*$/m.test(draft)) { /* draft guard terms: see private-guards.txt */ }

const load = (f) => yamlLoad(fs.readFileSync(`src/data/${f}`, 'utf8')) ?? [];
for (const p of load('publications.yaml'))
  if (p.show === false || p.status === 'in-preparation') banned.push([p.title, `hidden publication ${p.id}`]);
for (const t of load('research.yaml'))
  if (t.status === 'draft') banned.push([t.theme, `draft theme ${t.id}`]);
for (const t of load('people.yaml'))
  if (t.consent !== true) banned.push([t.name, 'trainee without consent']);

let fail = 0;
for (const [needle, why] of banned) {
  if (!needle) continue;
  const lower = needle.toLowerCase();
  for (const [f, txt] of corpus) {
    if (txt.toLowerCase().includes(lower)) { console.error(`LEAK: "${needle}" (${why}) found in ${f}`); fail++; }
  }
}
if (fail) { console.error(`check:drafts FAILED (${fail} leak(s))`); process.exit(1); }
console.log(`check:drafts OK — ${banned.length} guarded strings, ${files.length} files scanned.`);
