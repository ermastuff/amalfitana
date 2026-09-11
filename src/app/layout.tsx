import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/site";
import "./globals.css";

// Didot Bold per menu e titoli (font locale), Didot Italic per i corsivi.
const didot = localFont({
  src: [
    { path: "./fonts/Didot-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Didot-Italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-didot",
  display: "swap",
});

// Montserrat per i paragrafi.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${didot.variable} ${montserrat.variable}`}>
      <body>
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
