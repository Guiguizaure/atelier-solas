import type { Metadata } from "next";
import { LabelButton } from "@/components/chrome/LabelButton";
import { PaperPage } from "@/components/chrome/PaperPage";
import { ArrowLeft } from "@/components/svg/icons";
import { PatternPiece } from "@/components/svg/PatternPiece";
import styles from "./not-found.module.css";

// Next adds its own noindex here too; this one keeps the layout's « index » (after
// launch) from reaching the 404
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PaperPage>
      <div className={styles.layout}>
        <div>
          <p className={`text-accent ${styles.eyebrow}`}>Error 404</p>
          <h1 className={styles.title}>This piece is missing from the pattern</h1>
          <p className={styles.lead}>
            The page you are looking for was never cut, or has moved. The rest of the pattern is
            back at the atelier.
          </p>
          <LabelButton href="/" icon={<ArrowLeft />}>
            Back to the atelier
          </LabelButton>
        </div>
        <PatternPiece shape="pocket" marking="PIECE ?/4 · NOT FOUND" className={styles.piece} />
      </div>
    </PaperPage>
  );
}
