import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import { Arrow } from "@/components/Icons";
import { gourmetPizzas } from "@/data/gourmet";
import { formatPrice } from "@/data/menu";
import s from "./gourmet.module.css";

export const metadata: Metadata = {
  title: "Pizze Gourmet",
  description:
    "Le pizze gourmet di Amalfitana: Costiera, Cetara, Nerano, Genovese, Tartufo e Fonduta, Delizia. Ingredienti della Costiera e abbinamenti con vini campani.",
};

export default function GourmetPage() {
  return (
    <>
      <PageHero
        tone="sea"
        eyebrow="Pizze Gourmet"
        title={
          <>
            Sei pizze <em>d&apos;autore</em>, una Costiera intera.
          </>
        }
        intro="Ingredienti che raccontano un luogo: Cetara, Nerano, Montoro, Amalfi. Ricette che cambiano con le stagioni e con l'umore di chi le fa."
      />

      <section className="section">
        <div className="container">
          <ol className={s.list}>
            {gourmetPizzas.map((pizza, i) => (
              <Reveal as="li" key={pizza.name} className={s.row}>
                <Parallax className={s.numWrap} speed={0.12}>
                  <span className={s.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Parallax>

                <div className={s.body}>
                  <p className={s.tagline}>{pizza.tagline}</p>
                  <h2 className={`h2 ${s.name}`}>{pizza.name}</h2>
                  <p className={s.story}>{pizza.story}</p>

                  <ul className={s.ingredients} aria-label="Ingredienti">
                    {pizza.ingredients.map((ing) => (
                      <li key={ing} className={s.ingredient}>
                        {ing}
                      </li>
                    ))}
                  </ul>

                  <div className={s.meta}>
                    <span className={s.price}>{formatPrice(pizza.price)}</span>
                    <span className={s.pairing}>
                      <span className={s.pairingLabel}>In abbinamento</span>
                      {pizza.pairing}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section ${s.cta}`}>
        <Reveal className={`container ${s.ctaInner}`}>
          <p className="eyebrow">Solo su prenotazione</p>
          <h2 className="h2">
            La degustazione: <em>sei pizze</em>, un tavolo, due ore.
          </h2>
          <p className="lead">
            Il venerdì e il sabato, per tavoli da 4 a 8 persone. Tutte le
            gourmet in sequenza, con i vini in abbinamento. 55 € a persona.
          </p>
          <Link href="/contatti" className="btn btn--primary">
            Prenota la degustazione <Arrow />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
