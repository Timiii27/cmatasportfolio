'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide text-[#1a1a1a] bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={language === 'es' ? 'opacity-100' : 'opacity-40'}>ES</span>
      <span className="opacity-30">|</span>
      <span className={language === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
    </button>
  )
}
