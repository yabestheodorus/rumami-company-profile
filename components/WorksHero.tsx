'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { aboutPaths } from './svgPaths'

gsap.registerPlugin(SplitText)

const WorksHero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const designsRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const ctx = gsap.context(() => {
      const split = new SplitText(heading, { type: 'chars', charsClass: 'split-char' })

      gsap.set(heading, { perspective: 600, autoAlpha: 0 })
      gsap.set(split.chars, { transformOrigin: '50% 50% -40px', transformStyle: 'preserve-3d' })

      const playIntro = () => {
        gsap.set(heading, { autoAlpha: 1 })
        gsap.from(split.chars, {
          autoAlpha: 0,
          rotationY: 90,
          z: -120,
          duration: 1.1,
          stagger: 0.045,
          ease: 'back.out(1.6)',
        })
        designsRef.current?.setAttribute('data-draw', 'true')
      }

      const loaderDone = (window as unknown as { __loaderDone?: boolean }).__loaderDone
      if (loaderDone) {
        playIntro()
      } else {
        window.addEventListener('loaderDone', playIntro, { once: true })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full min-h-[90vh] bg-background flex flex-col items-center justify-center px-6 pt-40 pb-32">
      <span className="font-sans text-xs tracking-[0.3em] uppercase text-dark mb-12">
        Our Work
      </span>

      <div className="relative">
        <h1
          ref={headingRef}
          className="font-serif font-base text-dark text-center leading-[0.95] tracking-[-0.01em] text-[clamp(3rem,10vw,9rem)]"
        >
          <span className="block">SELECTED</span>
          <span className="block">PROJECTS &amp;</span>
          <span className="block">CRAFT</span>
        </h1>

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
        A curated gallery of bespoke interiors, furniture, and finishing details
        — captured in stills and motion. Every frame is a study of what Rumami
        designs, builds, and delivers.
      </p>
    </section>
  )
}

export default WorksHero
