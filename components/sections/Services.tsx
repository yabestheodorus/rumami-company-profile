'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const materials = ['Plywood Multipleks', 'PVC Board', 'HMR', 'Blokboard']
const areas = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Serpong']

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return
      const blocks = gridRef.current.querySelectorAll<HTMLElement>('[data-info-block]')
      gsap.from(blocks, {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 z-10 py-32"
    >
      <div className="max-w-[85vw] lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-dark mb-12">
            Layanan Kami
          </span>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
        >
          <div data-info-block className="md:col-span-3 flex flex-col gap-5">
            <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-dark/55">
              Material
            </span>
            <h3 className="font-serif text-2xl text-dark leading-tight">
              Pilihan material premium
            </h3>
            <ul className="font-sans text-sm text-dark/75 flex flex-col gap-2">
              {materials.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-textAccent"
                    aria-hidden
                  />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div data-info-block className="md:col-span-5 flex flex-col gap-5 border-t md:border-t-0 md:border-l border-dark/10 pt-12 md:pt-0 md:pl-12">
            <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-dark/55">
              Cakupan Wilayah
            </span>
            <h3 className="font-serif text-2xl text-dark leading-tight">
              Melayani Jabodetabek
            </h3>
            <ul className="font-sans text-sm text-dark/75 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li
                  key={a}
                  className="border border-dark/20 px-3 py-1 tracking-wide"
                >
                  {a}
                </li>
              ))}
            </ul>
            <p className="font-sans text-xs text-dark/55 leading-relaxed mt-2">
              Survey lokasi gratis untuk klien di area Jabodetabek dan sekitarnya.
            </p>
          </div>

          <div data-info-block className="md:col-span-4 flex flex-col gap-5 border-t md:border-t-0 md:border-l border-dark/10 pt-12 md:pt-0 md:pl-12">
            <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-dark/55">
              Komitmen Kami
            </span>
            <h3 className="font-serif text-2xl text-dark leading-tight">
              Tanpa biaya awal
            </h3>
            <div className="font-sans text-sm text-dark/75 flex flex-col gap-3 leading-relaxed">
              <p>
                <span className="text-textAccent">✓</span> Gratis survey & konsultasi
              </p>
              <p>
                <span className="text-textAccent">✓</span> Custom furniture mulai dari Rp 2.000.000/meter
              </p>
              <p>
                <span className="text-textAccent">✓</span> Garansi pengerjaan & finishing rapi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
