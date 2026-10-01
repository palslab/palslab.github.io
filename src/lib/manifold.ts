// Original hero art, generated at build time: a curved surface of cell states with a
// healthy basin, cells scattered over it, a trajectory that departs from health, and a
// dashed return path (restoration). Deterministic: same output on every build.

export interface ManifoldArt {
  w: number; h: number;
  grid: string[];                               // polyline paths for the surface mesh
  cells: { x: number; y: number; r: number; k: 0 | 1 | 2 }[]; // k: 0 healthy, 1 drifting, 2 departed
  depart: string; restore: string;              // trajectory paths
  basin: { x: number; y: number };
  end: { x: number; y: number };
}

function rng(seed: number) {               // mulberry32
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function manifold(w = 640, h = 420, seed = 11): ManifoldArt {
  const B = { x: -0.5, y: 0.25 };                            // healthy basin centre (surface coords)
  const E = { x: 0.62, y: -0.62 };                           // where the departing trajectory ends
  const z = (x: number, y: number) =>
    -0.9 * Math.exp(-((x - B.x) ** 2 + (y - B.y) ** 2) / 0.13)   // deep basin = healthy state
    + 0.35 * (x - y) * 0.5 + 0.10 * Math.sin(2.6 * y + 0.4) + 0.07 * Math.cos(3.3 * x);
  const P = (x: number, y: number) => ({
    x: w * 0.5 + (x - y) * w * 0.36,
    y: h * 0.47 + (x + y) * h * 0.25 - z(x, y) * h * 0.30,
  });
  const f = (n: number) => n.toFixed(1);
  const line = (pts: { x: number; y: number }[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p.x)},${f(p.y)}`).join('');

  const N = 18, S = 60, grid: string[] = [];
  for (let i = 0; i <= N; i++) {
    const a = -1 + (2 * i) / N, u: { x: number; y: number }[] = [], v: { x: number; y: number }[] = [];
    for (let j = 0; j <= S; j++) { const b = -1 + (2 * j) / S; u.push(P(a, b)); v.push(P(b, a)); }
    grid.push(line(u), line(v));
  }

  // departing path: smooth S-curve from basin up the slope
  const dpt = (t: number) => ({ x: B.x + (E.x - B.x) * t + 0.10 * Math.sin(Math.PI * t), y: B.y + (E.y - B.y) * t + 0.10 * Math.sin(Math.PI * t) });
  // restoring path: bowed the other way, ending just short of the basin
  const rst = (t: number) => ({ x: E.x + (B.x + 0.14 - E.x) * t - 0.22 * Math.sin(Math.PI * t), y: E.y + (B.y - 0.12 - E.y) * t - 0.22 * Math.sin(Math.PI * t) });

  const r = rng(seed), gauss = () => (r() + r() + r() - 1.5) * 0.8;
  const cells: ManifoldArt['cells'] = [];
  for (let i = 0; i < 260; i++) {
    const u = r();
    let q;
    if (u < 0.55) q = { x: B.x + gauss() * 0.27, y: B.y + gauss() * 0.27 };            // healthy cluster
    else if (u < 0.85) { const c = dpt(0.25 + r() * 0.75); q = { x: c.x + gauss() * 0.14, y: c.y + gauss() * 0.14 }; } // along the departure
    else q = { x: -0.95 + r() * 1.9, y: -0.95 + r() * 1.9 };                             // sparse background
    if (Math.abs(q.x) > 1 || Math.abs(q.y) > 1) continue;
    const d = Math.hypot(q.x - B.x, q.y - B.y);
    const p = P(q.x, q.y);
    cells.push({ x: p.x, y: p.y, r: 1.5 + r() * 2.0, k: d < 0.32 ? 0 : d < 0.75 ? 1 : 2 });
  }
  cells.sort((a, b) => a.y - b.y);

  const dep = Array.from({ length: 61 }, (_, j) => { const c = dpt(j / 60); return P(c.x, c.y); });
  const res = Array.from({ length: 51 }, (_, j) => { const c = rst(j / 50); return P(c.x, c.y); });
  return { w, h, grid, cells, depart: line(dep), restore: line(res), basin: P(B.x, B.y), end: P(E.x, E.y) };
}
