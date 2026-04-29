'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const MIN_VISIBLE_MS = 600

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
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
  }, [])

  if (hidden) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-9999 bg-dark">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          fill="none"
          stroke="currentColor"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}

          className="loader-designs draw-designs text-textAccent w-[20rem] max-w-[80vw]"
          data-draw="true"
        >
          <g transform="matrix(2.1923787,0,0,2.1923787,-835.04523,-335.43742)">
            <path transform="rotate(90,495.869,258.173)" strokeWidth="14" d="M 441.172465,208.464615 l 29.616545,-50.000005 108.939,-0.58303 0.24432,100.22286 0.20884,99.64884 -109.39216,0.71135 -59.23309,-100.00001 Z" pathLength={1} style={{ '--i': 0 } as any} />
            <path transform="rotate(90,496.419,261.105)" strokeWidth="14" d="M 468.54338,232.534215 l 15.09386,-28.738405 55.51999,-0.33511 0.12452,57.6049 0.10643,57.27497 -55.75094,0.40886 -30.18772,-57.47681 Z" pathLength={1} style={{ '--i': 1 } as any} />
            <line strokeWidth="14" y2="321.75562" x2="596.26697" y1="321.46909" x1="396.84003" pathLength={1} style={{ '--i': 2 } as any} />
            <path transform="rotate(104,434.641,186.545)" strokeWidth="6" d="M 430.10331,186.545245 l 0,-4.609455 9.07506,9.21891 -9.07506,0 Z" pathLength={1} style={{ '--i': 3 } as any} />
          </g>
        </svg>
      </div>
    </div>
  )
}
