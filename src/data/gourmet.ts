export type GourmetPizza = {
  slug: string;
  name: string;
  /** Didascalie sotto al titolo: gli ingredienti. */
  ingredients: string[];
  /** Frase d’apertura, in corsivo dopo la linea. */
  quote: string;
  /** Il racconto a punti: al massimo sette, di sette parole l’uno. */
  fragments: string[];
  /** Foto a tutto schermo: copia a 2560px dell’originale (public/assets/gourmet). */
  image: string;
};

// Nell’ordine in cui compaiono in pagina.
export const gourmetPizzas: GourmetPizza[] = [
  {
    slug: "renana",
    name: "Renana",
    ingredients: [
      "Farina macinata a pietra",
      "Burrata",
      "Crudo San Daniele 24 mesi",
      "Ciliegino confit",
      "Basilico",
    ],
    quote: "Delicatezza e freschezza contro la forza della sinfonia.",
    fragments: [
      "Il ciliegino confit, il basilico fresco.",
      "La burrata, cremosa.",
      "Il crudo San Daniele, sapido.",
      "Sotto, la farina macinata a pietra croccante.",
      "Un contrasto di consistenze.",
      "La dolcezza vibrante della sinfonia bilancia tutto.",
    ],
    image: "/assets/gourmet/renana.jpg",
  },
  {
    slug: "la-dolce-vita",
    name: "La dolce vita",
    ingredients: [
      "Farina macinata a pietra",
      "Mozzarella fior di latte",
      "Provola affumicata gourmet",
      "Crudo San Daniele 24 mesi",
      "Pepi pregiati",
    ],
    quote: "Delicato il fior di latte, fresco il pepe.",
    fragments: [
      "Contro la sapidità del crudo.",
      "E l’affumicatura della provola.",
      "La farina macinata a pietra, croccante.",
      "I formaggi, morbidi.",
      "Un contrasto di consistenze.",
      "La raffinatezza del film «La Dolce Vita».",
      "Bilancia il carattere deciso della pizza.",
    ],
    image: "/assets/gourmet/dolce-vita.jpg",
  },
  {
    slug: "pastorale",
    name: "Pastorale",
    ingredients: [
      "Farina macinata a pietra",
      "Mozzarella fior di latte",
      "Salsiccia",
      "Taleggio",
      "Radicchio rosso di Treviso",
    ],
    quote: "Delicato il taleggio, fresco il radicchio di Treviso.",
    fragments: [
      "Contro la forza della sinfonia.",
      "Salsiccia e fior di latte, in contrasto.",
      "Con la dolce farina macinata a pietra.",
      "La serenità della sinfonia.",
      "Bilancia il carattere deciso della pizza.",
      "Sapori di terra e di bosco.",
      "Si completa con la «Pastorale» di Beethoven.",
    ],
    image: "/assets/gourmet/pastorale.jpg",
  },
  {
    slug: "moonlight",
    name: "Moonlight",
    ingredients: [
      "Farina macinata a pietra",
      "Mozzarella fior di latte",
      "Ricotta di bufala",
      "Salmone affumicato norvegese",
      "Aneto",
    ],
    quote: "Quiete e romanticismo si incontrano.",
    fragments: [
      "La base, farina macinata a pietra.",
      "Rustica e autentica, esalta gli ingredienti.",
      "Il fior di latte regala dolcezza.",
      "La ricotta di bufala, una cremosità lussuosa.",
      "Il salmone norvegese, una nota sofisticata.",
      "L’aneto la bilancia, fresco e piccante.",
      "Omaggio alla Sonata al Chiaro di Luna.",
    ],
    image: "/assets/gourmet/moonlight.jpg",
  },
  {
    slug: "il-canto-della-terra",
    name: "Il Canto della Terra",
    ingredients: [
      "Farina macinata a pietra",
      "Crema di melanzane e parmigiano",
      "Mozzarella fior di latte",
      "Prosciutto cotto San Giovanni",
    ],
    quote: "Una dichiarazione d’amore alla natura e alla vita.",
    fragments: [
      "La farina croccante evoca i campi dorati.",
      "La solidità della terra.",
      "La crema di melanzana, una vellutata profondità.",
      "Le contemplazioni malinconiche di Mahler.",
      "Il fior di latte sposa la melanzana.",
      "Il prosciutto cotto aggiunge note delicate.",
      "Un dipinto sonoro e culinario.",
    ],
    image: "/assets/gourmet/canto-della-terra.jpg",
  },
];
