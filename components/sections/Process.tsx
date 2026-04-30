'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger, SplitText)

const steps = [
  {
    n: '01',
    title: 'Survey & Konsultasi',
    sub: 'Mendengarkan Visi Anda',
    body: 'Diskusi mendalam mengenai kebutuhan, gaya hidup, dan anggaran Anda. Kami menawarkan survey lokasi gratis di seluruh wilayah Jabodetabek untuk memahami potensi ruang secara langsung.',
    image: '/images/works/works-07.jpg',
  },
  {
    n: '02',
    title: 'Perancangan Eksklusif',
    sub: 'Visualisasi Ruang Impian',
    body: 'Tim desain kami menyusun konsep kustom lengkap dengan moodboard dan visualisasi 3D. Kami memastikan rincian material dan estimasi biaya disusun secara transparan tanpa biaya tersembunyi.',
    image: '/images/works/works-12.jpg',
  },
  {
    n: '03',
    title: 'Produksi Mandiri',
    sub: 'Kualitas Tanpa Kompromi',
    body: 'Setiap elemen furniture diproduksi langsung di atelier kami oleh pengrajin ahli. Kami menggunakan material premium seperti Plywood Multipleks dan High-Grade PVC untuk menjamin ketahanan jangka panjang.',
    image: '/images/works/works-04.jpg',
  },
  {
    n: '04',
    title: 'Instalasi Sempurna',
    sub: 'Sentuhan Akhir yang Presisi',
    body: 'Proses pemasangan dilakukan dengan ketelitian tinggi oleh tim internal kami. Kami memastikan setiap detail terpasang sempurna, rapi, dan siap huni dengan jaminan garansi pengerjaan.',
    image: '/images/works/works-06.jpg',
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading 3D Reveal
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: 'chars', charsClass: 'split-char' })
        gsap.set(headingRef.current, { perspective: 600 })
        gsap.set(split.chars, { transformOrigin: '50% 50% -40px', transformStyle: 'preserve-3d' })

        gsap.from(split.chars, {
          autoAlpha: 0,
          rotationY: 90,
          z: -120,
          duration: 1.1,
          stagger: 0.045,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      const stepElements = gsap.utils.toArray('.process-step')

      stepElements.forEach((step: any) => {
        const img = step.querySelector('.process-image')
        const content = step.querySelector('.process-content')

        gsap.fromTo(img,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.2 },
          {
            clipPath: 'inset(0 0% 0 0)',
            scale: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        gsap.fromTo(content,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full bg-background pt-32 pb-48 overflow-hidden">
      <div className="max-w-[85vw] lg:max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-40">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-dark mb-12">
            Alur Kerja
          </span>
          <div className="relative">
            <h2
              ref={headingRef}
              className="font-serif font-base text-dark text-center leading-[0.95] tracking-[-0.01em] text-[clamp(2.5rem,6vw,7rem)]"
            >
              <span className="block">DARI KONSEP</span>
              <span className="block">HINGGA KEMILAU</span>
              <span className="block">AKHIR</span>
            </h2>
          </div>
        </div>

        {/* Steps Grid */}
        <div ref={containerRef} className="flex flex-col gap-40 md:gap-64">
          {steps.map((s, i) => (
            <article
              key={s.n}
              className={`process-step grid grid-cols-1 md:grid-cols-12 gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Image side */}
              <div className={`col-span-1 md:col-span-7 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden ${i % 2 !== 0 ? 'md:order-last' : ''
                }`}>
                <div className="process-image relative w-full h-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-dark/5" />
                </div>
              </div>

              {/* Content side */}
              <div className={`process-content col-span-1 md:col-span-5 flex flex-col ${i % 2 !== 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                <span className="font-serif text-textAccent text-[clamp(4rem,10vw,8rem)] leading-none mb-4 opacity-40">
                  {s.n}
                </span>
                <h3 className="font-serif text-dark text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-2">
                  {s.title}
                </h3>
                <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-textAccent mb-8">
                  {s.sub}
                </h4>
                <p className="font-sans text-dark/80 text-sm md:text-base leading-relaxed max-w-md">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
