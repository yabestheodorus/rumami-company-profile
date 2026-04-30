'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import PageOrnament from '@/components/layout/PageOrnament'
import { connectPaths } from '@/components/constants/svgPaths'

gsap.registerPlugin(SplitText, ScrollTrigger)

const WHATSAPP_NUMBER = '0877-1872-5531'
const WHATSAPP_LINK = 'https://api.whatsapp.com/send?phone=6287718725531'
const INSTAGRAM_LINK = 'https://instagram.com/rumami.ind'
const TIKTOK_LINK = 'https://www.tiktok.com/@rumami.ind'

const channels = [
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: WHATSAPP_NUMBER,
    helper: 'Respon paling cepat — chat langsung tim kami',
    href: WHATSAPP_LINK,
  },
  {
    icon: FaInstagram,
    label: 'Instagram',
    value: '@rumami.ind',
    helper: 'Lihat update karya & DM untuk konsultasi singkat',
    href: INSTAGRAM_LINK,
  },
  {
    icon: FaTiktok,
    label: 'TikTok',
    value: '@rumami.ind',
    helper: 'Behind the scenes, proses, dan transformasi ruang',
    href: TIKTOK_LINK,
  },
]

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const ornamentRef = useRef<SVGSVGElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)

  const channelsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let pendingIntro: (() => void) | null = null

    const ctx = gsap.context(() => {
      const playIntro = () => {
        const tl = gsap.timeline({ delay: 0.6 })

        if (eyebrowRef.current) {
          tl.from(eyebrowRef.current, {
            autoAlpha: 0,
            y: 12,
            duration: 0.7,
            ease: 'power2.out',
          }, 0)
        }

        if (headerRef.current) {
          const split = new SplitText(headerRef.current, {
            type: 'lines,chars',
            charsClass: 'split-char',
            linesClass: 'split-line',
          })
          gsap.set(headerRef.current, { perspective: 600, autoAlpha: 1 })
          gsap.set(split.chars, {
            transformOrigin: '50% 50% -40px',
            transformStyle: 'preserve-3d',
          })

          tl.from(split.chars, {
            autoAlpha: 0,
            rotationY: 90,
            z: -120,
            duration: 1.1,
            stagger: { each: 0.045, from: 'start' },
            ease: 'back.out(1.6)',
          }, 0.15)
        }

        if (ornamentRef.current) {
          const paths = Array.from(
            ornamentRef.current.querySelectorAll<SVGPathElement>('path'),
          ).sort((a, b) => {
            const aNum = parseInt(a.dataset.order ?? '0', 10)
            const bNum = parseInt(b.dataset.order ?? '0', 10)
            return aNum - bNum
          })

          paths.forEach((p) => {
            const len = p.getTotalLength()
            const reverse = p.dataset.reverse === 'true'
            gsap.set(p, {
              strokeDasharray: `${len} ${len * 2 + 10}`,
              strokeDashoffset: reverse ? -(len + 2) : len + 2,
              opacity: 0,
            })
          })
          gsap.set(ornamentRef.current, { autoAlpha: 1 })

          tl.set(paths, { opacity: 1, stagger: 0.1 }, '-=1.0')
          tl.to(
            paths,
            {
              strokeDashoffset: 0,
              duration: 0.3,
              ease: 'power2.out',
              stagger: 0.1,
            },
            '<',
          )
        }

        if (introRef.current) {
          tl.from(introRef.current, {
            autoAlpha: 0,
            y: 20,
            duration: 0.9,
            ease: 'power2.out',
          }, '-=0.4')
        }
      }

      const loaderDone = (window as unknown as { __loaderDone?: boolean }).__loaderDone
      if (loaderDone) {
        playIntro()
      } else {
        pendingIntro = playIntro
        window.addEventListener('loaderDone', playIntro, { once: true })
      }

      if (channelsRef.current) {
        const cards = channelsRef.current.querySelectorAll<HTMLElement>('[data-channel-card]')
        gsap.from(cards, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: channelsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      if (footerRef.current) {
        const splitFooter = new SplitText(footerRef.current, { type: 'chars' })
        gsap.set(footerRef.current, { autoAlpha: 1 })

        gsap.from(splitFooter.chars, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        })
      }
    })

    return () => {
      if (pendingIntro) window.removeEventListener('loaderDone', pendingIntro)
      ctx.revert()
    }
  }, [])

  return (
    <main className="relative flex flex-col min-h-screen bg-background text-dark pb-32 overflow-hidden">
      <PageOrnament />

      {/* Hero */}
      <section className="relative w-full pt-40 pb-32 flex flex-col items-center justify-center px-6 text-center z-10">
        <span
          ref={eyebrowRef}
          className="font-sans text-xs tracking-[0.3em] uppercase text-dark mb-12 invisible"
        >
          Hubungi Kami
        </span>

        <div className="relative">
          <h1 className="font-serif font-base text-dark text-center leading-[0.95] tracking-[-0.01em] text-[clamp(4rem,10vw,9rem)]">
            <div ref={headerRef} className="invisible">
              <span className="block">GET IN</span>
              <span className="block">TOUCH</span>
            </div>
          </h1>

          <svg
            ref={ornamentRef}
            viewBox="0 0 434.29816 129.05151"
            fill="none"
            stroke="currentColor"
            strokeWidth="5.29167"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="invisible text-textAccent absolute -bottom-14 left-1/2 -translate-x-1/2 w-[clamp(14rem,30vw,28rem)] pointer-events-none"
            aria-label="Connect"
          >
            <g transform="translate(-42.067635,-28.100555)">
              {connectPaths.map((p) => (
                <path
                  key={p.order}
                  data-order={p.order}
                  data-reverse={p.reverse}
                  d={p.d}
                />
              ))}
            </g>
          </svg>
        </div>

        <p
          ref={introRef}
          className="font-sans text-dark text-base md:text-lg max-w-xl mt-32 leading-relaxed"
        >
          Punya ide desain atau ingin sekadar berdiskusi soal ruang impian Anda? Tim Rumami siap membantu — gratis survey lokasi dan konsultasi tanpa biaya awal di seluruh Jabodetabek.
        </p>
      </section>

      {/* Channels */}
      <section className="relative w-full px-6 z-10 mt-8">
        <div className="max-w-[90vw] lg:max-w-6xl mx-auto">
          <div className="flex items-center justify-center w-full max-w-2xl mx-auto gap-8 mb-16">
            <div className="h-[1px] bg-textAccent/40 flex-1" />
            <span className="font-sans text-xs tracking-[0.15em] uppercase text-textAccent font-medium">
              (KANAL KAMI)
            </span>
            <div className="h-[1px] bg-textAccent/40 flex-1" />
          </div>

          <div
            ref={channelsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {channels.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  data-channel-card
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col gap-5 p-8 border border-dark/15 hover:border-textAccent transition-colors duration-300 bg-background"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="text-textAccent" size={28} />
                    <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-dark/50 group-hover:text-textAccent transition-colors">
                      {c.label}
                    </span>
                  </div>

                  <div className="font-serif text-2xl md:text-3xl text-dark leading-tight">
                    {c.value}
                  </div>

                  <p className="font-sans text-sm text-dark/70 leading-relaxed">
                    {c.helper}
                  </p>

                  <div className="mt-auto flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-textAccent">
                    <span aria-hidden className="text-base leading-none">&raquo;</span>
                    Hubungi
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative w-full mt-40 flex flex-col items-center px-6 z-10">
        <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-dark mb-6">
          Siap Memulai?
        </span>
        <h2
          ref={footerRef}
          className="invisible font-serif text-[clamp(5rem,18vw,20rem)] leading-none text-textAccent tracking-[-0.02em] overflow-hidden py-4"
        >
          HELLO
        </h2>

        <div className="w-full max-w-xl h-[1px] bg-textAccent/40 mt-12 mb-12" />

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-textAccent uppercase tracking-[0.25em] text-sm flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <span aria-hidden className="text-lg leading-none">&raquo;</span>
          Kirim Pesan via WhatsApp
        </a>

        <div className="mt-10 flex flex-col items-center gap-3 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-textAccent text-center max-w-2xl leading-relaxed">
          <p>
            DESAIN INTERIOR PROFESIONAL
            <span className="mx-2 font-serif text-[0.8rem]">&oplus;</span>
            SOLUSI FURNITURE custom
          </p>
          <p>MELAYANI JABODETABEK DENGAN KEAHLIAN ESTETIKA DAN FUNGSIONAL</p>
        </div>
      </section>
    </main>
  )
}
