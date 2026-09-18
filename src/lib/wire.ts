/* Le linee sottili che uniscono due parole: la hero delle pagine interne e il
   racconto delle pizze gourmet usano lo stesso disegno.

   Regola unica: la linea attacca sempre al centro di un lato. Se le due
   parole sono affiancate parte dalla metà verticale di una e arriva alla
   metà verticale dell'altra; se sono una sopra all'altra scende dalla metà
   orizzontale della prima alla metà orizzontale della seconda. */

export type WireKind = "solid" | "dashed" | "straight";

export type Box = { left: number; top: number; width: number; height: number };

/** Posizione e misura di un elemento senza le trasformazioni di GSAP: a metà
    animazione è scalato, ma le linee vanno ai posti finali. */
export const box = (el: HTMLElement): Box => ({
  left: el.offsetLeft,
  top: el.offsetTop,
  width: el.offsetWidth,
  height: el.offsetHeight,
});

const r = (n: number) => Math.round(n * 10) / 10;
const PAD = 16;

/**
 * Percorso SVG dalla parola `a` alla parola `b`, nelle coordinate del
 * contenitore: una curva a "S" con tangenti orizzontali o verticali, oppure
 * il segmento dritto che unisce gli stessi due capi.
 */
export function wirePath(a: Box, b: Box, kind: WireKind): string {
  const acx = a.left + a.width / 2;
  const acy = a.top + a.height / 2;
  const bcx = b.left + b.width / 2;
  const bcy = b.top + b.height / 2;
  const P = (x: number, y: number) => `${r(x)} ${r(y)}`;

  const overlapY =
    Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
  const sideBySide = overlapY > Math.min(a.height, b.height) * 0.5;

  if (sideBySide) {
    const rightward = bcx >= acx;
    const sx = rightward ? a.left + a.width + PAD : a.left - PAD;
    const ex = rightward ? b.left - PAD : b.left + b.width + PAD;
    if (kind === "straight") return `M${P(sx, acy)} L${P(ex, bcy)}`;
    const c = (ex - sx) * 0.5;
    return `M${P(sx, acy)} C${P(sx + c, acy)} ${P(ex - c, bcy)} ${P(ex, bcy)}`;
  }

  const sy = a.top + a.height + PAD;
  const ey = b.top - PAD;
  if (kind === "straight") return `M${P(acx, sy)} L${P(bcx, ey)}`;
  const c = Math.max(ey - sy, 0) * 0.5;
  return `M${P(acx, sy)} C${P(acx, sy + c)} ${P(bcx, ey - c)} ${P(bcx, ey)}`;
}
