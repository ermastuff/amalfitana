"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import HeroNav from "@/components/HeroNav";
import { wirePath, type Box } from "./wires";
import s from "./gourmet.module.css";

type Props = {
  /** id del primo capitolo, per l'invito a scorrere. */
  firstId: string;
};

// Posizione di una parola rispetto al blocco che le contiene, senza le
// trasformazioni di GSAP (a metà animazione la parola è scalata).
const box = (el: HTMLElement): Box => ({
  left: el.offsetLeft,
  top: el.offsetTop,
  width: el.offsetWidth,
  height: el.offsetHeight,
});

/**
 * Hero: foto a tutto schermo, menu in alto, le due parole del titolo agli
 * angoli opposti unite da una linea che si disegna, invito a scorrere in basso.
 */
export default function GourmetHero({ firstId }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const claim = el.querySelector<HTMLElement>("[data-claim]");
      const path = el.querySelector<SVGPathElement>("[data-hero-wire]");
      const [a, b] = gsap.utils.toArray<HTMLElement>("[data-hero-word]", el);
      if (!claim || !path || !a || !b) return;

      // La linea va dal basso della prima parola all'alto della seconda
      const layout = () =>
        path.setAttribute("d", wirePath(box(a), box(b), "solid", "vertical"));
      layout();
      document.fonts.ready.then(layout);

      let draw: gsap.core.Tween | undefined;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Le parole arrivano "in profondità": da lontano (piccole, sfocate)
        // verso lo schermo. Partono già nascoste dal CSS: niente lampo.
        const far = { opacity: 0, scale: 0.7, filter: "blur(18px)" };
        const near = {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.6,
          clearProps: "filter",
        };
        draw = gsap.fromTo(
          path,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.4, ease: "power2.inOut" },
        );
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(
            "[data-hero-photo]",
            { opacity: 0, scale: 1.08, duration: 2.2, ease: "power2.out" },
            0,
          )
          .from(
            "[data-hero-nav]",
            { y: -14, opacity: 0, duration: 0.9, stagger: 0.08 },
            0.4,
          )
          .fromTo(a, far, near, 0.6)
          .add(draw, 1.3)
          .fromTo(b, far, near, 1.7)
          .fromTo(
            "[data-hero-hint]",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8 },
            2.3,
          );
      });

      // Al resize le parole si spostano: linea ricalcolata e rimisurata
      const ro = new ResizeObserver(() => {
        layout();
        if (!draw) return;
        if (draw.progress() === 1) gsap.set(path, { drawSVG: "100%" });
        else draw.invalidate();
      });
      ro.observe(claim);
      return () => ro.disconnect();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.hero} data-hero>
      <Image
        src="/assets/Header-Gourmet.jpg"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className={s.heroPhoto}
        data-hero-photo
      />
      <div className={s.heroShade} aria-hidden="true" />

      <div className={s.heroInner}>
        <HeroNav current="/pizze-gourmet" />

        <div className={s.claim} data-claim>
          <h1 className={s.claimTitle}>
            <span className="visually-hidden">Le pizze d’autore</span>
            <span
              className={`${s.word} ${s.wordA}`}
              aria-hidden="true"
              data-hero-word
            >
              Le pizze
            </span>
            <span
              className={`${s.word} ${s.wordB}`}
              aria-hidden="true"
              data-hero-word
            >
              <em>d’autore.</em>
            </span>
          </h1>
          <svg className={s.heroWire} aria-hidden="true" focusable="false">
            <path className={s.wire} data-hero-wire />
          </svg>
        </div>

        <a href={`#${firstId}`} className={s.hint} data-hero-hint>
          Scopri
          <br />
          le cinque pizze ↓
        </a>
      </div>
    </section>
  );
}
