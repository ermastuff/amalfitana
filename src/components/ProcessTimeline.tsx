"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./ProcessTimeline.module.css";

const steps = [
  {
    n: "01",
    title: "Impasto",
    text: "Farina tipo 1 macinata a pietra, acqua, sale marino di Trapani e pochissimo lievito. Idratazione al 70%.",
  },
  {
    n: "02",
    title: "Lievitazione",
    text: "48 ore a temperatura controllata. Il tempo fa il lavoro: struttura, profumo, digeribilità.",
  },
  {
    n: "03",
    title: "Stesura",
    text: "Solo a mano, con lo schiaffo napoletano. Il cornicione si gonfia perché non lo tocchiamo.",
  },
  {
    n: "04",
    title: "Forno",
    text: "Legna di faggio e quercia, 450 gradi. Novanta secondi, non uno di più.",
  },
  {
    n: "05",
    title: "Servizio",
    text: "Al tavolo entro un minuto dall'uscita dal forno. La pizza non aspetta nessuno.",
  },
];

/** Le fasi del lavoro, con linea che si disegna allo scroll. */
export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step, {
            x: -24,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%", once: true },
          });
          gsap.from(step.querySelector("[data-dot]"), {
            scale: 0,
            duration: 0.6,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: step, start: "top 72%", once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={s.wrap}>
      <div className={s.track} aria-hidden="true">
        <div className={s.line} data-line />
      </div>
      <ol ref={listRef} className={s.list}>
        {steps.map((step) => (
          <li key={step.n} className={s.step} data-step>
            <span className={s.dot} data-dot aria-hidden="true" />
            <span className={s.num}>{step.n}</span>
            <div className={s.body}>
              <h3 className={s.title}>{step.title}</h3>
              <p className={s.text}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
