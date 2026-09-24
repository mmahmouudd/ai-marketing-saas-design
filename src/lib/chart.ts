/** Tiny helpers for hand-rolled SVG charts (no chart library required). */

export type Pt = { x: number; y: number };

export function scalePoints(
  values: number[],
  width: number,
  height: number,
  padTop = 6,
  padBottom = 6,
  min?: number,
  max?: number,
): Pt[] {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  const usable = height - padTop - padBottom;
  const step = values.length > 1 ? width / (values.length - 1) : width;
  return values.map((v, i) => ({
    x: +(i * step).toFixed(2),
    y: +(padTop + usable - ((v - lo) / span) * usable).toFixed(2),
  }));
}

/** Catmull-Rom → cubic bezier for buttery smooth lines. */
export function smoothPath(pts: Pt[], tension = 0.34): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function areaFrom(path: string, pts: Pt[], height: number): string {
  if (!pts.length) return "";
  const last = pts[pts.length - 1];
  return `${path} L ${last.x} ${height} L ${pts[0].x} ${height} Z`;
}

export function donutArc(
  cx: number,
  cy: number,
  r: number,
  startPct: number,
  endPct: number,
): string {
  const a0 = startPct * 2 * Math.PI - Math.PI / 2;
  const a1 = endPct * 2 * Math.PI - Math.PI / 2;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = endPct - startPct > 0.5 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

export function formatCompact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}
