import type { CSSProperties } from "react";
import { PatternPiece, type PieceShape } from "@/components/svg/PatternPiece";
import { Section } from "./Section";
import styles from "./HowItWorks.module.css";

const STEPS: { shape: PieceShape; marking: string; title: string; text: string; tilt: string }[] = [
  {
    shape: "pocket",
    marking: "PIECE 1/4 · CUT 1",
    title: "Pick a model",
    text: "Six shapes to start from: a dress, a skirt, a coat, a shirt, trousers and a top.",
    tilt: "-3deg",
  },
  {
    shape: "skirt",
    marking: "PIECE 2/4 · CUT 1",
    title: "Choose the fabric",
    text: "Linen, silk, cotton or wool. Ask for up to three real swatches, free.",
    tilt: "2deg",
  },
  {
    shape: "sleeve",
    marking: "PIECE 3/4 · CUT 2",
    title: "Draft the pattern",
    text: "Send your measurements. Sarah drafts your pattern from them, piece by piece.",
    tilt: "-1.5deg",
  },
  {
    shape: "bodice",
    marking: "PIECE 4/4 · ON FOLD",
    title: "Fit and sew",
    text: "Two to four fittings in the atelier, then the final stitch.",
    tilt: "3deg",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title="Four pieces, one garment"
      lead="Every commission is drafted as a pattern from your own measurements. These are the four pieces of the process, in the order they are sewn together."
    >
      <ol className={styles.pieces}>
        {STEPS.map((s, i) => (
          <li key={s.shape} className={styles.piece} style={{ "--tilt": s.tilt } as CSSProperties}>
            <PatternPiece shape={s.shape} marking={s.marking} className={styles.drawing} />
            <span className={styles.num} aria-hidden="true">
              0{i + 1}
            </span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.text}>{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
