'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

import { connectPaths } from "./svgPaths"; 

export default function CTA() {
  const connectRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!connectRef.current) return;
    const ctx = gsap.context(() => {
      const paths = Array.from(
        connectRef.current!.querySelectorAll<SVGPathElement>("path"),
      ).sort((a, b) => {
        const aNum = parseInt(a.dataset.order ?? "0", 10);
        const bNum = parseInt(b.dataset.order ?? "0", 10);
        return aNum - bNum;
      });

      paths.forEach((p) => {
        const len = p.getTotalLength();
        const reverse = p.dataset.reverse === "true";
        gsap.set(p, {
          // Add extra length to the gap to completely hide the linecap dot
          strokeDasharray: `${len} ${len * 2 + 10}`,
          strokeDashoffset: reverse ? -(len + 2) : len + 2,
          opacity: 0
        });
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      // Stagger both opacity and drawing perfectly in sync
      tl.set(paths, { opacity: 1, stagger: 0.1 });
      tl.to(
        paths,
        { strokeDashoffset: 0, duration: 0.3, stagger: 0.1 },
        "<"
      );

      ScrollTrigger.create({
        trigger: connectRef.current!,
        start: "top 85%",
        animation: tl,
        toggleActions: "play none none reverse",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-background px-6 py-32 flex flex-col justify-start overflow-hidden">
      <div className="max-w-[85vw] lg:max-w-7xl mx-auto w-full relative">
        <span className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-12 pl-4 lg:pl-16">
          GET IN TOUCH
        </span>

        <div className="relative font-serif text-[clamp(3.5rem,8vw,10rem)] leading-[0.85] tracking-[-0.02em] text-dark">
          <div className="translate-x-4 lg:translate-x-24">LET&apos;S</div>
          <div className="translate-x-16 lg:translate-x-64">WORK</div>
          <div className="translate-x-24 lg:translate-x-84 relative w-fit">
            TOGETHER
            <svg
              ref={connectRef}
              viewBox="0 0 434.29816 129.05151"
              fill="none"
              stroke="currentColor"
              strokeWidth="5.29167"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute -bottom-30 left-1/2 -translate-x-1/2 text-textAccent w-[clamp(15rem,32vw,32rem)] z-10 pointer-events-none"
              aria-label="Connect"
            >
              <g transform="translate(-42.067635,-28.100555)">
                {connectPaths.map((p) => (
                  <path key={p.order} data-order={p.order} data-reverse={p.reverse} d={p.d} />
                ))}
              </g>
            </svg>
          </div>
        </div>

        <div className="mt-40 lg:mt-48 pl-4 lg:pl-72 flex flex-col gap-4 relative z-20">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 font-sans text-textAccent uppercase tracking-widest text-[0.8rem] lg:text-sm font-medium translate-x-36">
            <a href="https://api.whatsapp.com/send?phone=087718725531" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <span aria-hidden className="text-lg leading-none">&raquo;</span> SEND US A MESSAGE
            </a>
            <a href="https://api.whatsapp.com/send?phone=087718725531" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <span aria-hidden className="text-lg leading-none">&raquo;</span> WHATSAPP 0877-1872-5531
            </a>
          </div>

          <div className="flex gap-4 translate-x-42 ">
            <a href="https://instagram.com/rumami.ind" target="_blank" rel="noopener noreferrer" className="text-textAccent hover:opacity-70 transition-opacity">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@rumami.ind" target="_blank" rel="noopener noreferrer" className="text-textAccent hover:opacity-70 transition-opacity">
              <FaTiktok size={20} />
            </a>
          </div>

          <p className="font-sans text-dark text-lg lg:text-[1rem] translate-x-42 max-w-md leading-relaxed mt-8">
            Inspired by our work?<br />
            We would be delighted to help you<br />
            create your dream interior!
          </p>
        </div>
      </div>
    </section>
  )
}
