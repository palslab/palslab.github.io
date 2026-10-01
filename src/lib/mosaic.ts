// Original hero art, generated at build time: a photoreceptor mosaic as seen in a retinal
// flat-mount. Small rods, scattered larger cones, and one circular patch where cells are
// thinning and changing state (departure from health). Deterministic on every build.
// The fade toward the text is a CSS mask (Hero.astro), so it can differ by screen size.

export interface Dot { x: number; y: number; r: number; o: number; k: 'rod' | 'cone' | 'patch' }

function rng(seed: number) {               // mulberry32
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function mosaic(w = 640, h = 616, seed = 3) {
  const r = rng(seed), dots: Dot[] = [];
  const cx = w * 0.56, cy = h * 0.54, R = 150;               // the degenerating patch
  for (let row = 0; row < Math.ceil(h / 14.5) + 1; row++) {
    for (let col = 0; col < Math.ceil(w / 17) + 1; col++) {
      const x = col * 17 + (row % 2) * 8.5 - 10 + (r() - 0.5) * 5;
      const y = row * 14.5 - 10 + (r() - 0.5) * 5;
      const dep = Math.max(0, 1 - Math.hypot(x - cx, (y - cy) * 1.15) / R);
      const cone = r() < 0.07;
      if (r() < dep * 0.55) continue;                        // cells lost inside the patch
      const rad = (cone ? 5.4 : 3.4) * (1 - dep * 0.45);
      if (dep > 0.15) dots.push({ x, y, r: rad, o: 0.4 + dep * 0.6, k: 'patch' });
      else dots.push({ x, y, r: rad, o: cone ? 1 : 0.22 + 0.25 * r(), k: cone ? 'cone' : 'rod' });
    }
  }
  return { w, h, dots, ring: { cx, cy, r: R + 18 } };
}
