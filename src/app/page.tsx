import Hero from "@/components/Hero";
import HomeStage from "@/components/HomeStage";
import MenuWave from "@/components/MenuWave";
import ReviewsSection from "@/components/ReviewsSection";
import s from "./home.module.css";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Tutto ciò che segue scorre sopra la hero, che resta ferma */}
      <div className={s.afterHero}>
        {/* Il racconto a schermo fisso: foto che si alternano, titolo che si
            ricompone, la strofa e infine l'invito a scaricare l'app */}
        <HomeStage />

        {/* Il menu: l'onda di foto con le liste di fianco */}
        <MenuWave />

        {/* Recensioni Google */}
        <ReviewsSection />
      </div>
    </>
  );
}
