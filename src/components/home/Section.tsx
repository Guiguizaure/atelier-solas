import type { ReactNode } from "react";
import styles from "./Section.module.css";

/** Content column of the home page, clear of the measuring tape. */
export function Wrap({ children }: { children: ReactNode }) {
  return <div className={styles.wrap}>{children}</div>;
}

/** A home section: eyebrow, title, lead paragraph, then its content. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <p className={`text-accent ${styles.eyebrow}`}>{eyebrow}</p>
      <h2 id={`${id}-title`} className={styles.title}>
        {title}
      </h2>
      <p className={styles.lead}>{lead}</p>
      {children}
    </section>
  );
}
