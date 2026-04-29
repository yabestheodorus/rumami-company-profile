'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutPaths } from './svgPaths'
import Image from 'next/image'

gsap.registerPlugin(SplitText, ScrollTrigger)

const About = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const gridSectionRef = useRef<HTMLElement>(null)
  const smallImageRef = useRef<HTMLDivElement>(null)
  const designsRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const ctx = gsap.context(() => {
      const split = new SplitText(heading, { type: 'chars', charsClass: 'split-char' })

      gsap.set(heading, { perspective: 600 })
      gsap.set(split.chars, { transformOrigin: '50% 50% -40px', transformStyle: 'preserve-3d' })

      gsap.from(split.chars, {
        autoAlpha: 0,
        rotationY: 90,
        z: -120,
        duration: 1.1,
        stagger: 0.045,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      if (designsRef.current) {
        ScrollTrigger.create({
          trigger: designsRef.current,
          start: 'top 85%',
          onEnter: () => designsRef.current?.setAttribute('data-draw', 'true'),
        })
      }

      if (smallImageRef.current && gridSectionRef.current) {
        gsap.to(smallImageRef.current, {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: gridSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center px-6 py-32">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-dark mb-12">
        About
      </span>

      <div className="relative">
        <h2
          ref={headingRef}
          className="font-serif font-base text-dark text-center leading-[0.95] tracking-[-0.01em] text-[clamp(3rem,10vw,9rem)]"
        >
          <span className="block">HIGH END</span>
          <span className="block">LIVING &amp;</span>
          <span className="block">INTERIOR</span>
        </h2>

        <svg
          ref={designsRef}
          viewBox="0 0 125.21797 44.832558"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5873"
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeMiterlimit={1}
          className="draw-designs text-textAccent absolute -bottom-20 left-1/2 -translate-x-1/2 w-[20rem] pointer-events-none"
        >
          <g transform="translate(-3.7385049,-3.127117)">
            {aboutPaths.map((d, i) => (
              <path
                key={i}
                d={d}
                pathLength={1}
                style={{ ['--i' as string]: i }}
              />
            ))}
          </g>
        </svg>
      </div>

      <p className="font-sans text-dark text-center text-lg max-w-lg mt-32 leading-relaxed">
        Rumami offers a full range of bespoke interior design services — from
        initial concept and aesthetic counselling to coordination, execution
        and magazine-worthy finishing touches.
      </p>

      <nav className="font-sans text-textAccent uppercase tracking-[0.25em] text-sm flex gap-12 mt-20">
        <a href="#" className="flex items-center gap-2">
          <span aria-hidden>&raquo;</span> Studio
        </a>
        <a href="#" className="flex items-center gap-2">
          <span aria-hidden>&raquo;</span> Rumami
        </a>
        <a href="#" className="flex items-center gap-2">
          <span aria-hidden>&raquo;</span> Work
        </a>
      </nav>
    </section>

    {/* New Image Grid Layout */}
    <section ref={gridSectionRef} className="relative w-full bg-background px-6 pt-16 pb-64 overflow-hidden">
      <div className="max-w-[85vw] lg:max-w-6xl mx-auto relative flex justify-start lg:pl-12">
        
        {/* Large Image */}
        <div className="relative w-full md:w-[75%] aspect-[1.35] z-10">
          <Image 
            src="/images/hero/hero2.jpg" 
            alt="Interior details" 
            fill
            className="object-cover"
          />
        </div>
        
        {/* Small Overlapping Image */}
        <div ref={smallImageRef} className="absolute -bottom-32 right-0 md:-right-8 lg:-right-16 w-[65%] md:w-[40%] aspect-[3/4] z-20">
          <Image 
            src="/images/hero/hero3.jpg" 
            alt="Interior space" 
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
    </>
  )
}

export default About
