'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300"
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={language === 'es' ? 'opacity-100' : 'opacity-40'}>ES</span>
      <span className="opacity-40">|</span>
      <span className={language === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
    </button>
  )
}
