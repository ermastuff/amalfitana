export type GourmetPizza = {
  name: string;
  tagline: string;
  story: string;
  ingredients: string[];
  price: number;
  pairing: string;
};

export const gourmetPizzas: GourmetPizza[] = [
  {
    name: "Costiera",
    tagline: "Il mare in un morso",
    story:
      "Nata guardando il golfo: la dolcezza del gambero rosso incontra l'acidità viva del limone di Amalfi. La burrata arriva a crudo, a fine cottura, per non perdere la sua freschezza.",
    ingredients: [
      "Fiordilatte di Agerola",
      "Gamberi rossi di Mazara",
      "Burrata",
      "Zeste di limone di Amalfi IGP",
      "Basilico fresco",
    ],
    price: 18,
    pairing: "Falanghina del Sannio DOP",
  },
  {
    name: "Cetara",
    tagline: "Un omaggio al borgo delle alici",
    story:
      "Poche gocce di colatura di alici bastano a cambiare tutto. Il pomodorino del piennolo porta dolcezza, la stracciatella addolcisce, il pane croccante dà la spinta finale.",
    ingredients: [
      "Colatura di alici di Cetara",
      "Pomodorino del piennolo DOP",
      "Stracciatella",
      "Briciole di pane tostato",
      "Origano di montagna",
    ],
    price: 16,
    pairing: "Greco di Tufo DOCG",
  },
  {
    name: "Nerano",
    tagline: "Gli spaghetti alla Nerano, su una pizza",
    story:
      "Il piatto simbolo della Penisola Sorrentina, riletto sull'impasto. Zucchine fritte al momento, crema di zucchine alla base e il Provolone del Monaco che fila senza coprire.",
    ingredients: [
      "Crema di zucchine",
      "Zucchine fritte",
      "Provolone del Monaco DOP",
      "Basilico",
      "Pepe nero",
    ],
    price: 15,
    pairing: "Fiano di Avellino DOCG",
  },
  {
    name: "Genovese",
    tagline: "Otto ore di cipolla",
    story:
      "La cipolla ramata di Montoro stufata lentamente diventa una crema dolce e profonda. Sopra, provola e pecorino: la domenica napoletana in versione tonda.",
    ingredients: [
      "Cipolla ramata di Montoro",
      "Provola affumicata",
      "Pecorino romano",
      "Pepe nero",
    ],
    price: 15,
    pairing: "Aglianico del Taburno",
  },
  {
    name: "Tartufo e Fonduta",
    tagline: "La più ricca del menu",
    story:
      "Fonduta di parmigiano 36 mesi, tartufo nero a lamelle e guanciale reso croccante. Il tuorlo marinato si scioglie al taglio e lega tutto.",
    ingredients: [
      "Fonduta di parmigiano 36 mesi",
      "Tartufo nero estivo",
      "Guanciale croccante",
      "Tuorlo marinato",
    ],
    price: 20,
    pairing: "Taurasi DOCG",
  },
  {
    name: "Delizia",
    tagline: "Il dolce, ma è una pizza",
    story:
      "La delizia al limone diventa pizza da dessert: base sottile, crema al limone, ricotta di bufala montata e meringa passata al cannello.",
    ingredients: [
      "Crema al limone di Amalfi",
      "Ricotta di bufala",
      "Meringa al cannello",
      "Zeste candite",
    ],
    price: 12,
    pairing: "Limoncello della casa",
  },
];
