import Link from "next/link";

/** Honesty line, required on every page. */
export function CreditLine({ className = "" }: { className?: string }) {
  return (
    <p className={`mono text-center text-text-secondary ${className}`}>
      Fictional product — concept and design by Guillaume Salle
      <span aria-hidden="true"> · </span>
      <Link
        href="/legal"
        className="text-text-accent underline decoration-dashed underline-offset-3"
      >
        Legal notice
      </Link>
    </p>
  );
}
