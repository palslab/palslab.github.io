// @ts-check
import { defineConfig } from 'astro/config';

// User/org GitHub Pages site: served from the domain root, so no `base`.
// Custom domain later: set `site` to 'https://<domain>' and add public/CNAME
// containing the bare domain (see CNAME.example in the repo root).
export default defineConfig({
  site: 'https://palslab.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
