'use client'

import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

type GalleryCategory = 'Interior' | 'Architecture' | 'Furniture' | 'Process'

type GalleryItem = {
  id: string
  title: string
  category: GalleryCategory
  media:
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string }
  span?: 'tall' | 'wide' | 'square'
}

const items: GalleryItem[] = [
  {
    id: 'work-video-01',
    title: 'Process Reel 01',
    category: 'Process',
    media: { kind: 'video', src: '/videos/works-01.mp4' },
    span: 'tall',
  },
  {
    id: 'work-03',
    title: 'Project 03',
    category: 'Architecture',
    media: { kind: 'image', src: '/images/works/works-03.jpg', alt: 'Rumami architecture 03' },
    span: 'square',
  },
  {
    id: 'work-04',
    title: 'Project 04',
    category: 'Furniture',
    media: { kind: 'image', src: '/images/works/works-04.jpg', alt: 'Rumami furniture 04' },
    span: 'square',
  },
  {
    id: 'work-05',
    title: 'Project 05',
    category: 'Process',
    media: { kind: 'image', src: '/images/works/works-05.jpg', alt: 'Rumami process 05' },
    span: 'tall',
  },
  {
    id: 'work-06',
    title: 'Project 06',
    category: 'Interior',
    media: { kind: 'image', src: '/images/works/works-06.jpg', alt: 'Rumami interior 06' },
    span: 'wide',
  },
  {
    id: 'work-07',
    title: 'Project 07',
    category: 'Architecture',
    media: { kind: 'image', src: '/images/works/works-07.jpg', alt: 'Rumami architecture 07' },
    span: 'square',
  },
  {
    id: 'work-08',
    title: 'Project 08',
    category: 'Furniture',
    media: { kind: 'image', src: '/images/works/works-08.jpg', alt: 'Rumami furniture 08' },
    span: 'tall',
  },
  {
    id: 'work-09',
    title: 'Project 09',
    category: 'Interior',
    media: { kind: 'image', src: '/images/works/works-09.jpg', alt: 'Rumami interior 09' },
    span: 'square',
  },
  {
    id: 'work-video-02',
    title: 'Process Reel 02',
    category: 'Process',
    media: { kind: 'video', src: '/videos/works-02.mp4' },
    span: 'wide',
  },
  {
    id: 'work-10',
    title: 'Project 10',
    category: 'Furniture',
    media: { kind: 'image', src: '/images/works/works-10.jpg', alt: 'Rumami furniture 10' },
    span: 'wide',
  },
  {
    id: 'work-11',
    title: 'Project 11',
    category: 'Architecture',
    media: { kind: 'image', src: '/images/works/works-11.jpg', alt: 'Rumami architecture 11' },
    span: 'square',
  },
  {
    id: 'work-12',
    title: 'Project 12',
    category: 'Process',
    media: { kind: 'image', src: '/images/works/works-12.jpg', alt: 'Rumami process 12' },
    span: 'tall',
  },
  {
    id: 'work-video-03',
    title: 'Process Reel 03',
    category: 'Process',
    media: { kind: 'video', src: '/videos/works-03.mp4' },
    span: 'square',
  },
  {
    id: 'work-video-04',
    title: 'Process Reel 04',
    category: 'Process',
    media: { kind: 'video', src: '/videos/works-04.mp4' },
    span: 'tall',
  },
  {
    id: 'work-13',
    title: 'Project 13',
    category: 'Interior',
    media: { kind: 'image', src: '/images/works/works-13.jpg', alt: 'Rumami interior 13' },
    span: 'square',
  },
  {
    id: 'work-14',
    title: 'Project 14',
    category: 'Architecture',
    media: { kind: 'image', src: '/images/works/works-14.jpg', alt: 'Rumami architecture 14' },
    span: 'wide',
  },
  {
    id: 'work-15',
    title: 'Project 15',
    category: 'Furniture',
    media: { kind: 'image', src: '/images/works/works-15.jpg', alt: 'Rumami furniture 15' },
    span: 'square',
  },
]

const filters: ('All' | GalleryCategory)[] = [
  'All',
  'Interior',
  'Architecture',
  'Furniture',
  'Process',
]

const spanClass: Record<NonNullable<GalleryItem['span']>, string> = {
  tall: 'md:row-span-2 aspect-[3/4]',
  wide: 'md:col-span-2 aspect-[16/10]',
  square: 'aspect-square',
}

type OpenState = { item: GalleryItem; width: number; height: number }

const VIEWPORT_W = 0.92
const VIEWPORT_H = 0.88

const fitRect = (aspect: number) => {
  const maxW = window.innerWidth * VIEWPORT_W
  const maxH = window.innerHeight * VIEWPORT_H
  let w = maxW
  let h = w / aspect
  if (h > maxH) {
    h = maxH
    w = h * aspect
  }
  return { width: w, height: h }
}

type MediaFilter = 'All' | 'Image' | 'Video'

const mediaFilters: MediaFilter[] = ['All', 'Image', 'Video']

export default function WorksGallery() {
  const [active, setActive] = useState<'All' | GalleryCategory>('All')
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('All')
  const [openState, setOpenState] = useState<OpenState | null>(null)

  const thumbRefs = useRef<Map<string, HTMLElement>>(new Map())
  const dialogMediaRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const chromeRef = useRef<HTMLDivElement>(null)
  const animatingRef = useRef(false)

  const visible = useMemo(() => {
    return items.filter((i) => {
      if (active !== 'All' && i.category !== active) return false
      if (mediaFilter === 'Image' && i.media.kind !== 'image') return false
      if (mediaFilter === 'Video' && i.media.kind !== 'video') return false
      return true
    })
  }, [active, mediaFilter])

  const handleOpen = (item: GalleryItem) => {
    if (animatingRef.current || openState) return
    if (item.media.kind === 'image') {
      const preload = new window.Image()
      preload.src = item.media.src
      const open = () => {
        const aspect =
          preload.naturalWidth && preload.naturalHeight
            ? preload.naturalWidth / preload.naturalHeight
            : 4 / 3
        setOpenState({ item, ...fitRect(aspect) })
      }
      if (preload.complete && preload.naturalWidth) open()
      else {
        preload.onload = open
        preload.onerror = open
      }
    } else {
      const probe = document.createElement('video')
      probe.preload = 'metadata'
      probe.muted = true
      probe.src = item.media.src
      const open = () => {
        const aspect =
          probe.videoWidth && probe.videoHeight
            ? probe.videoWidth / probe.videoHeight
            : 16 / 9
        setOpenState({ item, ...fitRect(aspect) })
      }
      if (probe.readyState >= 1 && probe.videoWidth) open()
      else {
        probe.onloadedmetadata = open
        probe.onerror = open
      }
    }
  }

  const handleClose = () => {
    if (!openState || animatingRef.current) return
    const thumbEl = thumbRefs.current.get(openState.item.id)
    const dialogEl = dialogMediaRef.current
    if (!thumbEl || !dialogEl) return

    animatingRef.current = true

    if (chromeRef.current) {
      gsap.to(chromeRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.out' })
    }
    if (backdropRef.current) {
      gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.55, ease: 'power2.out' })
    }

    const state = Flip.getState(dialogEl)
    Flip.fit(dialogEl, thumbEl)

    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      absolute: true,
      onComplete: () => {
        gsap.set(thumbEl, { autoAlpha: 1 })
        setOpenState(null)
        animatingRef.current = false
      },
    })
  }

  useLayoutEffect(() => {
    if (!openState) return
    const thumbEl = thumbRefs.current.get(openState.item.id)
    const dialogEl = dialogMediaRef.current
    if (!thumbEl || !dialogEl) return

    animatingRef.current = true

    gsap.set(thumbEl, { autoAlpha: 0 })

    Flip.fit(dialogEl, thumbEl)
    const thumbState = Flip.getState(dialogEl)

    gsap.set(dialogEl, { clearProps: 'position,top,left,width,height,x,y,scaleX,scaleY' })
    gsap.set(dialogEl, { width: openState.width, height: openState.height })

    Flip.from(thumbState, {
      duration: 0.8,
      ease: 'power3.inOut',
      absolute: true,
      onComplete: () => {
        animatingRef.current = false
      },
    })

    if (backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
      )
    }
    if (chromeRef.current) {
      gsap.fromTo(
        chromeRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' },
      )
    }
  }, [openState])

  useEffect(() => {
    if (!openState) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKey)

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarW > 0) {
      document.body.style.paddingRight = `${scrollbarW}px`
    }

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openState])

  return (
    <section className="relative w-full bg-background px-6 pt-24 pb-40 overflow-hidden">


      <div className="relative z-10 max-w-[85vw] lg:max-w-7xl mx-auto">
        <div className="relative flex flex-col items-center mb-20">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-dark mb-8 relative z-10">
            Gallery
          </span>
          <h2 className="font-serif font-base text-dark text-center leading-[0.95] tracking-[-0.01em] text-[clamp(2.25rem,5vw,4.5rem)] relative z-10">
            What We Offer
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
          {filters.map((f) => {
            const isActive = active === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`font-sans uppercase tracking-[0.25em] text-[0.7rem] sm:text-xs px-5 py-2 border transition-colors ${isActive
                  ? 'border-textAccent text-background bg-textAccent'
                  : 'border-textAccent/40 text-dark hover:border-textAccent hover:text-textAccent'
                  }`}
              >
                {f}
              </button>
            )
          })}
        </div>

        <div className="flex justify-center gap-1 mb-14">
          {mediaFilters.map((m) => {
            const isActive = mediaFilter === m
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMediaFilter(m)}
                className={`font-sans uppercase tracking-[0.2em] text-[0.65rem] px-4 py-1.5 transition-colors ${isActive
                  ? 'text-textAccent border-b border-textAccent'
                  : 'text-dark/60 border-b border-transparent hover:text-dark'
                  }`}
              >
                {m}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(220px,auto)]">
          {visible.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleOpen(item)}
              ref={(el) => {
                if (el) thumbRefs.current.set(item.id, el)
                else thumbRefs.current.delete(item.id)
              }}
              className={`group relative overflow-hidden bg-dark/5 cursor-pointer text-left ${item.span ? spanClass[item.span] : 'aspect-square'
                }`}
            >
              {item.media.kind === 'image' ? (
                <Image
                  src={item.media.src}
                  alt={item.media.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <video
                  src={item.media.poster ? item.media.src : `${item.media.src}#t=0.9`}
                  poster={item.media.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => void e.currentTarget.play().catch(() => { })}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-dark/70 via-dark/0 to-dark/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <figcaption className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-background">
                  <div className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-textAccent mb-1">
                    {item.category}
                  </div>
                  <div className="font-serif text-xl leading-tight">{item.title}</div>
                </div>
                {item.media.kind === 'video' && (
                  <span
                    aria-hidden
                    className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-background/80 border border-background/40 px-2 py-1"
                  >
                    Play
                  </span>
                )}
              </figcaption>
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="font-sans text-center text-dark/60 mt-16">
            No pieces in this category yet.
          </p>
        )}
      </div>

      {openState && (
        <div className="fixed inset-0 z-100">
          <div
            ref={backdropRef}
            onClick={handleClose}
            className="absolute inset-0 bg-dark/95"
            aria-hidden
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              ref={dialogMediaRef}
              style={{ width: openState.width, height: openState.height }}
              className="relative overflow-hidden pointer-events-auto shadow-2xl bg-dark"
            >
              {openState.item.media.kind === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={openState.item.media.src}
                  alt={openState.item.media.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <video
                  src={openState.item.media.src}
                  poster={openState.item.media.poster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div
            ref={chromeRef}
            className="absolute inset-0 pointer-events-none opacity-0"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="pointer-events-auto absolute top-6 right-6 text-background border border-background/40 px-4 py-2 font-sans uppercase tracking-[0.25em] text-xs hover:bg-background hover:text-dark transition-colors"
            >
              Close
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-background">
              <div className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-textAccent mb-1">
                {openState.item.category}
              </div>
              <div className="font-serif text-2xl md:text-3xl">{openState.item.title}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
