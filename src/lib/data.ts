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
  lab_name: string; subtitle: string; tagline: string; site_url: string; welcome: string;
  pi: { name: string; title: string; affiliation: string; photo: string; bio: string; email: string;
        links: Record<string, string> };
  contact: { email: string; address: string[] };
  funding: string; disclaimer: string;
}
export interface Publication {
  id: string; authors: string[]; title: string; venue: string; year: number; doi?: string;
  type: 'journal' | 'conference' | 'preprint' | 'chapter';
  roles?: { co_first?: string[]; corresponding?: string[] };
  status?: string; show?: boolean; selected?: boolean;
}
export interface Software { name: string; blurb?: string; paper_doi?: string; repo?: string; docs?: string }
export interface News { date: string | Date; text: string; link?: string }
export interface Person { name: string; role?: string; program?: string; years?: string; now?: string;
  consent?: boolean; photo_consent?: boolean; photo?: string }
export interface Theme { id: string; theme: string; summary: string; papers: string[]; status: 'live' | 'draft' }

export const site = load<Site>('site.yaml');

export const publications = (load<Publication[]>('publications.yaml') ?? []).filter(
  (p) => p.show !== false && p.status !== 'in-preparation',
);
export const pubById = new Map(publications.map((p) => [p.id, p]));

export const software = load<Software[]>('software.yaml') ?? [];
export const news = (load<News[]>('news.yaml') ?? [])
  .map((n) => ({ ...n, date: new Date(n.date) }))
  .sort((a, b) => +b.date - +a.date);
export const trainees = (load<Person[]>('people.yaml') ?? []).filter((p) => p.consent === true);
export const research = (load<Theme[]>('research.yaml') ?? []).filter((t) => t.status === 'live');
export const approach = load<{ title: string; text: string }[]>('approach.yaml') ?? [];
export const aiml = load<string[]>('ai_ml.yaml') ?? [];
export const mentoring = load<{ philosophy: string; programs: string[]; judging: string[];
  teaching: string[]; outreach: string[] }>('mentoring.yaml');
export const join = load<{ text: string }>('join.yaml');

export const doiUrl = (doi?: string) => (doi ? `https://doi.org/${doi.replace(/^https?:\/\/doi\.org\//, '')}` : '');
export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
