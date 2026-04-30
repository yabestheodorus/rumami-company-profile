import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Kenali lebih dekat Rumami Interior, studio desain interior yang berfokus pada kualitas dan kepuasan pelanggan.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
