import Link from "next/link";
import MutedVideo from "./MutedVideo";
import s from "./PhilosophySection.module.css";

export default function PhilosophySection() {
  return (
    <section className={s.section} aria-label="Lavora con noi">
      {/* Video a sinistra, blocco bruno a destra */}
      <div className={s.split}>
        <div className={s.videoWrap}>
          <MutedVideo
            src="/assets/hero-amalfitana.mp4"
            startAt={6}
            className={s.video}
          />
        </div>

        <div className={s.join}>
          <h2 className={s.joinTitle}>Lavora con noi!</h2>
          <p className={s.joinText}>
            Unisciti a noi nel trasmettere gioia, una pizza alla volta.
          </p>
          <Link
            href="/contatti"
            className={`oval-btn oval-btn--light ${s.joinBtn}`}
          >
            Contattaci
          </Link>
        </div>
      </div>
    </section>
  );
}
