import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi Rumami Interior untuk konsultasi gratis dan survey lokasi di area Jabodetabek.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
