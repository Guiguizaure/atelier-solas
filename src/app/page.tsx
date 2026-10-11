import { CreditLine } from "@/components/chrome/CreditLine";
import { SiteNav } from "@/components/chrome/SiteNav";
import { CutLine } from "@/components/home/CutLine";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MeasuringTape } from "@/components/home/MeasuringTape";
import { Rail } from "@/components/home/Rail";
import { Wrap } from "@/components/home/Section";
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
        <MeasuringTape />
        <main>
          <Hero />
          <Wrap>
            {/* Sections land in commits 7–8 */}
            <CutLine label="How it works" />
            <HowItWorks />
            <CutLine label="The rail" />
            <Rail />
            <CutLine label="Fabrics" />
            <div id="fabrics" className="h-[60vh]" />
            <CutLine label="Contact" />
            <div id="label" className="h-[30vh]" />
          </Wrap>
        </main>
        <CreditLine className="pb-10" />
      </SiteGate>
      <script dangerouslySetInnerHTML={{ __html: SITE_INERT }} />
    </IntroProvider>
  );
}
