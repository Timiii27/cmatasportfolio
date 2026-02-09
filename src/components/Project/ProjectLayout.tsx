'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Project, projects } from '@/lib/projects'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/Project/ScrollProgress'
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

// Accent colors per category
const categoryAccentColors: Record<string, string> = {
  product: '#7AC5D8',
  fashion: '#D4AF37',
  graphic: '#B87333',
  web: '#6366f1',
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
  const firstBg = '#f5f5f5'
  const accentColor = categoryAccentColors[project.category] || '#D4AF37'

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

      {/* Scroll progress bar */}
      <ScrollProgress accentColor={accentColor} />

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

        <Footer />
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

  // Alternate between black and white
  const bgColor = index % 2 === 0 ? '#f5f5f5' : '#0a0a0a'
  const prevBgColor = prevProject ? (index - 1) % 2 === 0 ? '#f5f5f5' : '#0a0a0a' : bgColor

  const isDark = index % 2 !== 0
  const textColor = isDark ? '#ffffff' : '#1a1a1a'
  const mutedColor = textColor

  const textOnLeft = index % 2 === 0

  return (
    <div style={{ backgroundColor: bgColor }}>
      {/* Wave transition with two crests */}
      {index > 0 && (
        <div className="relative h-20 md:h-28 -mt-px" style={{ backgroundColor: prevBgColor }}>
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
        className="project-section min-h-screen lg:h-screen relative flex items-center justify-center overflow-hidden py-20 lg:py-0"
      >
        <div className={`mx-auto flex w-full flex-col items-center gap-6 px-6 md:px-20 lg:px-32 ${textOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:justify-between lg:gap-24`}>

          {/* Text Content */}
          <div className="w-full text-center lg:text-left lg:w-[22%] lg:max-w-[280px] flex flex-col justify-center">
            <h2
              className="project-title text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 lg:mb-8 tracking-tight"
              style={{ color: textColor }}
            >
              {title}
            </h2>
            <p
              className="project-desc text-sm md:text-base leading-relaxed font-light"
              style={{ color: mutedColor }}
            >
              {description}
            </p>
          </div>

          {/* Images - Creative Layout based on project slug */}
          <div className="w-full lg:w-[55%]">
            <UniqueImageGrid images={images} title={title} projectSlug={project.slug} />
          </div>
        </div>
      </section>
    </div>
  )
}

// Each project gets a unique mosaic layout inside a square container (12×12 grid)
function UniqueImageGrid({ images, title, projectSlug }: { images: string[]; title: string; projectSlug: string }) {
  if (images.length === 0) return null

  const baseGrid = "grid gap-1.5 md:gap-2.5 lg:gap-3 w-full mx-auto"
  const gridStyle = {
    aspectRatio: '1',
    maxHeight: '80vh',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: 'repeat(12, 1fr)',
  }

  // Bombay — copa arriba full width, abajo botella vertical + 2 colores
  if (projectSlug === 'bombay') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 13', gridRow: '1 / 7' }}>
          <ProjectImage src={images[1]} alt={title} className="w-full h-full" index={1} fit="contain" />
        </div>
        <div style={{ gridColumn: '1 / 5', gridRow: '7 / 13' }}>
          <ProjectImage src={images[0]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={0} />
        </div>
        <div className="rounded-[2rem]" style={{ gridColumn: '5 / 9', gridRow: '7 / 13', backgroundColor: '#7AC5D8' }} />
        <div className="rounded-[2rem]" style={{ gridColumn: '9 / 13', gridRow: '7 / 13', backgroundColor: '#D4AF37' }} />
      </div>
    )
  }

  // Perfume — imagen 2 vertical derecha, imagen 1 arriba-izq (pequeña), imagen 3 abajo-izq (grande)
  if (projectSlug === 'perfume') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 7', gridRow: '1 / 6' }}>
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" index={2} />
        </div>
        <div style={{ gridColumn: '1 / 7', gridRow: '6 / 13' }}>
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" delay={0.1} index={0} />
        </div>
        <div style={{ gridColumn: '7 / 13', gridRow: '1 / 13' }}>
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.15} index={1} />
        </div>
      </div>
    )
  }

  // Tableware — 5 images: L-shape hero + 2 stacked right + 2 bottom
  if (projectSlug === 'tableware') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 9', gridRow: '1 / 7' }}>
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div style={{ gridColumn: '9 / 13', gridRow: '1 / 4' }}>
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div style={{ gridColumn: '9 / 13', gridRow: '4 / 7' }}>
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div style={{ gridColumn: '1 / 7', gridRow: '7 / 13' }}>
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
        <div style={{ gridColumn: '7 / 13', gridRow: '7 / 13' }}>
          <ProjectImage src={images[4]} alt={`${title} 5`} className="w-full h-full" delay={0.25} index={4} />
        </div>
      </div>
    )
  }

  // Luccica — imagen 4 vertical derecha, resto a la izquierda
  if (projectSlug === 'luccica') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 5', gridRow: '1 / 5' }}>
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div style={{ gridColumn: '1 / 5', gridRow: '5 / 9' }}>
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div style={{ gridColumn: '1 / 5', gridRow: '9 / 13' }}>
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div style={{ gridColumn: '5 / 13', gridRow: '1 / 13' }}>
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
      </div>
    )
  }

  // Raices — 5 portrait images: 2 big top + 3 smaller bottom
  if (projectSlug === 'raices') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 7', gridRow: '1 / 9' }}>
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div style={{ gridColumn: '7 / 13', gridRow: '1 / 9' }}>
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div style={{ gridColumn: '1 / 5', gridRow: '9 / 13' }}>
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div style={{ gridColumn: '5 / 9', gridRow: '9 / 13' }}>
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
        <div style={{ gridColumn: '9 / 13', gridRow: '9 / 13' }}>
          <ProjectImage src={images[4]} alt={`${title} 5`} className="w-full h-full" delay={0.25} index={4} />
        </div>
      </div>
    )
  }

  // Coleccion — portraits left column + wide panoramics stacked right
  if (projectSlug === 'coleccion') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 5', gridRow: '1 / 7' }}>
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div style={{ gridColumn: '1 / 5', gridRow: '7 / 13' }}>
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div style={{ gridColumn: '5 / 13', gridRow: '1 / 5' }}>
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.15} index={2} />
        </div>
        <div style={{ gridColumn: '5 / 13', gridRow: '5 / 9' }}>
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.2} index={3} />
        </div>
        <div style={{ gridColumn: '5 / 13', gridRow: '9 / 13' }}>
          <ProjectImage src={images[4]} alt={`${title} 5`} className="w-full h-full" delay={0.25} index={4} />
        </div>
      </div>
    )
  }

  // Aura — banner+square top, landscape+portrait bottom (full coverage)
  if (projectSlug === 'aura') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 6', gridRow: '1 / 4' }}>
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" index={0} />
        </div>
        <div style={{ gridColumn: '6 / 13', gridRow: '1 / 8' }}>
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" delay={0.1} index={1} />
        </div>
        <div style={{ gridColumn: '1 / 6', gridRow: '4 / 13' }}>
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.15} index={3} />
        </div>
        <div style={{ gridColumn: '6 / 13', gridRow: '8 / 13' }}>
          <ProjectImage src={images[2]} alt={`${title} 3`} className="w-full h-full" delay={0.2} index={2} />
        </div>
      </div>
    )
  }

  // Diamantes — 1 arriba, 2 en medio, 1 abajo
  if (projectSlug === 'diamantes') {
    return (
      <div className={baseGrid} style={gridStyle}>
        <div style={{ gridColumn: '1 / 13', gridRow: '1 / 7' }}>
          <ProjectImage src={images[1]} alt={`${title} 2`} className="w-full h-full" index={1} />
        </div>
        <div style={{ gridColumn: '1 / 8', gridRow: '7 / 13' }}>
          <ProjectImage src={images[0]} alt={title} className="w-full h-full" delay={0.1} index={0} />
        </div>
        <div style={{ gridColumn: '8 / 13', gridRow: '7 / 13' }}>
          <ProjectImage src={images[3]} alt={`${title} 4`} className="w-full h-full" delay={0.15} index={3} />
        </div>
      </div>
    )
  }

  // Default fallback — 2×2 square grid
  return (
    <div className={baseGrid} style={gridStyle}>
      {images.slice(0, 4).map((img, i) => (
        <div key={i} style={{
          gridColumn: i % 2 === 0 ? '1 / 7' : '7 / 13',
          gridRow: i < 2 ? '1 / 7' : '7 / 13',
        }}>
          <ProjectImage src={img} alt={`${title} ${i + 1}`} className="w-full h-full" delay={i * 0.1} index={i} />
        </div>
      ))}
    </div>
  )
}

// Creative reveal animations for images with 3D tilt on hover
function ProjectImage({
  src,
  alt,
  className = '',
  delay = 0,
  index = 0,
  fit = 'cover',
}: {
  src: string
  alt: string
  className?: string
  delay?: number
  index?: number
  fit?: 'cover' | 'contain'
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const reflectionRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const isDesktop = useRef(false)

  useEffect(() => {
    isDesktop.current = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  }, [])

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(containerRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Move light reflection
    if (reflectionRef.current) {
      reflectionRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
      reflectionRef.current.style.opacity = '1'
    }
  }

  const handleMouseEnter = () => {
    if (!isDesktop.current) return
  }

  const handleMouseLeave = () => {
    if (!isDesktop.current || !containerRef.current) return

    gsap.to(containerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    if (reflectionRef.current) {
      reflectionRef.current.style.opacity = '0'
    }
  }

  return (
    <div
      ref={containerRef}
      data-cursor="default"
      className={`relative overflow-hidden rounded-[2rem] ${className}`}
      style={{ perspective: '600px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
              className={`${fit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => { setIsLoading(false); setHasError(true) }}
            />
          </>
        )}
      </div>

      {/* Light reflection overlay */}
      <div
        ref={reflectionRef}
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
    </div>
  )
}
