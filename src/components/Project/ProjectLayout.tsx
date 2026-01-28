'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useTransition } from '@/context/TransitionContext'
import { Project, projects } from '@/lib/projects'
import Header from '@/components/Header'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProjectLayoutProps {
  project: Project
}

// Color palettes per project with additional accent
const projectPalettes: Record<string, { primary: string; secondary: string; accent: string }> = {
  bombay: { primary: '#7AC5D8', secondary: '#B5A060', accent: '#5BA3B8' },
  perfume: { primary: '#E8E8E8', secondary: '#1a1a1a', accent: '#C0C0C0' },
  tableware: { primary: '#B87333', secondary: '#D4AF37', accent: '#8B5A2B' },
  luccica: { primary: '#C0C0C0', secondary: '#FFD700', accent: '#A0A0A0' },
  raices: { primary: '#D4AF37', secondary: '#F5E6D3', accent: '#B8960F' },
  aura: { primary: '#8B7355', secondary: '#F5E6D3', accent: '#6B5344' },
  coleccion: { primary: '#C4B5A0', secondary: '#8B7355', accent: '#A49580' },
  diamantes: { primary: '#D4AF37', secondary: '#1a1a1a', accent: '#B8960F' },
}

// Layout styles for each project
const projectLayouts: Record<string, 'hero-left' | 'hero-right' | 'split' | 'centered' | 'mosaic' | 'magazine' | 'editorial' | 'gallery'> = {
  bombay: 'hero-left',
  perfume: 'editorial',
  tableware: 'mosaic',
  luccica: 'magazine',
  raices: 'hero-right',
  aura: 'split',
  coleccion: 'gallery',
  diamantes: 'centered',
}

export default function ProjectLayout({ project }: ProjectLayoutProps) {
  const { t } = useLanguage()
  const { endTransition } = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const categoryProjects = projects.filter(p => p.category === project.category)
  const currentIndex = categoryProjects.findIndex(p => p.slug === project.slug)

  useEffect(() => {
    const tl = gsap.timeline()
    gsap.set(contentRef.current, { opacity: 0 })

    tl.to(contentRef.current, {
      opacity: 1,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.out',
    })

    tl.call(() => endTransition(), [], 0.3)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-section').forEach((section) => {
        // Smooth title reveal
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

        // Description fade in
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

        // Accent line animation
        const lineEl = section.querySelector('.accent-line')
        if (lineEl) {
          gsap.from(lineEl, {
            scaleX: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [endTransition])

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <div ref={contentRef}>
        <Header showBackButton backHref="/" />

        {categoryProjects.map((proj, index) => (
          <ProjectSection
            key={proj.slug}
            project={proj}
            index={index}
            total={categoryProjects.length}
          />
        ))}

        {/* Navigation dots */}
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full border border-[#e8e4de] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            {categoryProjects.map((proj, i) => (
              <a
                key={proj.slug}
                href={`#${proj.slug}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-[#1a1a1a] w-6' : 'bg-[#c9c4bc] hover:bg-[#1a1a1a]'
                }`}
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

function ProjectSection({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const { t } = useLanguage()
  const palette = projectPalettes[project.slug] || projectPalettes.bombay
  const layout = projectLayouts[project.slug] || 'hero-left'

  const title = t(project.titleKey)
  const description = t(project.descriptionKey)
  const images = project.images

  // Alternate backgrounds - white and a warm sand tone
  const isEven = index % 2 === 0
  const bgColor = isEven ? '#ffffff' : '#f7f3ed'
  const prevBgColor = isEven ? '#f7f3ed' : '#ffffff'

  return (
    <>
      {/* Wave transition from previous section */}
      {index > 0 && (
        <div className="relative h-28 md:h-40" style={{ backgroundColor: prevBgColor }}>
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
          >
            {/* Subtle shadow/depth layer */}
            <path
              d="M0,20 C360,100 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,140 L0,140 Z"
              fill={bgColor}
              fillOpacity="0.5"
            />
            {/* Main wave */}
            <path
              d="M0,40 C360,120 720,50 1080,90 C1260,110 1380,70 1440,90 L1440,140 L0,140 Z"
              fill={bgColor}
            />
          </svg>
        </div>
      )}

      <section
        id={project.slug}
        className="project-section min-h-screen relative"
        style={{ backgroundColor: bgColor }}
      >
        {/* Render based on layout type */}
        {layout === 'hero-left' && (
          <HeroLeftLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
        {layout === 'hero-right' && (
          <HeroRightLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
        {layout === 'editorial' && (
          <EditorialLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
        {layout === 'mosaic' && (
          <MosaicLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
        {layout === 'magazine' && (
          <MagazineLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
        {layout === 'split' && (
          <SplitLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
        {layout === 'gallery' && (
          <GalleryLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
        {layout === 'centered' && (
          <CenteredLayout title={title} description={description} images={images} palette={palette} index={index} />
        )}
      </section>
    </>
  )
}

// Layout Props
interface LayoutProps {
  title: string
  description: string
  images: string[]
  palette: { primary: string; secondary: string; accent: string }
  index: number
}

// Hero Left Layout - Title and text left, large hero image right
function HeroLeftLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left content */}
      <div className="lg:w-[45%] p-8 md:p-16 lg:p-20 flex flex-col justify-center">
        <span className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: palette.accent }}>
          {String(index + 1).padStart(2, '0')} — Proyecto
        </span>
        <div className="accent-line w-16 h-[2px] mb-8 origin-left" style={{ backgroundColor: palette.accent }} />
        <h2 className="project-title text-3xl md:text-4xl lg:text-5xl font-extralight text-[#1a1a1a] leading-tight mb-8">
          {title}
        </h2>
        <p className="project-desc text-[#4a4a4a] text-lg leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      {/* Right images */}
      <div className="lg:w-[55%] p-6 md:p-8 lg:p-12 space-y-6">
        <AnimatedImage src={images[0] || ''} alt={title} className="w-full h-[400px] md:h-[500px]" priority revealType="bubble" />
        <div className="grid grid-cols-2 gap-6">
          <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-[200px] md:h-[250px]" delay={0.2} revealType="slide" />
          <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-[200px] md:h-[250px]" delay={0.3} revealType="slide" />
        </div>
        {images[3] && (
          <div className="grid grid-cols-3 gap-4">
            <ColorSwatch color={palette.primary} delay={0.4} />
            <ColorSwatch color={palette.secondary} delay={0.5} />
            <AnimatedImage src={images[3] || ''} alt={`${title} 4`} className="w-full h-[120px]" delay={0.6} revealType="scale" />
          </div>
        )}
      </div>
    </div>
  )
}

// Hero Right Layout - Mirror of hero left
function HeroRightLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">
      {/* Left images */}
      <div className="lg:w-[55%] p-6 md:p-8 lg:p-12 space-y-6">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <AnimatedImage src={images[0] || ''} alt={title} className="w-full h-[350px] md:h-[450px]" priority revealType="slide" />
          </div>
          <div className="col-span-2 space-y-4">
            <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-[168px] md:h-[217px]" delay={0.15} revealType="bubble" />
            <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-[168px] md:h-[217px]" delay={0.25} revealType="bubble" />
          </div>
        </div>
        <AnimatedImage src={images[3] || ''} alt={`${title} 4`} className="w-full h-[280px] md:h-[350px]" delay={0.35} revealType="scale" />
      </div>

      {/* Right content */}
      <div className="lg:w-[45%] p-8 md:p-16 lg:p-20 flex flex-col justify-center items-end text-right">
        <span className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: palette.accent }}>
          Proyecto — {String(index + 1).padStart(2, '0')}
        </span>
        <div className="accent-line w-16 h-[2px] mb-8 origin-right" style={{ backgroundColor: palette.accent }} />
        <h2 className="project-title text-3xl md:text-4xl lg:text-5xl font-extralight text-[#1a1a1a] leading-tight mb-8">
          {title}
        </h2>
        <p className="project-desc text-[#4a4a4a] text-lg leading-relaxed max-w-lg">
          {description}
        </p>
      </div>
    </div>
  )
}

// Editorial Layout - Elegant magazine style
function EditorialLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-20">
      {/* Header area */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: palette.accent }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="project-title text-4xl md:text-5xl lg:text-6xl font-extralight text-[#1a1a1a] leading-tight">
            {title}
          </h2>
        </div>
        <div className="accent-line w-32 h-[1px] hidden md:block" style={{ backgroundColor: palette.accent }} />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-5">
          <AnimatedImage src={images[0] || ''} alt={title} className="w-full h-[400px] md:h-[600px]" priority revealType="slide" />
        </div>
        <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
          <p className="project-desc text-[#4a4a4a] text-lg md:text-xl leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="flex-1 grid grid-cols-2 gap-6">
            <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-full min-h-[250px]" delay={0.2} revealType="bubble" />
            <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-full min-h-[250px]" delay={0.3} revealType="bubble" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Mosaic Layout - Asymmetric grid
function MosaicLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-16">
      {/* Top row with title */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-end pb-6">
          <span className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: palette.accent }}>
            {String(index + 1).padStart(2, '0')} — Diseño
          </span>
          <h2 className="project-title text-3xl md:text-4xl font-extralight text-[#1a1a1a] leading-tight mb-6">
            {title}
          </h2>
          <div className="accent-line w-12 h-[2px] origin-left" style={{ backgroundColor: palette.accent }} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <AnimatedImage src={images[0] || ''} alt={title} className="w-full h-[300px] md:h-[400px]" priority revealType="bubble" />
        </div>
      </div>

      {/* Bottom mosaic */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6 lg:col-span-3 space-y-6">
          <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-[180px] md:h-[220px]" delay={0.15} revealType="scale" />
          <ColorSwatch color={palette.primary} delay={0.25} className="h-[100px]" />
        </div>
        <div className="col-span-6 lg:col-span-3">
          <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-[296px] md:h-[336px]" delay={0.2} revealType="slide" />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <p className="project-desc text-[#4a4a4a] text-base md:text-lg leading-relaxed">
            {description}
          </p>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <AnimatedImage src={images[3] || ''} alt={`${title} 4`} className="w-full h-[180px] md:h-[200px]" delay={0.3} revealType="rotate" />
            <AnimatedImage src={images[4] || ''} alt={`${title} 5`} className="w-full h-[180px] md:h-[200px]" delay={0.4} revealType="rotate" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Magazine Layout - Bold typography focus
function MagazineLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Big title header */}
      <div className="p-6 md:p-12 lg:p-16 pb-0">
        <div className="flex items-center gap-6 mb-4">
          <div className="accent-line flex-1 h-[1px]" style={{ backgroundColor: palette.accent }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: palette.accent }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h2 className="project-title text-4xl md:text-6xl lg:text-7xl font-extralight text-[#1a1a1a] leading-none tracking-tight">
          {title}
        </h2>
      </div>

      {/* Content area */}
      <div className="flex-1 p-6 md:p-12 lg:p-16 pt-8">
        <div className="grid grid-cols-12 gap-6 h-full">
          <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
            <p className="project-desc text-[#4a4a4a] text-lg leading-relaxed mb-8">
              {description}
            </p>
            <div className="space-y-4">
              <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-[200px]" delay={0.3} revealType="scale" />
              <div className="grid grid-cols-2 gap-4">
                <ColorSwatch color={palette.primary} delay={0.4} className="h-[80px]" />
                <ColorSwatch color={palette.secondary} delay={0.45} className="h-[80px]" />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-2 gap-6 h-full">
              <AnimatedImage src={images[0] || ''} alt={title} className="w-full h-[300px] md:h-full" priority revealType="slide" />
              <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-[300px] md:h-full" delay={0.15} revealType="bubble" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Split Layout - Clean 50/50 split
function SplitLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left - Full bleed image */}
      <div className="relative h-[50vh] lg:h-screen">
        <AnimatedImage src={images[0] || ''} alt={title} className="absolute inset-0 w-full h-full" priority revealType="slide" roundedClass="" />
      </div>

      {/* Right - Content */}
      <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <span className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: palette.accent }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="project-title text-3xl md:text-4xl lg:text-5xl font-extralight text-[#1a1a1a] leading-tight mb-6">
          {title}
        </h2>
        <div className="accent-line w-20 h-[2px] mb-8 origin-left" style={{ backgroundColor: palette.accent }} />
        <p className="project-desc text-[#4a4a4a] text-lg leading-relaxed mb-12 max-w-md">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-[160px] md:h-[200px]" delay={0.2} revealType="bubble" />
          <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-[160px] md:h-[200px]" delay={0.3} revealType="bubble" />
          <AnimatedImage src={images[3] || ''} alt={`${title} 4`} className="w-full h-[160px] md:h-[200px]" delay={0.4} revealType="scale" />
          <div className="h-[160px] md:h-[200px]">
            <ColorSwatch color={palette.primary} delay={0.5} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Gallery Layout - Image-focused grid
function GalleryLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-16">
      {/* Compact header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: palette.accent }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="accent-line w-8 h-[1px]" style={{ backgroundColor: palette.accent }} />
          <h2 className="project-title text-2xl md:text-3xl font-extralight text-[#1a1a1a]">
            {title}
          </h2>
        </div>
        <p className="project-desc text-[#4a4a4a] text-base max-w-md">
          {description}
        </p>
      </div>

      {/* Image gallery */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-8">
          <AnimatedImage src={images[0] || ''} alt={title} className="w-full h-[350px] md:h-[500px]" priority revealType="bubble" />
        </div>
        <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4 md:gap-6">
          <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-[170px] md:h-full" delay={0.15} revealType="slide" />
          <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-[170px] md:h-full" delay={0.25} revealType="slide" />
        </div>
        <div className="col-span-6 md:col-span-4">
          <AnimatedImage src={images[3] || ''} alt={`${title} 4`} className="w-full h-[200px] md:h-[280px]" delay={0.35} revealType="scale" />
        </div>
        <div className="col-span-6 md:col-span-4">
          <AnimatedImage src={images[4] || ''} alt={`${title} 5`} className="w-full h-[200px] md:h-[280px]" delay={0.45} revealType="scale" />
        </div>
        <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4">
          <ColorSwatch color={palette.primary} delay={0.5} className="h-[200px] md:h-[280px]" />
          <ColorSwatch color={palette.secondary} delay={0.55} className="h-[200px] md:h-[280px]" />
        </div>
      </div>
    </div>
  )
}

// Centered Layout - Symmetrical focus
function CenteredLayout({ title, description, images, palette, index }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
      {/* Centered header */}
      <div className="text-center max-w-3xl mb-12">
        <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: palette.accent }}>
          {String(index + 1).padStart(2, '0')} — Proyecto
        </span>
        <h2 className="project-title text-4xl md:text-5xl lg:text-6xl font-extralight text-[#1a1a1a] leading-tight mb-6">
          {title}
        </h2>
        <div className="accent-line w-16 h-[2px] mx-auto mb-6 origin-center" style={{ backgroundColor: palette.accent }} />
        <p className="project-desc text-[#4a4a4a] text-lg leading-relaxed">
          {description}
        </p>
      </div>

      {/* Centered image grid */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          <AnimatedImage src={images[0] || ''} alt={title} className="w-full h-[180px] md:h-[280px]" priority delay={0} revealType="rotate" />
          <AnimatedImage src={images[1] || ''} alt={`${title} 2`} className="w-full h-[180px] md:h-[280px]" delay={0.1} revealType="rotate" />
          <AnimatedImage src={images[2] || ''} alt={`${title} 3`} className="w-full h-[180px] md:h-[280px]" delay={0.2} revealType="rotate" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <AnimatedImage src={images[3] || ''} alt={`${title} 4`} className="w-full h-[200px] md:h-[300px]" delay={0.3} revealType="bubble" />
          <AnimatedImage src={images[4] || ''} alt={`${title} 5`} className="w-full h-[200px] md:h-[300px]" delay={0.4} revealType="bubble" />
        </div>
      </div>
    </div>
  )
}

// Animated Image Component
function AnimatedImage({
  src,
  alt,
  className = '',
  priority = false,
  delay = 0,
  revealType = 'bubble',
  roundedClass = 'rounded-2xl',
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  delay?: number
  revealType?: 'bubble' | 'slide' | 'scale' | 'rotate'
  roundedClass?: string
}) {
  const imageRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!imageRef.current) return

    const animations: Record<string, gsap.TweenVars> = {
      bubble: { clipPath: 'circle(0% at 50% 50%)', scale: 1.1 },
      slide: { clipPath: 'inset(0 100% 0 0)', scale: 1 },
      scale: { scale: 0, opacity: 0 },
      rotate: { rotation: -8, scale: 0.9, opacity: 0 },
    }

    const toAnimations: Record<string, gsap.TweenVars> = {
      bubble: { clipPath: 'circle(100% at 50% 50%)', scale: 1 },
      slide: { clipPath: 'inset(0 0% 0 0)', scale: 1 },
      scale: { scale: 1, opacity: 1 },
      rotate: { rotation: 0, scale: 1, opacity: 1 },
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, animations[revealType], {
        ...toAnimations[revealType],
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      const imgElement = imageRef.current?.querySelector('img')
      if (imgElement) {
        gsap.to(imgElement, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, imageRef)

    return () => ctx.revert()
  }, [delay, revealType])

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden group ${roundedClass} ${className}`}
      style={{ backgroundColor: '#ebe7e0' }}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f7f3ed] text-[#a09a92]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 opacity-40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      ) : (
        <>
          {isLoading && <div className="absolute inset-0 bg-[#ebe7e0] skeleton" />}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            priority={priority}
            onLoad={() => setIsLoading(false)}
            onError={() => { setIsLoading(false); setHasError(true) }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </>
      )}
    </div>
  )
}

// Color Swatch Component
function ColorSwatch({ color, delay, className = '' }: { color: string; delay: number; className?: string }) {
  const swatchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!swatchRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(swatchRef.current, { scale: 0, rotation: -45 }, {
        scale: 1,
        rotation: 0,
        duration: 0.7,
        delay,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: swatchRef.current, start: 'top 85%' },
      })
    }, swatchRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={swatchRef}
      className={`w-full rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] ${className}`}
      style={{ backgroundColor: color, minHeight: className.includes('h-') ? undefined : '100px' }}
    />
  )
}
