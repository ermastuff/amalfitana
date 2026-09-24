/* Contenuti delle due sezioni lunghe della home: il racconto a schermo fisso
   (HomeStage) e l'onda di foto col menu (MenuWave). */

/** Le foto che si alternano dietro al racconto: l'ultima è quella che resta
    nel riquadro piccolo, accanto all'invito a scaricare l'app. */
export const stageShots = [
  { src: "/assets/gourmet/renana.jpg", alt: "" },
  { src: "/assets/menu-hero.jpg", alt: "" },
  { src: "/assets/gourmet/pastorale.jpg", alt: "" },
  { src: "/assets/gourmet/moonlight.jpg", alt: "" },
  { src: "/assets/gourmet/canto-della-terra.jpg", alt: "" },
  { src: "/assets/gourmet/dolce-vita.jpg", alt: "" },
];

/** Il testo che apre il racconto: le righe in serif una sotto l'altra e, più
    sotto, il paragrafo che le chiude. Stessa impostazione della filosofia. */
export const intro = {
  lines: [
    "Siamo una pizzeria d’asporto a Flero.",
    "Impastiamo oggi la pizza di dopodomani.",
    "Farina macinata a pietra, due giorni d’attesa,",
    "e un forno che conosciamo a memoria.",
  ],
  lead: "Poche cose, scelte bene, sempre le stesse: è l’unico modo che conosciamo per fare una pizza da ricordare. Da asporto o a domicilio, tutte le sere tranne il lunedì.",
};

/** La strofa: una riga d'apertura, la stessa parola ripetuta e due code.
    `tail` compare solo sulle ultime righe; `amp` è la e commerciale. */
export const verses = {
  lead: "Parliamo di una pizza in cui c’è",
  word: "più",
  rows: [
    { tail: "" },
    { tail: "" },
    { tail: "" },
    { tail: "" },
    { tail: "di quello che conta davvero" },
    { tail: "tempo per farla come si deve.", amp: true },
  ],
};

/** L'invito a scaricare l'app, in fondo al racconto. */
export const app = {
  lines: ["La pizzeria", "in tasca."],
  text: "Ordini, novità e vantaggi: tutta L’Amalfitana sul tuo telefono. Scarica l’app e tieni il menù sempre con te.",
};

export type WavePhoto = {
  src: string;
  alt: string;
  /** Proporzione del riquadro. */
  ratio: string;
  /** Larghezza rispetto alla colonna delle foto. */
  width: string;
  /** Quanto la foto risale su quella prima: le foto si accavallano. */
  overlap: string;
  /** Il punto della foto da tenere nel riquadro. */
  pos?: string;
};

/** Una sola colonna di foto: lo scroll la fa ondeggiare come un serpente e
    allarga di volta in volta quella che passa in mezzo allo schermo. */
export const wavePhotos: WavePhoto[] = [
  {
    src: "/assets/Margherita.png",
    alt: "Pizza margherita appena sfornata",
    ratio: "1 / 1",
    width: "52%",
    overlap: "0rem",
  },
  {
    src: "/assets/gourmet/renana.jpg",
    alt: "Renana: burrata e crudo San Daniele",
    ratio: "3 / 4",
    width: "44%",
    overlap: "6rem",
    pos: "50% 66%",
  },
  {
    src: "/assets/filosofia/rail-cornicione.jpg",
    alt: "Il cornicione alto e leggero",
    ratio: "5 / 4",
    width: "56%",
    overlap: "7rem",
  },
  {
    src: "/assets/Bufala Extra.png",
    alt: "Pizza con bufala e crudo",
    ratio: "1 / 1",
    width: "48%",
    overlap: "6rem",
  },
  {
    src: "/assets/gourmet/pastorale.jpg",
    alt: "Pastorale: salsiccia, taleggio e radicchio",
    ratio: "3 / 4",
    width: "42%",
    overlap: "8rem",
    pos: "50% 66%",
  },
  {
    src: "/assets/filosofia/rail-basilico.jpg",
    alt: "Basilico fresco",
    ratio: "3 / 2",
    width: "58%",
    overlap: "7rem",
  },
  {
    src: "/assets/gourmet/moonlight.jpg",
    alt: "Moonlight: ricotta di bufala e salmone",
    ratio: "3 / 4",
    width: "46%",
    overlap: "6rem",
    pos: "50% 66%",
  },
  {
    src: "/assets/filosofia/rail-margherita.jpg",
    alt: "Margherita sul piatto",
    ratio: "6 / 5",
    width: "52%",
    overlap: "8rem",
  },
  {
    src: "/assets/gourmet/dolce-vita.jpg",
    alt: "La dolce vita: provola affumicata e crudo",
    ratio: "3 / 4",
    width: "44%",
    overlap: "6rem",
    pos: "50% 66%",
  },
  {
    src: "/assets/filosofia/rail-forno.jpg",
    alt: "La pizza pronta per il servizio",
    ratio: "10 / 9",
    width: "54%",
    overlap: "7rem",
  },
  {
    src: "/assets/gourmet/canto-della-terra.jpg",
    alt: "Il Canto della Terra: crema di melanzane e cotto",
    ratio: "3 / 4",
    width: "48%",
    overlap: "8rem",
    pos: "50% 66%",
  },
];

/** L'unico blocco di testo di fianco alle foto: due righe, una frase e i due
    link al menu e alle gourmet. */
export const waveText = {
  lines: ["Le classiche", "e le gourmet."],
  text: "Le pizze di sempre e le cinque d’autore.",
  links: [
    { href: "/menu", lead: "Vedi", label: "il menu" },
    { href: "/pizze-gourmet", lead: "Scopri", label: "le gourmet" },
  ],
};
