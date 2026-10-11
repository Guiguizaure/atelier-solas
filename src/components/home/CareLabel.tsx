import { CreditLine } from "@/components/chrome/CreditLine";
import { COMMISSIONS_OPEN } from "@/config/site";
import { CopyEmail } from "./CopyEmail";
import { ReplayButton } from "./ReplayButton";
import { Wrap } from "./Section";
import styles from "./CareLabel.module.css";

const EMAIL = "hello@ateliersolas.example";

/** Contact, as the care label sewn into every piece. */
export function CareLabel() {
  return (
    <footer id="label" aria-labelledby="label-title" className={styles.footer}>
      <Wrap>
        <div className={styles.care}>
          <div className={styles.label}>
            <div className={styles.stitch}>
              <span className={`mono ${styles.small}`}>Care label</span>
              <h2 id="label-title" className={styles.name}>
                Atelier Solas
              </h2>
              <span className={`mono ${styles.small} ${styles.ink}`}>100% made to measure</span>
              <CareIcons />
              <p className={styles.text}>Marseille, by appointment</p>
              {!COMMISSIONS_OPEN && <span className={`mono ${styles.small}`}>Commissions open soon</span>}
              <CopyEmail email={EMAIL} />
            </div>
          </div>
          <ReplayButton />
          <CreditLine />
        </div>
      </Wrap>
    </footer>
  );
}

function CareIcons() {
  return (
    <div
      className={styles.icons}
      role="img"
      aria-label="Wash at 30 degrees, iron at low heat, do not tumble dry, hand finished"
    >
      <svg viewBox="0 0 30 30" fill="none" strokeWidth="1.5" className="stroke-illustration-ink" aria-hidden="true">
        <path d="M3 8l3 17h18l3-17" />
        <path d="M3 8c3 3 6 3 8 0 2 3 6 3 8 0 2 3 5 3 8 0" />
        <text x="15" y="21" textAnchor="middle" fontSize="8" stroke="none" className="fill-illustration-ink font-mono">
          30
        </text>
      </svg>
      <svg viewBox="0 0 30 30" fill="none" strokeWidth="1.5" className="stroke-illustration-ink" aria-hidden="true">
        <path d="M4 22h22l-2-9c-1-4-4-5-8-5H9" />
        <path d="M4 22c0-5 3-9 8-9h12" />
        <circle cx="15" cy="18" r="1" className="fill-illustration-ink" />
      </svg>
      <svg viewBox="0 0 30 30" fill="none" strokeWidth="1.5" className="stroke-illustration-ink" aria-hidden="true">
        <rect x="4" y="4" width="22" height="22" />
        <circle cx="15" cy="15" r="7" />
        <path d="M4 4l22 22M26 4L4 26" />
      </svg>
      <svg viewBox="0 0 30 30" fill="none" strokeWidth="1.5" className="stroke-illustration-ink" aria-hidden="true">
        <path d="M6 24L22 8" />
        <path d="M21 9a3 3 0 1 1 4-4 3 3 0 0 1-4 4z" />
        <path d="M8 26c4-1 6-4 7-8" />
      </svg>
    </div>
  );
}
