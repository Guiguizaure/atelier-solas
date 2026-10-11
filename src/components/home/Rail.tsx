"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@/components/svg/icons";
import { GarmentOnHanger } from "@/components/svg/Garment";
import { commissionHref } from "@/config/site";
import { FABRICS } from "@/data/fabrics";
import { MODELS, formatPrice, type Model } from "@/data/models";
import { Section } from "./Section";
import styles from "./Rail.module.css";

export function Rail() {
  return (
    <Section
      id="rail"
      eyebrow="The collection"
      title="Six models on the rail"
      lead="Each model hangs here as a sample. Turn one over to read its pattern sheet: fittings, lead time and starting price."
    >
      <div className={styles.wrap}>
        <div className={styles.rod} aria-hidden="true" />
        <ul className={styles.rail}>
          {MODELS.map((m) => (
            <Garment key={m.id} model={m} />
          ))}
        </ul>
      </div>
      <p className={`mono ${styles.hint}`}>Swipe the rail · tap a garment to turn it over</p>
    </Section>
  );
}

/**
 * A garment that turns over to show its pattern sheet. The toggle covers the whole
 * card; the link on the back sits above it and only takes focus once turned over.
 * Two nested layers so the two motions never share a transform: the outer one swings
 * on hover, the inner one turns over.
 */
function Garment({ model }: { model: Model }) {
  const [flipped, setFlipped] = useState(false);
  // A click stops the swing dead; the next hover plays it again
  const [still, setStill] = useState(false);
  const fabric = FABRICS.find((f) => f.id === model.sample)!;

  return (
    <li className={styles.garment} onPointerEnter={() => setStill(false)}>
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={flipped}
        aria-label={`${model.name}, turn over to read its pattern sheet`}
        onClick={() => {
          setFlipped((f) => !f);
          setStill(true);
        }}
      />
      <div className={still ? `${styles.swing} ${styles.still}` : styles.swing}>
        <div className={flipped ? `${styles.flip} ${styles.flipped}` : styles.flip}>
          <div className={styles.face} aria-hidden="true">
            <GarmentOnHanger model={model} className={styles.drawing} />
            <span className={`mono ${styles.tag}`}>{model.name}</span>
          </div>
          <div className={`${styles.face} ${styles.back}`}>
            <span className={`mono ${styles.sheet}`}>Model {model.number} · pattern sheet</span>
            <h3 className={styles.name}>{model.name}</h3>
            <dl className={styles.facts}>
              <dt>Sample in</dt>
              <dd>
                {fabric.name}, {fabric.colour.toLowerCase()}
              </dd>
              <dt>Fittings</dt>
              <dd>{model.fittings}</dd>
              <dt>Lead time</dt>
              <dd>{model.leadWeeks} weeks</dd>
              <dt>From</dt>
              <dd>{formatPrice(model.priceFrom)}</dd>
            </dl>
            <Link
              href={commissionHref(model.id)}
              className={`mono ${styles.go}`}
              tabIndex={flipped ? undefined : -1}
            >
              Draft this pattern
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
