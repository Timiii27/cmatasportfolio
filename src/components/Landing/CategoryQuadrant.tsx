'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useTransition } from '@/context/TransitionContext'
import { Category } from '@/lib/projects'
import gsap from 'gsap'

interface CategoryQuadrantProps {
  category: Category
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

// Accent colors for each category
const categoryColors: Record<string, string> = {
  web: '#6366f1',
  product: '#7AC5D8',
  fashion: '#D4AF37',
  graphic: '#B87333',
}

export default function CategoryQuadrant({ category, position }: CategoryQuadrantProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { startTransition } = useTransition()
  const quadrantRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const hasProjects = category.projects.length > 0
  const firstProject = category.projects[0]
  const href = hasProjects ? `/${category.slug}/${firstProject.slug}` : '#'
  const accentColor = categoryColors[category.slug] || '#ffffff'

  const positionClasses = {
    'top-left': 'border-r border-b',
    'top-right': 'border-b',
    'bottom-left': 'border-r',
    'bottom-right': '',
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!hasProjects || isAnimating) {
      e.preventDefault()
      return
    }

    e.preventDefault()
    setIsAnimating(true)

    const rect = quadrantRef.current?.getBoundingClientRect()
    const x = e.clientX - (rect?.left || 0)
    const y = e.clientY - (rect?.top || 0)

    // Set bubble position at click point
    if (bubbleRef.current) {
      bubbleRef.current.style.left = `${x}px`
      bubbleRef.current.style.top = `${y}px`
    }

    const tl = gsap.timeline()

    // Fade out content first
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
    })

    // Bubble expansion to fill screen
    tl.to(
      bubbleRef.current,
      {
        scale: 100,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      0.1
    )

    // After bubble fills screen, trigger global transition and navigate
    tl.call(() => {
      startTransition(accentColor)
    }, [], 0.6)

    tl.call(() => {
      router.push(href)
    }, [], 0.9)
  }

  const handleMouseEnter = () => {
    if (!hasProjects || isAnimating) return

    gsap.to(contentRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    })

    const accentLine = quadrantRef.current?.querySelector('.accent-line')
    if (accentLine) {
      gsap.to(accentLine, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (isAnimating) return

    gsap.to(contentRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })

    const accentLine = quadrantRef.current?.querySelector('.accent-line')
    if (accentLine) {
      gsap.to(accentLine, {
        scaleX: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }

  return (
    <div
      ref={quadrantRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative flex items-center justify-center overflow-hidden
        border-[var(--border-color)] bg-[var(--bg-primary)]
        transition-colors duration-300
        ${positionClasses[position]}
        ${hasProjects ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      {/* Expanding bubble on click */}
      <div
        ref={bubbleRef}
        className="absolute w-8 h-8 rounded-full pointer-events-none z-50"
        style={{
          backgroundColor: accentColor,
          transform: 'translate(-50%, -50%) scale(0)',
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="text-center px-8 relative z-10">
        {/* Category number */}
        <span
          className="block text-xs font-light tracking-[0.3em] mb-4 opacity-40"
          style={{ color: accentColor }}
        >
          {String(category.projects.length).padStart(2, '0')} PROJECTS
        </span>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide text-[var(--text-primary)]">
          {t(category.nameKey)}
        </h2>

        {/* Accent line */}
        <div
          className="accent-line h-[1px] w-16 mx-auto mt-4 origin-center"
          style={{
            backgroundColor: accentColor,
            transform: 'scaleX(0)',
          }}
        />

        {!hasProjects && (
          <p className="mt-4 text-sm text-[var(--text-secondary)] font-light">
            {t('common.comingSoon')}
          </p>
        )}
      </div>

      {/* Corner accent */}
      {hasProjects && (
        <div
          className="absolute bottom-6 right-6 w-8 h-8 opacity-20 transition-opacity duration-300"
          style={{ color: accentColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </div>
      )}

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}08 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}
