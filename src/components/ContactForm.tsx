"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";
import s from "./ContactForm.module.css";

/** Il primo è quello che ci interessa di più: chi vuole lavorare con noi. */
const TOPICS = [
  "Lavora con noi",
  "Ordini e asporto",
  "Feste ed eventi",
  "Fornitori",
  "Altro",
];

/**
 * Il modulo della pagina contatti, pensato per le candidature ma buono per
 * qualsiasi messaggio. Non c'è un backend: all'invio prepariamo l'email già
 * scritta nel programma di posta di chi scrive. Per farla partire dal sito
 * basta collegare qui una Server Action.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  useGSAP(
    () => {
      if (!sent) return;
      gsap.from("[data-success]", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: ref, dependencies: [sent] },
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (name: string) => String(data.get(name) ?? "").trim();
    const body = [
      `Nome: ${get("nome")}`,
      `Email: ${get("email")}`,
      get("telefono") && `Telefono: ${get("telefono")}`,
      "",
      get("messaggio"),
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `${get("motivo")} — dal sito`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div ref={ref} className={s.wrap}>
        <div className={s.success} data-success role="status">
          <p className={s.successTitle}>Il messaggio è pronto.</p>
          <p>
            Abbiamo aperto il tuo programma di posta con tutto già scritto:
            controlla e invia. Se non si è aperto, scrivici direttamente a{" "}
            <a href={`mailto:${site.email}`} className="text-link">
              {site.email}
            </a>
            .
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => setSent(false)}
          >
            Scrivi un altro messaggio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={s.wrap}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.field}>
          <label className={s.label} htmlFor={`${uid}-motivo`}>
            ( Di cosa si tratta )
          </label>
          <div className={s.selectBox}>
            <select
              id={`${uid}-motivo`}
              name="motivo"
              className={s.select}
              defaultValue={TOPICS[0]}
              required
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <span className={s.chevron} aria-hidden="true" />
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label} htmlFor={`${uid}-messaggio`}>
            ( Il tuo messaggio )
          </label>
          <textarea
            id={`${uid}-messaggio`}
            name="messaggio"
            rows={5}
            required
            placeholder="Raccontaci chi sei e cosa sai fare."
          />
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label className={s.label} htmlFor={`${uid}-nome`}>
              ( Nome )
            </label>
            <input
              id={`${uid}-nome`}
              name="nome"
              type="text"
              autoComplete="name"
              required
            />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor={`${uid}-email`}>
              ( Email )
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label} htmlFor={`${uid}-telefono`}>
            ( Telefono, se vuoi )
          </label>
          <input
            id={`${uid}-telefono`}
            name="telefono"
            type="tel"
            autoComplete="tel"
          />
        </div>

        <button type="submit" className={`soft-btn ${s.send}`}>
          {"Invia "}
          <span className="soft-btn__rule" aria-hidden="true" />
          {" il messaggio"}
        </button>
      </form>
    </div>
  );
}
