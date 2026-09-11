import Link from "next/link";
import Image from "next/image";
import Slideshow, { type Slide } from "./Slideshow";
import s from "./OrderSection.module.css";

// Immagini della scheda Menu (illustrazioni rifilate ai bordi del disegno,
// così risultano centrate). Sostituire con le foto quando disponibili e
// togliere `tint` dallo Slideshow se le foto sono già scure.
const menuSlides: Slide[] = [
  { src: "/assets/illustrazioni/crop/Pizza.png", alt: "Pizza" },
  { src: "/assets/illustrazioni/crop/Pomodorini.png", alt: "Pomodorini" },
  { src: "/assets/illustrazioni/crop/Basilico.png", alt: "Basilico" },
  { src: "/assets/illustrazioni/crop/Provola.png", alt: "Provola" },
  { src: "/assets/illustrazioni/crop/Spiga.png", alt: "Spiga di grano" },
];

export default function OrderSection() {
  return (
    <section className={s.section} aria-label="Ordina e menu">
      {/* Ordina */}
      <article className={`${s.card} ${s.cardInk}`}>
        <h2 className={s.title}>Ordina</h2>
        <div className={s.media}>
          <Image
            src="/assets/app-mockup.jpg"
            alt="Smartphone con l'app L'Amalfitana appoggiato su un libro"
            width={1365}
            height={820}
            sizes="(max-width: 900px) 100vw, 50vw"
            className={s.mockup}
          />
        </div>
        <p className={s.caption}>
          ordina direttamente dalla nostra applicazione
        </p>
      </article>

      {/* Menu */}
      <article className={`${s.card} ${s.cardLight}`}>
        <h2 className={s.title}>Menu</h2>
        <div className={s.media}>
          <Slideshow slides={menuSlides} tint className={s.slideshow} />
          <Link href="/menu" className={`oval-btn oval-btn--light ${s.oval}`}>
            Visita
            <br />
            menu
          </Link>
        </div>
      </article>
    </section>
  );
}
