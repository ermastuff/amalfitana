/* Cablaggio del racconto: i pattern con cui frasi e foto stanno nella griglia
   e come si disegna la linea che collega una frase alla successiva. Le linee
   uniscono solo le frasi: le foto non sono mai un capo, al massimo la linea ci
   passa sotto. */

export type WireKind = "solid" | "dashed" | "straight";

export type Box = { left: number; top: number; width: number; height: number };

/** Un posto nella griglia del racconto: colonne su 12 (6 da mobile) e riga
    esplicita. Un posto per una frase consuma la frase successiva; uno per una
    foto ha il taglio della foto. Due posti con la stessa riga stanno
    affiancati. */
export type Entry =
  | { kind: "text"; col: string; colM: string; row: number }
  | { kind: "shot"; col: string; colM: string; row: number; pos: string };

export type Pattern = {
  entries: Entry[];
  /** Stile della linea i-esima, dalla frase i alla frase i+1. */
  wires: WireKind[];
  /** Distanza tra le righe e formato delle foto: cambiano da capitolo a capitolo. */
  rowGap: string;
  shotRatio: string;
};

const T = (col: string, colM: string, row: number): Entry => ({ kind: "text", col, colM, row });
const S = (col: string, colM: string, row: number, pos: string): Entry => ({ kind: "shot", col, colM, row, pos });

/** Cinque pattern, uno per capitolo, ciascuno con sette posti per le frasi
    e due per le foto. */
export const PATTERNS: Pattern[] = [
  // Zigzag largo: le foto ai lati, ognuna accanto a una frase
  {
    entries: [
      T("2 / span 4", "1 / span 4", 1),
      T("8 / span 4", "3 / span 4", 2),
      S("2 / span 2", "1 / span 2", 3, "50% 16%"),
      T("7 / span 5", "3 / span 4", 3),
      T("3 / span 4", "1 / span 4", 4),
      S("10 / span 2", "5 / span 2", 4, "50% 80%"),
      T("5 / span 5", "2 / span 4", 5),
      T("8 / span 4", "3 / span 4", 6),
      T("2 / span 5", "1 / span 5", 7),
    ],
    wires: ["solid", "dashed", "solid", "straight", "solid", "dashed"],
    rowGap: "clamp(7rem, 20svh, 12rem)",
    shotRatio: "3 / 4",
  },
  // Colonna destra: le frasi scendono a destra, le foto impilate a sinistra
  {
    entries: [
      T("7 / span 5", "2 / span 4", 1),
      T("9 / span 4", "3 / span 4", 2),
      S("2 / span 3", "1 / span 3", 2, "50% 22%"),
      T("4 / span 5", "1 / span 4", 3),
      S("2 / span 2", "1 / span 2", 4, "50% 84%"),
      T("6 / span 6", "3 / span 4", 4),
      T("8 / span 4", "2 / span 4", 5),
      T("3 / span 5", "1 / span 4", 6),
      T("6 / span 5", "2 / span 4", 7),
    ],
    wires: ["straight", "solid", "dashed", "solid", "dashed", "solid"],
    rowGap: "clamp(6rem, 16svh, 10rem)",
    shotRatio: "4 / 5",
  },
  // Centrato: le frasi oscillano attorno all'asse, le foto piccole
  {
    entries: [
      T("5 / span 4", "2 / span 4", 1),
      T("2 / span 4", "1 / span 4", 2),
      T("8 / span 4", "3 / span 4", 3),
      S("3 / span 2", "1 / span 2", 4, "50% 12%"),
      T("6 / span 5", "3 / span 4", 4),
      T("9 / span 4", "2 / span 4", 5),
      T("2 / span 4", "1 / span 4", 6),
      S("6 / span 2", "5 / span 2", 6, "50% 78%"),
      T("7 / span 5", "2 / span 4", 7),
    ],
    wires: ["dashed", "solid", "solid", "straight", "dashed", "solid"],
    rowGap: "clamp(8rem, 24svh, 14rem)",
    shotRatio: "1 / 1",
  },
  // Due foto affiancate a metà: la linea tra le frasi ci passa sotto
  {
    entries: [
      T("2 / span 4", "1 / span 4", 1),
      T("7 / span 5", "3 / span 4", 2),
      T("4 / span 5", "1 / span 4", 3),
      S("3 / span 2", "1 / span 2", 4, "50% 18%"),
      S("9 / span 2", "5 / span 2", 4, "50% 82%"),
      T("6 / span 5", "2 / span 4", 5),
      T("9 / span 4", "3 / span 4", 6),
      T("3 / span 5", "1 / span 4", 7),
      T("7 / span 5", "2 / span 4", 8),
    ],
    wires: ["solid", "dashed", "straight", "solid", "dashed", "solid"],
    rowGap: "clamp(6.5rem, 18svh, 11rem)",
    shotRatio: "3 / 4",
  },
  // A scala: parte da destra, una foto grande a destra e una piccola a sinistra
  {
    entries: [
      T("8 / span 4", "3 / span 4", 1),
      T("5 / span 5", "2 / span 4", 2),
      S("10 / span 3", "5 / span 2", 2, "50% 20%"),
      T("2 / span 5", "1 / span 4", 3),
      T("6 / span 5", "2 / span 4", 4),
      S("2 / span 2", "1 / span 2", 5, "50% 86%"),
      T("5 / span 5", "3 / span 4", 5),
      T("9 / span 4", "3 / span 4", 6),
      T("3 / span 5", "1 / span 4", 7),
    ],
    wires: ["dashed", "solid", "straight", "solid", "solid", "dashed"],
    rowGap: "clamp(7rem, 22svh, 13rem)",
    shotRatio: "4 / 5",
  },
];

const r = (n: number) => Math.round(n * 10) / 10;

/**
 * Percorso SVG dalla frase `a` alla frase `b` (misure nello stesso sistema di
 * coordinate del contenitore). Frasi affiancate: dal fianco dell'una al fianco
 * dell'altra, con tangenti orizzontali. Frasi in colonna: dal basso di `a`
 * all'alto di `b`, agganciate dal lato rivolto verso l'altra, con tangenti
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
