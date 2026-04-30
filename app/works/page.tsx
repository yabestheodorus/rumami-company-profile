import CTA from "@/components/sections/CTA";
import PageOrnament from "@/components/layout/PageOrnament";
import WorksGallery from "@/components/sections/WorksGallery";
import WorksHero from "@/components/sections/WorksHero";

export const metadata = {
  title: "Work",
  description:
    "Galeri interior custom, arsitektur, furniture, dan proses pengerjaan oleh Rumami.",
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
