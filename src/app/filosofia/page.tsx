import type { Metadata } from "next";
import Link from "next/link";
import ChapterDivider from "@/components/ChapterDivider";
import ScrollPace from "@/components/ScrollPace";
import StoryHero from "@/components/StoryHero";
import {
  bases,
  choices,
  doughs,
  intro,
  manifesto,
  manifestoLead,
  team,
} from "@/data/filosofia";
import { site } from "@/data/site";
import Deep from "./Deep";
import Faq from "./Faq";
import JoinWords from "./JoinWords";
import PhotoRail from "./PhotoRail";
import s from "./filosofia.module.css";

export const metadata: Metadata = {
  title: "Filosofia",
  description:
    "Biga di 24 ore e altre 24-48 di lievitazione, sette impasti tra cui scegliere e materie prime scelte una per una: come nascono le pizze de L’Amalfitana.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function FilosofiaPage() {
  return (
    <>
      {/* Scroll più lento sui testi, più svelto tra una sezione e l'altra */}
      <ScrollPace />

      <StoryHero
        photo="/assets/filosofia/header-filosofia.jpg"
        title="La materia prima"
        words={["La materia", "prima."]}
        current="/filosofia"
        hintHref="#impasti"
        hint={
          <>
            Scopri
            <br />
            il metodo e gli impasti ↓
          </>
        }
      />

      <ChapterDivider />

      {/* ---- Il metodo ---- */}
      <section className={`${s.section} ${s.dark} ${s.afterDivider}`}>
        <div className={s.manifesto} data-pace="slow">
          <Deep as="p" className={s.manifestoBlock} stagger={0.12}>
            {manifesto.map((line) => (
              <span key={line} className={s.manifestoLine} data-deep>
                {line}
              </span>
            ))}
          </Deep>
          <Deep as="p" className={s.manifestoLead}>
            {manifestoLead}
          </Deep>
        </div>

        <div className={s.chapter} id="impasti">
          <p className={s.eyebrow}>Il metodo</p>
          <JoinWords parts={["Im", "pasto"]} label="Impasto" />
          <ol className={s.doughs} data-pace="slow">
            {doughs.map((dough, i) => (
              <Deep as="li" key={dough.name} className={s.dough}>
                <span className={s.doughNo}>{pad(i + 1)}</span>
                <h3 className={s.doughName}>{dough.name}</h3>
                <p className={s.doughTime}>{dough.time}</p>
                <p className={s.doughText}>{dough.text}</p>
              </Deep>
            ))}
          </ol>
        </div>
      </section>

      <ChapterDivider tone="dark" />

      {/* ---- Gli impasti a scelta ---- */}
      <section className={`${s.section} ${s.light} ${s.afterDivider}`}>
        <div className={s.intro} data-pace="slow">
          {intro.map((paragraph) => (
            <Deep as="p" key={paragraph} className={s.introText}>
              {paragraph}
            </Deep>
          ))}
        </div>

        <div className={s.chapter} id="impasti-a-scelta">
          <p className={s.eyebrow}>La scelta</p>
          <JoinWords parts={["Sette", "impasti"]} label="Sette impasti" spaced />
          <ul className={s.choices} data-pace="slow">
            {choices.map((choice) => (
              <Deep as="li" key={choice.name} className={s.choice}>
                <h3 className={s.choiceName}>{choice.name}</h3>
                <p className={s.choiceNote}>{choice.note}</p>
                <p className={s.choiceText}>{choice.text}</p>
              </Deep>
            ))}
          </ul>

          <Deep as="p" className={s.bases}>
            <strong>{bases.title}.</strong> {bases.text}
          </Deep>
        </div>

        <PhotoRail />
      </section>

      <ChapterDivider />

      {/* ---- La squadra: le materie prime ---- */}
      <section
        className={`${s.section} ${s.grain} ${s.afterDivider}`}
        id="materie-prime"
      >
        <p className={s.eyebrow}>La squadra</p>
        <JoinWords parts={["Materia", "prima"]} label="Materia prima" spaced />
        <p className={s.teamLead}>
          Non abbiamo un organico da presentare: al nostro posto lavorano
          queste. Ognuna con la sua parte.
        </p>
        <ul className={s.team} data-pace="slow">
          {team.map((member) => (
            <li key={member.name} className={s.member}>
              <span className={s.memberName}>{member.name}</span>
              <span className={s.memberRole}>( {member.role} )</span>
            </li>
          ))}
        </ul>
      </section>

      <ChapterDivider tone="dark" />

      {/* ---- Domande ---- */}
      <section className={`${s.section} ${s.light} ${s.afterDivider}`}>
        <div className={s.chapter} id="domande">
          <h2 className={s.faqTitle}>Domande</h2>
          <Faq />
        </div>

        <div className={s.closing}>
          <h2 className={`h2 ${s.closingTitle}`}>
            Il resto lo racconta <em>la pizza</em>.
          </h2>
          <p className="lead">
            Biga, tempo e materie prime finiscono tutti nello stesso posto.
            Chiama e ordina: da asporto o a domicilio, a Flero.
          </p>
          <div className={s.closingActions}>
            <a href={site.orderPhoneHref} className="btn btn--primary">
              Ordina ora
            </a>
            <Link href="/menu" className="text-link">
              Vedi tutto il menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
