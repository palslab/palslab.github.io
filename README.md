# Pal Lab website

Astro static site deployed to https://palslab.github.io via GitHub Actions.
The spec is in `CLAUDE.md`; the step-by-step process is in `PLAYBOOK.md`.

## Commands
| Command | What it does |
|---|---|
| `npm install` | install dependencies (first time) |
| `npm run dev` | local dev server at http://localhost:4321 (`-- --host` to view on your phone) |
| `npm run build` | build the static site into `dist/` |
| `npm run check:drafts` | fail if draft/hidden content leaked into `dist/` |
| `npm run check:links` | verify every external URL in `src/data/` |
| `npm test` | build + draft check |
| `node scripts/screenshot.mjs review/<dir>` | full-page screenshots at 1280/390 px (preview server must be running) |

## Where content lives
All text is in `src/data/*.yaml`; layout code never needs to change for routine updates.
Affiliation, address, email, funding and the employer disclaimer live **only** in `src/data/site.yaml`.
Unpublished material lives in `src/content/drafts/` and is never built.
