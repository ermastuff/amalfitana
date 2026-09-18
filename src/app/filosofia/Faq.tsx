"use client";

import { useId, useState } from "react";
import { faq } from "@/data/filosofia";
import s from "./filosofia.module.css";

/** Le domande ricorrenti su farine e impasti: una risposta aperta per volta. */
export default function Faq() {
  const uid = useId().replace(/:/g, "");
  const [open, setOpen] = useState(0);

  return (
    <ul className={s.faq}>
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className={s.faqItem}>
            <h3 className={s.faqHead}>
              <button
                type="button"
                className={s.faqButton}
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className={s.faqSign} aria-hidden="true" />
              </button>
            </h3>
            {/* La riga della griglia passa da 0fr a 1fr: si apre in altezza
                senza doverla misurare. Il figlio diretto non ha spaziature —
                resterebbero visibili da chiuso — e le porta il testo. */}
            <div
              id={`${uid}-${i}`}
              className={s.faqPanel}
              data-open={isOpen || undefined}
            >
              <div className={s.faqPanelInner}>
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
