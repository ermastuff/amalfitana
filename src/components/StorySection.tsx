import Image from "next/image";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import s from "./StorySection.module.css";

/**
 * Immagine quadrata a sinistra, pannello di testo a destra.
 * L'immagine è un fotogramma del video della hero: sostituire
 * public/assets/storia.jpg con una foto definitiva (formato quadrato).
 */
export default function StorySection() {
  return (
    <section className={s.section} aria-labelledby="story-title">
      <div className={s.media}>
        <Reveal className={s.frame} y={0}>
          <Parallax speed={0.12} className={s.parallax}>
            <Image
              src="/assets/storia.jpg"
              alt="Le mani del pizzaiolo lavorano l’impasto"
              width={1080}
              height={1080}
              sizes="(max-width: 900px) 100vw, 50vw"
              className={s.img}
            />
          </Parallax>
        </Reveal>
      </div>

      <Reveal stagger className={s.panel}>
        {/* Simbolo del logo (public/assets/logo-simbolo.png) come maschera:
            prende il colore del testo */}
        <span className={s.symbol} data-reveal-item aria-hidden="true" />
        <h2 id="story-title" className={s.title} data-reveal-item>
          Un omaggio alla <em>Costiera</em>.
        </h2>
        <p className={s.text} data-reveal-item>
          Lavoriamo con piccoli produttori, raccogliamo quello che cresce
          vicino e lasciamo che ingredienti semplici diventino pizze generose.
        </p>
        {/* Qui andrà il link "La nostra filosofia" quando la pagina sarà pronta */}
      </Reveal>
    </section>
  );
}
