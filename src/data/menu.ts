export type MenuItem = {
  name: string;
  /** Assente dove il prodotto non ha farcitura da elencare (pala, supplementi). */
  description?: string;
  price: number;
};

export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  /** Prezzi da sommare a quello della pizza: mostrati col segno (+ / −). */
  delta?: boolean;
  items: MenuItem[];
};

// Le sezioni sono anche i filtri della pagina /menu, nell'ordine in cui
// compaiono i bottoni sotto alla hero.
export const menuSections: MenuSection[] = [
  {
    id: "classiche",
    title: "Pizze classiche",
    items: [
      {
        name: "Margherita",
        description: "Pomodoro San Marzano DOP, mozzarella",
        price: 6,
      },
      {
        name: "Capricciosa",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto, funghi, carciofi",
        price: 8.5,
      },
      {
        name: "Verdure grigliate",
        description:
          "Pomodoro San Marzano DOP, mozzarella, spinaci, peperoni, melanzane, zucchine, grana",
        price: 8.5,
      },
      {
        name: "Quattro stagioni",
        description:
          "Pomodoro San Marzano DOP, mozzarella, carciofi, funghi, prosciutto cotto",
        price: 8,
      },
      {
        name: "Quattro formaggi",
        description:
          "Pomodoro San Marzano DOP, mozzarella, grana, gorgonzola, scamorza affumicata",
        price: 8,
      },
      {
        name: "Pugliese",
        description:
          "Pomodoro San Marzano DOP, mozzarella, cipolle di Tropea, grana",
        price: 7.5,
      },
      {
        name: "Zola e mele",
        description: "Pomodoro San Marzano DOP, mozzarella, gorgonzola, mele",
        price: 8,
      },
      {
        name: "Prosciutto e funghi",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto, funghi",
        price: 8,
      },
      {
        name: "Napoletana",
        description: "Pomodoro San Marzano DOP, mozzarella, acciughe, origano",
        price: 7,
      },
      {
        name: "Siciliana",
        description:
          "Pomodoro San Marzano DOP, mozzarella, olive nere, capperi, acciughe, origano",
        price: 7.5,
      },
      {
        name: "Delizia",
        description:
          "Pomodoro San Marzano DOP, mozzarella, panna, speck, grana",
        price: 9.5,
      },
      {
        name: "Salame piccante + zola",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salame piccante Levoni, gorgonzola",
        price: 8.5,
      },
      {
        name: "Salame dolce",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salame dolce Levoni",
        price: 7.5,
      },
      {
        name: "Zola e pere",
        description: "Mozzarella, gorgonzola, pere",
        price: 8,
      },
      {
        name: "Campagnola",
        description:
          "Pomodoro San Marzano DOP, pancetta affumicata, cipolle di Tropea, olive, funghi",
        price: 7.5,
      },
      {
        name: "Primavera",
        description:
          "Pomodoro San Marzano DOP, mozzarella, pomodorini freschi, origano",
        price: 7,
      },
      {
        name: "Fattoria",
        description:
          "Pomodoro San Marzano DOP, mozzarella, pancetta Levoni, rucola, gorgonzola",
        price: 8.5,
      },
      {
        name: "Gorgonzola e speck",
        description: "Pomodoro San Marzano DOP, mozzarella, gorgonzola, speck",
        price: 9,
      },
      {
        name: "Vesuvio",
        description:
          "Pomodoro San Marzano DOP, mozzarella, spinaci, salamella, grana",
        price: 8.5,
      },
      {
        name: "Ravello",
        description:
          "Pomodoro San Marzano DOP, mozzarella, spinaci, ricotta, grana",
        price: 8.5,
      },
      {
        name: "Tonno e cipolle",
        description:
          "Pomodoro San Marzano DOP, mozzarella, tonno, cipolle di Tropea",
        price: 8,
      },
      {
        name: "Meraviglia",
        description: "Mozzarella, noci, gorgonzola",
        price: 8,
      },
      {
        name: "Dietetica",
        description:
          "Pomodoro San Marzano DOP, mozzarella, melanzane grigliate, prosciutto cotto",
        price: 8,
      },
      {
        name: "Radicchio n.1",
        description:
          "Pomodoro San Marzano DOP, mozzarella, scamorza, radicchio rosso",
        price: 8,
      },
      {
        name: "Caprese",
        description:
          "Pomodoro San Marzano DOP, mozzarella, pomodorini freschi, mozzarella di bufala campana DOP, basilico fresco",
        price: 8.5,
      },
      {
        name: "Salsiccia e taleggio",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salsiccia, taleggio",
        price: 8.5,
      },
      {
        name: "Prosciutto crudo",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto crudo di Parma stagionato 24 mesi",
        price: 8,
      },
      {
        name: "Speck",
        description: "Pomodoro San Marzano DOP, mozzarella, speck",
        price: 8,
      },
      {
        name: "Americana",
        description:
          "Pomodoro San Marzano DOP, mozzarella, patatine fritte, wurstel",
        price: 8,
      },
      {
        name: "Occhio di bue",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto, uovo",
        price: 7.5,
      },
      {
        name: "Romana",
        description:
          "Pomodoro San Marzano DOP, mozzarella, capperi, acciughe, origano",
        price: 7.5,
      },
      {
        name: "Marinara",
        description: "Pomodoro San Marzano DOP, aglio, olio all’aglio, origano",
        price: 5,
      },
      {
        name: "Flerese",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto, gorgonzola",
        price: 8,
      },
      {
        name: "Speck e brie",
        description: "Pomodoro San Marzano DOP, mozzarella, speck, brie",
        price: 9,
      },
      {
        name: "Quella della suocera",
        description:
          "Pomodoro San Marzano DOP, mozzarella, pancetta affumicata Levoni, zucchine, grana",
        price: 8.5,
      },
      {
        name: "Contadina",
        description:
          "Pomodoro San Marzano DOP, mozzarella, pancetta affumicata Levoni, asparagi",
        price: 8.5,
      },
      {
        name: "Porcini",
        description: "Pomodoro San Marzano DOP, mozzarella, funghi porcini",
        price: 8,
      },
    ],
  },
  {
    id: "speciali",
    title: "Pizze speciali",
    items: [
      {
        name: "La burrata",
        description:
          "Pomodoro San Marzano DOP, burrata, crudo di Parma 24 mesi e basilico fresco",
        price: 10,
      },
      {
        name: "La genovese",
        description:
          "Pomodoro San Marzano DOP, mozzarella, scamorza, patate lesse, pesto",
        price: 8,
      },
      {
        name: "Allegra",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salsiccia, patate lesse",
        price: 8.5,
      },
      {
        name: "Pizzucca",
        description: "Mozzarella, pancetta, taleggio, crema di zucca",
        price: 8.5,
      },
      {
        name: "Carpe diem",
        description: "Mozzarella, salmone norvegese, aceto balsamico",
        price: 12,
      },
      {
        name: "Oslo",
        description: "Mozzarella, crema di carciofi, salmone norvegese",
        price: 12,
      },
      {
        name: "Pizza dello zio",
        description: "Mozzarella, crema di zucca, funghi porcini, grana",
        price: 9,
      },
      {
        name: "Amalfitana",
        description: "Pomodoro San Marzano DOP, mozzarella, frutti di mare",
        price: 11,
      },
      {
        name: "Bufalina",
        description:
          "Pomodoro San Marzano DOP, mozzarella, pomodorini freschi, rucola, mozzarella di bufala",
        price: 9,
      },
      {
        name: "Gamberetti e zucchine",
        description:
          "Pomodoro San Marzano DOP, mozzarella, gamberetti, zucchine",
        price: 12,
      },
      {
        name: "Viennese",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salame piccante Levoni, asparagi, 4 formaggi",
        price: 9.5,
      },
      {
        name: "La carbonara",
        description:
          "Pomodoro San Marzano DOP, mozzarella, pancetta Levoni, uovo, panna, grana",
        price: 9,
      },
      {
        name: "Trevisana",
        description:
          "Pomodoro San Marzano DOP, mozzarella, taleggio, radicchio rosso",
        price: 8,
      },
      {
        name: "Rustica",
        description: "Pomodoro San Marzano DOP, mozzarella, asparagi, speck",
        price: 9,
      },
      {
        name: "Pizza Euro",
        description: "Pomodoro San Marzano DOP, mozzarella, gamberetti, rucola",
        price: 12,
      },
      {
        name: "Bomba",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salsiccia, fagioli, cipolle di Tropea",
        price: 9,
      },
      {
        name: "Salame piccante e friarielli",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salame piccante Levoni, cime di rapa",
        price: 8.5,
      },
      {
        name: "L’Emiliana",
        description:
          "Mozzarella, spinaci, salsiccia, prosciutto cotto Levoni, pecorino",
        price: 9,
      },
      {
        name: "Camuna",
        description:
          "Pomodoro San Marzano DOP, mozzarella, funghi porcini, salsiccia, grana",
        price: 9.5,
      },
      {
        name: "’Nduja",
        description:
          "Pomodoro San Marzano DOP, mozzarella, ’nduja calabrese di Spilinga",
        price: 7,
      },
      {
        name: "Tramontina",
        description: "Mozzarella, cime di rapa, acciughe",
        price: 8,
      },
      {
        name: "Tirolese",
        description:
          "Pomodoro San Marzano DOP, mozzarella, salame piccante Levoni, wurstel, speck",
        price: 9.5,
      },
      {
        name: "Golosa",
        description:
          "Pomodoro San Marzano DOP, mozzarella, zucchine grigliate, brie",
        price: 8,
      },
      {
        name: "Mediterranea",
        description:
          "Pomodoro San Marzano DOP, mozzarella, rucola, pomodorini, crudo di Parma 24 mesi",
        price: 9.5,
      },
      {
        name: "Varazze",
        description:
          "Pomodoro San Marzano DOP, mozzarella, tonno, cipolle di Tropea, tris olive piccantine",
        price: 8.5,
      },
      {
        name: "Salsiccia e friarielli",
        description:
          "Pomodoro San Marzano DOP, mozzarella, cime di rapa, salsiccia",
        price: 8.5,
      },
      {
        name: "Calamari",
        description: "Pomodoro San Marzano DOP, mozzarella, calamari",
        price: 8.5,
      },
    ],
  },
  {
    id: "novita",
    title: "Ultime novità",
    items: [
      {
        name: "Pizza della casa",
        description:
          "Pomodoro San Marzano DOP, burrata, pomodori secchi, crudo di Parma 24 mesi, basilico",
        price: 11,
      },
      {
        name: "Tricolore",
        description:
          "Pomodoro San Marzano DOP, burrata, pomodori secchi, pesto",
        price: 8.5,
      },
      {
        name: "Fiori di zucca",
        description:
          "Pomodoro San Marzano DOP, fiori di zucca, burrata, acciughe",
        price: 9,
      },
      {
        name: "Light",
        description:
          "Pomodoro San Marzano DOP, mozzarella, philadelphia, crudo di Parma 24 mesi, pomodorini, rucola",
        price: 10,
      },
      {
        name: "Taggiasca",
        description:
          "Pomodoro San Marzano DOP, burrata, pomodori secchi, olive Taggiasche",
        price: 9,
      },
      {
        name: "West",
        description:
          "Pomodoro San Marzano DOP, mozzarella, fagioli, pancetta croccante",
        price: 8.5,
      },
      {
        name: "Trapanese",
        description: "Mozzarella, ricotta, pomodori secchi, basilico, mandorle",
        price: 9,
      },
      {
        name: "Arcobaleno",
        description:
          "Pomodoro San Marzano DOP, zucchine, melanzane, pomodorini, olive Taggiasche, burrata",
        price: 9.5,
      },
      {
        name: "Philadelphia",
        description:
          "Pomodoro San Marzano DOP, mozzarella, philadelphia, pancetta affumicata, pomodorini secchi",
        price: 10,
      },
      {
        name: "Norma",
        description:
          "Pomodoro San Marzano DOP, mozzarella, melanzane condite con aglio, olio, menta, pecorino DOP",
        price: 9,
      },
      {
        name: "Bologna",
        description: "Mozzarella, mortadella, burrata, granella di pistacchio",
        price: 10.5,
      },
      {
        name: "Parmigiana",
        description: "Pomodoro San Marzano DOP, mozzarella, melanzane, grana",
        price: 8,
      },
      {
        name: "Per me Napoli",
        description:
          "Impasto Napoli, pomodoro San Marzano DOP, mozzarella fior di latte, basilico",
        price: 8.5,
      },
      {
        name: "La pregiata",
        description:
          "Mozzarella, speck, gorgonzola, crema di funghi prataioli al profumo di tartufo",
        price: 9.5,
      },
      {
        name: "La verde",
        description:
          "Mozzarella, pere, gorgonzola, prosciutto crudo di Parma 24 mesi",
        price: 10,
      },
      {
        name: "Pizzutello",
        description:
          "Impasto Napoli, pomodoro San Marzano DOP, mozzarella, pomodoro Pizzutello, bufala, basilico",
        price: 9.5,
      },
      {
        name: "La delicata",
        description:
          "Impasto verace, mozzarella, cubetti di zucca cotti al vapore, salsiccia, bagoss",
        price: 12,
      },
      {
        name: "Mare monti",
        description:
          "Pomodoro San Marzano DOP, mozzarella, porcini, Gamberetti Royal",
        price: 12,
      },
      {
        name: "Ortomare",
        description: "Crema di carciofi, mozzarella, gamberetti",
        price: 12,
      },
      {
        name: "La caramellata",
        description:
          "Pomodoro San Marzano DOP, mozzarella, taleggio DOP, pancetta croccante, cipolle caramellate",
        price: 12,
      },
      {
        name: "Cacio & pepe",
        description:
          "Impasto verace, mozzarella, guanciale stagionato croccante, cacio e pepe",
        price: 12,
      },
      {
        name: "Valtellina",
        description:
          "Impasto verace, pomodoro San Marzano DOP, mozzarella fior di latte, bresaola IGP, lime, glassa di aceto balsamico",
        price: 13,
      },
      {
        name: "Civico 34",
        description:
          "Impasto verace, mozzarella, crudo di Parma, burrata pugliese, fichi freschi",
        price: 13,
      },
      {
        name: "Civico 34.2",
        description:
          "Impasto verace, mozzarella, crudo di Parma, burrata pugliese, confettura di marmellata di fichi bio",
        price: 13,
      },
      {
        name: "Estiva",
        description:
          "Impasto verace, pomodoro San Marzano DOP, mozzarella in uscita, burrata pugliese, datterino giallo, verde e rosso, acciughe, origano",
        price: 13,
      },
      {
        name: "L’Esosa",
        description:
          "Focaccia con acciughe, olive taggiasche in uscita, pomodori secchi, burrata",
        price: 10,
      },
      {
        name: "Pizza del sabato",
        description:
          "Impasto al farro, pomodoro San Marzano DOP, mozzarella, funghi champignon, melanzane, pomodorini, burrata, guanciale croccante",
        price: 13,
      },
      {
        name: "La pizza del bosco",
        description:
          "Impasto verace, pomodoro San Marzano DOP, mozzarella, salsiccia, taleggio DOP, castagne cotte al vapore",
        price: 12,
      },
      {
        name: "Focaccia alla Nutella",
        price: 7,
      },
    ],
  },
  {
    id: "pala",
    title: "Pizze pala",
    note: "Mezzo metro, alta percentuale di idratazione. Per le pizze pala sono escluse le farciture delle ultime novità e gourmet.",
    items: [
      { name: "Margherita", price: 17 },
      { name: "Farcita", price: 21 },
      { name: "Due gusti", price: 23 },
    ],
  },
  {
    id: "calzoni",
    title: "Calzoni",
    items: [
      {
        name: "Margherita",
        description: "Pomodoro San Marzano DOP, mozzarella",
        price: 6,
      },
      {
        name: "Prosciutto e funghi",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto, funghi",
        price: 8,
      },
      {
        name: "Normale",
        description: "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto",
        price: 7,
      },
      {
        name: "Cotto e carciofi",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto, carciofi",
        price: 8,
      },
      {
        name: "Farcito",
        description:
          "Pomodoro San Marzano DOP, mozzarella, prosciutto cotto, funghi, carciofi",
        price: 8.5,
      },
    ],
  },
  {
    id: "supplementi",
    title: "Supplementi",
    note: "Da aggiungere a qualsiasi pizza.",
    delta: true,
    items: [
      { name: "Mozzarella di bufala", price: 2 },
      { name: "Schiacciata normale", price: 2 },
      { name: "Grana", price: 1.5 },
      { name: "Salamella e salame piccante Levoni", price: 1.5 },
      { name: "Affettati", price: 2 },
      { name: "Philadelphia, funghi porcini", price: 1.5 },
      { name: "Mozzarella senza lattosio", price: 1 },
      { name: "Zucchine, melanzane, peperoni, spinaci", price: 1.5 },
      { name: "Patatine fritte", price: 3.5 },
      { name: "Burrata", price: 3 },
      { name: "Cipolle di Tropea", price: 0.5 },
      {
        name: "Supplemento di pesce",
        description: "Salmone norvegese, gamberetti, frutti di mare",
        price: 3.5,
      },
      { name: "Tonno prima scelta all’olio di oliva", price: 1.5 },
      { name: "Ogni ingrediente tranne specificati", price: 1 },
      { name: "Doppia pasta", price: 1 },
      { name: "Base pizza senza glutine", price: 2 },
      { name: "Impasto kamut", price: 2 },
      { name: "Impasto integrale", price: 2 },
      { name: "Impasto farro", price: 2 },
      { name: "Impasto Napoli", price: 2 },
      { name: "Impasto senza lievito", price: 2 },
      { name: "Pizza baby", price: -1 },
    ],
  },
  {
    id: "bevande",
    title: "Bevande",
    items: [
      { name: "Bibite in lattina", description: "33 cl", price: 2 },
      { name: "Estathè", description: "Limone o pesca", price: 2 },
      { name: "Redbull", price: 2.5 },
      { name: "Coca Cola in vetro", description: "33 cl", price: 2.5 },
      { name: "Coca Cola bottiglia", description: "1 L", price: 4.5 },
      { name: "Birra Moretti", description: "66 cl", price: 3 },
      { name: "Birra Moretti Rossa", description: "33 cl", price: 3 },
      { name: "Birra Moretti Baffo d’Oro", description: "33 cl", price: 2.5 },
      { name: "Birra Moretti IPA Ale", description: "33 cl", price: 3 },
      { name: "Birra Moretti Gran Cru", description: "750 cl", price: 8 },
      { name: "Ichnusa, Messina, Paulaner Weisbier", price: 4 },
      { name: "Birra senza glutine", description: "33 cl", price: 3 },
      { name: "Birra analcolica", description: "33 cl", price: 3 },
    ],
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);

/** Prezzo di un supplemento: variazione col segno, es. "+ 2,00 €". */
export const formatDelta = (price: number) =>
  `${price < 0 ? "−" : "+"} ${formatPrice(Math.abs(price))}`;
