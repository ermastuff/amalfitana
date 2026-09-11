import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProcessTimeline from "@/components/ProcessTimeline";
import { Arrow } from "@/components/Icons";
import s from "./filosofia.module.css";

export const metadata: Metadata = {
  title: "Filosofia",
  description:
    "La filosofia di Amalfitana: impasto a 48 ore, ingredienti DOP della Campania, forno a legna. Poche cose, fatte con calma.",
};

const pillars = [
  {
    n: "I",
    title: "L'impasto",
    text: "Farina tipo 1 macinata a pietra, idratazione al 70%, pochissimo lievito e 48 ore di attesa. Il risultato è leggero, profumato, digeribile.",
  },
  {
    n: "II",
    title: "Gli ingredienti",
    text: "Pomodoro San Marzano DOP, fiordilatte di Agerola, limoni di Amalfi IGP, alici di Cetara. Dodici produttori, tutti entro cinquanta chilometri.",
  },
  {
    n: "III",
    title: "Il fuoco",
    text: "Forno a legna di faggio e quercia, 450 gradi, novanta secondi. Il cornicione si gonfia, il fondo resta morbido, il profumo fa il resto.",
  },
];

export default function FilosofiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Filosofia"
        title={
          <>
            Poche cose, fatte con <em>calma</em>.
          </>
        }
        intro="Non abbiamo segreti. Abbiamo tempo, fuoco e produttori che conosciamo per nome."
      />

      {/* Storia */}
      <section className="section--tight">
        <div className={`container ${s.story}`}>
          <Reveal className={s.storyAside}>
            <p className="eyebrow">Da dove veniamo</p>
            <h2 className="h2">Una casa sul mare, un forno in cortile.</h2>
          </Reveal>

          <Reveal className={`prose ${s.storyText}`} delay={0.15}>
            <p className={s.dropcap}>
              L&apos;Amalfitana nasce dal forno a legna che nonna Carmela accendeva la
              domenica nel cortile di casa, tra i limoni. Non era una pizzeria:
              era il posto dove il vicinato portava l&apos;impasto da cuocere e
              restava a mangiare.
            </p>
            <p>
              Nel 1987 quel forno è diventato un locale sul lungomare. Le regole
              sono rimaste le stesse: farina buona, tempo lungo, fuoco vero. E
              una sola domanda prima di mettere un ingrediente in menu: sappiamo
              chi lo produce?
            </p>
            <p>
              Oggi siamo in dodici, tra sala e forno. Facciamo poche pizze e le
              facciamo ogni sera nello stesso modo. Se vuoi capire davvero come
              lavoriamo, chiedi di vedere l&apos;impasto: te lo mostriamo
              volentieri.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pilastri */}
      <section className="section band--sea">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">I tre pilastri</p>
            <h2 className="h2">Quello su cui non trattiamo.</h2>
          </Reveal>

          <Reveal stagger className={s.pillars}>
            {pillars.map((p) => (
              <article key={p.n} className={s.pillar} data-reveal-item>
                <span className={s.pillarNum}>{p.n}</span>
                <h3 className="h3">{p.title}</h3>
                <p className={s.pillarText}>{p.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Metodo */}
      <section className="section">
        <div className={`container ${s.process}`}>
          <Reveal className={s.processHead}>
            <p className="eyebrow">Il metodo</p>
            <h2 className="h2">
              Dall&apos;impasto al tavolo in <em>50 ore</em>.
            </h2>
            <p className="lead">Quasi tutte di attesa.</p>
          </Reveal>
          <ProcessTimeline />
        </div>
      </section>

      {/* Citazione */}
      <section className={`section ${s.quote}`}>
        <Reveal className="container">
          <blockquote className={s.blockquote}>
            <p>
              «La pizza è una cosa semplice. È proprio per questo che è
              difficile.»
            </p>
            <footer>Nonna Carmela, 1962</footer>
          </blockquote>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="section--tight">
        <Reveal className={`container ${s.cta}`}>
          <h2 className="h3">Vieni a vedere il forno acceso.</h2>
          <Link href="/contatti" className="btn btn--primary">
            Prenota un tavolo <Arrow />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
