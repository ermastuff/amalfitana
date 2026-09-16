/* Cablaggio del racconto: dove stanno frasi e foto nella griglia di ogni
   capitolo e come si disegna la linea che unisce una frase alla successiva.

   Impianto uguale per tutti i capitoli, così niente è messo a caso:
   - la griglia ha cinque colonne e le frasi stanno solo nella seconda e
     nella quarta, alternandosi: la composizione resta dentro a una
     larghezza circoscritta;
   - una frase per riga, con molto spazio tra una e l'altra (vedi rowGap);
   - le linee attaccano sempre al centro di un lato: metà orizzontale
     sopra e sotto, oppure metà verticale ai fianchi;
   - ogni capitolo ha esattamente una linea dritta, ed è sempre diagonale
     (unisce la colonna 2 alla 4, mai due frasi incolonnate);
   - le linee uniscono solo le frasi: le foto non sono mai un capo, al
     massimo la linea ci passa sotto. */

export type WireKind = "solid" | "dashed" | "straight";

export type Box = { left: number; top: number; width: number; height: number };

/** Posto di una frase: colonna (la 2 o la 4 delle cinque) e riga. Da mobile
    le colonne sono strette, quindi la frase ne occupa tre o quattro. */
export type TextSlot = { col: string; colM: string; row: number; rowM: number };

/** Posto di una foto piccola: di fianco a una frase, sulla stessa riga e
    quindi centrata con lei, oppure esattamente a metà di una linea. */
export type ShotSlot =
  | { at: "beside"; col: string; colM: string; row: number; pos: string }
  | { at: "midwire"; wire: number; pos: string };

export type Pattern = {
  /** Cinque al massimo. */
  texts: TextSlot[];
  /** Due al massimo. */
  shots: ShotSlot[];
  /** Stile della linea i-esima, dalla frase i alla frase i+1: una sola dritta. */
  wires: WireKind[];
  rowGap: string;
  besideRatio: string;
  wireRatio: string;
  wireWidth: string;
};

// Le due colonne delle parole: la seconda e la quarta.
const A = "2";
const B = "4";
// Da mobile si allargano; dove c'è una foto di fianco lasciano il posto.
const Am = "1 / span 4";
const Bm = "2 / span 4";
const AmShot = "1 / span 3";
const BmShot = "3 / span 3";

const T = (col: string, colM: string, row: number): TextSlot => ({
  col,
  colM,
  row,
  rowM: row,
});

/** Un pattern per capitolo: cambia la colonna di partenza, quale linea è
    quella dritta, il misto di piene e tratteggiate, lo spazio tra le righe e
    il taglio delle foto. */
export const PATTERNS: Pattern[] = [
  // 1 — parte da sinistra, dritta sulla seconda linea
  {
    texts: [
      T(A, Am, 1),
      T(B, BmShot, 2),
      T(A, Am, 3),
      T(B, Bm, 4),
      T(A, Am, 5),
    ],
    shots: [
      { at: "beside", col: A, colM: "1 / span 2", row: 2, pos: "50% 18%" },
      { at: "midwire", wire: 3, pos: "50% 82%" },
    ],
    wires: ["solid", "straight", "dashed", "solid"],
    rowGap: "clamp(24rem, 62svh, 42rem)",
    besideRatio: "3 / 4",
    wireRatio: "3 / 2",
    wireWidth: "clamp(150px, 17vw, 240px)",
  },
  // 2 — parte da destra, dritta sull'ultima linea
  {
    texts: [
      T(B, Bm, 1),
      T(A, Am, 2),
      T(B, BmShot, 3),
      T(A, Am, 4),
      T(B, Bm, 5),
    ],
    shots: [
      { at: "midwire", wire: 0, pos: "50% 20%" },
      { at: "beside", col: A, colM: "1 / span 2", row: 3, pos: "50% 84%" },
    ],
    wires: ["dashed", "solid", "solid", "straight"],
    rowGap: "clamp(24rem, 66svh, 44rem)",
    besideRatio: "4 / 5",
    wireRatio: "4 / 5",
    wireWidth: "clamp(130px, 14vw, 200px)",
  },
  // 3 — parte da sinistra, dritta al centro, due foto ai lati
  {
    texts: [
      T(A, AmShot, 1),
      T(B, Bm, 2),
      T(A, Am, 3),
      T(B, BmShot, 4),
      T(A, Am, 5),
    ],
    shots: [
      { at: "beside", col: B, colM: "4 / span 2", row: 1, pos: "50% 16%" },
      { at: "beside", col: A, colM: "1 / span 2", row: 4, pos: "50% 86%" },
    ],
    wires: ["solid", "dashed", "straight", "solid"],
    rowGap: "clamp(24rem, 60svh, 40rem)",
    besideRatio: "1 / 1",
    wireRatio: "3 / 2",
    wireWidth: "clamp(150px, 17vw, 240px)",
  },
  // 4 — parte da destra, dritta subito
  {
    texts: [
      T(B, Bm, 1),
      T(A, Am, 2),
      T(B, Bm, 3),
      T(A, Am, 4),
      T(B, BmShot, 5),
    ],
    shots: [
      { at: "midwire", wire: 2, pos: "50% 18%" },
      { at: "beside", col: A, colM: "1 / span 2", row: 5, pos: "50% 84%" },
    ],
    wires: ["straight", "solid", "dashed", "solid"],
    rowGap: "clamp(24rem, 64svh, 43rem)",
    besideRatio: "4 / 5",
    wireRatio: "3 / 2",
    wireWidth: "clamp(150px, 17vw, 240px)",
  },
  // 5 — parte da sinistra, dritta sulla seconda linea, tratteggi ai bordi
  {
    texts: [
      T(A, Am, 1),
      T(B, BmShot, 2),
      T(A, Am, 3),
      T(B, Bm, 4),
      T(A, Am, 5),
    ],
    shots: [
      { at: "beside", col: A, colM: "1 / span 2", row: 2, pos: "50% 18%" },
      { at: "midwire", wire: 2, pos: "50% 84%" },
    ],
    wires: ["dashed", "straight", "solid", "dashed"],
    rowGap: "clamp(24rem, 63svh, 42rem)",
    besideRatio: "3 / 4",
    wireRatio: "3 / 2",
    wireWidth: "clamp(150px, 17vw, 240px)",
  },
];

const r = (n: number) => Math.round(n * 10) / 10;
const PAD = 16;

/**
 * Percorso SVG dalla frase `a` alla frase `b`, nelle coordinate del
 * contenitore. Se le due frasi sono affiancate (si sovrappongono in
 * verticale) la linea va da un fianco all'altro, agganciata alla metà
 * verticale di entrambe, con tangenti orizzontali. Altrimenti scende dalla
 * metà orizzontale di `a` alla metà orizzontale di `b`, con tangenti
 * verticali (la "S" del riferimento) oppure dritta in diagonale.
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
