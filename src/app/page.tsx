import { CreditLine } from "@/components/chrome/CreditLine";
import { LabelButton } from "@/components/chrome/LabelButton";
import { SiteNav } from "@/components/chrome/SiteNav";
import { FabricDefs } from "@/components/svg/FabricDefs";
import { ArrowDown, ArrowRight, Replay } from "@/components/svg/icons";
import { FABRICS, fabricFill } from "@/data/fabrics";

// Placeholder home until the intro and sections land (commits 3–8).
export default function Home() {
  return (
    <>
      <FabricDefs />
      <SiteNav />
      <main className="mx-auto max-w-[1160px] px-5 pt-32 pb-16">
        <span className="text-accent text-text-accent">Pattern sheet A</span>
        <h1 className="text-display-l">Atelier Solas</h1>
        <div className="my-8 flex flex-wrap gap-4">
          <LabelButton href="/#how" icon={<ArrowDown />}>See how it works</LabelButton>
          <LabelButton variant="paper" icon={<ArrowRight />}>Skip intro</LabelButton>
          <LabelButton variant="rust" icon={<Replay />}>Button it back up</LabelButton>
        </div>
        <ul className="flex flex-wrap gap-4">
          {FABRICS.map((f) => (
            <li key={f.id} className="grid gap-1">
              <svg width="120" height="150" aria-hidden="true">
                <rect width="120" height="150" fill={fabricFill(f.id)} />
              </svg>
              <span className="mono">{f.name}</span>
            </li>
          ))}
        </ul>
      </main>
      <CreditLine className="pb-10" />
    </>
  );
}
