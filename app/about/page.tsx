"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import PageOrnament from "@/components/PageOrnament";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLElement>(null);
  const smallLeftImageRef = useRef<HTMLDivElement>(null);
  const smallMiddleImageRef = useRef<HTMLDivElement>(null);
  const aboutSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let pendingIntro: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // 1. Header Intro Animation
      const playIntro = () => {
        const tl = gsap.timeline({ delay: 0.6 }); // Keep the slight delay for the page transition

        if (headerRef.current) {
          const split = new SplitText(headerRef.current, {
            type: "lines,chars",
            charsClass: "split-char",
            linesClass: "split-line",
          });
          gsap.set(headerRef.current, { perspective: 600, autoAlpha: 1 });
          gsap.set(split.chars, { transformOrigin: "50% 50% -40px", transformStyle: "preserve-3d" });

          tl.from(split.chars, {
            autoAlpha: 0,
            rotationY: 90,
            z: -120,
            duration: 1.1,
            stagger: { each: 0.045, from: "start" },
            ease: "back.out(1.6)",
          });
        }

        if (aboutSvgRef.current) {
          const paths = Array.from(
            aboutSvgRef.current.querySelectorAll<SVGPathElement>("path"),
          ).sort((a, b) => {
            const aNum = parseInt(a.dataset.order ?? "0", 10);
            const bNum = parseInt(b.dataset.order ?? "0", 10);
            return aNum - bNum;
          });

          if (paths.length) {
            paths.forEach((p) => {
              const len = p.getTotalLength();
              const reverse = p.dataset.reverse === "true";
              gsap.set(p, {
                // Add extra length to the gap to completely hide the linecap dot
                strokeDasharray: `${len} ${len * 2 + 10}`,
                strokeDashoffset: reverse ? -(len + 2) : len + 2,
                opacity: 0,
              });
            });
            gsap.set(aboutSvgRef.current, { autoAlpha: 1 });

            // Start both stagger animations at the exact same timeline position
            tl.set(paths, { opacity: 1, stagger: 0.1 }, "-=1.0");
            tl.to(
              paths,
              {
                strokeDashoffset: 0,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.1,
              },
              "<", // "<" means start at the EXACT same time as the previous animation
            );
          }
        }
      };

      const loaderDone = (window as unknown as { __loaderDone?: boolean }).__loaderDone;
      if (loaderDone) {
        playIntro();
      } else {
        pendingIntro = playIntro;
        window.addEventListener('loaderDone', playIntro, { once: true });
      }

      // 2. Parallax: Left Portrait Image
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 3. Parallax: Image Grid Section
      if (gridSectionRef.current) {
        if (smallLeftImageRef.current) {
          gsap.to(smallLeftImageRef.current, {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: gridSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
        if (smallMiddleImageRef.current) {
          gsap.to(smallMiddleImageRef.current, {
            yPercent: 35,
            ease: "none",
            scrollTrigger: {
              trigger: gridSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }

      // 4. Footer Text Reveal
      if (footerRef.current) {
        const splitFooter = new SplitText(footerRef.current, { type: "chars" });
        gsap.set(footerRef.current, { autoAlpha: 1 });

        gsap.from(splitFooter.chars, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        });
      }
    });

    return () => {
      if (pendingIntro) window.removeEventListener('loaderDone', pendingIntro);
      ctx.revert();
    };
  }, []);

  return (
    <main className="relative flex flex-col min-h-screen bg-background text-dark pb-24 overflow-hidden">
      <PageOrnament />

      {/* Header Section */}
      <section className="relative w-full pt-40 pb-20 flex flex-col items-center justify-center px-6 text-center z-10">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-12">
          RUMAMI
        </span>

        <h1 className="relative font-serif text-[clamp(4rem,10vw,11rem)] leading-[0.85] tracking-[-0.02em] uppercase max-w-6xl mx-auto flex flex-col items-center">
          <div ref={headerRef} className="invisible text-center">
            <span className="block">ESTEEMED</span>
            <span className="block">INTERNATIONAL</span>
            <span className="block">DESIGNER</span>
          </div>
          <svg
            ref={aboutSvgRef}
            viewBox="0 0 115.20968 49.468637"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="invisible absolute -bottom-40 left-1/2 -translate-x-1/2 -translate-y-10 -rotate-6 text-textAccent w-[clamp(15rem,30vw,32rem)] z-10 pointer-events-none"
            aria-label="About"
          >
            <g transform="translate(-8.0005867,-1.9281062)">
              <path
                data-order="2"
                d="M 40.837283,30.322973 C 45.013314,24.417764 55.82241,5.4295785 62.134192,2.4842238 54.338416,11.651976 54.316241,25.233136 53.072481,30.12676"
              />
              <path
                data-order="6"
                d="m 100.80667,21.094847 c -7.03831,12.27526 -5.55822,32.467866 10.80995,-2.222281 0.64416,-1.365224 -7.71592,17.479309 -1.69987,19.966075 4.1615,1.720171 6.47425,-18.854837 8.81413,-25.024379 0.70298,-1.853531 -9.94783,37.253193 1.44459,21.334893"
              />
              <path
                data-order="1"
                data-reverse='true'
                d="M 41.360687,29.638042 C 36.266018,37.106178 30.340172,46.941344 20.819536,50.079387 5.5662484,55.106926 6.9984374,34.056783 12.055475,26.171292 c 3.310539,-5.162157 7.982385,-9.232786 14.272683,-9.356152 5.815761,-0.114059 7.528417,3.239184 6.059482,8.80529"
              />
              <path
                data-order="4"
                data-reverse="true"

                d="M 98.31388,26.717958 C 93.157252,40.212265 81.028599,30.044676 83.898347,23.416982 85.014888,20.838329 86.001536,18.682771 89.126435,17.717515 96.52891,15.430953 96.262,24.463848 94.59935,28.925602 94.14365,30.14847 93.432171,33.1357 93.432171,33.1357"
              />
              <path
                data-order="3"
                d="m 53.143451,29.708822 c -0.707787,3.377232 -1.063455,9.391526 1.327979,12.404738 5.456848,6.875644 5.685603,-18.122967 11.0384,-30.235644 C 69.419971,3.0297772 73.473409,1.0935129 70.198382,4.8160639 63.755676,12.13915 60.340613,34.649839 60.340613,34.649839 59.476792,33.427963 77.708427,7.6983092 76.556779,24.948773 c -1.761586,26.3867 -44.496582,11.11148 6.096712,1.287222"
              />
              <path
                data-order="7"
                data-reverse="true"
                d="m 39.142491,27.526906 c 10.325235,0.513812 7.840972,0.252634 18.372671,1.550499"
              />
              <path
                data-order="5"
                data-reverse="true"
                d="m 84.584045,21.487756 c -2.83331,9.070011 -4.585078,13.844389 -1.735569,16.012335 3.067203,2.333567 9.281134,-1.831797 10.493953,-4.355257"
              />
              <path
                data-order="8"
                data-reverse="true"
                d="m 113.2885,19.661516 c 5.04021,-0.03158 5.0738,-0.04787 9.36556,0.149065"
              />
            </g>
          </svg>
        </h1>

        <p className="font-sans text-dark text-base md:text-[1.1rem] max-w-2xl mt-32 leading-relaxed text-center">
          Based in Antwerp, Belgium, Rumami Interiors is a high-end interior design studio<br className="hidden md:block" />
          offering a full range of bespoke interior design services<br className="hidden md:block" />
          aimed at a discerning and sophisticated international clientele.<br className="hidden md:block" />
          Projects range from private residences and real-estate developments<br className="hidden md:block" />
          to commercial spaces, hotels and yachts.
        </p>

        <div className="mt-32 flex items-center justify-center w-full max-w-2xl gap-8">
          <div className="h-[1px] bg-textAccent/40 flex-1"></div>
          <span className="font-sans text-xs tracking-[0.15em] uppercase text-textAccent font-medium">
            (WHAT WE DO)
          </span>
          <div className="h-[1px] bg-textAccent/40 flex-1"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative w-full max-w-[90vw] lg:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 px-6 z-10 mt-20">

        {/* Left Column: Image */}
        <div className="col-span-1 md:col-span-5 flex flex-col items-start overflow-hidden">
          <div ref={portraitRef} className="relative w-full aspect-[3/4] scale-[1.15]">
            <Image
              src="/images/hero/hero1.jpg"
              alt="Rumami Portrait"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Middle Column: Text */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-8 font-sans text-dark text-[0.95rem] md:text-base leading-[1.8] pt-2">
          <p>
            Rumami Interiors was established in 2019 by Dutch interior designer Pieter Elzenga who acquired his extensive background in design from studying in London and from working on numerous luxury projects all around the world - from New York to London, Miami to Marbella, Dubai to Bali.
          </p>
          <p>
            Pieter started his career working for high-end retail brands where he honed his passion for design and styling. In 2006 he joined the company of internationally acclaimed interior designer Eric Kuster and was instrumental in the company&apos;s European expansion. In 2010 he set up and managed the branch in Belgium and in 2019, backed up by a loyal team of dedicated professionals, he took over the Antwerp-based studio and showroom and relaunched it as Rumami Interiors while remaining a premium re-seller of Eric Kuster&apos;s label Metropolitan Luxury.
          </p>
          <p>
            The aesthetic of the &apos;Rumami project&apos; is to create a contemporary yet timeless luxurious atmosphere with an emphasis on premium-quality fabrics in soothing nature tones reminiscent of the 5-star hotel experience. Each project, however big or small, is the result of thematic research based on the client&apos;s wishes, the location and the cultural environment, bringing together French savoir vivre, Italian design virtuosity and American functionality tweaked with touches from across the globe inspired by Pieter&apos;s many travels.
          </p>
        </div>

        {/* Right Column: Sticky Navigation */}
        <div className="col-span-1 md:col-span-2 hidden md:block">
          <div className="sticky top-32 flex flex-col gap-3 font-sans text-[0.65rem] tracking-[0.15em] uppercase font-bold text-dark pt-2">
            <Link href="/" className="hover:text-textAccent transition-colors">HOME</Link>
            <Link href="#" className="hover:text-textAccent transition-colors">STUDIO</Link>
            <div className="flex items-center gap-2 text-textAccent">
              <span aria-hidden>&raquo;</span> RUMAMI
            </div>
            <Link href="#" className="hover:text-textAccent transition-colors">WORK</Link>
            <Link href="#" className="hover:text-textAccent transition-colors">CONTACT</Link>
            <Link href="#" className="hover:text-textAccent transition-colors">WEBSHOP</Link>
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section ref={gridSectionRef} className="relative w-full max-w-[90vw] lg:max-w-6xl mx-auto px-6 mt-40 z-10 pb-32 overflow-visible">
        <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
          {/* Top Left Small Image */}
          <div ref={smallLeftImageRef} className="absolute top-0 md:top-[10%] left-0 md:left-[5%] w-[40%] md:w-[25%] aspect-square z-10 shadow-xl">
            <Image src="/images/hero/hero2.jpg" alt="Detail 1" fill className="object-cover" />
          </div>

          {/* Top Middle Small Image */}
          <div ref={smallMiddleImageRef} className="absolute top-[-10%] md:top-[-5%] left-[50%] -translate-x-1/2 w-[35%] md:w-[20%] aspect-[3/4] z-30 shadow-2xl">
            <Image src="/images/hero/hero3.jpg" alt="Detail 2" fill className="object-cover" />
          </div>

          {/* Main Large Image */}
          <div className="absolute top-[20%] md:top-[15%] right-0 md:right-[5%] w-[80%] md:w-[65%] aspect-[1.2] md:aspect-[1.5] z-20 shadow-lg">
            <Image src="/images/hero/hero1.jpg" alt="Detail 3" fill className="object-cover object-[center_30%]" />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative w-full mt-24 flex flex-col items-center px-6 z-10">
        <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-dark mb-6">
          VIEW PROJECTS
        </span>
        <h2 ref={footerRef} className="invisible font-serif text-[clamp(5rem,18vw,20rem)] leading-none text-textAccent tracking-[-0.02em] overflow-hidden py-4">
          WORK
        </h2>

        <div className="w-full max-w-xl h-[1px] bg-textAccent/40 mt-12 mb-16"></div>

        <div className="flex flex-col items-center gap-3 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-textAccent text-center max-w-2xl leading-relaxed">
          <p>WORLDWIDE <span className="mx-2 font-serif text-[0.8rem]">&oplus;</span> TURNKEY INTERIOR PROJECTS</p>
          <p>RUMAMI INTERIORS IS A PREMIUM RE-SELLER OF METROPOLITAN LUXURY</p>
          <p>TERMS &amp; CONDITIONS <span className="mx-2">•</span> TERMS &amp; CONDITIONS B2B <span className="mx-2">•</span> PRIVACY POLICY <span className="mx-2">•</span> SITE BY RUMAMI</p>
        </div>
      </section>

    </main>
  );
}
