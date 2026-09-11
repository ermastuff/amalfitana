// Recensioni segnaposto: sostituire con quelle reali (o con un feed Google).
export type Review = {
  stars: number;
  source: string;
  author: string;
  text: string;
};

export const rating = {
  score: "4,8",
  label: "Eccellente",
  count: "1.240",
};

export const reviews: Review[] = [
  {
    stars: 5,
    source: "Google",
    author: "Elisa M.",
    text: "Impasto leggero e digeribile, cornicione perfetto. Il personale è gentile e attento: il nostro posto preferito ad Amalfi.",
  },
  {
    stars: 5,
    source: "Google",
    author: "Marco R.",
    text: "La migliore pizza della Costiera. La Nerano con le zucchine alla scapece è incredibile, e il forno a legna si sente tutto.",
  },
  {
    stars: 5,
    source: "Google",
    author: "Giulia P.",
    text: "Locale pulito, servizio veloce e pizze che arrivano fumanti. Non ve ne pentirete.",
  },
  {
    stars: 4,
    source: "Google",
    author: "Luca D.",
    text: "Ottimi ingredienti, prodotti locali e un menù gourmet che cambia con le stagioni. Torneremo di sicuro.",
  },
  {
    stars: 5,
    source: "Google",
    author: "Sara T.",
    text: "Cena con vista sul lungomare e una Margherita da manuale. Anche il menù d’asporto è comodissimo.",
  },
];
