"use client";

import { useEffectEvent, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { LabelButton } from "@/components/chrome/LabelButton";
import { ArrowRight } from "@/components/svg/icons";
import { useIntro } from "./IntroProvider";
import { SHIRT, collectShirt } from "./shirt-geometry";
import { ShirtMotion } from "./shirt-motion";
import styles from "./ShirtIntro.module.css";

const COUNT = SHIRT.ROWS.length;
const NONE = SHIRT.ROWS.map(() => false);
const ALL = SHIRT.ROWS.map(() => true);
/** Pause between the last button and the full opening (prototype) */
const OPEN_DELAY_MS = 420;

const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Remounted on each replay, so every replay starts from a clean state. */
export function ShirtIntro() {
  const { replays } = useIntro();
  return <Shirt key={replays} replay={replays > 0} />;
}

function Shirt({ replay }: { replay: boolean }) {
  const { phase, finish } = useIntro();
  const rootRef = useRef<HTMLDivElement>(null);
  const motion = useRef<ShirtMotion | null>(null);
  const openTimer = useRef(0);
  // The ref is the source of truth (two clicks can land before React re-renders),
  // the state mirrors it for rendering.
  const undoneRef = useRef<boolean[]>(NONE);
  const [undone, setUndone] = useState<boolean[]>(NONE);
  const [opening, setOpening] = useState(false);
  const active = phase === "intro";

  const unbutton = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    if (undoneRef.current[i] || undoneRef.current.every(Boolean)) return;
    const next = undoneRef.current.map((u, j) => u || j === i);
    undoneRef.current = next;
    setUndone(next);
    motion.current?.setUndone(next);
    if (next.every(Boolean)) {
      setOpening(true);
      openTimer.current = window.setTimeout(
        () => motion.current?.openFully(),
        prefersReducedMotion() ? 0 : OPEN_DELAY_MS,
      );
    } else if (document.activeElement === e.currentTarget) {
      // Keep keyboard focus on the shirt: next fastened button
      rootRef.current
        ?.querySelectorAll<HTMLButtonElement>('[data-part="button"]')
        [next.indexOf(false)]?.focus();
    }
  };

  const skip = () => {
    window.clearTimeout(openTimer.current);
    undoneRef.current = ALL;
    setUndone(ALL);
    setOpening(true);
    motion.current?.setUndone(ALL);
    motion.current?.openFully();
  };

  const onFinished = useEffectEvent(() => {
    // Keyboard users land on the page title rather than on <body>
    const hadFocus = rootRef.current?.contains(document.activeElement);
    finish();
    if (hadFocus) requestAnimationFrame(() => document.getElementById("hero-title")?.focus());
  });
  const onEscape = useEffectEvent(skip);

  // Start (first load or « Button it back up »), resize, Escape. Layout effect: on a
  // replay the shirt is drawn before the browser paints the remounted, empty SVG.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!active || !root) return;
    const els = collectShirt(root);
    const m = new ShirtMotion(els, prefersReducedMotion(), () => onFinished());
    motion.current = m;

    const layout = () => {
      // Hiding the intro at the end fires the observer with a 0×0 box: keep the last size
      if (!root.clientWidth || !root.clientHeight) return;
      const geo = m.layout(root.clientWidth, root.clientHeight);
      document.documentElement.style.setProperty("--vh", `${geo.H}px`);
    };
    layout();
    if (replay) {
      m.closeFromOpen();
      els.buttons[0]?.focus({ preventScroll: true });
    }

    const ro = new ResizeObserver(layout);
    ro.observe(root);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(openTimer.current);
      m.destroy();
      motion.current = null;
    };
  }, [active, replay]);

  const count = undone.filter(Boolean).length;
  const next = undone.indexOf(false);

  return (
    <div
      id="intro"
      ref={rootRef}
      className={styles.intro}
      role="dialog"
      aria-modal="true"
      aria-label="Unbutton the shirt to enter the site"
      aria-describedby="intro-hint"
      hidden={phase === "site"}
    >
      <svg data-part="svg" className={styles.shirt} aria-hidden="true" focusable="false" suppressHydrationWarning>
        <defs>
          <pattern id="linen" width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" className="fill-shirt-linen" />
            <rect width="2" height="18" fillOpacity=".55" className="fill-shirt-stripe" />
            <rect x="9" width="1" height="18" fillOpacity=".5" className="fill-shirt-weave" />
            <rect y="6" width="18" height="1" fillOpacity=".05" className="fill-white" />
            <rect y="13" width="18" height="1" fillOpacity=".05" className="fill-illustration-ink" />
          </pattern>
          <pattern id="linen-collar" width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" className="fill-shirt-collar" />
            <rect width="2" height="18" fillOpacity=".4" className="fill-shirt-stripe" />
            <rect x="9" width="1" height="18" fillOpacity=".5" className="fill-shirt-collar-weave" />
          </pattern>
          <filter id="lift" x="-20%" y="-5%" width="140%" height="110%">
            <feDropShadow dx="4" dy="0" stdDeviation="5" floodOpacity=".38" style={{ floodColor: "var(--color-illustration-ink)" }} />
          </filter>
        </defs>
        <path data-part="rfab" fill="url(#linen)" suppressHydrationWarning />
        <path data-part="rst" className={styles.stitch} suppressHydrationWarning />
        <path data-part="rst2" className={styles.stitch} suppressHydrationWarning />
        <g data-part="pocket" suppressHydrationWarning>
          <path data-part="pocket-body" fill="url(#linen)" className={styles.pocketEdge} suppressHydrationWarning />
          <path data-part="pocket-stitch" className={styles.pocketStitch} suppressHydrationWarning />
          <path data-part="pocket-hem" className={styles.pocketStitch} suppressHydrationWarning />
          <text data-part="pocket-mark" textAnchor="middle" className={styles.pocketMark} suppressHydrationWarning>
            S
          </text>
        </g>
        <path data-part="rcol" filter="url(#lift)" className={styles.collar} suppressHydrationWarning />
        <path data-part="lfab" fill="url(#linen)" filter="url(#lift)" suppressHydrationWarning />
        <path data-part="lst" className={styles.stitch} suppressHydrationWarning />
        <path data-part="lst2" className={styles.stitch} suppressHydrationWarning />
        <g>
          {SHIRT.ROWS.map((_, i) => (
            <path key={i} data-part="hole" className={styles.hole} suppressHydrationWarning />
          ))}
        </g>
        <path data-part="lcol" filter="url(#lift)" className={styles.collar} suppressHydrationWarning />
      </svg>

      <div className={styles.bar}>
        <div className={styles.wordmark}>
          <b>Atelier Solas</b>
          <span>Made to measure · Marseille</span>
        </div>
        <LabelButton variant="paper" compact onClick={skip} icon={<ArrowRight />}>
          Skip intro
        </LabelButton>
      </div>

      {SHIRT.ROWS.map((_, i) => (
        <button
          key={i}
          type="button"
          data-part="button"
          className={[styles.button, undone[i] && styles.undone, i === next && !opening && styles.next]
            .filter(Boolean)
            .join(" ")}
          aria-label={`Unbutton button ${i + 1} of ${COUNT}`}
          aria-disabled={undone[i] || undefined}
          tabIndex={undone[i] ? -1 : 0}
          onClick={(e) => unbutton(i, e)}
          suppressHydrationWarning
        >
          <ButtonFace />
        </button>
      ))}

      <div className={`mono ${styles.hint}`} aria-hidden="true">
        <span>
          <span>{opening ? "Opening" : "Undo the buttons to come in"}</span>
          <span className={styles.count}>
            {count} / {COUNT}
          </span>
        </span>
      </div>
      <p id="intro-hint" className="sr-only" aria-live="polite">
        {opening
          ? "All buttons undone. Opening."
          : count === 0
            ? `Undo the ${COUNT} buttons to come in, in any order, or skip the intro.`
            : `${count} of ${COUNT} buttons undone.`}
      </p>
    </div>
  );
}

function ButtonFace() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" focusable="false">
      <circle cx="18" cy="18" r="11" fill="none" strokeOpacity=".12" className="stroke-illustration-ink" />
      <g className="fill-button-thread">
        <circle cx="14.5" cy="14.5" r="1.7" />
        <circle cx="21.5" cy="14.5" r="1.7" />
        <circle cx="14.5" cy="21.5" r="1.7" />
        <circle cx="21.5" cy="21.5" r="1.7" />
      </g>
      <path
        d="M14.5 14.5L21.5 21.5M21.5 14.5L14.5 21.5"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="stroke-illustration-rust"
      />
    </svg>
  );
}
