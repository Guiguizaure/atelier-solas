"use client";

import { useState, type CSSProperties } from "react";
import { LabelButton } from "@/components/chrome/LabelButton";
import { ArrowRight } from "@/components/svg/icons";
import { FABRICS, type FabricId } from "@/data/fabrics";
import { Section } from "./Section";
import styles from "./SwatchBook.module.css";

// Back to front: the last swatch is on top of the fan, and selected first
const FAN: FabricId[] = ["cotton-voile", "linen-canvas", "boiled-wool", "silk-crepe", "cotton-gingham", "washed-linen"];
const SPREAD_DEG = 5;

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

export function SwatchBook() {
  const [selected, setSelected] = useState<FabricId>(FAN[FAN.length - 1]);
  const fabric = FABRICS.find((f) => f.id === selected)!;

  return (
    <Section
      id="fabrics"
      eyebrow="The swatch book"
      title="Pick from real fabric"
      lead="Twelve natural fabrics, six of them shown here. Ask for up to three swatches and we post them to you, free, before you decide."
    >
      <div className={styles.book}>
        <div
          className={styles.fan}
          role="group"
          aria-label="Fabric swatches"
          style={{ "--pinked": PINKED } as CSSProperties}
        >
          {FAN.map((id, i) => {
            const f = FABRICS.find((x) => x.id === id)!;
            return (
              <button
                key={id}
                type="button"
                className={`${styles.swatch} ${styles[id]}`}
                style={{ "--a": `${(FAN.length - 1 - i) * SPREAD_DEG}deg`, zIndex: i + 1 } as CSSProperties}
                aria-pressed={id === selected}
                aria-label={`${f.name}, ${f.colour.toLowerCase()}`}
                onClick={() => setSelected(id)}
              >
                <span className={styles.tab} aria-hidden="true">
                  {f.colour}
                </span>
              </button>
            );
          })}
        </div>

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
    </Section>
  );
}
