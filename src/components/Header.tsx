'use client'

import Link from 'next/link'
import ThemeToggle from './ui/ThemeToggle'
import LanguageToggle from './ui/LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'

interface HeaderProps {
  showBackButton?: boolean
  backHref?: string
}

export default function Header({ showBackButton = false, backHref = '/' }: HeaderProps) {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link
              href={backHref}
              className="flex items-center gap-2 text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
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

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
