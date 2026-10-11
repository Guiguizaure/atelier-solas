"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { LabelButton } from "@/components/chrome/LabelButton";
import { ArrowRight } from "@/components/svg/icons";
import { FABRICS, type FabricId } from "@/data/fabrics";
import { Section } from "./Section";
import styles from "./SwatchBook.module.css";

// Left to right in the open fan; the leftmost lies on top
const FAN: FabricId[] = ["washed-linen", "cotton-gingham", "silk-crepe", "boiled-wool", "linen-canvas", "cotton-voile"];
const SPREAD_DEG = 8.5;

/** Pinking-shear edges: a zigzag polygon, 22 teeth per side */
const PINKED = (() => {
  const teeth = 22;
  const amp = 1.6;
  const pct = (i: number) => ((i / teeth) * 100).toFixed(2);
  const pts: string[] = [];
  for (let i = 0; i <= teeth; i++) pts.push(`${pct(i)}% ${i % 2 ? amp * 2 : 0}%`);
  for (let i = 1; i <= teeth; i++) pts.push(`${i % 2 ? 100 - amp * 2.5 : 100}% ${pct(i)}%`);
  for (let i = teeth - 1; i >= 0; i--) pts.push(`${pct(i)}% ${i % 2 ? 100 - amp * 2 : 100}%`);
  for (let i = teeth - 1; i >= 1; i--) pts.push(`${i % 2 ? amp * 2.5 : 0}% ${pct(i)}%`);
  return `polygon(${pts.join(",")})`;
})();

const fabricOf = (id: FabricId) => FABRICS.find((f) => f.id === id)!;

export function SwatchBook() {
  return (
    <Section
      id="fabrics"
      eyebrow="The swatch book"
      title="Pick from real fabric"
      lead="Twelve natural fabrics, six of them shown here. Ask for up to three swatches and we post them to you, free, before you decide."
    >
      <SwatchPicker layout="front" />
    </Section>
  );
}

/**
 * Lab variants (/lab/swatches), one to keep:
 * - "front": the chosen swatch lifts and comes to the front of the fan
 * - "aside": the chosen swatch leaves the fan and lies, large, next to the fabric card
 */
export type SwatchLayout = "front" | "aside";

/** The open fan as a radio group (arrow keys move the choice) and the fabric card. */
export function SwatchPicker({ layout }: { layout: SwatchLayout }) {
  const [selected, setSelected] = useState<FabricId>(FAN[0]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const fabric = fabricOf(selected);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = FAN.length - 1;
    const to =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % FAN.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i + last) % FAN.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (to < 0) return;
    e.preventDefault();
    setSelected(FAN[to]);
    buttons.current[to]?.focus();
  };

  return (
    <div className={`${styles.book} ${styles[layout]}`} style={{ "--pinked": PINKED } as CSSProperties}>
      <div className={styles.fan} role="radiogroup" aria-label="Fabric swatches">
        {FAN.map((id, i) => {
          const f = fabricOf(id);
          const checked = id === selected;
          return (
            <button
              key={id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              className={`${styles.swatch} ${styles[id]}`}
              style={{ "--a": `${i * SPREAD_DEG}deg`, "--z": FAN.length - i } as CSSProperties}
              aria-label={`${f.name}, ${f.colour.toLowerCase()}`}
              onClick={() => setSelected(id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className={styles.tab} aria-hidden="true">
                {f.colour}
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.detail}>
        {layout === "aside" && (
          // Keyed: each new choice lands with its own entrance
          <div key={selected} className={`${styles.big} ${styles[selected]}`} aria-hidden="true">
            <span className={styles.tab}>{fabric.colour}</span>
          </div>
        )}
        <div className={styles.card} aria-live="polite">
          <span className={`mono ${styles.number}`}>Swatch {fabric.swatchNo} of 12</span>
          <h3 className={styles.name}>{fabric.name}</h3>
          <dl className={styles.facts}>
            <dt>Colour</dt>
            <dd>{fabric.colour}</dd>
            <dt>Weight</dt>
            <dd>{fabric.weight} g/m²</dd>
            <dt>Width</dt>
            <dd>{fabric.width} cm</dd>
            <dt>Good for</dt>
            <dd>{fabric.goodFor}</dd>
          </dl>
          <LabelButton href="#label" icon={<ArrowRight />}>
            Ask for this swatch
          </LabelButton>
        </div>
      </div>
    </div>
  );
}
