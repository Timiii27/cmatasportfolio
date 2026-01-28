'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Project, projects } from '@/lib/projects'
import Header from '@/components/Header'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProjectLayoutProps {
  project: Project
}

// Background colors for each project
const projectBgColors: Record<string, string> = {
  bombay: '#1a3a4a',
  perfume: '#1a1a1a',
  tableware: '#3d2b1f',
  luccica: '#2a2a35',
  raices: '#4a3728',
  coleccion: '#f5f0e6',
  aura: '#f5f0e6',
  diamantes: '#1a1a1a',
}

function isDarkColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

const defaultBg = '#1a1a1a'

export default function ProjectLayout({ project }: ProjectLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const categoryProjects = projects.filter(p => p.category === project.category)
  const firstBg = projectBgColors[categoryProjects[0]?.slug] || defaultBg

  useEffect(() => {
    const tl = gsap.timeline()

    // Start with content hidden and overlay visible (matching the home transition end state)
    gsap.set(contentRef.current, { opacity: 0, scale: 0.98 })
    gsap.set(overlayRef.current, { opacity: 1 })

    // Entry animation - fade out overlay, reveal content
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.out',
    })

    tl.to(contentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.4')

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-section').forEach((section) => {
        const titleEl = section.querySelector('.project-title')
        if (titleEl) {
          gsap.from(titleEl, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })
        }

        const descEl = section.querySelector('.project-desc')
        if (descEl) {
          gsap.from(descEl, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen relative" style={{ backgroundColor: firstBg }}>
      {/* Entry overlay - matches the exit state from home page */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ backgroundColor: firstBg }}
      />

      {/* Header always visible and fixed */}
      <Header showBackButton backHref="/" />

      <div ref={contentRef}>
        {categoryProjects.map((proj, index) => (
          <ProjectSection
            key={proj.slug}
            project={proj}
            index={index}
            total={categoryProjects.length}
            prevProject={index > 0 ? categoryProjects[index - 1] : null}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectSection({
  project,
  index,
  prevProject,
}: {
  project: Project
  index: number
  total: number
  prevProject: Project | null
}) {
  const { t } = useLanguage()

  const title = t(project.titleKey)
  const description = t(project.descriptionKey)
  const images = project.images.slice(0, 5)

  const bgColor = projectBgColors[project.slug] || defaultBg
  const prevBgColor = prevProject ? (projectBgColors[prevProject.slug] || defaultBg) : bgColor

  const isDark = isDarkColor(bgColor)
  const textColor = isDark ? '#ffffff' : '#1a1a1a'
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'

  const textOnLeft = index % 2 === 0

  return (
    <div style={{ backgroundColor: bgColor }}>
      {/* Wave transition with two crests */}
      {index > 0 && (
        <div className="relative h-32 md:h-44 -mt-px" style={{ backgroundColor: prevBgColor }}>
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ height: '100%', display: 'block' }}
          >
            <path
              d="M0,80
                 C240,120 360,40 540,70
                 C720,100 840,20 1020,60
                 C1200,100 1320,50 1440,80
                 L1440,120 L0,120 Z"
              fill={bgColor}
            />
          </svg>
        </div>
      )}

      <section
        id={project.slug}
        className="project-section min-h-screen relative flex items-center py-16 md:py-20"
      >
        <div className={`container mx-auto px-6 md:px-12 lg:px-20 flex flex-col ${textOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>

          {/* Text Content */}
          <div className="lg:w-[30%]">
            <h2
              className="project-title text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 tracking-tight"
              style={{ color: textColor }}
            >
              {title}
            </h2>
            <p
              className="project-desc text-base md:text-lg leading-relaxed font-light"
              style={{ color: mutedColor }}
            >
              {description}
            </p>
          </div>

          {/* Images - Creative Layout based on project slug */}
          <div className="lg:w-[70%]">
            <UniqueImageGrid images={images} title={title} projectSlug={project.slug} />
          </div>
        </div>
      </section>
    </div>
  )
}

// Each project gets a unique layout
function UniqueImageGrid({ images, title, projectSlug }: { images: string[]; title: string; projectSlug: string }) {
  const count = images.length
  const gap = 'gap-4 md:gap-5'

  if (count === 0) return null

  // Bombay - L-shape composition
  if (projectSlug === 'bombay') {
    return (
      <div className={`grid grid-cols-4 grid-rows-4 ${gap}`} style={{ aspectRatio: '1' }}>
        <div className="col-span-3 row-span-3">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div className="row-span-2">
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div className="row-span-2">
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.2} index={2} />
        </div>
        <div className="col-span-2">
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.3} index={3} />
        </div>
      </div>
    )
  }

  // Perfume - Vertical emphasis
  if (projectSlug === 'perfume') {
    return (
      <div className={`grid grid-cols-5 grid-rows-4 ${gap}`} style={{ aspectRatio: '5/4' }}>
        <div className="col-span-2 row-span-4">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div className="col-span-3 row-span-2">
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div className="row-span-2">
          {images[3] && <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />}
        </div>
      </div>
    )
  }

  // Tableware - Grid with accent
  if (projectSlug === 'tableware') {
    return (
      <div className={`grid grid-cols-3 grid-rows-3 ${gap}`} style={{ aspectRatio: '1' }}>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div className="row-span-3">
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
      </div>
    )
  }

  // Luccica - Diagonal flow
  if (projectSlug === 'luccica') {
    return (
      <div className={`grid grid-cols-6 grid-rows-4 ${gap}`} style={{ aspectRatio: '3/2' }}>
        <div className="col-span-4 row-span-2">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div className="col-span-2 row-span-3">
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
        <div className="col-span-2">
          <ProjectImage src={images[4]} alt={`${title} 5`} className="w-full h-full" delay={0.25} index={4} />
        </div>
      </div>
    )
  }

  // Raices - Asymmetric blocks
  if (projectSlug === 'raices') {
    return (
      <div className={`grid grid-cols-5 grid-rows-5 ${gap}`} style={{ aspectRatio: '1' }}>
        <div className="col-span-3 row-span-3">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div className="col-span-2 row-span-3">
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
        <div className="col-span-3 row-span-2">
          <ProjectImage src={images[4]} alt={`${title} 5`} className="w-full h-full" delay={0.25} index={4} />
        </div>
      </div>
    )
  }

  // Coleccion - Mosaic
  if (projectSlug === 'coleccion') {
    return (
      <div className={`grid grid-cols-4 grid-rows-3 ${gap}`} style={{ aspectRatio: '4/3' }}>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        <div className="row-span-2">
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div className="row-span-2">
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
        <div className="col-span-2">
          <ProjectImage src={images[4]} alt={`${title} 5`} className="w-full h-full" delay={0.25} index={4} />
        </div>
      </div>
    )
  }

  // Aura - T-shape
  if (projectSlug === 'aura') {
    return (
      <div className={`grid grid-cols-3 grid-rows-4 ${gap}`} style={{ aspectRatio: '3/4' }}>
        <div className="col-span-3 row-span-2">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        <div className="row-span-2">
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
      </div>
    )
  }

  // Diamantes - Stepped layout
  if (projectSlug === 'diamantes') {
    return (
      <div className={`grid grid-cols-5 grid-rows-4 ${gap}`} style={{ aspectRatio: '5/4' }}>
        <div className="col-span-3 row-span-2">
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div className="col-span-2 row-span-3">
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div className="col-span-2 row-span-2">
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div className="col-span-3">
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className={`grid grid-cols-3 grid-rows-3 ${gap}`} style={{ aspectRatio: '1' }}>
      <div className="col-span-2 row-span-2">
        <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
      </div>
      {images[1] && <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />}
      {images[2] && <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />}
      {images[3] && <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />}
      {images[4] && <ProjectImage src={images[4]} alt={`${title} 5`} className="w-full h-full" delay={0.25} index={4} />}
    </div>
  )
}

// Creative reveal animations for images
function ProjectImage({
  src,
  alt,
  className = '',
  delay = 0,
  index = 0,
}: {
  src: string
  alt: string
  className?: string
  delay?: number
  index?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      // Reveal from center (circular blob effect)
      gsap.set(containerRef.current, { clipPath: 'circle(0% at 50% 50%)' })
      gsap.set(imageRef.current, { scale: 1.3 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate circular reveal
      tl.to(containerRef.current, {
        clipPath: 'circle(100% at 50% 50%)',
        duration: 1,
        delay,
        ease: 'power3.out',
      })

      // Counter-animate the image scale
      tl.to(imageRef.current, {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      }, delay)

    }, containerRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <div ref={imageRef} className="absolute inset-0">
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        ) : (
          <>
            {isLoading && <div className="absolute inset-0 bg-black/5 animate-pulse" />}
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-700 hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => { setIsLoading(false); setHasError(true) }}
            />
          </>
        )}
      </div>
    </div>
  )
}
