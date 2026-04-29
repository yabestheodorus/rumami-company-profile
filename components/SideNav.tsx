'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/studio' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/works' },
  { label: 'Contact', href: '/contact' },
  { label: 'Webshop', href: '/webshop' },
]

export default function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-8 right-8 z-50 hidden md:block">
      <ul className="flex flex-col items-start gap-3 font-sans text-xs tracking-[0.3em] uppercase">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`grid grid-cols-[1ch_auto] items-center gap-2 transition-colors ${isActive
                    ? 'text-textAccent'
                    : 'text-dark hover:text-textAccent'
                  }`}
              >
                <span
                  aria-hidden
                  className={`transition-opacity ${isActive ? 'opacity-100 text-textAccent' : 'opacity-0'
                    }`}
                >
                  &raquo;
                </span>
                <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
