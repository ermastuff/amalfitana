"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./Odometer.module.css";

type Props = {
  to: number;
  /** Valore di partenza: default 92% del finale, così le cifre restano tante quante alla fine. */
  from?: number;
  duration?: number;
  delay?: number;
  locale?: string;
  className?: string;
};

/** Contatore a celle (stile tabellone) che sale fino al valore finale. */
export default function Odometer({
  to,
  from,
  duration = 2.8,
  delay = 1.2,
  locale = "it-IT",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = new Intl.NumberFormat(locale);
  const finalChars = fmt.format(to).split("");
  const start = from ?? Math.floor(to * 0.92);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const cells = el.querySelectorAll<HTMLElement>("[data-cell]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { value: start };
        const render = () => {
          const chars = fmt
            .format(Math.round(state.value))
            .padStart(finalChars.length, " ")
            .split("");
          cells.forEach((cell, i) => {
            cell.textContent = chars[i];
          });
        };
        render();
        gsap.to(state, {
          value: to,
          duration,
          delay,
          ease: "power3.out",
          onUpdate: render,
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`${s.odometer} ${className ?? ""}`}>
      <span className="visually-hidden">{fmt.format(to)}</span>
      {finalChars.map((ch, i) => (
        <span
          key={i}
          data-cell
          aria-hidden="true"
          className={/\d/.test(ch) ? s.digit : s.sep}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
