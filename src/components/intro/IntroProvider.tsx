"use client";

import { createContext, use, useCallback, useEffect, useState, type ReactNode } from "react";
import { markIntroSeen } from "./intro-session";

/**
 * - "pending": server render and hydration, before we know (the pre-paint script knows)
 * - "intro": the shirt is on screen, the site is inert and locked
 * - "site": the site is usable
 */
export type IntroPhase = "pending" | "intro" | "site";

interface IntroState {
  phase: IntroPhase;
  /** Increments on each « Button it back up », so the shirt knows to close again */
  replays: number;
  finish: () => void;
  replay: () => void;
}

const IntroContext = createContext<IntroState | null>(null);

export function useIntro() {
  const ctx = use(IntroContext);
  if (!ctx) throw new Error("useIntro must be used inside <IntroProvider>");
  return ctx;
}

// html[data-intro] drives the scroll lock and hides the nav (globals.css)
const setHtmlState = (state: "on" | "seen") => {
  document.documentElement.dataset.intro = state;
};

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("pending");
  const [replays, setReplays] = useState(0);

  useEffect(() => {
    // Set by the pre-paint script on a full page load. Missing after a client-side
    // navigation to « / »: the visitor is already on the site, no intro.
    const state = document.documentElement.dataset.intro;
    if (state !== "on") {
      setHtmlState("seen");
      markIntroSeen();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads pre-paint DOM state once
    setPhase(state === "on" ? "intro" : "site");
  }, []);

  const finish = useCallback(() => {
    markIntroSeen();
    setHtmlState("seen");
    setPhase("site");
  }, []);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setHtmlState("on");
    setReplays((n) => n + 1);
    setPhase("intro");
  }, []);

  return <IntroContext value={{ phase, replays, finish, replay }}>{children}</IntroContext>;
}

/** The site behind the shirt: inert while the intro plays. */
export function SiteGate({ children }: { children: ReactNode }) {
  const { phase } = useIntro();
  return (
    // The pre-paint script may already have set `inert`: React takes it over after hydration
    <div id="site" inert={phase === "intro" ? true : undefined} suppressHydrationWarning>
      {children}
    </div>
  );
}
