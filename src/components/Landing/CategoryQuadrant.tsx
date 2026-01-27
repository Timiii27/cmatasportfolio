'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { Category } from '@/lib/projects'

interface CategoryQuadrantProps {
  category: Category
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export default function CategoryQuadrant({ category, position }: CategoryQuadrantProps) {
  const { t } = useLanguage()

  const hasProjects = category.projects.length > 0
  const firstProject = category.projects[0]
  const href = hasProjects ? `/${category.slug}/${firstProject.slug}` : '#'

  const positionClasses = {
    'top-left': 'border-r border-b',
    'top-right': 'border-b',
    'bottom-left': 'border-r',
    'bottom-right': '',
  }

  return (
    <Link
      href={href}
      className={`
        quadrant-hover
        relative flex items-center justify-center
        border-[var(--border-color)]
        ${positionClasses[position]}
        ${!hasProjects ? 'cursor-default' : 'cursor-pointer'}
      `}
      onClick={(e) => !hasProjects && e.preventDefault()}
    >
      <div className="text-center px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide">
          {t(category.nameKey)}
        </h2>
        {!hasProjects && (
          <p className="mt-2 text-sm text-[var(--text-secondary)] font-light">
            {t('common.comingSoon')}
          </p>
        )}
      </div>

      {hasProjects && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </div>
      )}
    </Link>
  )
}
