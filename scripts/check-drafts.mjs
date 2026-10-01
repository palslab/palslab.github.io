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
// Sensitive guard terms (draft project name, unpublished numbers, application wording) live in a
// git-ignored local file so the public repository never contains them. One term per line; # comments.
const guardFile = 'scripts/private-guards.txt';
const draftPath = 'src/content/drafts/virtual-cells.md';
const draft = fs.existsSync(draftPath) ? fs.readFileSync(draftPath, 'utf8') : 'status: draft';
const draftLive = /^status:\s*live\s*$/m.test(draft);
if (fs.existsSync(guardFile)) {
  for (const line of fs.readFileSync(guardFile, 'utf8').split('\n')) {
    const t = line.trim(); if (!t || t.startsWith('#')) continue;
    const [term, tag] = t.split('|').map((x) => x.trim());
    if (tag === 'draft' && draftLive) continue; // draft terms are allowed once the draft is published
    banned.push([term, tag === 'draft' ? 'unpublished draft material' : 'private term']);
  }
} else console.warn(`note: ${guardFile} not found — only data-file guards active.`);
const load = (f) => yamlLoad(fs.readFileSync(`src/data/${f}`, 'utf8')) ?? [];
for (const p of load('publications.yaml'))
  if (p.show === false || p.status === 'in-preparation') banned.push([p.title, `hidden publication ${p.id}`]);
for (const t of load('research.yaml'))
  if (t.status === 'draft') banned.push([t.theme, `draft theme ${t.id}`]);
// Trainees without consent must not be listed in the Team section. (Their names may
// legitimately appear as co-authors in publications, so only the Team section is scanned.)
const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const team = home.slice(home.indexOf('id="team"'), home.indexOf('id="contact"'));
let fail = 0;
for (const t of load('people.yaml'))
  if (t.consent !== true && team.includes(t.name)) { console.error(`LEAK: trainee without consent "${t.name}" in Team section`); fail++; }
  else if (t.photo_consent !== true && t.photo && home.includes(t.photo)) { console.error(`LEAK: photo without consent for "${t.name}"`); fail++; }

for (const [needle, why] of banned) {
  if (!needle) continue;
  const lower = needle.toLowerCase();
  for (const [f, txt] of corpus) {
    if (txt.toLowerCase().includes(lower)) { console.error(`LEAK: "${needle}" (${why}) found in ${f}`); fail++; }
  }
}
if (fail) { console.error(`check:drafts FAILED (${fail} leak(s))`); process.exit(1); }
console.log(`check:drafts OK — ${banned.length} guarded strings, ${files.length} files scanned.`);
