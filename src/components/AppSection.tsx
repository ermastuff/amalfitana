"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import s from "./AppSection.module.css";

const LINES = ["Scarica", "l’app"];

/** Sezione download app: testo centrato e mockup del telefono che sale allo scroll. */
export default function AppSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Titolo: le due righe salgono dalla maschera
        gsap.from("[data-line]", {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
        // Telefono: fade-in dal basso quando entra nel viewport...
        gsap.from("[data-phone]", {
          y: 160,
          opacity: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-phone-wrap]",
            start: "top 92%",
            once: true,
          },
        });
      });

      // ...e poi sale man mano che si scorre, fino a mostrarne al massimo la metà
      // quando il fondo della sezione tocca il fondo dello schermo. La corsa è
      // sempre inferiore allo stacco dai bottoni, che non vengono mai coperti.
      // La dissolvenza (--fade-end sul contenitore mascherato) si sposta con
      // il telefono, restando sempre appena sopra la linea di taglio della sezione.
      const lift = (query: string, distance: number) =>
        mm.add(`${MOTION_OK} and ${query}`, () => {
          gsap.to("[data-phone-mask]", {
            "--fade-end": "46%",
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          });
          gsap.to("[data-phone-wrap]", {
            y: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          });
        });
      lift("(min-width: 901px)", 90);
      lift("(max-width: 900px)", 50);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.section} aria-labelledby="app-title">
      <Reveal className={s.head} stagger>
        {/* Icona "app" con il simbolo del logo */}
        <span className={s.appIcon} data-reveal-item aria-hidden="true">
          <span className={s.appSymbol} />
        </span>

        <h2 id="app-title" className={s.title}>
          {LINES.map((line) => (
            <span key={line} className={s.line}>
              <span data-line>{line}</span>
            </span>
          ))}
        </h2>

        <p className={s.text} data-reveal-item>
          Da oggi tutto il mondo L’Amalfitana è sul tuo smartphone. Scarica
          l’app per non perdere tutte le novità e i vantaggi esclusivi!
        </p>

        <div className={s.stores} data-reveal-item>
          <a
            href={site.apps.ios}
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
          </a>
          <a
            href={site.apps.android}
            className="btn btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Play
          </a>
        </div>
      </Reveal>

      <div className={s.phoneWrap} data-phone-wrap>
        {/* Nuvola: alone sfocato dietro al telefono, fuori dalla maschera */}
        <span className={s.cloud} aria-hidden="true" />
        <div className={s.phoneMask} data-phone-mask>
          <Image
            src="/assets/Renana-reel-portrait.png"
            alt="L’app L’Amalfitana aperta su uno smartphone"
            width={1419}
            height={2796}
            sizes="(max-width: 900px) 78vw, 420px"
            className={s.phone}
            data-phone
          />
        </div>
      </div>
    </section>
  );
}
