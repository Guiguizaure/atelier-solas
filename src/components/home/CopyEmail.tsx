"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyEmail.module.css";

/** The address copies on click; where the clipboard is refused, it gets selected instead. */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const say = (msg: string) => {
    setStatus(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus(""), 2200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      say("Copied");
    } catch {
      const button = buttonRef.current;
      const selection = window.getSelection();
      if (button && selection) {
        const range = document.createRange();
        range.selectNodeContents(button);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      say("Selected, copy it");
    }
  };

  return (
    <p className={styles.line}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.copy}
        aria-label={`Copy the email address ${email}`}
        onClick={copy}
      >
        {email}
      </button>
      <span className={`mono ${styles.status}`} role="status">
        {status}
      </span>
    </p>
  );
}
