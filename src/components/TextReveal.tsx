"use client";

import { useRef, type ElementType } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./TextReveal.module.css";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Ritardo tra una parola e la successiva, in secondi. */
  stagger?: number;
};

/** Testo che entra parola per parola (dal basso) quando arriva nel viewport. */
export default function TextReveal({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.035,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref} className={`${s.text} ${className ?? ""}`}>
      <span className="visually-hidden">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className={s.word}>
            <span className={s.inner} data-word>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
