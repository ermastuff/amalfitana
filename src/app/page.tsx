import Hero from "@/components/Hero";
import StatementSection from "@/components/StatementSection";
import StorySection from "@/components/StorySection";
import MenuSlider from "@/components/MenuSlider";
import AppSection from "@/components/AppSection";
import InstagramSection from "@/components/InstagramSection";
import ReviewsSection from "@/components/ReviewsSection";
import s from "./home.module.css";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Tutto ciò che segue scorre sopra la hero, che resta ferma */}
      <div className={s.afterHero}>
        {/* Frase manifesto */}
        <StatementSection />

        {/* Immagine quadrata + descrizione */}
        <StorySection />

        {/* Slider menù: classico / gourmet */}
        <MenuSlider />

        {/* Download app */}
        <AppSection />

        {/* Follow Instagram */}
        <InstagramSection />

        {/* Recensioni Google */}
        <ReviewsSection />
      </div>
    </>
  );
}
