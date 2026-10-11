/** sessionStorage flag: the intro has been played (or skipped) in this tab session. */
export const INTRO_STORAGE_KEY = "solas:intro-seen";

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    // Private mode or blocked storage: the intro will simply play again next load
  }
}
