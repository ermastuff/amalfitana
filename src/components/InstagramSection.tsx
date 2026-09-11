import MutedVideo from "./MutedVideo";
import TextReveal from "./TextReveal";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import s from "./InstagramSection.module.css";

const instagram =
  site.social.find((so) => so.label === "Instagram")?.href ?? "#";

// Segnaposto per i reel: per ora il video della hero, in verticale,
// con partenze diverse. Sostituire con i reel reali (mp4 verticali).
const reels = [
  { src: "/assets/hero-amalfitana.mp4", startAt: 0 },
  { src: "/assets/hero-amalfitana.mp4", startAt: 12 },
  { src: "/assets/hero-amalfitana.mp4", startAt: 24 },
];

export default function InstagramSection() {
  return (
    <section className={s.section} aria-labelledby="instagram-title">
      <div className={s.grid}>
        <div>
          <Reveal>
            <a
              id="instagram-title"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={s.head}
            >
              <span className={s.headSerif}>Follow</span>
              <span className={s.headSans}>Instagram</span>
              <svg
                className={s.headArrow}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M7 17 17 7M9 7h8v8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>

          <Reveal stagger className={s.reels}>
            {reels.map((reel, i) => (
              <div key={i} className={s.reel} data-reveal-item>
                <MutedVideo
                  src={reel.src}
                  startAt={reel.startAt}
                  className={s.reelVideo}
                />
              </div>
            ))}
          </Reveal>
        </div>

        {/* Testo segnaposto animato all'entrata */}
        <div className={s.copy}>
          <Reveal>
            <p className="eyebrow">Seguici</p>
          </Reveal>
          <TextReveal
            as="h2"
            className={s.copyTitle}
            text="Dal forno al tuo feed, ogni giorno."
            delay={0.1}
          />
          <TextReveal
            className={s.copyText}
            text="Testo segnaposto. Qui racconteremo le pizze del giorno, i produttori della Costiera e quello che succede dietro il bancone. Ogni reel è un pezzo di Amalfi, girato tra il forno e il mare."
            delay={0.3}
            stagger={0.012}
          />
          <Reveal delay={0.5}>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Segui @lamalfitana
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
