# Drafts (not built, not committed)

Pages here hold unpublished material. Everything in this folder except this README is
git-ignored, so it never reaches the public repository, and nothing here is imported by
any page, so it never reaches the built site.

Publishing a draft (only after a preprint exists and the PI says "publish"):
1. Update the text and figures to match the preprint.
2. Set `status: live` in the front matter.
3. Move it into `src/pages/` (or wire it into a page) and remove it from `.gitignore`.
`npm run check:drafts` keeps failing on the draft's guard terms until `status: live` is set.
