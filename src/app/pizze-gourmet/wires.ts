/* Cablaggio del racconto: dove stanno i nodi (frammenti e foto piccole)
   nella griglia e come si disegna la linea che li collega. */

export type WireKind = "solid" | "dashed" | "straight";

export type Slot = { col: string; colM: string; row: number };

export type Box = { left: number; top: number; width: number; height: number };

/** Posto di ogni nodo, nell'ordine del DOM: colonne su 12 (6 da mobile) e
    riga esplicita. Due nodi con la stessa riga stanno affiancati: la foto
    piccola e il frammento che le sta accanto, come i ritratti del riferimento. */
export const SLOTS: Slot[] = [
  { col: "2 / span 4", colM: "1 / span 4", row: 1 },
  { col: "8 / span 4", colM: "3 / span 4", row: 2 },
  { col: "2 / span 2", colM: "1 / span 2", row: 3 },
  { col: "7 / span 5", colM: "3 / span 4", row: 3 },
  { col: "3 / span 4", colM: "1 / span 4", row: 4 },
  { col: "10 / span 2", colM: "5 / span 2", row: 4 },
  { col: "5 / span 5", colM: "2 / span 4", row: 5 },
  { col: "8 / span 4", colM: "3 / span 4", row: 6 },
  { col: "2 / span 5", colM: "1 / span 5", row: 7 },
  { col: "7 / span 5", colM: "2 / span 4", row: 8 },
  { col: "3 / span 4", colM: "1 / span 4", row: 9 },
  { col: "8 / span 4", colM: "3 / span 4", row: 10 },
];

/** Stile della linea i-esima, dal nodo i al nodo i+1. */
export const WIRE_KINDS: WireKind[] = [
  "solid",
  "dashed",
  "solid",
  "straight",
  "solid",
  "dashed",
  "straight",
  "solid",
  "dashed",
  "solid",
  "straight",
];

const r = (n: number) => Math.round(n * 10) / 10;

/**
 * Percorso SVG dal nodo `a` al nodo `b` (misure nello stesso sistema di
 * coordinate del contenitore). Nodi affiancati: dal fianco dell'uno al fianco
 * dell'altro, con tangenti orizzontali. Nodi in colonna: dal basso di `a`
 * all'alto di `b`, agganciati dal lato rivolto verso l'altro, con tangenti
 * verticali (la "S" del riferimento) oppure un tratto dritto.
 */
export function wirePath(
  a: Box,
  b: Box,
  kind: WireKind,
  axis: "auto" | "vertical" = "auto",
): string {
  const pad = 12;
  const acx = a.left + a.width / 2;
  const acy = a.top + a.height / 2;
  const bcx = b.left + b.width / 2;
  const bcy = b.top + b.height / 2;
  const dx = bcx - acx;
  const dy = bcy - acy;
  const P = (x: number, y: number) => `${r(x)} ${r(y)}`;

  if (axis === "auto" && Math.abs(dx) > Math.abs(dy) * 1.3) {
    const sx = dx > 0 ? a.left + a.width + pad : a.left - pad;
    const ex = dx > 0 ? b.left - pad : b.left + b.width + pad;
    if (kind === "straight") return `M${P(sx, acy)} L${P(ex, bcy)}`;
    const c = (ex - sx) * 0.5;
    return `M${P(sx, acy)} C${P(sx + c, acy)} ${P(ex - c, bcy)} ${P(ex, bcy)}`;
  }

  const lean = Math.sign(dx) * 0.3;
  const sx = acx + a.width * lean;
  const sy = a.top + a.height + pad;
  const ex = bcx - b.width * lean;
  const ey = b.top - pad;
  if (kind === "straight") return `M${P(sx, sy)} L${P(ex, ey)}`;
  const c = Math.max(ey - sy, 0) * 0.5;
  return `M${P(sx, sy)} C${P(sx, sy + c)} ${P(ex, ey - c)} ${P(ex, ey)}`;
}
