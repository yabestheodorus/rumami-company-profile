'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import LogoSVG from '@/components/common/LogoSVG'
import {
  categoryLabels,
  instagramPosts,
  type InstagramPost,
  type PostCategory,
} from '@/components/constants/instagramPosts'

type CategoryFilter = 'all' | PostCategory

const categoryFilters: CategoryFilter[] = [
  'all',
  'kitchenset',
  'bedroom',
  'livingroom',
  'workspace',
  'other',
]

const formatPostDate = (iso: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const [y, m, d] = iso.split('-')
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`
}

const renderCaption = (caption: string) => {
  const lines = caption.split('\n')
  return lines.map((line, i) => {
    if (line.trim() === '') return <br key={i} />
    const tokens = line.split(/(\s+)/)
    return (
      <span key={i} className="block">
        {tokens.map((tok, j) => {
          if (tok.startsWith('#')) {
            return (
              <span key={j} className="text-textAccent">
                {tok}
              </span>
            )
          }
          return <span key={j}>{tok}</span>
        })}
      </span>
    )
  })
}

const matchesCategoryFilter = (post: InstagramPost, filter: CategoryFilter) => {
  if (filter === 'all') return true
  return post.category === filter
}

const getThumb = (post: InstagramPost) => {
  if (post.kind === 'image') return post.src
  if (post.kind === 'carousel') return post.sources[0]
  return post.poster
}

const CarouselGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="w-5 h-5">
    <rect x="6" y="6" width="14" height="14" rx="1.5" />
    <path d="M4 16V5a1 1 0 0 1 1-1h11" />
  </svg>
)

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="w-5 h-5">
    <path d="M8 5v14l11-7-11-7z" />
  </svg>
)

const ChevronGlyph = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="w-5 h-5">
    {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
)

export default function WorksGallery() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [captionExpanded, setCaptionExpanded] = useState(false)

  const visible = useMemo(
    () => instagramPosts.filter((p) => matchesCategoryFilter(p, categoryFilter)),
    [categoryFilter],
  )

  const openPost = useMemo(
    () => (openId ? instagramPosts.find((p) => p.id === openId) ?? null : null),
    [openId],
  )

  const handleOpen = (id: string) => {
    setSlideIndex(0)
    setCaptionExpanded(false)
    setOpenId(id)
  }

  useEffect(() => {
    if (!openPost) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
      if (openPost.kind === 'carousel') {
        if (e.key === 'ArrowRight') {
          setSlideIndex((i) => Math.min(i + 1, openPost.sources.length - 1))
        }
        if (e.key === 'ArrowLeft') {
          setSlideIndex((i) => Math.max(i - 1, 0))
        }
      }
    }
    document.addEventListener('keydown', onKey)

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
    }
  }, [openPost])

  return (
    <section className="relative w-full bg-background px-6 pt-24 pb-40 overflow-hidden">
      <div className="relative z-10 max-w-[85vw] lg:max-w-5xl mx-auto">
        <div className="relative flex flex-col items-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-dark mb-8 relative z-10">
            Galeri
          </span>
          <h2 className="font-serif font-base text-dark text-center leading-[0.95] tracking-[-0.01em] text-[clamp(2.25rem,5vw,4.5rem)] relative z-10">
            Yang Kami Tawarkan
          </h2>
          <a
            href="https://instagram.com/rumami.ind"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 font-sans text-xs tracking-[0.25em] uppercase text-dark/60 hover:text-textAccent transition-colors"
          >
            @rumami.ind
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-1 mb-10 border-t border-dark/15">
          {categoryFilters.map((c) => {
            const isActive = categoryFilter === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategoryFilter(c)}
                className={`font-sans uppercase tracking-[0.25em] text-[0.7rem] px-6 py-4 -mt-px border-t transition-colors ${isActive
                  ? 'text-dark border-dark'
                  : 'text-dark/50 border-transparent hover:text-dark'
                  }`}
              >
                {categoryLabels[c]}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2">
          {visible.map((post) => (
            <button
              type="button"
              key={post.id}
              onClick={() => handleOpen(post.id)}
              className="group relative aspect-square overflow-hidden bg-dark/5 cursor-pointer"
              aria-label={`Open post from ${formatPostDate(post.date)}`}
            >
              <Image
                src={getThumb(post)}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 30vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              <div className="absolute top-2 right-2 text-background drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {post.kind === 'carousel' && <CarouselGlyph />}
                {post.kind === 'video' && <PlayGlyph />}
              </div>

              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/45 transition-colors duration-300 flex items-center justify-center">
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Lihat Karya
                </span>
              </div>
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="font-sans text-center text-dark/60 mt-16">
            Belum ada karya di kategori ini.
          </p>
        )}
      </div>

      {openPost && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div
            onClick={() => setOpenId(null)}
            className="absolute inset-0 bg-dark/85 backdrop-blur-sm"
            aria-hidden
          />

          <button
            type="button"
            onClick={() => setOpenId(null)}
            aria-label="Close"
            className="absolute top-5 right-5 z-[110] text-background/80 hover:text-background transition-colors drop-shadow-md"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-7 h-7">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          <div
            className="relative z-10 bg-background w-full md:w-[min(95vw,1040px)] h-full md:h-[min(92vh,720px)] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-none h-[82vh] md:h-auto md:flex-1 md:w-[58%] bg-dark flex items-center justify-center min-h-0">
              {openPost.kind === 'image' && (
                <Image
                  src={openPost.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-contain"
                />
              )}

              {openPost.kind === 'carousel' && (
                <>
                  <Image
                    key={openPost.sources[slideIndex]}
                    src={openPost.sources[slideIndex]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-contain"
                  />
                  {slideIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setSlideIndex((i) => i - 1)}
                      aria-label="Previous"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/85 hover:bg-background text-dark flex items-center justify-center transition-colors"
                    >
                      <ChevronGlyph dir="left" />
                    </button>
                  )}
                  {slideIndex < openPost.sources.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setSlideIndex((i) => i + 1)}
                      aria-label="Next"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/85 hover:bg-background text-dark flex items-center justify-center transition-colors"
                    >
                      <ChevronGlyph dir="right" />
                    </button>
                  )}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {openPost.sources.map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === slideIndex ? 'bg-background' : 'bg-background/40'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-dark/55 text-background font-sans text-[0.65rem] tracking-wider">
                    {slideIndex + 1}/{openPost.sources.length}
                  </div>
                </>
              )}

              {openPost.kind === 'video' && (
                <video
                  key={openPost.src}
                  src={openPost.src}
                  poster={openPost.poster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}
            </div>

            <div className="flex-1 md:w-[42%] flex flex-col min-h-0 border-t md:border-t-0 md:border-l border-dark/10">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-dark/10">
                <div className="w-9 h-9 rounded-full bg-dark border border-textAccent/30 flex items-center justify-center overflow-hidden p-2">

                  <LogoSVG
                    className="text-textAccent w-full h-full"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-sans text-sm font-medium text-dark">rumami.ind</span>
                  <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/55">
                    Jakarta · Custom Interior
                  </span>
                </div>
              </div>

              <div className="flex-1 md:overflow-y-auto px-5 py-5">
                <div className="flex gap-3">

                  <div className="font-sans text-sm text-dark leading-relaxed whitespace-pre-line">

                    {(() => {
                      const limit = 220
                      const showAll = captionExpanded || openPost.caption.length <= limit
                      const text = showAll
                        ? openPost.caption
                        : openPost.caption.slice(0, limit).trimEnd() + '…'
                      return (
                        <>
                          {renderCaption(text)}
                          {!showAll && (
                            <button
                              type="button"
                              onClick={() => setCaptionExpanded(true)}
                              className="font-sans text-dark/50 hover:text-dark text-sm mt-1"
                            >
                              selengkapnya
                            </button>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-dark/10 flex justify-center">
                <a
                  href="https://instagram.com/rumami.ind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-textAccent hover:opacity-70 transition-opacity"
                >
                  Buka Instagram
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
