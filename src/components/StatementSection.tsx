"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import WordReveal from "./WordReveal";
import s from "./StatementSection.module.css";

// Frase in due parti: la coda va in corsivo Didot color oliva.
const LEAD = "Cuciniamo con le stagioni, la terra e un";
const ACCENT = "fuoco vivo.";

/** Frase manifesto centrata, con etichetta numerata in alto a sinistra. */
export default function StatementSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger = {
          trigger: ref.current,
          start: "top 70%",
          once: true,
        };
        gsap.from("[data-label]", {
          y: 8,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger,
        });
        gsap.from("[data-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger,
        });
        // L'illustrazione scivola piano verso il basso mentre si scorre
        gsap.to("[data-pizza]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.section} aria-labelledby="statement-title">
      <Image
        src="/assets/illustrazioni/crop/Pizza.png"
        alt=""
        width={1680}
        height={971}
        sizes="(max-width: 900px) 70vw, 36vw"
        className={s.pizza}
        data-pizza
        aria-hidden="true"
      />

      <p className={s.label}>
        <span data-label>01</span>
        <span data-label>La nostra filosofia</span>
        <span className={s.rule} data-rule aria-hidden="true" />
      </p>

      <WordReveal
        as="h2"
        id="statement-title"
        className={s.statement}
        text={LEAD}
        accent={ACCENT}
        accentClassName={s.accent}
        start="top 70%"
      />
    </section>
  );
}
