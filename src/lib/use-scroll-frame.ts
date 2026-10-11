"use client";

import { useEffect, useEffectEvent } from "react";

/**
 * Runs `onFrame` once on mount, then at most once per animation frame on scroll and
 * resize. For scroll-linked drawing that writes to the DOM directly (no React state).
 */
export function useScrollFrame(onFrame: () => void) {
  const frame = useEffectEvent(onFrame);
  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          frame();
        });
    };
    frame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
}
