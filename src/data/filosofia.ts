/* I contenuti della pagina Filosofia: il metodo degli impasti, quelli tra cui
   si può scegliere e le materie prime. Metodo, tempi e idratazione sono
   quelli dati dalla pizzeria; i testi che li raccontano sono da rileggere
   insieme a loro. */

/** Le righe del manifesto, in serif, una sotto l'altra. */
export const manifesto = [
  "C’è chi vede della farina; noi vediamo un campo a luglio.",
  "C’è chi vede dell’acqua; noi vediamo il tempo che lavora.",
  "La biga che riposa da ieri sera?",
  "Sta già scrivendo il sapore di domani.",
];

/** Il paragrafo che chiude il manifesto. */
export const manifestoLead =
  "Da L’Amalfitana una pizza comincia due o tre giorni prima del forno: una biga di ventiquattro ore, poi l’impasto si completa e lievita altre ventiquattro o quarantotto. Il tempo non si vede, ma si sente.";

/** I due paragrafi d'apertura, allineati a destra come nel riferimento. */
export const intro = [
  "Siamo una pizzeria d’asporto a Flero e facciamo un mestiere antico con qualche pretesa in più: tutti i nostri impasti nascono da una biga, il metodo indiretto, e prendono tutto il tempo che serve.",
  "Qui sotto c’è come li facciamo e tra quanti puoi scegliere. Nessun segreto, solo il modo in cui lavoriamo ogni sera.",
];

export type Dough = {
  name: string;
  /** Il dato che conta: il tempo o l'idratazione. */
  time: string;
  text: string;
};

/** Le tre famiglie, con il metodo di ognuna. */
export const doughs: Dough[] = [
  {
    name: "I tradizionali",
    time: "Biga 24 ore",
    text: "Un preimpasto che riposa ventiquattro ore, poi si completa e lievita altre ventiquattro o quarantotto. Profumi intensi, più gusto, massima digeribilità.",
  },
  {
    name: "La pala",
    time: "80% di idratazione",
    text: "Stesso metodo indiretto, molta più acqua e altre ventiquattro ore di maturazione. Viene leggera e croccante, fragrante e digeribile.",
  },
  {
    name: "Gli integrali",
    time: "Biga 24 ore",
    text: "Lo stesso tempo lungo, che all’integrale serve più che a ogni altro impasto: è la lavorazione a togliergli il peso.",
  },
];

export type Choice = {
  name: string;
  /** Nota breve: il grano, il metodo, la particolarità. */
  note: string;
  text: string;
};

/** I sette impasti tra cui si sceglie ordinando. */
export const choices: Choice[] = [
  {
    name: "Tradizionale",
    note: "Biga 24 ore",
    text: "Quello di tutti i giorni: il metodo indiretto e due o tre giorni di attesa prima del forno.",
  },
  {
    name: "Napoli",
    note: "Cornicione alto",
    text: "Più morbido e più alto sul bordo, per chi cerca la pizza napoletana.",
  },
  {
    name: "Kamut",
    note: "Grano khorasan",
    text: "Un grano antico dal gusto dolce, per un impasto dal sapore diverso.",
  },
  {
    name: "Senza lievito",
    note: "Per chi lo evita",
    text: "Stessa cura, un’altra strada: basta dirlo quando ordini.",
  },
  {
    name: "Integrale",
    note: "Crusca intera",
    text: "Farina integrale e biga lunga: è il tempo a renderlo leggero.",
  },
  {
    name: "Farro",
    note: "Grano antico",
    text: "Gusto rustico e una nota di nocciola, per cambiare registro.",
  },
  {
    name: "Base senza glutine",
    note: "Base dedicata",
    text: "La base pizza senza glutine, da farcire come tutte le altre.",
  },
];

/** Le basi da portare via: si comprano anche da sole. */
export const bases = {
  title: "Le basi da portare a casa",
  text: "Le basi pizza si possono comprare anche da sole: le condisci tu e le inforni quando vuoi.",
};

export type RailPhoto = {
  src: string;
  alt: string;
  /** Proporzione del riquadro. */
  ratio: string;
  /** Altezza rispetto alla fascia. */
  height: string;
  /** Spostamento verticale: la riga resta una sola, ma sfalsata. */
  shift: string;
};

/** Lo slider: una sola riga di foto, sfalsate come nel riferimento. */
export const rail: RailPhoto[] = [
  {
    src: "/assets/filosofia/rail-alveoli.jpg",
    alt: "L’alveolatura di un impasto lievitato due giorni",
    ratio: "1 / 1",
    height: "46svh",
    shift: "-3.7svh",
  },
  {
    src: "/assets/filosofia/rail-basilico.jpg",
    alt: "Foglie di basilico fresco",
    ratio: "3 / 2",
    height: "34svh",
    shift: "5.0svh",
  },
  {
    src: "/assets/filosofia/rail-cornicione.jpg",
    alt: "Il cornicione appena sfornato sulla tavola di legno",
    ratio: "5 / 4",
    height: "40svh",
    shift: "-1.2svh",
  },
  {
    src: "/assets/filosofia/rail-crudo.jpg",
    alt: "Fette di crudo San Daniele stagionato 24 mesi",
    ratio: "1 / 1",
    height: "50svh",
    shift: "2.5svh",
  },
  {
    src: "/assets/filosofia/rail-margherita.jpg",
    alt: "Una margherita appena uscita dal forno",
    ratio: "6 / 5",
    height: "38svh",
    shift: "-5.0svh",
  },
  {
    src: "/assets/filosofia/rail-radicchio.jpg",
    alt: "Radicchio rosso di Treviso e salsiccia",
    ratio: "4 / 5",
    height: "48svh",
    shift: "1.2svh",
  },
  {
    src: "/assets/filosofia/rail-burrata.jpg",
    alt: "Burrata pugliese con un filo d’olio",
    ratio: "7 / 8",
    height: "42svh",
    shift: "-2.5svh",
  },
  {
    src: "/assets/filosofia/rail-forno.jpg",
    alt: "La pizza sulla tavola, prima del servizio",
    ratio: "10 / 9",
    height: "36svh",
    shift: "4.3svh",
  },
  {
    src: "/assets/filosofia/rail-salmone.jpg",
    alt: "Salmone affumicato norvegese e aneto",
    ratio: "1 / 1",
    height: "44svh",
    shift: "-3.1svh",
  },
  {
    src: "/assets/filosofia/rail-cotto.jpg",
    alt: "Prosciutto cotto San Giovanni e funghi",
    ratio: "10 / 9",
    height: "38svh",
    shift: "3.1svh",
  },
  {
    src: "/assets/filosofia/rail-bufala.jpg",
    alt: "Mozzarella di bufala campana",
    ratio: "1 / 1",
    height: "48svh",
    shift: "-1.9svh",
  },
];

export type TeamMember = { name: string; role: string };

/** La squadra: al posto delle persone, le materie prime. Il ruolo è quello
    che ognuna ha nella sinfonia (lo stesso registro delle pizze gourmet). */
export const team: TeamMember[] = [
  { name: "Lievito madre", role: "Direttore d’orchestra" },
  { name: "Tipo 1 macinata a pietra", role: "Primo violino" },
  { name: "Acqua", role: "Tempo e misura" },
  { name: "Sale marino", role: "Controllo qualità" },
  { name: "Semola rimacinata", role: "Sezione ritmica" },
  { name: "Olio extravergine", role: "Rifinitura" },
  { name: "Pomodoro San Marzano", role: "Voce solista" },
  { name: "Fior di latte", role: "Sezione archi" },
  { name: "Mozzarella di bufala", role: "Prima donna" },
  { name: "Burrata", role: "Cuore cremoso" },
  { name: "Ricotta di bufala", role: "Armonia" },
  { name: "Provola affumicata", role: "Baritono" },
  { name: "Taleggio", role: "Basso continuo" },
  { name: "Parmigiano Reggiano", role: "Coro" },
  { name: "Crudo San Daniele 24 mesi", role: "Ospite d’onore" },
  { name: "Prosciutto cotto San Giovanni", role: "Delicatezza" },
  { name: "Salsiccia", role: "Sezione ottoni" },
  { name: "Salmone affumicato", role: "Solista ospite" },
  { name: "Radicchio di Treviso", role: "Contrappunto" },
  { name: "Melanzane", role: "Terra" },
  { name: "Ciliegino confit", role: "Dolcezza" },
  { name: "Basilico", role: "Profumo di scena" },
  { name: "Aneto", role: "Nota alta" },
  { name: "Pepi pregiati", role: "Percussioni" },
];

export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "Quanto lievitano i vostri impasti?",
    a: "Prima una biga di ventiquattro ore, poi l’impasto si completa e lievita altre ventiquattro o quarantotto. Due o tre giorni in tutto, prima che la pizza entri in forno.",
  },
  {
    q: "Che cos’è la biga?",
    a: "Un preimpasto di farina, acqua e pochissimo lievito che riposa ventiquattro ore prima di diventare impasto. È un metodo indiretto: più lento di quello diretto, e per questo più profumato e digeribile.",
  },
  {
    q: "Quali impasti posso scegliere?",
    a: "Tradizionale, Napoli, kamut, senza lievito, integrale, al farro e la base senza glutine. Basta dirlo quando ordini.",
  },
  {
    q: "Perché la pala è diversa?",
    a: "Stesso metodo indiretto, ma con l’ottanta per cento di idratazione e altre ventiquattro ore di maturazione. Esce leggera e croccante, fragrante.",
  },
  {
    q: "Perché il vostro integrale è più leggero?",
    a: "Perché un integrale lavorato in fretta si porta dietro qualche problema: i tannini e i resorcinoli della crusca frenano gli enzimi digestivi, l’acido fitico ostacola l’assorbimento di calcio, ferro e magnesio, e l’asparagina libera in cottura forma acrilamide. La biga e la lievitazione lunga servono a questo.",
  },
  {
    q: "Avete la pizza senza glutine?",
    a: "C’è la base pizza senza glutine, da farcire come le altre. Nel laboratorio però si lavorano anche farine con glutine: se sei celiaco dillo quando ordini, così ne parliamo.",
  },
  {
    q: "Posso comprare solo la base?",
    a: "Sì: vendiamo le basi pizza da portare a casa. Le condisci tu e le inforni quando vuoi.",
  },
  {
    q: "Da dove arrivano gli ingredienti?",
    a: "Da fornitori che seguiamo da anni, con le denominazioni dove esistono: San Daniele 24 mesi, bufala campana, San Marzano. Se un prodotto non ci convince, quella sera esce dal menu.",
  },
];
