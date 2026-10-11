"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollFrame } from "@/lib/use-scroll-frame";
import styles from "./MeasuringTape.module.css";

/** Same scale as --px-per-cm in tokens.css */
export const PX_PER_CM = 38;
/** Label sits just under its centimetre tick */
const LABEL_OFFSET = 3;

/**
 * Tape measure along the left edge of the home page. The tape runs the full height of
 * the page and scrolls natively; only the reading at mid-screen is updated on scroll.
 * Decorative (aria-hidden), hidden while the intro is on.
 */
export function MeasuringTape() {
  const tapeRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState(0);

  useEffect(() => {
    const tape = tapeRef.current;
    if (!tape) return;
    const ro = new ResizeObserver(() =>
      setMarks(Math.floor((tape.clientHeight - LABEL_OFFSET - 10) / PX_PER_CM)),
    );
    ro.observe(tape);
    return () => ro.disconnect();
  }, []);

  useScrollFrame(() => {
    if (readRef.current)
      readRef.current.textContent = `${((window.scrollY + window.innerHeight / 2) / PX_PER_CM).toFixed(1)} cm`;
  });

  return (
    <>
      <div ref={tapeRef} className={styles.tape} aria-hidden="true" data-tape>
        {Array.from({ length: marks }, (_, k) => {
          const cm = k + 1;
          return (
            <span
              key={cm}
              className={cm % 10 === 0 ? styles.ten : undefined}
              style={{ top: cm * PX_PER_CM + LABEL_OFFSET }}
            >
              {cm}
            </span>
          );
        })}
      </div>
      <div className={styles.mark} aria-hidden="true" data-tape>
        <span ref={readRef}>0.0 cm</span>
      </div>
    </>
  );
}
