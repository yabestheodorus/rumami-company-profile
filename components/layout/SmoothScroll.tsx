'use client'

import { useLayoutEffect, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,
      effects: true,
      smoothTouch: 1,
    })
    smootherRef.current = smoother

    return () => {
      smoother.kill()
    }
  }, [])

  // Reset scroll to top on navigation
  useEffect(() => {
    if (smootherRef.current) {
      smootherRef.current.scrollTop(0)
    }
  }, [pathname])

  return (
    <div id="smooth-wrapper" ref={wrapperRef} className="w-full overflow-hidden">
      <div id="smooth-content" ref={contentRef} className="relative w-full">
        {children}
      </div>
    </div>
  )
}
