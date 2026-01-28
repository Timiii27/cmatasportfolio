'use client'

import Link from 'next/link'
import LanguageToggle from './ui/LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'

interface HeaderProps {
  showBackButton?: boolean
  backHref?: string
}

export default function Header({ showBackButton = false, backHref = '/' }: HeaderProps) {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] px-4 md:px-8 py-6 pointer-events-none">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4 pointer-events-auto">
          {showBackButton && (
            <Link
              href={backHref}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide text-[#1a1a1a] bg-white/95 backdrop-blur-md rounded-full shadow-xl hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {t('nav.back')}
            </Link>
          )}
        </div>

        <div className="flex items-center pointer-events-auto">
          <LanguageToggle />
        </div>
      </nav>
    </header>
  )
}
