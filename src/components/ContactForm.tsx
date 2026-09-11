"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import s from "./ContactForm.module.css";

/**
 * Form di prenotazione. Demo senza backend: al submit mostra solo la conferma.
 * Collegare una Server Action o un'API route per l'invio reale.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div ref={ref} className={s.wrap}>
      {sent ? (
        <div className={s.success} data-success role="status">
          <p className={s.successTitle}>Grazie, richiesta ricevuta.</p>
          <p>
            Ti confermiamo il tavolo entro poche ore via email o telefono.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => setSent(false)}
          >
            Invia un&apos;altra richiesta
          </button>
        </div>
      ) : (
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.row}>
            <label className={s.field}>
              <span>Nome</span>
              <input name="nome" type="text" autoComplete="name" required />
            </label>
            <label className={s.field}>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>

          <div className={s.row}>
            <label className={s.field}>
              <span>Telefono</span>
              <input name="telefono" type="tel" autoComplete="tel" />
            </label>
            <label className={s.field}>
              <span>Persone</span>
              <select name="persone" defaultValue="2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="9+">9 o più</option>
              </select>
            </label>
          </div>

          <div className={s.row}>
            <label className={s.field}>
              <span>Data</span>
              <input name="data" type="date" required />
            </label>
            <label className={s.field}>
              <span>Orario</span>
              <input name="orario" type="time" defaultValue="20:00" required />
            </label>
          </div>

          <label className={s.field}>
            <span>Note</span>
            <textarea
              name="note"
              rows={4}
              placeholder="Allergie, seggiolone, un tavolo vista mare…"
            />
          </label>

          <div className={s.actions}>
            <button type="submit" className="btn btn--primary">
              Invia richiesta
            </button>
            <p className={s.hint}>Nessun pagamento richiesto.</p>
          </div>
        </form>
      )}
    </div>
  );
}
