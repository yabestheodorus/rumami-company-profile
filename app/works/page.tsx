import CTA from "@/components/CTA";
import PageOrnament from "@/components/PageOrnament";
import WorksGallery from "@/components/WorksGallery";
import WorksHero from "@/components/WorksHero";

export const metadata = {
  title: "Work — Rumami Atelier",
  description:
    "A gallery of bespoke interiors, architecture, furniture and process work by Rumami.",
};

export default function WorksPage() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <PageOrnament />
      <WorksHero />
      <WorksGallery />
      <CTA />
    </main>
  );
}
