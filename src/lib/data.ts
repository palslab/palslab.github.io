// Loads YAML data at build time and applies the visibility rules from CLAUDE.md:
//  - publications with show:false or status in-preparation never render
//  - research themes with status:draft never render
//  - trainees render only with consent:true; photos only with photo_consent:true
import fs from 'node:fs';
import path from 'node:path';
import { load as yamlLoad } from 'js-yaml';

const dataDir = path.resolve(process.cwd(), 'src/data');
function load<T>(file: string): T {
  return yamlLoad(fs.readFileSync(path.join(dataDir, file), 'utf8')) as T;
}

export interface Site {
  lab_name: string; subtitle: string; design?: { palette?: string; hero?: string }; tagline: string; site_url: string; welcome: string;
  pi: { name: string; title: string; affiliation: string; photo: string; bio: string; email: string;
        links: Record<string, string> };
  contact: { email: string; address: string[] };
  funding: string; disclaimer: string;
}
export interface Publication {
  id: string; authors: string[]; title: string; venue: string; year: number;
  doi?: string; doi_verified?: boolean; url?: string; url_verified?: boolean; note?: string;
  type: 'journal' | 'conference' | 'preprint' | 'chapter';
  roles?: { co_first?: string[]; corresponding?: string[] };
  status?: string; show?: boolean; selected?: boolean;
}
export interface Software { name: string; blurb?: string; paper_doi?: string; repo?: string; docs?: string }
export interface News { date: string | number | Date; text: string; link?: string }
export interface Person { name: string; role?: string; program?: string; years?: string; now?: string;
  consent?: boolean; photo_consent?: boolean; photo?: string }
export interface Theme { id: string; theme: string; summary: string; papers: string[]; status: 'live' | 'draft' }

export const site = load<Site>('site.yaml');

export const publications = (load<Publication[]>('publications.yaml') ?? []).filter(
  (p) => p.show !== false && p.status !== 'in-preparation',
);
export const pubById = new Map(publications.map((p) => [p.id, p]));

export const software = load<Software[]>('software.yaml') ?? [];
// News dates may be YYYY, YYYY-MM or YYYY-MM-DD; show only the precision given.
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function normDate(d: News['date']) {
  const iso = d instanceof Date ? d.toISOString().slice(0, 10) : String(d);
  const [y, m, day] = iso.split('-').map(Number);
  const label = day ? `${MONTHS[m - 1]} ${day}, ${y}` : m ? `${MONTHS[m - 1]} ${y}` : `${y}`;
  return { iso, label, sort: y * 10000 + (m || 0) * 100 + (day || 0) };
}
export const news = (load<News[]>('news.yaml') ?? [])
  .map((n) => ({ text: n.text, link: n.link, ...normDate(n.date) }))
  .sort((a, b) => b.sort - a.sort);
export const trainees = (load<Person[]>('people.yaml') ?? []).filter((p) => p.consent === true);
export const research = (load<Theme[]>('research.yaml') ?? []).filter((t) => t.status === 'live');
export const approach = load<{ title: string; text: string }[]>('approach.yaml') ?? [];
export const aiml = load<string[]>('ai_ml.yaml') ?? [];
export const mentoring = load<{ philosophy: string; programs: string[]; judging: string[];
  teaching: string[]; outreach: string[] }>('mentoring.yaml');
export const join = load<{ text: string }>('join.yaml');

export const doiUrl = (doi?: string) => (doi ? `https://doi.org/${doi.replace(/^https?:\/\/doi\.org\//, '')}` : '');
// A publication's link renders only if it was verified (CLAUDE.md §2.6).
export const pubLink = (p: Publication) =>
  p.doi && p.doi_verified ? doiUrl(p.doi) : p.url && p.url_verified ? p.url : '';
const verifiedDois = new Set(
  (load<Publication[]>('publications.yaml') ?? []).filter((p) => p.doi && p.doi_verified).map((p) => p.doi!.toLowerCase()),
);
export const isVerifiedDoi = (doi?: string) => !!doi && verifiedDois.has(doi.toLowerCase());
