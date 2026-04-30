'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import LogoSVG from "@/components/common/LogoSVG"

const navItems = [
  { label: 'BERANDA', href: '/' },
  // { label: 'STUDIO', href: '/studio' },
  { label: 'TENTANG KAMI', href: '/about' },
  { label: 'KARYA', href: '/works' },
  { label: 'KONTAK', href: '/contact' },
]

export default function SideNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Global Menu Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 md:top-12 right-8 md:right-16 z-[60] font-sans text-[0.9rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-textAccent font-bold hover:opacity-60 transition-opacity"
      >
        MENU
      </button>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-dark text-background flex flex-col"
          >
            {/* Header in Overlay */}
            <div className="flex justify-between items-center px-8 md:px-16 pt-8 md:pt-12 mb-12 md:mb-0">
              <span className="font-sans text-[0.8rem] md:text-[0.9rem] font-bold tracking-[0.3em] uppercase text-textAccent">
                ©2026
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="font-sans text-[0.8rem] md:text-[0.9rem] font-bold tracking-[0.3em] uppercase text-textAccent hover:opacity-60 transition-opacity"
              >
                TUTUP
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row px-8 md:px-24 items-center justify-center">
              {/* Left Side: Brand Info (Desktop Only) */}
              <div className="hidden md:flex flex-col flex-1 gap-12 pr-24 border-r border-background/10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <LogoSVG className="w-12 text-textAccent" />
                    <span className="font-sans text-lg font-bold tracking-[0.2em] text-textAccent uppercase">rumami.ind</span>
                  </div>
                  <h3 className="font-serif text-2xl leading-snug max-w-xs text-background/90">
                    Mewujudkan Ruang Impian dengan Sentuhan Personal.
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 font-sans text-xs tracking-widest uppercase text-background/60"
                >
                  <span>Jakarta, Indonesia</span>
                  <a href="mailto:hello@rumami.com" className="hover:text-textAccent transition-colors">hello@rumami.com</a>
                  <span>+62 812 3456 7890</span>
                </motion.div>
              </div>

              {/* Right Side: Navigation Links */}
              <div className="flex-[1.5] flex flex-col justify-center md:pl-24 w-full">
                <ul className="flex flex-col gap-3 md:gap-6">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="group overflow-hidden"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="relative inline-block font-serif text-[clamp(2rem,5vw,2.5rem)] leading-none"
                      >
                        <span className={`transition-all duration-500 ${pathname === item.href ? 'text-textAccent' : 'text-background group-hover:text-textAccent italic group-hover:pl-4'}`}>
                          {item.label}
                        </span>
                        {pathname === item.href && (
                          <motion.span
                            layoutId="nav-marker"
                            className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 w-4 md:w-6 h-[2px] bg-textAccent"
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer in Overlay */}
            <div className="px-8 md:px-16 pb-8 md:pb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-background/10 pt-8">
              <div className="flex gap-12 font-sans text-[0.7rem] md:text-[0.8rem] tracking-[0.25em] uppercase text-background/50">
                <a href="https://instagram.com/rumami.ind" target="_blank" rel="noopener noreferrer" className="hover:text-textAccent transition-colors">Instagram</a>
                <a href="https://www.tiktok.com/@rumami.ind" target="_blank" rel="noopener noreferrer" className="hover:text-textAccent transition-colors">Tiktok</a>
                <a href="#" className="hover:text-textAccent transition-colors">Pinterest</a>
              </div>
              <span className="font-sans text-[0.7rem] md:text-[0.8rem] tracking-[0.25em] uppercase text-background/30">
                Rumami Atelier — Est. 2024
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

