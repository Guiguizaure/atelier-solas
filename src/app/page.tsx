import { CreditLine } from "@/components/chrome/CreditLine";
import { SiteNav } from "@/components/chrome/SiteNav";
import { Hero } from "@/components/home/Hero";
import { IntroProvider, SiteGate } from "@/components/intro/IntroProvider";
import { INTRO_PREPAINT, SITE_INERT } from "@/components/intro/intro-prepaint";
import { ShirtIntro } from "@/components/intro/ShirtIntro";
import { FabricDefs } from "@/components/svg/FabricDefs";

export default function Home() {
  return (
    <IntroProvider>
      <noscript>
        <style>{"#intro{display:none}"}</style>
      </noscript>
      <ShirtIntro />
      <script dangerouslySetInnerHTML={{ __html: INTRO_PREPAINT }} />
      <SiteGate>
        <FabricDefs />
        <SiteNav />
        <main>
          <Hero />
          {/* Sections land in commits 4–8 */}
          <div id="how" className="h-[60vh]" />
        </main>
        <CreditLine className="pb-10" />
      </SiteGate>
      <script dangerouslySetInnerHTML={{ __html: SITE_INERT }} />
    </IntroProvider>
  );
}
