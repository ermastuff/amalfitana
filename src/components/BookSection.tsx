import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import Flipbook from "./Flipbook";
import s from "./BookSection.module.css";

// Illustrazioni in public/assets/illustrazioni (dimensioni originali dei PNG).
const illustrations: { name: string; w: number; h: number }[] = [
  { name: "Pizza", w: 1723, h: 1467 },
  { name: "Spiga", w: 1365, h: 1467 },
  { name: "Pomodorini", w: 1723, h: 1467 },
  { name: "Basilico", w: 1488, h: 1467 },
  { name: "Provola", w: 1094, h: 792 },
  { name: "Farina", w: 1723, h: 1467 },
  { name: "Melanzana", w: 1723, h: 1467 },
  { name: "Crudo", w: 820, h: 426 },
  { name: "Radicchio", w: 1723, h: 1467 },
  { name: "Taleggio", w: 1094, h: 792 },
  { name: "Salmone", w: 1723, h: 1467 },
  { name: "Aneto", w: 1723, h: 1467 },
  { name: "Prosciutto", w: 1723, h: 1467 },
];

// Quante tessere disegnare: le eccedenti restano nascoste dall'overflow.
const TILES = 48;

export default function BookSection() {
  return (
    <section className={s.section} aria-labelledby="menu-book-title">
      <div className={s.pattern} aria-hidden="true">
        {Array.from({ length: TILES }, (_, i) => {
          const ill = illustrations[i % illustrations.length];
          const rotation = ((i * 37) % 15) - 7;
          return (
            <Image
              key={i}
              src={`/assets/illustrazioni/${ill.name}.png`}
              alt=""
              width={ill.w}
              height={ill.h}
              sizes="220px"
              className={s.tile}
              style={{ "--r": `${rotation}deg` } as CSSProperties}
            />
          );
        })}
      </div>

      <div className={s.inner}>
        <h2 id="menu-book-title" className="visually-hidden">
          Sfoglia il menu
        </h2>
        <Flipbook
          src="/assets/menu-amalfitana.pdf"
          pageWidth={306}
          pageHeight={436}
          title="Menu L'Amalfitana"
        />
      </div>

      <Link href="/pizze-gourmet" className={s.squareBtn}>
        Pizze Gourmet
      </Link>
    </section>
  );
}
