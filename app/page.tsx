import About from "@/components/About";
import Hero from "@/components/Hero";
import PageOrnament from "@/components/PageOrnament";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <PageOrnament />
      <Hero />
      <About />
      <CTA />
    </main>
  );
}
