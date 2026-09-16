import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { gourmetPizzas } from "@/data/gourmet";
import { site } from "@/data/site";
import Chapter from "./Chapter";
import ChapterDivider from "./ChapterDivider";
import GourmetHero from "./GourmetHero";
import s from "./gourmet.module.css";

export const metadata: Metadata = {
  title: "Pizze Gourmet",
  description:
    "Le cinque pizze gourmet de L’Amalfitana: Renana, La dolce vita, Pastorale, Moonlight e Il Canto della Terra. Farina macinata a pietra e ingredienti scelti, raccontati come una sinfonia.",
};

export default function GourmetPage() {
  return (
    <>
      <GourmetHero firstId={gourmetPizzas[0].slug} />

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
