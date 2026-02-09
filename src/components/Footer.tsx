'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const { t } = useLanguage()
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(footerRef.current!.querySelectorAll('.footer-anim'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      className="py-20 flex flex-col items-center justify-center gap-8 bg-[#0f0f0f]"
    >
      <h3 className="footer-anim text-4xl font-extralight tracking-[0.2em] text-white/90 uppercase">
        Clara Matas
      </h3>

      <div className="footer-anim flex items-center gap-8">
        {/* Behance */}
        <a
          href="https://www.behance.net/claramatas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-block"
          aria-label="Behance"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/claramatas_design"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-block"
          aria-label="Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>

        {/* Email */}
        <a
          href="mailto:claramatasmartin@gmail.com"
          className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-block"
          aria-label="Email"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
        </a>
      </div>

      <button
        onClick={handleBackToTop}
        className="footer-anim text-xs font-light tracking-[0.2em] text-white/40 hover:text-white/80 transition-colors duration-300 uppercase mt-4"
      >
        {t('footer.backToTop')}
      </button>
    </footer>
  )
}
