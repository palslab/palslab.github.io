# Feedback log

Each round of PI feedback and what was done about it.

## Phase 1 — Scaffold (2026-10-01)
No feedback yet. Scaffold built from CLAUDE.md §3–§6 with placeholder data.

## Phase 2 — Content (2026-10-01)
PI: "I have copied three PDFs in the source folder. Continue."
Done:
- Populated all data files from the CV, cover letter and research statement (24 Sep 2026) and the old Google Site.
- Privacy/safety: `source/`, `CLAUDE.md`, `PLAYBOOK.md` and `src/content/drafts/*` are git-ignored (they mention the application and unpublished results); removed from the unpushed Phase 1 commit. Home address and phone from the CV are not used.
- Unpublished material only in the local, git-ignored draft page; check:drafts also reads local-only guard terms (scripts/private-guards.txt, git-ignored).
- Links render only when verified; see TODO.md.
Open questions: listed at the end of review/phase-2/CHECKLIST.md.

## Round 1 (2026-10-01)
1. Selected publications: keep the 5 proposed → no change.
2. Contact email: soumitra.pal@nih.gov → set in site.yaml (pi.email, contact.email).
3. No code links for PINNOU, qPMS10, Hybrid-DCA, KCMBT; PI will add later → left unlinked, noted in TODO.md.
4. EvoGeneX JCB paper: 2022 was the preprint; published 2023 → year 2023, venue "Journal of Computational Biology 30: 21–40" (volume/pages from the research statement reference), id renamed jcb-2023-evogenex.
5. Photos: used soumitra-headshot.jpeg, cropped to head-and-shoulders 900×900, exported 800 px and 480 px JPEG with metadata stripped (public/images/pi.jpg, pi-480.jpg); Team card uses srcset. Full-body photo not used (kept private in source/).
Not answered yet: Fly Cell Atlas title wording (TODO.md).

## Round 2 (2026-10-01)
1. Fly Cell Atlas title → "single-nucleus" (as published), corrected in publications.yaml.
2. people.yaml (trainee names, consent: false) stays in the repo, as is.

## Phase 3 — Design pass (2026-10-01)
- Original generated hero art (src/lib/manifold.ts): cell-state surface with a healthy basin, a departing trajectory and a dashed restoring path; deterministic, no external images.
- Two palettes (A rod indigo + copper; B visual purple + amber) and two hero layouts (A colour band; B white with wide art), switchable in site.yaml `design:`. Default A/A until the PI chooses. Comparison: review/phase-3/compare-AB.png.
- Removed template chrome (hero eyebrow, middle-dot joins, arrow in "All news").
- Lighthouse (mobile + desktop, home + publications): accessibility 100, performance 100, best practices 100, SEO 100; B/B accessibility 100. Fixed font-swap layout shift (CLS 0.66 → 0) with font preload and metric-matched fallback.
- Keyboard order verified: skip link → nav → hero actions. All text colour pairs ≥ 5.3:1.

## Round 3 — design (2026-10-01)
1. PI disliked both first-round options (A/B palettes and hero layouts) → mocked four new directions (C retinal mosaic, D phylogeny of expression, E retina in fluorescence, F type-led): review/phase-3/more/.
2. PI liked layouts C and E but not their colours → eight new palettes (C1–C4, E1–E4), all ≥ WCAG AA: review/phase-3/palettes/.
3. PI chose C2 → applied site-wide: retinal-mosaic hero (src/lib/mosaic.ts, replaces the manifold art and the A/B switch), cobalt #1d3f8f + saffron #e09b1a, links #8f5b00, IBM Plex Sans self-hosted, tagline in sentence case. CLAUDE.md §4 updated with these decisions.
   Lighthouse (home, publications, news; mobile and desktop): 100 accessibility, performance, best practices, SEO. Screenshots: review/phase-3/final-C2/.

## Round 4 (2026-10-01)
1. PI: drop "Grounding virtual cells" from the hero for now; use a generic lab identity → hero headline is the lab name "Pal Lab", sub-line "Computational biology, led by Soumitra Pal" (site.yaml tagline).
2. Welcome paragraph rewritten from published work only (expression evolution, single-cell atlases, photoreceptor development/aging; stochastic models, PINNs, algorithms). The virtual-cell vision remains only as the "Predictive models of cell state" research theme. CLAUDE.md §4 note updated.

## Phase 4 — Publish (2026-10-01)
- PI created the free GitHub organization `palslab`; authorized GitHub CLI (device login) for this session.
- Created public repo palslab/palslab.github.io, pushed main, Pages source = GitHub Actions. Deploy runs (push + manual) succeeded; draft check passed in CI.
- Live: https://palslab.github.io — home and publications verified live (correct hero, sections, no draft terms); all internal links/anchors resolve; all clickable external links verified (5 DOIs, 6 GitHub URLs).

## Round 5 (2026-10-01)
1. Hide Approach section → `sections.approach: false` in site.yaml (section and nav item removed).
2. Hide research theme "Predictive models of cell state and dysfunction" → `status: draft` in research.yaml (also guarded by check:drafts).
3. Hide KCMBT and qPMS10 software cards → `show: false` in software.yaml (their papers stay on the Publications page).
4. Hide Join Us → `sections.join: false` (section, nav item and the hero "Join the lab" link removed).

## Round 6 (2026-10-01)
1. Mentoring philosophy: removed the future-lab sentence ("In the lab, each trainee will start from tested, shared code and data…").

## Round 7 (2026-10-01)
1. Team bio replaced with the PI's text, edited: typo fixed; unpublished-work claims (retinal disease, chromatin profiling, organoids, "open" PINNOU) removed; the predictive-program paragraph softened to one sentence and merged into paragraph 2 (PI choice). Bio now renders as separate paragraphs.

## Round 8 (2026-10-01)
1. Team: bio text now starts level with the top of the photo (removed the first paragraph's top margin).

## Round 9 (2026-10-01)
1. Bio: "vision research with Anand Swaroop at the National Eye Institute", with his name linked to his NIH IRP page (https://irp.nih.gov/pi/anand-swaroop; PI-specified, page verified). Bio now supports [text](url) links.
2. Affiliation under the photo: Staff Scientist / Neurobiology, Neurodegeneration & Repair Laboratory / National Eye Institute, National Institutes of Health (affiliation is now a list in site.yaml).

## Round 10 (2026-10-01)
1. Hero sub-line → "Led by Soumitra Pal | Computational Biology of Cell Identity and Change"; welcome paragraph replaced with the PI's text (verbatim).

## Round 11 (2026-10-01)
1. Split "Algorithms and high-performance computing" into "Algorithms for sequence analysis" (edit-distance motifs, quorum PMS, KCMBT, perfect reads, MSC) and "Algorithms, optimization and parallel computing" (PhD light-trails JPDC 2012, fragmented colouring DAM 2015, IBM e-Energy 2013 meter connectivity, NIPS-workshop sparse integer recovery, parallel Jacobi SVD HPCC 2016, Hybrid-DCA JPDC 2020). Both placed last in Research. KCMBT/qPMS papers listed (cards stay hidden).

## Round 12 (2026-10-01)
1. Hero art: replaced the generated mosaic with the PI's lab concept illustration (source/lab_concept_figure.png → public/images/lab-concept-{960,1440,2172}.webp, 49–171 KB; phone crop lab-concept-m-900.webp showing the cell-state space and retina). Layout: hero text in two columns, illustration as a full-width band below with soft edges; descriptive alt text. Switch back with `hero_art: mosaic` in site.yaml.
   Lighthouse home: mobile 99/100/100/100 (LCP 2.1 s), desktop 100 across; CLS 0.

## Round 13 (2026-10-01)
1. Hero: illustration band moved above the text.

## Round 14 (2026-10-01)
1. Team links: CV (public/cv.pdf), Google Scholar, ORCID (0000-0003-4840-3944, checksum valid), GitHub, LinkedIn. Scholar verified as PI's profile; LinkedIn and Google Scholar block automated checks (link checker reports SKIP; both confirmed manually).
2. Publications page: "Also on Google Scholar" link at the top.
3. Public CV = CV V8 with home address and phone truly redacted (text removed, not just covered); metadata cleaned.

## Round 15 (2026-10-01)
1. Attribution note (site.yaml `attribution`) at the top of Research and Publications: work carried out with colleagues in the groups of Anand Swaroop (NEI), Teresa Przytycka (NCBI), Sanguthevar Rajasekaran (UConn) and Abhiram Ranade (IIT Bombay), each linked (pages verified).
2. "We/our" for past work changed to neutral wording in research themes, mentoring and one news item; hero lab voice kept; hidden Join/predictive texts unchanged.
