'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LogoSVG from "@/components/common/LogoSVG"

const MIN_VISIBLE_MS = 600

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setHidden(false);
    // Reset loader state for navigation
    (window as any).__loaderDone = false;
    const start = Date.now()

    const exit = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start))

      const t = window.setTimeout(() => {
        const container = containerRef.current
        if (!container) return

        const designs = container.querySelector<SVGSVGElement>('.loader-designs')

        const tl = gsap.timeline({
          onComplete: () => {
            setHidden(true)
          },
        })
        if (designs) tl.to(designs, { autoAlpha: 0, duration: 0.35, ease: 'power2.out' })
        tl.to(
          container,
          {
            yPercent: -100,
            duration: 1,
            ease: 'power3.inOut',
            onStart: () => {
              setTimeout(() => {
                ; (window as unknown as { __loaderDone?: boolean }).__loaderDone = true
                window.dispatchEvent(new Event('loaderDone'))
                gsap.delayedCall(0.2, () => ScrollTrigger.refresh())
              }, 200)
            }
          },
          '-=0.15'
        )
      }, wait)

      return () => window.clearTimeout(t)
    }

    let cleanup: (() => void) | undefined
    if (document.readyState === 'complete') {
      cleanup = exit()
    } else {
      const onLoad = () => { cleanup = exit() }
      window.addEventListener('load', onLoad, { once: true })
      return () => {
        window.removeEventListener('load', onLoad)
        cleanup?.()
      }
    }
    return () => cleanup?.()
  }, [pathname])

  if (hidden) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-9999 bg-dark">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <LogoSVG
          draw
          className="loader-designs draw-designs text-textAccent lg:w-48 w-32 max-w-[80vw]"
        />
      </div>
    </div>
  )
}
