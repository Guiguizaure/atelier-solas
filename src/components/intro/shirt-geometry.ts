/*
 * Geometry of the shirt intro, ported from the « Déboutonné » prototype.
 *
 * The shirt is two panels meeting at the centre line c = W/2. Each panel edge goes
 * through 7 points at y = 0, the 5 button rows (20…80% of H) and H. Point j has a gap
 * g[j] between the panels: left edge xL = c + OV − g/2, right edge xR = c − OV + g/2.
 * Closed (g = 0), the panels overlap by 2·OV = 36px: the left panel lies on top and
 * carries the buttonholes (xL − OV), the right one carries the buttons (xR + OV); both
 * land on c, button in its hole. Edges are Catmull-Rom curves through the 7 points.
 *
 * `layoutShirt`, `collectShirt`, `drawStatic` and `drawShirt` must stay self-contained
 * (no imports, no module-level references, no object spread): they are also inlined as
 * source text in the pre-paint script (intro-prepaint.ts), so the closed shirt is drawn
 * before the first paint, then React takes over the very same nodes.
 */

export const SHIRT = {
  /** Button rows, as a fraction of the viewport height */
  ROWS: [0.2, 0.35, 0.5, 0.65, 0.8],
  /** Half of the button-stand overlap, px */
  OV: 18,
  /** Minimum opening at an undone point, px */
  BASE: 26,
};
export type ShirtConstants = typeof SHIRT;

export interface ShirtGeometry {
  W: number;
  H: number;
  /** y of the 7 control points */
  ys: number[];
  lcol: string;
  rcol: string;
  pocket: { x: number; y: number; w: number; h: number; cy: number };
}

export interface ShirtElements {
  svg: SVGSVGElement;
  lfab: SVGPathElement;
  rfab: SVGPathElement;
  lst: SVGPathElement;
  lst2: SVGPathElement;
  rst: SVGPathElement;
  rst2: SVGPathElement;
  lcol: SVGPathElement;
  rcol: SVGPathElement;
  pocket: SVGGElement;
  pocketBody: SVGPathElement;
  pocketStitch: SVGPathElement;
  pocketHem: SVGPathElement;
  pocketMark: SVGTextElement;
  holes: SVGPathElement[];
  buttons: HTMLElement[];
}

export function layoutShirt(W: number, H: number, C: ShirtConstants): ShirtGeometry {
  const ys = [0];
  for (let i = 0; i < C.ROWS.length; i++) ys.push(C.ROWS[i] * H);
  ys.push(H);
  const c = W / 2;
  const OV = C.OV;
  // Collars are drawn closed, then moved with the top point of each panel
  const cw = Math.min(W * 0.3, 340);
  const tip = Math.min(H * 0.13, ys[1] - 34);
  const lcol = `M${c - cw} -4 L${c + OV + 4} -4 L${c + 6} ${tip} Q${c - cw * 0.45} ${tip * 0.82} ${c - cw} ${H * 0.045} Z`;
  const rcol = `M${c + cw} -4 L${c - OV - 4} -4 L${c - 6} ${tip} Q${c + cw * 0.45} ${tip * 0.82} ${c + cw} ${H * 0.045} Z`;
  // Embroidered pocket on the right panel
  const w = Math.max(86, Math.min(W * 0.15, 210));
  const x = c + Math.max(34, W * 0.09);
  const y = H * 0.3;
  const h = w * 1.12;
  return { W, H, ys, lcol, rcol, pocket: { x, y, w, h, cy: y + h / 2 } };
}

export function collectShirt(root: ParentNode): ShirtElements {
  const q = <T extends Element>(part: string) =>
    root.querySelector(`[data-part="${part}"]`) as T;
  return {
    svg: q<SVGSVGElement>("svg"),
    lfab: q<SVGPathElement>("lfab"),
    rfab: q<SVGPathElement>("rfab"),
    lst: q<SVGPathElement>("lst"),
    lst2: q<SVGPathElement>("lst2"),
    rst: q<SVGPathElement>("rst"),
    rst2: q<SVGPathElement>("rst2"),
    lcol: q<SVGPathElement>("lcol"),
    rcol: q<SVGPathElement>("rcol"),
    pocket: q<SVGGElement>("pocket"),
    pocketBody: q<SVGPathElement>("pocket-body"),
    pocketStitch: q<SVGPathElement>("pocket-stitch"),
    pocketHem: q<SVGPathElement>("pocket-hem"),
    pocketMark: q<SVGTextElement>("pocket-mark"),
    holes: Array.prototype.slice.call(root.querySelectorAll('[data-part="hole"]')),
    buttons: Array.prototype.slice.call(root.querySelectorAll('[data-part="button"]')),
  };
}

/** Writes what only changes with the viewport size. */
export function drawStatic(els: ShirtElements, geo: ShirtGeometry) {
  const p = geo.pocket;
  els.svg.setAttribute("viewBox", `0 0 ${geo.W} ${geo.H}`);
  els.lcol.setAttribute("d", geo.lcol);
  els.rcol.setAttribute("d", geo.rcol);
  els.pocketBody.setAttribute(
    "d",
    `M${p.x} ${p.y} H${p.x + p.w} V${p.y + p.h * 0.86} L${p.x + p.w / 2} ${p.y + p.h} L${p.x} ${p.y + p.h * 0.86} Z`,
  );
  els.pocketStitch.setAttribute(
    "d",
    `M${p.x + 5} ${p.y + 5} H${p.x + p.w - 5} V${p.y + p.h * 0.86 - 2} L${p.x + p.w / 2} ${p.y + p.h - 6} L${p.x + 5} ${p.y + p.h * 0.86 - 2} Z`,
  );
  els.pocketHem.setAttribute("d", `M${p.x} ${p.y + 14} H${p.x + p.w}`);
  els.pocketMark.setAttribute("x", String(p.x + p.w / 2));
  els.pocketMark.setAttribute("y", String(p.y + p.h * 0.58));
  els.pocketMark.setAttribute("font-size", String(p.w * 0.42));
}

/** Writes the panels for the gaps `g` (7 values, px). Called every animation frame. */
export function drawShirt(
  els: ShirtElements,
  geo: ShirtGeometry,
  g: number[],
  C: ShirtConstants,
) {
  const ys = geo.ys;
  const c = geo.W / 2;
  const OV = C.OV;
  const f = (n: number) => n.toFixed(1);
  // Catmull-Rom through the points, as cubic Bézier segments (end points duplicated)
  const curve = (pts: number[][]) => {
    let d = "";
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      d +=
        ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}` +
        ` ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)}` +
        ` ${f(p2[0])} ${f(p2[1])}`;
    }
    return d;
  };
  const shifted = (xs: number[], dx: number) => xs.map((x, j) => [x + dx, ys[j]]);
  const line = (xs: number[], dx: number) => `M${f(xs[0] + dx)} 0` + curve(shifted(xs, dx));
  const xL = g.map((gap) => c + OV - gap / 2);
  const xR = g.map((gap) => c - OV + gap / 2);
  const H = geo.H;

  els.lfab.setAttribute("d", `M0 0 L${f(xL[0])} 0` + curve(shifted(xL, 0)) + ` L0 ${H} Z`);
  els.rfab.setAttribute("d", `M${geo.W} 0 L${f(xR[0])} 0` + curve(shifted(xR, 0)) + ` L${geo.W} ${H} Z`);
  els.lst.setAttribute("d", line(xL, -7));
  els.lst2.setAttribute("d", line(xL, -OV * 2 - 8));
  els.rst.setAttribute("d", line(xR, 7));
  els.rst2.setAttribute("d", line(xR, OV * 2 + 8));
  els.lcol.setAttribute("transform", `translate(${f(xL[0] - (c + OV))} 0)`);
  els.rcol.setAttribute("transform", `translate(${f(xR[0] - (c - OV))} 0)`);

  // The pocket follows the right edge at its own height (linear between points)
  const cy = geo.pocket.cy;
  let px = xR[6];
  for (let j = 0; j < 6; j++) {
    if (cy >= ys[j] && cy <= ys[j + 1]) {
      px = xR[j] + ((xR[j + 1] - xR[j]) * (cy - ys[j])) / (ys[j + 1] - ys[j]);
      break;
    }
  }
  els.pocket.setAttribute("transform", `translate(${f(px - (c - OV))} 0)`);

  for (let i = 0; i < els.buttons.length; i++) {
    const y = ys[i + 1];
    const hx = xL[i + 1] - OV;
    els.holes[i].setAttribute("d", `M${f(hx - 10)} ${f(y)} H${f(hx + 10)}`);
    els.buttons[i].style.translate = `${f(xR[i + 1] + OV)}px ${f(y)}px`;
  }
}

/**
 * Target gaps for a set of undone buttons. An undone point opens in proportion to its
 * distance to the next fastened button below (or the hem): the fabric pivots around it,
 * which gives the V whatever the order the buttons are undone in.
 */
export function shirtTargets(undone: boolean[], geo: ShirtGeometry, C: ShirtConstants) {
  const { ys, W, H } = geo;
  const F = (W * 0.92) / H;
  const t: number[] = [];
  for (let j = 0; j <= 6; j++) {
    // Point 0 (collar) follows button 1; the hem (6) only opens with the full opening
    const open = j === 0 ? undone[0] : j <= 5 ? undone[j - 1] : false;
    if (!open) {
      t.push(0);
      continue;
    }
    let m = 6;
    for (let i = j + 1; i <= 5; i++) {
      if (!undone[i - 1]) {
        m = i;
        break;
      }
    }
    t.push(F * (ys[m] - ys[j]) + C.BASE);
  }
  return t;
}

/** Fully open: panels slide off screen. The intro ends once the hem passes this gap. */
export const fullOpenGap = (W: number) => W * 2.4;
export const finishedGap = (W: number) => W * 1.15;
