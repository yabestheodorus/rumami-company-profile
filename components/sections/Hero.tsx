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
                yPercent: -250,
                ease: "none",
                scrollTrigger: commonScrollTrigger,
              });
            }
          }
        });

        if (hero2Ref.current) tl.to(hero2Ref.current, { yPercent: -25, autoAlpha: 1, duration: 0.5 }, 0.15);
        if (hero3Ref.current) tl.to(hero3Ref.current, { yPercent: -25, duration: 0.5 }, 0.15);
        // if (heroBottomLeftRef.current) tl.to(heroBottomLeftRef.current, { yPercent: -25, duration: 0.5 }, 0.15);
        // if (heroBottomRightRef.current) tl.to(heroBottomRightRef.current, { yPercent: -50, autoAlpha: 1, duration: 0.5 }, 0.15);

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


      <h4 className="hidden md:block uppercase font-sans font-light text-center absolute top-4 left-1/2 -translate-x-1/2 w-full px-6 max-w-lg text-[10px] tracking-widest leading-relaxed">
        Mewujudkan Ruangan Impian Anda <br />
        Estetika Bertemu Fungsionalitas — Dikerjakan Langsung Dari Atelier Kami
      </h4>

      <div className="relative flex flex-col font-akros top-32 md:top-32 leading-[1] tracking-[-0.01em] text-center left-1/2 -translate-x-1/2 text-[25vw] md:text-[20cqw] font-light text-textAccent z-30">

        <div className="flex flex-col items-center relative w-fit mx-auto z-30">
          <span className="font-sans uppercase text-lg tracking-[0.5em] text-dark mb-4">
            Rumami
          </span>
          <div className="relative text-[20cqw] scale-y-120  ">
            <h1
              ref={atelierRef}
              className="text-textAccent font-serif font-light invisible"
              style={{ fontFeatureSettings: '"dlig" 1, "liga" 1, "swsh" 1, "salt" 1' }}
            >
              ATELIER
            </h1>
          </div>
        </div>
        <div className="relative w-fit mx-auto z-20 top-0 lg:top-20 md:top-0">
          <div ref={hero2Ref} className="invisible">
            <Image
              src="/images/hero/hero2.jpg"
              alt=""
              width={500}
              height={1080}
              className="mx-auto object-cover w-[50vw] h-[35vh] md:w-[370px] md:h-[500px] translate-y-12 md:translate-y-0 "
            />
          </div>
          <div ref={hero3Ref} className="absolute  -right-8 translate-x-1/4 -bottom-15 md:-right-10  z-20">
            <Image
              src="/images/hero/hero3.jpg"
              alt=""
              width={500}
              height={1080}
              className="object-cover w-[27vw] h-[17vh] md:w-[200px] md:h-[300px]"
            />
          </div>
        </div>
      </div>

      <div ref={heroBottomLeftRef} className="absolute -bottom-45 left-0 z-40 hidden md:block">
        <Image
          src="/images/hero/hero1.jpg"
          alt=""
          width={500}
          height={1080}
          className="object-cover md:w-[200px]  md:h-[450px]"
        />
      </div>
      <div ref={heroBottomRightRef} className="absolute -bottom-50 right-0 z-40 hidden md:block">
        <Image
          src="/images/hero/hero1.jpg"
          alt=""
          width={500}
          height={1080}
          className="object-cover w-[25vw] md:w-[125px] h-[15vh] md:h-[170px]"
        />
      </div>

      {/* Bottom Text - Mobile only, centered as per reference */}
      <div className="absolute bottom-12 left-0 right-0 px-12 md:hidden">
        <p className="font-sans text-[0.65rem] tracking-[0.15em] text-textAccent text-center leading-relaxed uppercase">
          Mewujudkan Ruangan Impian Anda <br />
          Professional Interior Design & Custom Furniture
        </p>
      </div>


      {/* <div
        className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[125vw] h-120 bg-dark rounded-t-[50%]"
      /> */}
    </section>
  );
}
