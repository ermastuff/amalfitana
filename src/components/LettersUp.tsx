import { Fragment } from "react";
import s from "./LettersUp.module.css";

/**
 * Testo diviso in lettere che salgono dal basso, una alla volta: ogni parola
 * fa da finestra e le lettere ci entrano dentro. Chi lo usa anima
 * `[data-up]` da `{ yPercent: 115, y: 0 }` a `{ yPercent: 0 }` — lo zero su
 * `y` serve: GSAP legge la posizione di partenza dal CSS e senza quello le
 * lettere resterebbero giù — e mette accanto il testo intero per gli screen
 * reader.
 */
export default function LettersUp({ text }: { text: string }) {
  return text.split(" ").map((word, wi) => (
    <Fragment key={wi}>
      {wi > 0 && " "}
      <span className={s.word}>
        {Array.from(word).map((char, ci) => (
          <span key={ci} className={s.letter} data-up>
            {char}
          </span>
        ))}
      </span>
    </Fragment>
  ));
}
