import { About } from "@/components/about";
import { Community } from "@/components/community";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { FxLayer } from "@/components/fx-layer";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VoiceAgent } from "@/components/voice-agent";

export default function Home() {
  return (
    <>
      <FxLayer />
      <div className="site-shell">
        <SiteHeader />
        <main>
          <Hero />
          <SelectedWork />
          <Expertise />
          <Experience />
          <Community />
          <About />
          <Contact />
        </main>
        <SiteFooter />
        <VoiceAgent />
      </div>
    </>
  );
}
