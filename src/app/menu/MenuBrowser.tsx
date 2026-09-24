"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import HeroNav from "@/components/HeroNav";
import Reveal from "@/components/Reveal";
import { formatDelta, formatPrice, menuSections } from "@/data/menu";
import s from "./menu.module.css";

type ChipProps = {
  src: string;
  width: number;
  height: number;
  tone: string;
};

/** Illustrazione incastonata fra le parole della frase, come una pastiglia.
    Decorativa: la frase si legge per intero anche senza. */
function Chip({ src, width, height, tone }: ChipProps) {
  return (
    <span className={`${s.chip} ${tone}`} aria-hidden="true">
      <Image src={src} alt="" width={width} height={height} sizes="96px" />
    </span>
  );
}

/** "Menu" lettera per lettera, per animarle una a una. Didot Bold crena solo
    la coppia M-e (-0.025em, misurata sul font): spezzata in inline-block la
    parola perderebbe la crenatura, quindi la "e" la recupera col margine. */
const TITLE_LETTERS: { char: string; kern?: string }[] = [
  { char: "M" },
  { char: "e", kern: "-0.025em" },
  { char: "n" },
  { char: "u" },
];

/** Hero con foto e titolo, frase con i filtri, griglia a tre colonne dei prodotti. */
export default function MenuBrowser() {
  const heroRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(menuSections[0].id);
  const active =
    menuSections.find((sec) => sec.id === activeId) ?? menuSections[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(
            "[data-menu-photo]",
            { opacity: 0, scale: 1.08, duration: 2.2, ease: "power2.out" },
            0,
          )
          .from(
            "[data-hero-nav]",
            { y: -14, opacity: 0, duration: 0.9, stagger: 0.08 },
            0.4,
          )
          // Ogni lettera scende dall'alto mentre compare, una dopo l'altra.
          // fromTo: le lettere partono già trasparenti dal CSS, così non
          // lampeggiano visibili prima che GSAP si avvii.
          .fromTo(
            "[data-menu-letter]",
            { yPercent: -50, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.09 },
            0.55,
          );
      });
    },
    { scope: heroRef },
  );

  // Ingresso della lista: la prima volta quando arriva nel viewport, poi a
  // ogni cambio filtro (la lista è già oltre lo start, quindi parte subito).
  // `amount` distribuisce lo stagger su mezzo secondo in tutto: una sezione
  // da 37 pizze entra come una da 3, senza attese.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              once: true,
            },
          })
          .from("[data-menu-head]", { y: 18, opacity: 0, duration: 0.6 })
          .from(
            "[data-menu-card]",
            { y: 18, opacity: 0, duration: 0.6, stagger: { amount: 0.5 } },
            "-=0.4",
          );
      });
    },
    { scope: listRef, dependencies: [activeId] },
  );

  return (
    <>
      <section ref={heroRef} className={s.hero} data-hero>
        <Image
          src="/assets/menu-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className={s.photo}
          data-menu-photo
        />
        <div className={s.shade} aria-hidden="true" />

        <div className={s.heroInner}>
          {/* Stesso menu della home */}
          <HeroNav current="/menu" />

          <h1 className={s.title}>
            <span className="visually-hidden">Menu</span>
            <span aria-hidden="true">
              {TITLE_LETTERS.map(({ char, kern }) => (
                <span
                  key={char}
                  className={s.letter}
                  style={kern ? { marginLeft: kern } : undefined}
                  data-menu-letter
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>
      </section>

      <Reveal as="section" className={s.intro} stagger>
        {/* Le parole in <em> passano al serif corsivo: sono quelle che
            portano la metafora musicale. */}
        <p className={s.claim} data-reveal-item>
          Come una <em>melodia</em> avvolgente,{" "}
          <Chip
            src="/assets/illustrazioni/crop/Basilico.png"
            width={1255}
            height={909}
            tone={s.chipCream}
          />{" "}
          la pizza è la <em>sinfonia</em> dei sapori che <em>danzano</em>. Ogni
          morso è una <em>nota</em>,{" "}
          <Chip
            src="/assets/illustrazioni/crop/Pomodorini.png"
            width={1264}
            height={1100}
            tone={s.chipLemon}
          />{" "}
          ogni ingrediente gli accordi che si fondono in un’
          <em>armonia</em> unica{" "}
          <Chip
            src="/assets/illustrazioni/crop/Pizza.png"
            width={1680}
            height={971}
            tone={s.chipTerra}
          />
        </p>

        <div className={s.filters} aria-label="Filtra il menu" role="group">
          {menuSections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={s.filter}
              aria-pressed={sec.id === activeId}
              onClick={() => setActiveId(sec.id)}
              data-reveal-item
            >
              {sec.short ?? sec.title}
            </button>
          ))}
        </div>
      </Reveal>

      <section className="section--tight">
        <div ref={listRef} className="container">
          <header className={s.groupHead} data-menu-head>
            <h2 className={s.groupTitle}>{active.title}</h2>
            {active.note && <p className={s.note}>{active.note}</p>}
            {active.link && (
              <Link href={active.link.href} className={`soft-btn ${s.headLink}`}>
                {`${active.link.lead} `}
                <span className="soft-btn__rule" aria-hidden="true" />
                {` ${active.link.label}`}
              </Link>
            )}
          </header>

          <ul className={s.grid}>
            {active.items.map((item) => (
              <li key={item.name} className={s.card} data-menu-card>
                {/* La foto ce l'hanno solo le gourmet: il nome la descrive
                    già, quindi qui è decorativa. */}
                {item.image && (
                  <div className={s.shot}>
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 600px) 92vw, (max-width: 900px) 45vw, 30vw"
                      className={s.shotImg}
                    />
                  </div>
                )}
                <h3 className={s.name}>{item.name}</h3>
                {item.description && (
                  <p className={s.desc}>{item.description}</p>
                )}
                {item.price !== undefined && (
                  <p className={s.price}>
                    {active.delta
                      ? formatDelta(item.price)
                      : formatPrice(item.price)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
