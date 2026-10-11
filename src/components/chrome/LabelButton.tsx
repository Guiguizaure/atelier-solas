import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./LabelButton.module.css";

type Common = {
  variant?: "ink" | "paper" | "rust";
  /** Decorative icon after the text */
  icon?: ReactNode;
  /** Tighter padding under 560px (nav bar, intro bar) */
  compact?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & Omit<ComponentProps<typeof Link>, keyof Common>;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, keyof Common>;

/** Figma « Label button » (Ink / Paper / Rust): a link when given `href`, else a button. */
export function LabelButton(props: AsLink | AsButton) {
  const { variant = "ink", icon, compact, className, children, ...rest } = props;
  const cls = [
    styles.label,
    variant !== "ink" && styles[variant],
    compact && styles.compact,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <span className={styles.stitch}>
      {children}
      {icon}
    </span>
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link className={cls} {...(rest as Omit<AsLink, keyof Common>)}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as Omit<AsButton, keyof Common>)}>
      {inner}
    </button>
  );
}
