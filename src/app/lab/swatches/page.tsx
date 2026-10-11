import type { Metadata } from "next";
import { Wrap } from "@/components/home/Section";
import { SwatchPicker } from "@/components/home/SwatchBook";

// Temporary test page (removed before launch): the two swatch book variants
export const metadata: Metadata = {
  title: "Lab · Swatch book variants",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    layout: "front",
    name: "A · Always open, the choice comes to the front",
    note: "The fan stays open. Hover or focus pulls a swatch a little out of the fan; the chosen one comes to the front, lifted and half straightened.",
  },
  {
    layout: "aside",
    name: "B · The choice leaves the fan",
    note: "The fan stays open. The chosen swatch is taken out (its faded place remains) and lies, large, next to the fabric card. On one column it becomes a strip above the card.",
  },
] as const;

export default function SwatchLab() {
  return (
    <main className="py-12">
      <Wrap>
        <p className="text-accent text-text-accent">Lab · not indexed</p>
        <h1 className="mt-2 mb-3 text-display-m">Swatch book: two variants</h1>
        <p className="mb-4 max-w-[62ch] text-text-secondary">
          Both: click or tap a swatch to choose it; with the keyboard, Tab into the fan then use the
          arrow keys. Stacked rather than side by side so each one shows at its real width.
        </p>
        {VARIANTS.map((v) => (
          <section key={v.layout} aria-labelledby={`lab-${v.layout}`} className="border-t border-dashed border-border-accent pt-8 pb-16">
            <h2 id={`lab-${v.layout}`} className="mb-2 text-title">
              {v.name}
            </h2>
            <p className="mb-10 max-w-[62ch] text-body-s text-text-secondary">{v.note}</p>
            <SwatchPicker layout={v.layout} />
          </section>
        ))}
      </Wrap>
    </main>
  );
}
