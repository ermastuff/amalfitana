/* Cablaggio del racconto: dove stanno frasi e foto nella griglia di ogni
   capitolo e come si disegna la linea che unisce una frase alla successiva.

   Le linee attaccano sempre al centro di un lato: o partono dalla metà
   orizzontale (sotto) e arrivano alla metà orizzontale (sopra), oppure
   partono dalla metà verticale (fianco) e arrivano alla metà verticale.
   Uniscono solo le frasi: le foto non sono mai un capo, al massimo la
   linea ci passa sotto. */

export type WireKind = "solid" | "dashed" | "straight";

export type Box = { left: number; top: number; width: number; height: number };

/** Posto di una frase: colonne su 12 (6 da mobile) e riga esplicita. Da
    mobile le colonne sono strette: due frasi affiancate vanno su due righe
    separate, ed è a questo che serve `rowM`. */
export type TextSlot = { col: string; colM: string; row: number; rowM: number };

/** Posto di una foto piccola: di fianco a una frase, sulla stessa riga e
    quindi centrata con lei, oppure esattamente a metà di una linea. */
export type ShotSlot =
  | { at: "beside"; col: string; colM: string; row: number; pos: string }
  | { at: "midwire"; wire: number; pos: string };

export type Pattern = {
  texts: TextSlot[];
  /** Al massimo due per capitolo. */
  shots: ShotSlot[];
  /** Stile della linea i-esima, dalla frase i alla frase i+1. */
  wires: WireKind[];
  rowGap: string;
  besideRatio: string;
  wireRatio: string;
  wireWidth: string;
};

// Corsie: sinistra, centro, destra (desktop / mobile)
const L = "2 / span 4";
const C = "5 / span 4";
const R = "8 / span 4";
const Lm = "1 / span 4";
const Cm = "2 / span 4";
const Rm = "3 / span 4";

const T = (col: string, colM: string, row: number, rowM = row): TextSlot => ({
  col,
  colM,
  row,
  rowM,
});

/** Cinque pattern, uno per capitolo: stesso impianto ordinato, composizioni
    diverse (corsie, coppie affiancate, colonna centrale, scala, alternanza). */
export const PATTERNS: Pattern[] = [
  // 1 — Zigzag a due corsie: le frasi rimbalzano da sinistra a destra
  {
    texts: [
      T(L, Lm, 1),
      T(R, Rm, 2),
      T(L, Lm, 3),
      T(R, Rm, 4),
      T(L, Lm, 5),
      T(R, Rm, 6),
    ],
    shots: [
      { at: "beside", col: "3 / span 2", colM: "1 / span 2", row: 2, pos: "50% 18%" },
      { at: "midwire", wire: 3, pos: "50% 82%" },
    ],
    wires: ["solid", "dashed", "solid", "solid", "dashed"],
    rowGap: "clamp(7rem, 20svh, 12rem)",
    besideRatio: "3 / 4",
    wireRatio: "3 / 2",
    wireWidth: "clamp(130px, 15vw, 210px)",
  },
  // 2 — Coppie affiancate: due frasi per riga, la foto in mezzo alla linea
  {
    texts: [
      T(L, Lm, 1, 1),
      T(R, Rm, 1, 2),
      T(C, Cm, 2, 3),
      T(L, Lm, 3, 4),
      T(R, Rm, 3, 5),
      T(C, Cm, 4, 6),
      T(R, Rm, 5, 7),
    ],
    shots: [
      { at: "midwire", wire: 0, pos: "50% 20%" },
      { at: "midwire", wire: 3, pos: "50% 84%" },
    ],
    wires: ["solid", "dashed", "solid", "straight", "dashed", "solid"],
    rowGap: "clamp(6rem, 17svh, 10rem)",
    besideRatio: "3 / 4",
    wireRatio: "4 / 5",
    wireWidth: "clamp(110px, 12vw, 170px)",
  },
  // 3 — Colonna centrale: le frasi in asse, le foto ai lati
  {
    texts: [
      T(C, Cm, 1),
      T(C, "1 / span 4", 2),
      T(C, Cm, 3),
      T(C, Cm, 4),
      T(C, "3 / span 4", 5),
      T(C, Cm, 6),
      T(C, Cm, 7),
    ],
    shots: [
      { at: "beside", col: "10 / span 2", colM: "5 / span 2", row: 2, pos: "50% 16%" },
      { at: "beside", col: "2 / span 2", colM: "1 / span 2", row: 5, pos: "50% 86%" },
    ],
    wires: ["straight", "solid", "straight", "solid", "straight", "solid"],
    rowGap: "clamp(7rem, 21svh, 12rem)",
    besideRatio: "1 / 1",
    wireRatio: "3 / 2",
    wireWidth: "clamp(130px, 15vw, 210px)",
  },
  // 4 — A scala: le frasi scendono verso destra e poi tornano
  {
    texts: [
      T("2 / span 4", Lm, 1),
      T("4 / span 4", Cm, 2),
      T("6 / span 4", Rm, 3),
      T("8 / span 4", Rm, 4),
      T("6 / span 4", Cm, 5),
      T("4 / span 4", Lm, 6),
      T("2 / span 4", Lm, 7),
    ],
    shots: [
      { at: "beside", col: "9 / span 3", colM: "5 / span 2", row: 1, pos: "50% 18%" },
      { at: "midwire", wire: 3, pos: "50% 84%" },
    ],
    wires: ["solid", "solid", "dashed", "solid", "solid", "dashed"],
    rowGap: "clamp(6.5rem, 18svh, 11rem)",
    besideRatio: "4 / 5",
    wireRatio: "3 / 2",
    wireWidth: "clamp(130px, 15vw, 210px)",
  },
  // 5 — Alternanza larga con pausa al centro
  {
    texts: [
      T(R, Rm, 1),
      T(L, Lm, 2),
      T(R, Rm, 3),
      T(C, "3 / span 4", 4),
      T(L, Lm, 5),
      T(R, "1 / span 4", 6),
      T(C, Cm, 7),
    ],
    shots: [
      { at: "beside", col: "2 / span 3", colM: "1 / span 2", row: 4, pos: "50% 18%" },
      { at: "beside", col: "3 / span 2", colM: "5 / span 2", row: 6, pos: "50% 84%" },
    ],
    wires: ["dashed", "solid", "solid", "dashed", "solid", "straight"],
    rowGap: "clamp(7rem, 22svh, 13rem)",
    besideRatio: "4 / 5",
    wireRatio: "3 / 2",
    wireWidth: "clamp(130px, 15vw, 210px)",
  },
];

const r = (n: number) => Math.round(n * 10) / 10;
const PAD = 14;

/**
 * Percorso SVG dalla frase `a` alla frase `b`, nelle coordinate del
 * contenitore. Se le due frasi sono affiancate (si sovrappongono in
 * verticale) la linea va da un fianco all'altro, agganciata alla metà
 * verticale di entrambe, con tangenti orizzontali. Altrimenti scende dalla
 * metà orizzontale di `a` alla metà orizzontale di `b`, con tangenti
 * verticali (la "S" del riferimento) oppure dritta.
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
