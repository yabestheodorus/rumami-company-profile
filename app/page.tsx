import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import PageOrnament from "@/components/layout/PageOrnament";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <PageOrnament />
      <Hero />
      <About />
      <Process />
      <Services />
      <CTA />
    </main>
  );
}
