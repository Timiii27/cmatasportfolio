'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import Header from '@/components/Header'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-8xl md:text-9xl font-extralight mb-4">404</h1>
          <p className="text-xl md:text-2xl font-light text-[var(--text-secondary)] mb-8">
            {t('common.notFound')}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-light tracking-wide hover:opacity-70 transition-opacity"
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
            {t('common.backHome')}
          </Link>
        </div>
      </div>
    </main>
  )
}
