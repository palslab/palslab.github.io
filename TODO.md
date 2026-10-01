# TODO

Unverified links and missing assets. Remove items once resolved.

## Verify links (run on your Mac)

doi.org and Crossref rate-limited / blocked the build sandbox on 2026-10-01, so these render **without** links.
From the project folder in Terminal: `node scripts/check-links.mjs --write` checks every URL and marks passing DOIs as verified; then rebuild.

Unverified DOIs (22):

- [ ] 10.21203/rs.3.rs-10144266/v1 — Evolution of MAF and OTX families during the emergence and stabilizati
- [ ] 10.1111/acel.70001 — Transcriptional Heterogeneity and Differential Response of Rod Photore
- [ ] 10.1016/j.cels.2024.11.013 — Stochastic modelling of single-cell gene expression adaptation reveals
- [ ] 10.7554/eLife.101641 — Diverse somatic Transformer and sex chromosome karyotype pathways regu
- [ ] 10.7554/eLife.82201 — Emergent dynamics of adult stem cell lineages from single nucleus and 
- [ ] 10.1126/science.abk2432 — Fly Cell Atlas: a single-cell transcriptomic atlas of the adult fruit 
- [ ] 10.1016/j.jpdc.2020.04.002 — Hybrid-DCA: A Double Asynchronous Approach for Stochastic Dual Coordin
- [ ] 10.1093/bioinformatics/btz956 — Bioinformatics pipeline using JUDI: Just Do It!
- [ ] 10.1093/bioinformatics/bty1071 — MSC: a metagenomic sequence classification algorithm
- [ ] 10.1093/nar/gkz540 — Co-SELECT reveals sequence non-specific contribution of DNA shape to t
- [ ] 10.1504/IJDMB.2017.086457 — Randomised sequential and parallel algorithms for efficient quorum pla
- [ ] 10.1186/s12864-016-2789-9 — Efficient sequential and parallel algorithms for finding edit distance
- [ ] 10.1093/bioinformatics/btw345 — KCMBT: a k-mer Counter based on Multiple Burst Trees
- [ ] 10.1186/1471-2105-16-S17-S7 — In search of perfect reads
- [ ] 10.1016/j.dam.2015.04.014 — Fragmented coloring of proper interval and split graphs
- [ ] 10.1016/j.jpdc.2012.05.010 — Scheduling light-trails on WDM rings
- [ ] 10.1109/HPCC-SmartCity-DSS.2016.0013 — On Speeding-up Parallel Jacobi Iterations for SVDs
- [ ] 10.1109/BIBM.2016.7822598 — qPMS10: A Randomized Algorithm for Efficiently Solving Quorum Planted 
- [ ] 10.1109/BIBM.2015.7359740 — Improved Algorithms for Finding Edit Distance Based Motifs
- [ ] 10.1109/ICCABS.2015.7344733 — Efficient techniques for k-mer counting
- [ ] 10.1109/ICCABS.2014.6863919 — In Search of Perfect Reads
- [ ] 10.1145/2487166.2487186 — Inferring Connectivity Model from Meter Measurements in Distribution N

Unverified URLs:

- [ ] https://arxiv.org/abs/1112.6254 — Scheduling Light-trails on WDM Rings
- [ ] https://arxiv.org/abs/1112.1757 — Recovery of a Sparse Integer Solution to an Underdetermined 
- [ ] Google Scholar https://scholar.google.com/citations?user=6dnFbTkAAAAJ (from old Google Site; unreachable from sandbox) → `pi.links.scholar`
- [ ] LinkedIn https://www.linkedin.com/in/soumitra-pal-0b2b871/ (from old Google Site) → `pi.links.linkedin`
- [ ] ORCID iD — not in any source document; please supply → `pi.links.orcid`
- [ ] Fly Cell Atlas DOI: publisher returned 403 to the checker (bot block); doi.org check pending

## Software code locations (need PI confirmation)

- [ ] PINNOU — no public repository found
- [ ] qPMS10 — no repository found
- [ ] Hybrid-DCA — no repository found
- [ ] KCMBT — candidate https://github.com/abdullah009/kcmbt_mt (co-author's account; returns 200). Link it?
- Verified (HTTP 200) and linked: ncbi/EvoGeneX, ncbi/JUDI, ncbi/Co-SELECT, soumitrakp/ems2, soumitrakp/perfectread

## Missing assets / decisions

- [ ] Headshot: square ≥800 px → `source/headshot.jpg`
- [ ] CV PDF for the public site (a version without home address/phone) → `public/cv.pdf`, then `pi.links.cv: /cv.pdf`
- [ ] Public contact email (currently provisional soumitrakp@gmail.com)
- [ ] Mailing address (currently none shown; CV has a home address — not used)
- [ ] Trainee consent: set `consent: true` in people.yaml only after each person agrees
