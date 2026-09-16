import { Fragment } from "react";
import s from "./gourmet.module.css";

/**
 * Testo diviso in lettere, per animarle una a una. Gli span restano inline,
 * così crenatura e a capo sono quelli del font; ogni parola è un blocco che
 * non si spezza. Decorativo: chi lo usa mette accanto il testo intero per gli
 * screen reader.
 */
export default function Letters({ text }: { text: string }) {
  return text.split(" ").map((word, wi) => (
    <Fragment key={wi}>
      {wi > 0 && " "}
      <span className={s.letterWord}>
        {Array.from(word).map((char, ci) => (
          <span key={ci} className={s.letter} data-letter>
            {char}
          </span>
        ))}
      </span>
    </Fragment>
  ));
}
