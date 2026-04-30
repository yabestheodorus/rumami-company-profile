'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, SplitText);

import { connectPaths } from "@/components/constants/svgPaths";

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!connectRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      // Setup Text Animation
      const ctaTexts = gsap.utils.toArray<HTMLElement>('.cta-text');
      const split = new SplitText(ctaTexts, { type: 'chars', charsClass: 'split-char' });

      gsap.set(ctaTexts, { perspective: 600 });
      gsap.set(split.chars, { transformOrigin: '50% 50% -40px', transformStyle: 'preserve-3d' });

      gsap.from(split.chars, {
        autoAlpha: 0,
        rotationY: 90,
        z: -120,
        duration: 1.1,
        stagger: 0.045,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Setup SVG Animation
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
      <div className="max-w-[85vw] lg:max-w-7xl mx-auto w-full relative flex flex-col items-center md:items-start">
        <span className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-12 md:pl-16">
          HUBUNGI KAMI
        </span>

        <div ref={containerRef} className="relative font-serif text-[clamp(3.5rem,8vw,10rem)] leading-[0.85] tracking-[-0.02em] text-dark text-center md:text-left">
          <div className="md:translate-x-24"><span className="cta-text inline-block">LET&apos;S</span></div>
          <div className="md:translate-x-64"><span className="cta-text inline-block">WORK</span></div>
          <div className="md:translate-x-84 relative w-fit mx-auto md:mx-0">
            <span className="cta-text inline-block">TOGETHER</span>
            <svg
              ref={connectRef}
              viewBox="0 0 434.29816 129.05151"
              fill="none"
              stroke="currentColor"
              strokeWidth="5.29167"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute -bottom-10 lg:-bottom-16 left-1/2 -translate-x-1/2 text-textAccent w-[clamp(12rem,26vw,24rem)] z-10 pointer-events-none"
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

        <div className="mt-40 lg:mt-48 flex flex-col items-center md:items-start md:pl-72 gap-4 relative z-20">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 font-sans text-textAccent uppercase tracking-widest text-[0.8rem] lg:text-sm font-medium md:translate-x-36 items-center">
            <a href="https://api.whatsapp.com/send?phone=087718725531" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <span aria-hidden className="text-lg leading-none">&raquo;</span> KIRIM PESAN
            </a>
            <a href="https://api.whatsapp.com/send?phone=087718725531" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
              <span aria-hidden className="text-lg leading-none">&raquo;</span> WHATSAPP 0877-1872-5531
            </a>
          </div>

          <div className="flex gap-4 md:translate-x-42">
            <a href="https://instagram.com/rumami.ind" target="_blank" rel="noopener noreferrer" className="text-textAccent hover:opacity-70 transition-opacity">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@rumami.ind" target="_blank" rel="noopener noreferrer" className="text-textAccent hover:opacity-70 transition-opacity">
              <FaTiktok size={20} />
            </a>
          </div>

          <p className="font-sans text-dark text-lg lg:text-[1rem] md:translate-x-42 max-w-md leading-relaxed mt-8 text-center md:text-left">
            Terinspirasi oleh karya kami?<br />
            Kami akan dengan senang hati membantu Anda<br />
            mewujudkan interior impian Anda!
          </p>
        </div>
      </div>
    </section>
  )
}
