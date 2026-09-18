/* I contenuti della pagina Filosofia: farine, impasti e materie prime.
   Testi e dati tecnici sono da confermare con la pizzeria. */

/** Le righe del manifesto, in serif, una sotto l'altra. */
export const manifesto = [
  "C’è chi vede della farina; noi vediamo un campo a luglio.",
  "C’è chi vede dell’acqua; noi vediamo il tempo che lavora.",
  "Il lievito che respira sotto al telo?",
  "Sta già scrivendo il sapore di domani.",
];

/** Il paragrafo che chiude il manifesto. */
export const manifestoLead =
  "Da L’Amalfitana una pizza comincia molto prima del forno: comincia da un sacco di farina che sa ancora di grano, da due giorni di attesa in cella, da chi impasta e sa cosa sta aspettando. Poche cose, scelte bene, sempre le stesse.";

/** I due paragrafi d'apertura, allineati a destra come nel riferimento. */
export const intro = [
  "Siamo una pizzeria d’asporto a Flero e facciamo un mestiere antico con qualche pretesa in più: farine macinate a pietra, lievitazioni lunghe, una lista della spesa corta e fatta di nomi che conosciamo.",
  "Qui sotto c’è tutto quello che entra nei nostri impasti: le farine, i tempi, le materie prime. Nessun segreto, solo il modo in cui lavoriamo ogni sera.",
];

export type Dough = {
  name: string;
  /** Il dato che conta: il tempo di lievitazione. */
  time: string;
  text: string;
};

export const doughs: Dough[] = [
  {
    name: "La tonda",
    time: "48 ore",
    text: "Tipo 1 macinata a pietra, idratazione al 70%, mezzo grammo di lievito per chilo di farina. Cornicione alto e leggero, fondo asciutto.",
  },
  {
    name: "La pala",
    time: "72 ore",
    text: "Semola rimacinata di grano duro e tipo 1, idratazione all’80%. Si stende a mano sulla pala: alveoli grandi, crosta sottile, dentro quasi cremosa.",
  },
  {
    name: "Il calzone",
    time: "48 ore",
    text: "Lo stesso impasto della tonda, steso più sottile. Dentro il vapore cuoce il ripieno, fuori la superficie si dora senza seccare.",
  },
];

export type Flour = {
  name: string;
  /** Nota tecnica breve: forza, macinatura, provenienza. */
  note: string;
  text: string;
};

export const flours: Flour[] = [
  {
    name: "Tipo 1 macinata a pietra",
    note: "W 280",
    text: "La base di tutto. La pietra scalda poco e lascia nel sacco il germe e una parte di crusca: profumo di grano e un impasto che resta vivo.",
  },
  {
    name: "Tipo 0",
    note: "W 300",
    text: "Entra in piccola parte, dove serve struttura: è la maglia glutinica che regge quarantotto ore di frigo senza cedere.",
  },
  {
    name: "Semola rimacinata di grano duro",
    note: "Grano duro",
    text: "Il colore d’oro e la croccantezza della pala. Beve più acqua delle altre e in cottura fa una crosta sottilissima.",
  },
  {
    name: "Integrale macinata a pietra",
    note: "Crusca intera",
    text: "Per gli impasti più rustici: dà una nota di nocciola e un fondo più scuro. Poca, o coprirebbe tutto il resto.",
  },
];

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
    alt: "L’alveolatura di un impasto lievitato 48 ore",
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
    q: "Quanto lievita il vostro impasto?",
    a: "Quarantotto ore in cella a temperatura controllata, settantadue per la pala. È il tempo a rendere una pizza leggera, non la quantità di lievito: noi ne usiamo mezzo grammo per chilo di farina.",
  },
  {
    q: "Che farine usate?",
    a: "Tipo 1 e tipo 0 macinate a pietra, semola rimacinata di grano duro per la pala e una integrale per gli impasti più rustici. Nessuna miscela pronta: le pesiamo noi, impasto per impasto.",
  },
  {
    q: "Perché la macinatura a pietra?",
    a: "La pietra gira piano e scalda poco: nel sacco restano il germe e una parte di crusca. Si sente nel profumo dell’impasto crudo e nel gusto del cornicione.",
  },
  {
    q: "La pizza è più digeribile?",
    a: "Una lievitazione lunga scompone gli amidi e il glutine prima che lo faccia lo stomaco. Non è una promessa medica, è il motivo per cui aspettiamo due giorni.",
  },
  {
    q: "Avete impasti senza glutine?",
    a: "No, e preferiamo dirlo chiaramente: nel nostro laboratorio la farina è ovunque e non potremmo garantire l’assenza di contaminazione.",
  },
  {
    q: "Da dove arrivano gli ingredienti?",
    a: "Da fornitori che seguiamo da anni, con le denominazioni dove esistono: San Daniele 24 mesi, bufala campana, San Marzano. Se un prodotto non ci convince, quella sera esce dal menu.",
  },
  {
    q: "Posso vedere come lavorate?",
    a: "Sì. Passa in Via XXV Aprile nel pomeriggio, prima del servizio: il banco è a vista e l’impasto è già pronto in cella.",
  },
];
