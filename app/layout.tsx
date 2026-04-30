import type { Metadata } from "next";
import { DM_Sans, Ms_Madi, Noto_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import Loader from "@/components/layout/Loader";
import SideNav from "@/components/layout/SideNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import LogoSVG from "@/components/common/LogoSVG";
import "./globals.css";

const akros = localFont({
  src: "../public/font/Akros-Regular.otf",
  variable: "--font-akros",
});

const msMadi = Ms_Madi({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ['400', '700']
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['400', '500', '700']
});


export const metadata: Metadata = {
  title: {
    default: "Rumami.ind — Custom Interior & Furniture Jakarta",
    template: "Rumami.ind — %s",
  },
  description: "Wujudkan ruang impian Anda bersama Rumami Interior. Studio desain interior profesional di Jabodetabek yang memadukan estetika dengan fungsionalitas melalui solusi furniture custom berkualitas tinggi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerifDisplay.variable} ${dmSans.variable} ${akros.variable} ${msMadi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Loader />
        <span className="fixed top-7 font-semibold left-8 z-50 md:hidden font-sans text-[1rem] tracking-widest text-textAccent">©2026</span>
        <Link href="/" className="fixed top-7 left-1/2 -translate-x-1/2 md:top-6 md:left-16 md:translate-x-0 z-50 hover:opacity-70 transition-opacity">
          <LogoSVG className="text-textAccent w-[30px] h-auto md:w-[40px]" />
        </Link>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <SideNav />
      </body>
    </html>
  );
}
