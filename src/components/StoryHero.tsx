"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { box, wirePath } from "@/lib/wire";
import HeroNav from "@/components/HeroNav";
import Letters from "@/components/Letters";
import s from "./StoryHero.module.css";

type Props = {
  /** Foto a tutta pagina. */
  photo: string;
  /** Titolo intero, per gli screen reader: le due parole sono decorative. */
  title: string;
  /** Le due parole del titolo: la prima in alto a sinistra, la seconda —
      in corsivo — in basso a destra. */
  words: [string, string];
  /** Percorso della pagina, per il menu. */
  current: string;
  /** Invito a scorrere, in basso a sinistra. */
  hint: ReactNode;
  hintHref: string;
};

/**
 * Hero delle pagine di racconto: foto a tutto schermo, menu in alto, le due
 * parole del titolo agli angoli opposti unite da una linea che si disegna,
 * invito a scorrere in basso.
 */
export default function StoryHero({
  photo,
  title,
  words,
  current,
  hint,
  hintHref,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const claim = el.querySelector<HTMLElement>("[data-claim]");
      const path = el.querySelector<SVGPathElement>("[data-hero-wire]");
      const [a, b] = gsap.utils.toArray<HTMLElement>("[data-hero-word]", el);
      if (!claim || !path || !a || !b) return;

      // Le due parole sono su righe diverse: la linea scende dalla metà
      // orizzontale della prima alla metà orizzontale della seconda
      const layout = () =>
        path.setAttribute("d", wirePath(box(a), box(b), "solid"));
      layout();
      document.fonts.ready.then(layout);

      let draw: gsap.core.Tween | undefined;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Le parole arrivano "in profondità": la parola intera si avvicina
        // mentre le lettere compaiono una dopo l'altra, con un piccolo
        // ritardo. Le lettere partono già nascoste dal CSS: niente lampo.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const word = (w: HTMLElement, at: number) => {
          tl.from(w, { scale: 0.7, duration: 1.6 }, at).fromTo(
            w.querySelectorAll("[data-letter]"),
            { opacity: 0, filter: "blur(14px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.1,
              stagger: 0.06,
              clearProps: "filter",
            },
            at,
          );
        };
        draw = gsap.fromTo(
          path,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.4, ease: "power2.inOut" },
        );
        tl.from(
          "[data-hero-photo]",
          { opacity: 0, scale: 1.08, duration: 2.2, ease: "power2.out" },
          0,
        ).from(
          "[data-hero-nav]",
          { y: -14, opacity: 0, duration: 0.9, stagger: 0.08 },
          0.4,
        );
        word(a, 0.6);
        tl.add(draw, 1.5);
        word(b, 1.9);
        tl.fromTo(
          "[data-hero-hint]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8 },
          2.7,
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
        src={photo}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className={s.photo}
        data-hero-photo
      />
      <div className={s.shade} aria-hidden="true" />

      <div className={s.inner}>
        <HeroNav current={current} />

        <div className={s.claim} data-claim>
          <h1 className={s.claimTitle}>
            <span className="visually-hidden">{title}</span>
            <span
              className={`${s.word} ${s.wordA}`}
              aria-hidden="true"
              data-hero-word
            >
              <Letters text={words[0]} />
            </span>
            <span
              className={`${s.word} ${s.wordB}`}
              aria-hidden="true"
              data-hero-word
            >
              <em>
                <Letters text={words[1]} />
              </em>
            </span>
          </h1>
          <svg className={s.wireBox} aria-hidden="true" focusable="false">
            <path className={s.wire} data-hero-wire />
          </svg>
        </div>

        <a href={hintHref} className={s.hint} data-hero-hint>
          {hint}
        </a>
      </div>
    </section>
  );
}
