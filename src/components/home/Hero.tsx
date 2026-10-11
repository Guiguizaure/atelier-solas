import { LabelButton } from "@/components/chrome/LabelButton";
import { ArrowDown } from "@/components/svg/icons";
import { SHIRT } from "@/components/intro/shirt-geometry";
import styles from "./Hero.module.css";

// The title lines sit on the shirt's button rows: each undone button opens the V
// over its own line. Rows 1–4 carry the title, row 5 the call to action.
const LINES = ["Made to", "measure,", "made", "to last."];
const top = (row: number) => `${SHIRT.ROWS[row] * 100}%`;

export function Hero() {
  return (
    <div className={styles.hero} id="top">
      <h1 id="hero-title" tabIndex={-1} className={styles.title}>
        {LINES.map((line, i) => (
          <span key={line} className={i === 2 ? `${styles.line} ${styles.rust}` : styles.line} style={{ top: top(i) }}>
            {line}
          </span>
        ))}
      </h1>
      <div className={`${styles.line} ${styles.foot}`} style={{ top: top(4) }}>
        <LabelButton href="#how" icon={<ArrowDown />}>
          See how it works
        </LabelButton>
        <span className="mono text-text-secondary">Pattern sheet A · one-of-a-kind pieces</span>
      </div>
    </div>
  );
}
