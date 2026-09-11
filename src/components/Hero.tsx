"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { heroNavSides, site, type NavLink } from "@/data/site";
import s from "./Hero.module.css";

// Wordmark come nel logo: stesso font (Didot Bold), apostrofo tipografico e
// legatura "fi" tenuta unita così da animarla come un glifo solo.
const WORDMARK = "L’Amalfitana";
const GLYPHS = WORDMARK.match(/fi|./gu) ?? [];

// Riga in basso, giustificata entro i bordi del wordmark.
const TAGLINE =
  "ingredienti naturali e tanta passione per pizze dal Gusto inconfondibile";
const TAGLINE_WORDS = TAGLINE.split(" ");

// Menu in alto: il simbolo del logo al centro, le voci divise a metà ai lati.
const [NAV_LEFT, NAV_RIGHT] = heroNavSides;

// Le pagine ancora da fare restano nel menu, spente e senza link.
const navItem = (link: NavLink) => (
  <li key={link.href} data-hero-nav>
    {link.disabled ? (
      <span className={`${s.topLink} ${s.off}`}>{link.label}</span>
    ) : (
      <Link href={link.href} className={s.topLink}>
        {link.label}
      </Link>
    )}
  </li>
);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLSpanElement>(null);

  // Autoplay affidabile: alcuni browser ignorano l'attributo muted renderizzato
  // lato server, quindi lo forziamo via proprietà e avviamo il play.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playing = video.play();
    if (playing) playing.catch(() => {});
  }, []);

  // I glifi animati sono posizionati in assoluto esattamente dove il testo
  // "fantasma" (invisibile, in flusso) disegna ogni lettera: crenatura e
  // legature restano quelle del font. Ricalcolato al resize e al caricamento
  // del font.
  useLayoutEffect(() => {
    const ghost = ghostRef.current;
    const letters = lettersRef.current;
    const textNode = ghost?.firstChild;
    if (!ghost || !letters || !textNode) return;
    const glyphs = Array.from(letters.children) as HTMLElement[];

    const layout = () => {
      const base = ghost.getBoundingClientRect().left;
      const range = document.createRange();
      let offset = 0;
      glyphs.forEach((glyph, i) => {
        const len = GLYPHS[i].length;
        range.setStart(textNode, offset);
        range.setEnd(textNode, offset + len);
        glyph.style.left = `${range.getBoundingClientRect().left - base}px`;
        offset += len;
      });
      letters.dataset.ready = "";
    };

    layout();
    document.fonts.ready.then(layout);
    const observer = new ResizeObserver(layout);
    observer.observe(ghost);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(
            "[data-hero-video]",
            { opacity: 0, scale: 1.08, duration: 2.2, ease: "power2.out" },
            0,
          )
          .from(
            "[data-hero-nav]",
            { y: -14, opacity: 0, duration: 0.9, stagger: 0.08 },
            0.4,
          )
          .from(
            "[data-hero-glyph]",
            { yPercent: 112, duration: 1.4, ease: "power4.out", stagger: 0.05 },
            0.55,
          )
          .from(
            "[data-hero-word]",
            { y: 12, opacity: 0, duration: 0.8, stagger: 0.035 },
            1.25,
          );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.hero} data-hero>
      <video
        ref={videoRef}
        className={s.video}
        data-hero-video
        src="/assets/hero-amalfitana.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={s.shade} aria-hidden="true" />

      {/* La colonna è larga quanto il wordmark: nav e tagline si allineano ai suoi bordi */}
      <div className={s.inner}>
        <nav className={s.topNav} aria-label="Sezioni del sito">
          <ul>{NAV_LEFT.map(navItem)}</ul>
          <Link
            href="/"
            className={s.navLogo}
            aria-label={`${site.name}, home`}
            data-hero-nav
          >
            <span className={s.navSymbol} aria-hidden="true" />
          </Link>
          <ul>{NAV_RIGHT.map(navItem)}</ul>
        </nav>

        <div className={s.bottom} data-hero-bottom>
          <h1 className={s.wordmark}>
            <span className="visually-hidden">{site.name}</span>
            <span className={s.word} aria-hidden="true">
              <span ref={ghostRef} className={s.ghost}>
                {WORDMARK}
              </span>
              <span ref={lettersRef} className={s.letters}>
                {GLYPHS.map((glyph, i) => (
                  <span key={i} className={s.glyph} data-hero-glyph>
                    {glyph}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* Gli spazi tra gli span non entrano nel layout flex ma tengono
              leggibile la frase per gli screen reader */}
          <p className={s.tagline}>
            {TAGLINE_WORDS.map((word, i) => (
              <span key={i}>
                {i > 0 && " "}
                <span data-hero-word>{word}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
