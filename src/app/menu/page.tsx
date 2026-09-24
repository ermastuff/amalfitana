import type { Metadata } from "next";
import MenuBrowser from "./MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Il menu de L’Amalfitana, pizzeria d’asporto a Flero: pizze classiche e speciali, ultime novità, gourmet, pizze pala, calzoni, supplementi e bevande. Impasti con biga di 24 ore.",
};

export default function MenuPage() {
  return <MenuBrowser />;
}
