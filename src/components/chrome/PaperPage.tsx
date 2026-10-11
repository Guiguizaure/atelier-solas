import type { ReactNode } from "react";
import { CreditLine } from "./CreditLine";
import { SiteNav } from "./SiteNav";
import styles from "./PaperPage.module.css";

/** Frame of the secondary pages (legal notice, 404): nav, content column, credit line. */
export function PaperPage({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className={styles.main}>{children}</main>
      <CreditLine className={styles.credit} />
    </>
  );
}
