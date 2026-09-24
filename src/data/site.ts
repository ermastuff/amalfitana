export type NavLink = {
  href: string;
  label: string;
  /** Pagina ancora da fare: la voce resta nel menu, ma senza link. */
  disabled?: boolean;
};

export const site = {
  name: "L'Amalfitana",
  tagline: "Traditional Gourmet · Costiera Amalfitana",
  description:
    "L’Amalfitana, pizzeria d’asporto a Flero (BS): impasti con biga di 24 ore, sette impasti a scelta, pizze classiche, speciali e gourmet.",
  // Dati del locale presi da pizzeriadasportolamalfitana.com (settembre 2026).
  legalName: "Pizzeria d’asporto L’Amalfitana",
  vat: "02678610987",
  address: {
    locality: "Flero",
    street: "Via XXV Aprile, 34",
    city: "25020 Flero (BS)",
    mapsQuery: "Via XXV Aprile 34, 25020 Flero BS",
  },
  phone: "+39 030 2761341",
  phoneHref: "tel:+390302761341",
  // Il numero chiamato dal bottone "Ordina ora" del sito attuale.
  orderPhone: "+39 030 2761868",
  orderPhoneHref: "tel:+390302761868",
  email: "pizzerialamalfitana@yahoo.it",
  // Pranzo solo venerdì e sabato: il sito attuale ha anche una frase che lo
  // dà da martedì a domenica, ma il riquadro orari (ripetuto su più pagine)
  // dice così.
  hours: [
    { days: "Lunedì", time: "Chiuso" },
    { days: "Martedì – Giovedì", time: "17:30 – 22:00" },
    {
      days: "Venerdì – Sabato",
      time: "11:30 – 13:30 · 17:30 – 22:00",
    },
    { days: "Domenica", time: "17:00 – 22:00" },
  ],
  // Numeri mostrati nel box della hero (segnaposto).
  stats: {
    pizzeSfornate: 1284530,
    dal: 1987,
  },
  // Link agli store (segnaposto: sostituire con le pagine reali dell'app).
  apps: {
    ios: "https://apps.apple.com/",
    android: "https://play.google.com/store",
  },
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/pizzeria_lamalfitana_flero/",
    },
    { label: "Facebook", href: "https://facebook.com/602218369836776" },
    {
      label: "TripAdvisor",
      href: "https://tripadvisor.com/Restaurant_Review-g2368738-d5821448-Reviews-Pizzeria_D_Asporto_L_Amalfitana-Flero_Province_of_Brescia_Lombardy.html",
    },
  ],
  nav: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/pizze-gourmet", label: "Pizze Gourmet" },
    { href: "/filosofia", label: "Filosofia" },
    { href: "/contatti", label: "Contatti" },
  ] as NavLink[],
};

/** L'invito a chiamare, al posto della voce "Contatti" in cima a destra. */
export const booking = {
  label: "Ordina",
  phone: site.orderPhone,
  href: site.orderPhoneHref,
};

/** Le voci dei menu in cima alla pagina: i contatti non ci stanno, al loro
    posto c'è il numero da chiamare (la pagina resta linkata nel footer). */
export const mainNav = site.nav.filter((link) => link.href !== "/contatti");

/** Menu mostrato dentro alle hero: le voci del sito senza la home, a cui
    riporta il simbolo del logo al centro. */
export const heroNav = mainNav.filter((link) => link.href !== "/");

/** Le voci del menu della hero divise a metà, ai due lati del simbolo. */
const half = Math.ceil(heroNav.length / 2);
export const heroNavSides = [
  heroNav.slice(0, half),
  heroNav.slice(half),
] as const;
