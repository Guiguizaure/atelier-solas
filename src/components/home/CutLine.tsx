"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { useScrollFrame } from "@/lib/use-scroll-frame";
import styles from "./CutLine.module.css";

/**
 * « Cut here » line between two sections: the scissors cut along it as it rises
 * through the viewport (bottom edge → 35% from the top). Decorative.
 */
export function CutLine({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    const p = prefersReducedMotion()
      ? 1
      : Math.min(1, Math.max(0, (vh - el.getBoundingClientRect().top) / (vh * 0.65)));
    el.style.setProperty("--p", p.toFixed(3));
    // Blades open and close while cutting
    if (p > 0 && p < 1) el.classList.toggle(styles.snip);
  });

  return (
    <div ref={ref} className={styles.cut} aria-hidden="true">
      <div className={styles.done} />
      <span className={`mono ${styles.label}`}>Cut here · {label}</span>
      <span className={styles.scissors}>
        <svg viewBox="0 0 30 28" focusable="false">
          <g fill="none" strokeWidth="1.8" strokeLinecap="round" className="stroke-border-accent">
            <g className={`${styles.blade} ${styles.bladeA}`}>
              <circle cx="5" cy="8" r="3.6" />
              <path d="M8 9.5L28 15" />
            </g>
            <g className={`${styles.blade} ${styles.bladeB}`}>
              <circle cx="5" cy="20" r="3.6" />
              <path d="M8 18.5L28 13" />
            </g>
          </g>
        </svg>
      </span>
    </div>
  );
}
