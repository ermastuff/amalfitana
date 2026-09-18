import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { gourmetPizzas } from "@/data/gourmet";
import { site } from "@/data/site";
import ChapterDivider from "@/components/ChapterDivider";
import ScrollPace from "@/components/ScrollPace";
import StoryHero from "@/components/StoryHero";
import Chapter from "./Chapter";
import s from "./gourmet.module.css";

export const metadata: Metadata = {
  title: "Pizze Gourmet",
  description:
    "Le cinque pizze gourmet de L’Amalfitana: Renana, La dolce vita, Pastorale, Moonlight e Il Canto della Terra. Farina macinata a pietra e ingredienti scelti, raccontati come una sinfonia.",
};

export default function GourmetPage() {
  return (
    <>
      {/* Scroll più lento sui racconti, più svelto tra una sezione e l'altra */}
      <ScrollPace />

      <StoryHero
        photo="/assets/Header-Gourmet.jpg"
        title="Le pizze d’autore"
        words={["Le pizze", "d’autore."]}
        current="/pizze-gourmet"
        hintHref={`#${gourmetPizzas[0].slug}`}
        hint={
          <>
            Scopri
            <br />
            le cinque pizze ↓
          </>
        }
      />

      {gourmetPizzas.map((pizza, i) => (
        <Fragment key={pizza.slug}>
          <ChapterDivider />
          <Chapter pizza={pizza} index={i} total={gourmetPizzas.length} />
        </Fragment>
      ))}

      <section className={s.closing}>
        <p className="eyebrow">Solo in pizzeria</p>
        <h2 className={`h2 ${s.closingTitle}`}>
          Cinque pizze, un’unica <em>partitura</em>.
        </h2>
        <p className="lead">
          Le trovi tutte da noi a Flero, da asporto o a domicilio. Chiama e
          ordina.
        </p>
        <div className={s.closingActions}>
          <a href={site.orderPhoneHref} className="btn btn--primary">
            Ordina ora
          </a>
          <Link href="/menu" className="text-link">
            Vedi tutto il menu
          </Link>
        </div>
      </section>
    </>
  );
}
