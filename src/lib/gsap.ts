import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

// Registrazione unica dei plugin: importare sempre gsap da questo modulo
// nei client component, mai direttamente da "gsap".
gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

// Media query usata da gsap.matchMedia(): le animazioni girano solo
// se l'utente non ha richiesto il movimento ridotto.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
