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

/** Le due parti del titolo che si ricompongono all'inizio del racconto. */
export const claim = {
  label: "Poche cose, fatte bene.",
  parts: ["Poche cose,", "fatte bene."],
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
  /** Da 0 (tutta a sinistra) a 1 (tutta a destra): l'onda parte da destra e
      finisce a sinistra. */
  dx: number;
  /** Quanto la foto risale su quella prima: le foto si accavallano. */
  overlap: string;
  /** Il punto della foto da tenere nel riquadro. */
  pos?: string;
};

export type WaveGroup = {
  eyebrow: string;
  title: string;
  text: string;
  items: string[];
  link: { href: string; label: string };
  photos: WavePhoto[];
};

/** Due gruppi: il menu di sempre e le pizze d'autore. Le foto scorrono, le
    scritte restano ferme di fianco. */
export const waveGroups: WaveGroup[] = [
  {
    eyebrow: "Il menu",
    title: "Tradizione",
    text: "Settanta pizze, dalla margherita alle pale da condividere. Più calzoni, supplementi e bevande.",
    items: [
      "Pizze classiche",
      "Pizze speciali",
      "Ultime novità",
      "Pizze pala",
      "Calzoni",
      "Supplementi",
      "Bevande",
    ],
    link: { href: "/menu", label: "Vedi tutto il menu" },
    photos: [
      {
        src: "/assets/Margherita.png",
        alt: "Pizza margherita appena sfornata",
        ratio: "1 / 1",
        width: "58%",
        dx: 0.95,
        overlap: "0rem",
      },
      {
        src: "/assets/filosofia/rail-cornicione.jpg",
        alt: "Il cornicione alto e leggero",
        ratio: "5 / 4",
        width: "50%",
        dx: 0.68,
        overlap: "5rem",
      },
      {
        src: "/assets/Bufala Extra.png",
        alt: "Pizza con bufala e crudo",
        ratio: "1 / 1",
        width: "62%",
        dx: 0.86,
        overlap: "6rem",
      },
      {
        src: "/assets/filosofia/rail-basilico.jpg",
        alt: "Basilico fresco",
        ratio: "3 / 2",
        width: "46%",
        dx: 0.44,
        overlap: "7rem",
      },
      {
        src: "/assets/filosofia/rail-margherita.jpg",
        alt: "Margherita sul piatto",
        ratio: "6 / 5",
        width: "54%",
        dx: 0.62,
        overlap: "6rem",
      },
      {
        src: "/assets/filosofia/rail-forno.jpg",
        alt: "La pizza pronta per il servizio",
        ratio: "10 / 9",
        width: "48%",
        dx: 0.22,
        overlap: "8rem",
      },
    ],
  },
  {
    eyebrow: "Pizze gourmet",
    title: "D’autore",
    text: "Cinque pizze che nascono come una sinfonia: farina macinata a pietra e ingredienti scelti uno per uno.",
    items: [
      "Renana",
      "La dolce vita",
      "Pastorale",
      "Moonlight",
      "Il Canto della Terra",
    ],
    link: { href: "/pizze-gourmet", label: "Scopri le gourmet" },
    photos: [
      {
        src: "/assets/gourmet/renana.jpg",
        alt: "Renana: burrata e crudo San Daniele",
        ratio: "3 / 4",
        width: "50%",
        dx: 0.78,
        pos: "50% 66%",
        overlap: "0rem",
      },
      {
        src: "/assets/gourmet/pastorale.jpg",
        alt: "Pastorale: salsiccia, taleggio e radicchio",
        ratio: "3 / 4",
        width: "44%",
        dx: 0.5,
        pos: "50% 66%",
        overlap: "7rem",
      },
      {
        src: "/assets/gourmet/moonlight.jpg",
        alt: "Moonlight: ricotta di bufala e salmone",
        ratio: "3 / 4",
        width: "52%",
        dx: 0.66,
        pos: "50% 66%",
        overlap: "6rem",
      },
      {
        src: "/assets/gourmet/dolce-vita.jpg",
        alt: "La dolce vita: provola affumicata e crudo",
        ratio: "3 / 4",
        width: "46%",
        dx: 0.28,
        pos: "50% 66%",
        overlap: "8rem",
      },
      {
        src: "/assets/gourmet/canto-della-terra.jpg",
        alt: "Il Canto della Terra: crema di melanzane e cotto",
        ratio: "3 / 4",
        width: "54%",
        dx: 0.04,
        pos: "50% 66%",
        overlap: "6rem",
      },
    ],
  },
];
