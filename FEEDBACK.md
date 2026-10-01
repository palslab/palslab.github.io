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
