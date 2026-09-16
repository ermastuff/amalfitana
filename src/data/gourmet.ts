export type GourmetPizza = {
  slug: string;
  name: string;
  /** Didascalie sotto al titolo: gli ingredienti. */
  ingredients: string[];
  /** Frase d’apertura, in corsivo dopo la linea. */
  quote: string;
  /** Il resto del racconto, spezzato in frammenti sparsi sulla pagina. */
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
    quote:
      "La delicatezza del ciliegino confit e la freschezza del basilico si contrappongono alla forza e all’intensità della sinfonia.",
    fragments: [
      "La cremosità della burrata",
      "e la sapidità del crudo San Daniele",
      "creano un contrasto di consistenze",
      "con la croccantezza della farina macinata a pietra.",
      "La dolcezza vibrante della sinfonia",
      "bilancia la sapidità del crudo",
      "e la cremosità della burrata.",
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
    quote:
      "La delicatezza della mozzarella fior di latte e la freschezza del pepe si contrappongono alla sapidità del prosciutto crudo e all’affumicatura della provola.",
    fragments: [
      "La croccantezza della farina macinata a pietra",
      "crea un contrasto di consistenze",
      "con la morbidezza dei formaggi.",
      "La raffinatezza del film «La Dolce Vita»",
      "bilancia la rusticità",
      "e il carattere deciso della pizza.",
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
    quote:
      "La delicatezza del taleggio e la freschezza del radicchio rosso di Treviso si contrappongono alla forza e all’intensità della sinfonia.",
    fragments: [
      "La salsiccia e la mozzarella fior di latte",
      "creano un contrasto di sapori",
      "con la dolcezza della farina macinata a pietra.",
      "La serenità e la pace della sinfonia",
      "bilanciano la rusticità e il carattere deciso della pizza.",
      "Con i suoi sapori di terra e di bosco,",
      "offre un’esperienza culinaria che si completa con la Sinfonia «Pastorale» di Beethoven.",
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
      "La base, realizzata con farina macinata a pietra,",
      "dona una consistenza rustica e autentica",
      "che esalta perfettamente i suoi ingredienti.",
      "La mozzarella fior di latte regala alla pizza dolcezza,",
      "mentre la ricotta di bufala aggiunge una cremosità lussuosa.",
      "Il salmone affumicato norvegese introduce una nota sofisticata,",
      "perfettamente bilanciata dall’aroma fresco e leggermente piccante dell’aneto.",
      "Un omaggio culinario alla maestria e all’eleganza dell’iconica Sonata al Chiaro di Luna di Beethoven.",
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
    quote:
      "Una dichiarazione d’amore per la natura e per la profondità della vita.",
    fragments: [
      "La croccantezza della farina macinata a pietra",
      "evoca i campi dorati e la solidità della terra,",
      "mentre la crema di melanzana offre una vellutata profondità,",
      "riflettendo le contemplazioni malinconiche presenti nella sinfonia di Mahler.",
      "La mozzarella fior di latte si fonde armoniosamente con la dolcezza della melanzana,",
      "mentre il prosciutto cotto aggiunge alla pizza delle note delicate.",
      "Il Canto della Terra è un dipinto sonoro e culinario per il tuo palato.",
    ],
    image: "/assets/gourmet/canto-della-terra.jpg",
  },
];
