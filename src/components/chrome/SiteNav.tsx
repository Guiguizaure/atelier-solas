import Link from "next/link";
import { ArrowRight } from "@/components/svg/icons";
import { commissionHref } from "@/config/site";
import { LabelButton } from "./LabelButton";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#rail", label: "The rail" },
  { href: "/#fabrics", label: "Fabrics" },
  { href: "/#label", label: "Contact" },
];

/** Fixed top bar of the paper pages (home, legal notice, 404). Section links hide under 860px. */
export function SiteNav() {
  return (
    <header className={styles.nav} data-site-nav>
      <Link className={styles.brand} href="/">
        <span className={styles.mark} aria-hidden="true">
          S
        </span>
        <b className={styles.name}>Atelier Solas</b>
      </Link>
      <nav className={styles.links} aria-label="Main">
        {LINKS.map((l) => (
          <Link key={l.href} className={`mono ${styles.link}`} href={l.href}>
            {l.label}
          </Link>
        ))}
        <LabelButton href={commissionHref()} compact icon={<ArrowRight />}>
          Start your pattern
        </LabelButton>
      </nav>
    </header>
  );
}
