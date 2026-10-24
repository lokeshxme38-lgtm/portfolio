import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { CodingDashboard } from "@/components/sections/CodingDashboard";
import { Timeline } from "@/components/sections/Timeline";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export function Home() {
  useDocumentMeta();
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <CodingDashboard />
      <Timeline />
      <Projects />
      <Services />
      <Contact />
    </>
  );
}
