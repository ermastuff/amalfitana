# L'Amalfitana

Sito base per la pizzeria **L'Amalfitana**, costruito con Next.js (App Router), TypeScript e GSAP.

Font: Didot Bold (locale, in `src/app/fonts/`) per menu e titoli, Montserrat (Google Fonts) per i paragrafi.
Asset della hero in `public/assets/`: video `hero-amalfitana.mp4`, logo negativo completo `logo-negativo.png` (footer) e solo wordmark `logo-wordmark.png` (header). Il file originale `logo negativo.png` non è usato dal sito.

## Menu sfogliabile (home)

La sezione `BookSection` mostra il PDF `public/assets/menu-amalfitana.pdf` come libro sfogliabile:

- `Flipbook` rasterizza le pagine lato client con `pdfjs-dist` e le passa a `page-flip` (StPageFlip). Frecce, contatore pagine, schermo intero, download, tastiera (frecce sinistra/destra), pagina singola sotto i 700px.
- Il worker di pdf.js viene copiato in `public/pdf.worker.min.mjs` dallo script `postinstall`: deve corrispondere alla versione di `pdfjs-dist` installata.
- Lo sfondo è un pattern con le illustrazioni di `public/assets/illustrazioni/` (via `next/image`, quindi ridimensionate al volo).
- Per cambiare menu basta sostituire il PDF mantenendo il nome, oppure cambiare `src` in `BookSection`. Il file originale `menù_l'amalfitana-r2.pdf` non è usato dal sito.

## Follow Instagram e Filosofia (home)

- `InstagramSection`: rientro laterale pari circa al logo, intestazione "Follow Instagram" (link a `site.social`), tre reel verticali 9:16 e testo che entra parola per parola (`TextReveal`, GSAP + ScrollTrigger). I reel usano per ora il video della hero con partenze diverse: sostituire l'elenco `reels` con gli mp4 verticali reali.
- `PhilosophySection`: alta quanto la finestra. Banner con bordo bruno e sfondo del sito ("Filosofia" piccolo, "Traditional Gourmet" grande, ovale "Scopri di più"), poi video a sinistra e blocco bruno "Lavora con noi!" con ovale "Contattaci".
- `MutedVideo`: video decorativo muto in loop, va in pausa fuori dal viewport. `.oval-btn` in `globals.css` è il bottone ovale con le varianti `--light` (bianco, in hover trasparente con bordo bianco) e `--ink` (bruno, in hover trasparente con bordo bruno).

## Ordina + Menu (home)

`OrderSection` occupa esattamente l'altezza della finestra con due colonne identiche: "Ordina" (fondo bruno, mockup orizzontale `public/assets/app-mockup.jpg`, ritagliato da `Bendito_Mockup-MT-Free-Iphone.jpg` che non è usato dal sito) e "Menu" (immagini che si alternano a stacco netto tramite `Slideshow`, con il bottone ovale "Visita menu"). Le immagini sono elencate in cima a `OrderSection.tsx`: oggi usano le illustrazioni rifilate ai bordi del disegno in `public/assets/illustrazioni/crop/` con la modalità `tint` (linee chiare su fondo scuro); con le foto reali basta sostituire l'elenco e togliere `tint`.

## Pagine

| Rotta            | File                              |
| ---------------- | --------------------------------- |
| Home             | `src/app/page.tsx`                |
| Menu             | `src/app/menu/page.tsx`           |
| Pizze Gourmet    | `src/app/pizze-gourmet/page.tsx`  |
| Filosofia        | `src/app/filosofia/page.tsx`      |
| Contatti         | `src/app/contatti/page.tsx`       |

## Comandi

```bash
npm install     # installa le dipendenze
npm run dev     # sviluppo su http://localhost:3000
npm run build   # build di produzione
npm run start   # avvia la build
npm run lint    # ESLint
```

## Struttura

- `src/app/` — pagine, layout, stili globali (`globals.css`) e icona (`icon.svg`).
- `src/components/` — header, footer, hero e componenti di animazione riutilizzabili.
- `src/data/` — contenuti: `site.ts` (indirizzo, orari, contatti, navigazione), `menu.ts`, `gourmet.ts`.
- `src/lib/gsap.ts` — registrazione dei plugin GSAP. Importare sempre `gsap` da qui nei client component.
- `src/types/page-flip.d.ts` — tipi minimi per `page-flip`, che non li distribuisce.

## Animazioni GSAP

Tutte le animazioni rispettano `prefers-reduced-motion` tramite `gsap.matchMedia()`.

- `Hero` — video di sfondo muto in autoplay con parallasse, elenco sezioni a comparsa, box con contatore.
- `Odometer` — contatore a celle (stile tabellone) usato nel box della hero.
- `PageHero` — entrata delle intestazioni delle pagine interne.
- `Reveal` — comparsa allo scroll (ScrollTrigger); con `stagger` anima i figli marcati `data-reveal-item`.
- `Parallax` — spostamento verticale legato allo scroll.
- `Counter` — numeri che contano quando entrano nel viewport.
- `Marquee` — nastro di testo in loop continuo.
- `Underline` — sottolineatura disegnata con DrawSVGPlugin.
- `ProcessTimeline` — linea che si riempie allo scroll (scrub) e passaggi che entrano in sequenza.
- `Header` — in home è fisso e trasparente sopra il video, diventa chiaro dopo la hero (ScrollTrigger); menu mobile animato.

## Da personalizzare

- Indirizzo, telefono, email, orari e social in `src/data/site.ts` (attualmente segnaposto).
- Prezzi e piatti in `src/data/menu.ts` e `src/data/gourmet.ts`.
- Il form in `src/components/ContactForm.tsx` è una demo senza backend: collegare una Server Action o un'API per l'invio reale.
- La mappa in Contatti usa un embed Google Maps con la query `site.address.mapsQuery`.
