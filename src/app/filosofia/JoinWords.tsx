"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./filosofia.module.css";

type Props = {
  /** Le parti che si uniscono: almeno due. */
  parts: string[];
  /** Il titolo intero, per gli screen reader. */
  label: string;
  /** Uno spazio tra una parte e l'altra: senza, le parti formano una sola
      parola («Im» + «pasto»). */
  spaced?: boolean;
  id?: string;
};

/**
 * Titolo che si ricompone scorrendo: le parti arrivano separate — una in
 * alto a sinistra, l'altra in basso a destra — e si uniscono al centro.
 * Il movimento è legato allo scroll (scrub) con easing, quindi non scatta:
 * rallenta mentre le parole si avvicinano.
 */
export default function JoinWords({ parts, label, spaced, id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-part]", el);
      if (items.length < 2) return;

      // Quanto si allontanano: fin quasi al bordo della finestra, senza
      // uscirne. Si misura con offsetLeft, che ignora le trasformazioni:
      // il calcolo resta giusto anche a metà animazione (invalidateOnRefresh).
      const MARGIN = 14;
      const spread = () => {
        const host = el.getBoundingClientRect();
        const first = items[0];
        const last = items[items.length - 1];
        const left = host.left + first.offsetLeft - MARGIN;
        const right =
          window.innerWidth -
          MARGIN -
          (host.left + last.offsetLeft + last.offsetWidth);
        return Math.max(Math.min(left, right), 0);
      };
      const offset = (i: number) =>
        (i / (items.length - 1) - 0.5) * 2 * spread();

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          items,
          {
            x: (i: number) => offset(i),
            // Separate anche in verticale: una sopra e una sotto la riga
            yPercent: (i: number) => (i % 2 ? 46 : -46),
            opacity: 0.4,
          },
          {
            x: 0,
            yPercent: 0,
            opacity: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 40%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  const style = { "--join-ch": label.length } as CSSProperties;

  return (
    <h2 ref={ref} id={id} className={s.joinTitle} style={style}>
      <span className="visually-hidden">{label}</span>
      <span className={s.joinLine} aria-hidden="true">
        {parts.map((part, i) => (
          <Fragment key={i}>
            {i > 0 && spaced ? " " : null}
            <span className={s.joinPart} data-part>
              {part}
            </span>
          </Fragment>
        ))}
      </span>
    </h2>
  );
}
