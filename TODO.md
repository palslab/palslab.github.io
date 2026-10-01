# TODO

Unverified links and missing assets. Remove items once resolved.

## Links
All 27 DOIs and all data URLs verified on 2026-10-01 by the "Check links" workflow (GitHub Actions), which re-runs monthly and can be run from the repo's Actions tab.

Not yet in the data (add once you want them linked; the workflow will verify them):
- [ ] Google Scholar https://scholar.google.com/citations?user=6dnFbTkAAAAJ (from old Google Site; unreachable from sandbox) → `pi.links.scholar`
- [ ] LinkedIn https://www.linkedin.com/in/soumitra-pal-0b2b871/ (from old Google Site) → `pi.links.linkedin`
- [ ] ORCID iD — not in any source document; please supply → `pi.links.orcid`

## Software code locations (need PI confirmation)

- PINNOU, qPMS10, Hybrid-DCA, KCMBT: no code links for now — PI will add them later (round 1).
- Verified (HTTP 200) and linked: ncbi/EvoGeneX, ncbi/JUDI, ncbi/Co-SELECT, soumitrakp/ems2, soumitrakp/perfectread

## Missing assets / decisions

- [ ] CV PDF for the public site (a version without home address/phone) → `public/cv.pdf`, then `pi.links.cv: /cv.pdf`
- [ ] Mailing address (currently none shown; CV has a home address — not used)
- [ ] Trainee consent: set `consent: true` in people.yaml only after each person agrees

## After publishing
- [ ] Add https://palslab.github.io to GitHub profile, Google Scholar, ORCID, LinkedIn and the CV header
- [ ] Turn the old Google Site into a signpost to the new site (PLAYBOOK step 7)
- [ ] Optional: revoke the session's GitHub CLI authorization when done (GitHub → Settings → Applications → Authorized OAuth Apps → GitHub CLI)
