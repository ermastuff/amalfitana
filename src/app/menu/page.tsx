import type { Metadata } from "next";
import MenuBrowser from "./MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Il menu della pizzeria Amalfitana: pizze classiche e speciali, ultime novità, pizze pala, calzoni, supplementi e bevande. Impasto a 48 ore, forno a legna.",
};

export default function MenuPage() {
  return <MenuBrowser />;
}
