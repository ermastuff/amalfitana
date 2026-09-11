"use client";

import { useRef, type ElementType } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./WordReveal.module.css";

type Props = {
  text: string;
  /** Parole finali in corsivo Didot (es. "fuoco vivo."). */
  accent?: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** Classe aggiuntiva per le parole in corsivo (es. per il colore). */
  accentClassName?: string;
  /** Inizio dello ScrollTrigger. */
  start?: string;
  stagger?: number;
};

/**
 * Frase che entra parola per parola dal basso, ognuna mascherata dal proprio
 * wrapper. Il testo completo resta leggibile agli screen reader.
 */
export default function WordReveal({
  text,
  accent = "",
  as: Tag = "p",
  id,
  className,
  accentClassName,
  start = "top 80%",
  stagger = 0.06,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-word]", {
          yPercent: 110,
          duration: 1,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  const split = (str: string) => str.split(/\s+/).filter(Boolean);
  const words = [
    ...split(text).map((word) => ({ word, accent: false })),
    ...split(accent).map((word) => ({ word, accent: true })),
  ];

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="visually-hidden">
        {[text, accent].filter(Boolean).join(" ")}
      </span>
      {words.map(({ word, accent: isAccent }, i) => (
        <span key={i} aria-hidden="true">
          <span className={s.word}>
            <span
              className={`${s.inner} ${isAccent ? `${s.accent} ${accentClassName ?? ""}` : ""}`}
              data-word
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
