"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const hero2Ref = useRef<HTMLDivElement>(null);
  const hero3Ref = useRef<HTMLDivElement>(null);
  const heroBottomLeftRef = useRef<HTMLDivElement>(null);
  const heroBottomRightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const atelierRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let pendingIntro: (() => void) | null = null

    const ctx = gsap.context(() => {
      const playIntro = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            const commonScrollTrigger = {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            };

            if (hero3Ref.current) {
              gsap.to(hero3Ref.current, {
                yPercent: -55,
                ease: "none",
                scrollTrigger: commonScrollTrigger,
              });
            }

            if (heroBottomLeftRef.current) {
              gsap.to(heroBottomLeftRef.current, {
                yPercent: -55,
                ease: "none",
                scrollTrigger: commonScrollTrigger,
              });
            }

            if (heroBottomRightRef.current) {
              gsap.to(heroBottomRightRef.current, {
                yPercent: -95,
                ease: "none",
                scrollTrigger: commonScrollTrigger,
              });
            }
          }
        });

        if (hero2Ref.current) tl.to(hero2Ref.current, { yPercent: -25, autoAlpha: 1, duration: 0.5 }, 0.15);
        if (hero3Ref.current) tl.to(hero3Ref.current, { yPercent: -25, duration: 0.5 }, 0.15);
        if (heroBottomLeftRef.current) tl.to(heroBottomLeftRef.current, { yPercent: -25, duration: 0.5 }, 0.15);
        if (heroBottomRightRef.current) tl.to(heroBottomRightRef.current, { yPercent: -50, autoAlpha: 1, duration: 0.5 }, 0.15);

        if (atelierRef.current) {
          const split = new SplitText(atelierRef.current, { type: "chars" });
          gsap.set(split.chars, { yPercent: 25, autoAlpha: 0 });
          gsap.set(atelierRef.current, { overflow: "hidden", autoAlpha: 1 });
          tl.to(split.chars, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.06,
            ease: "power3.out",
          }, 0.15);
        }
      }

      const loaderDone = (window as unknown as { __loaderDone?: boolean }).__loaderDone
      if (loaderDone) {
        playIntro()
      } else {
        pendingIntro = playIntro
        window.addEventListener('loaderDone', playIntro, { once: true })
      }
    });

    return () => {
      if (pendingIntro) window.removeEventListener('loaderDone', pendingIntro);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background w-full min-h-screen pb-32">
      <h4 className="uppercase font-sans font-light text-center absolute top-12 left-1/2 -translate-x-1/2 max-w-2xl">Tailored Interiors For Homes & Developments <br />
        Rumami Designs, Builds, And Installs — All From Our Atelier</h4>

      <div className="relative flex flex-col font-akros top-46 leading-[1] tracking-[-0.01em] text-center left-1/2 -translate-x-1/2 text-[20cqw] font-light text-textAccent z-20">

        <div className="flex flex-col items-center relative w-fit mx-auto z-30">
          <span className="font-sans uppercase tracking-[0.5em] text-dark text-[1.2cqw] mb-4">
            Rumami
          </span>
          <div className="relative">
            <h1
              ref={atelierRef}
              className="text-textAccent font-serif font-light invisible"
              style={{ fontFeatureSettings: '"dlig" 1, "liga" 1, "swsh" 1, "salt" 1' }}
            >
              ATELIER
            </h1>
          </div>
        </div>

        <div className="relative  w-fit  mx-auto z-20">
          <div ref={hero2Ref} className="invisible">
            <Image
              src="/images/hero/hero2.jpg"
              alt=""
              width={500}
              height={1080}
              className="mx-auto object-cover w-[550px] h-[820px] translate-y-20 "
            />
          </div>
          <div ref={hero3Ref} className="absolute -bottom-25 -right-1/3 translate-y-1/4 z-20 ">
            <Image
              src="/images/hero/hero3.jpg"
              alt=""
              width={500}
              height={1080}
              className="object-cover w-[400px] h-[520px]"
            />
          </div>
        </div>

      </div>

      <div ref={heroBottomLeftRef} className="absolute -bottom-25 left-0 z-40 ">
        <Image
          src="/images/hero/hero1.jpg"
          alt=""
          width={500}
          height={1080}
          className="object-cover w-[300px] h-[650px]"
        />
      </div>
      <div ref={heroBottomRightRef} className="absolute -bottom-50 right-0 z-40 ">
        <Image
          src="/images/hero/hero1.jpg"
          alt=""
          width={500}
          height={1080}
          className="object-cover w-[220px] h-[280px]"
        />
      </div>


      {/* <div
        className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[125vw] h-120 bg-dark rounded-t-[50%]"
      /> */}
    </section>
  );
}
