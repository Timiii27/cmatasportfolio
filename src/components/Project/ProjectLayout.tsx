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

// Color palettes per project
const projectPalettes: Record<string, { primary: string; secondary: string; bg: string }> = {
  bombay: { primary: '#7AC5D8', secondary: '#B5A060', bg: '#0a0a0a' },
  perfume: { primary: '#ffffff', secondary: '#2a2a2a', bg: '#0a0a0a' },
  tableware: { primary: '#B87333', secondary: '#D4AF37', bg: '#0a0a0a' },
  luccica: { primary: '#C0C0C0', secondary: '#FFD700', bg: '#0a0a0a' },
  raices: { primary: '#D4AF37', secondary: '#F5E6D3', bg: '#0a0a0a' },
  aura: { primary: '#8B7355', secondary: '#F5E6D3', bg: '#0a0a0a' },
  coleccion: { primary: '#C4B5A0', secondary: '#8B7355', bg: '#0a0a0a' },
  diamantes: { primary: '#D4AF37', secondary: '#1a1a1a', bg: '#0a0a0a' },
}

export default function ProjectLayout({ project }: ProjectLayoutProps) {
  const { t } = useLanguage()
  const { endTransition, isTransitioning } = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Get all projects from the same category
  const categoryProjects = projects.filter(p => p.category === project.category)

  // Find current project index
  const currentIndex = categoryProjects.findIndex(p => p.slug === project.slug)

  useEffect(() => {
    // End transition overlay and animate content in
    const tl = gsap.timeline()

    // Start with content hidden
    gsap.set(contentRef.current, { opacity: 0 })

    // Small delay then fade in content
    tl.to(contentRef.current, {
      opacity: 1,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.out',
    })

    // End the global transition
    tl.call(() => {
      endTransition()
    }, [], 0.3)

    const ctx = gsap.context(() => {
      // Animate each project section on scroll
      gsap.utils.toArray<HTMLElement>('.project-section').forEach((section, i) => {
        // Title reveal animation
        gsap.from(section.querySelectorAll('.title-word'), {
          y: 120,
          opacity: 0,
          rotationX: -80,
          stagger: 0.08,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        // Description slide in
        gsap.from(section.querySelector('.project-desc'), {
          x: -60,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        // Progress line animation
        gsap.from(section.querySelector('.progress-line'), {
          scaleY: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [endTransition])

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg-primary)]">
      <div ref={contentRef}>
        <Header showBackButton backHref="/" />

        {/* All projects in scroll */}
        {categoryProjects.map((proj, index) => (
          <ProjectSection
            key={proj.slug}
            project={proj}
            index={index}
            total={categoryProjects.length}
            isActive={proj.slug === project.slug}
          />
        ))}

        {/* Category navigation at bottom */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-6 py-3 bg-[var(--bg-secondary)]/90 backdrop-blur-md rounded-full border border-[var(--border-color)]">
            {categoryProjects.map((proj, i) => (
              <a
                key={proj.slug}
                href={`#${proj.slug}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-[var(--text-primary)] w-6'
                    : 'bg-[var(--text-secondary)] hover:bg-[var(--text-primary)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Individual Project Section
function ProjectSection({
  project,
  index,
  total,
  isActive,
}: {
  project: Project
  index: number
  total: number
  isActive: boolean
}) {
  const { t } = useLanguage()
  const palette = projectPalettes[project.slug] || projectPalettes.bombay

  return (
    <section
      id={project.slug}
      className="project-section min-h-screen py-20 px-6 md:px-12 lg:px-20 relative"
    >
      {/* Progress indicator */}
      <div className="absolute left-6 md:left-12 top-20 bottom-20 w-[1px] flex flex-col">
        <div
          className="progress-line h-full origin-top"
          style={{ backgroundColor: palette.primary }}
        />
      </div>

      {/* Project number */}
      <div
        className="absolute left-6 md:left-12 top-20 -translate-x-1/2 text-xs font-light tracking-widest"
        style={{ color: palette.primary }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 ml-8 md:ml-16">
        {/* Left side - Title and Description */}
        <div className="lg:w-[38%] lg:sticky lg:top-24 lg:self-start pt-8 flex flex-col justify-center min-h-[60vh]">
          <div className="overflow-hidden mb-12">
            <h2 className="font-extralight tracking-tight text-[var(--text-primary)]">
              {t(project.titleKey).split(' ').map((word, i) => (
                <span
                  key={i}
                  className="title-word block text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] uppercase"
                  style={{ perspective: '1000px' }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <p className="project-desc text-[var(--text-secondary)] font-light leading-relaxed max-w-sm text-sm md:text-base">
            {t(project.descriptionKey)}
          </p>
        </div>

        {/* Right side - Image Grid */}
        <div className="lg:w-[62%]">
          <ProjectImageGrid project={project} palette={palette} />
        </div>
      </div>

      {/* Divider line */}
      {index < total - 1 && (
        <div className="absolute bottom-0 left-20 right-20 h-[1px] bg-[var(--border-color)]" />
      )}
    </section>
  )
}

// Animated Image Component with creative reveals
function AnimatedImage({
  src,
  alt,
  className = '',
  priority = false,
  delay = 0,
  bgColor = '#141414',
  revealType = 'bubble',
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  delay?: number
  bgColor?: string
  revealType?: 'bubble' | 'slide' | 'scale' | 'rotate'
}) {
  const imageRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!imageRef.current) return

    const animations: Record<string, gsap.TweenVars> = {
      bubble: {
        clipPath: 'circle(0% at 50% 50%)',
        scale: 1.2,
      },
      slide: {
        clipPath: 'inset(0 100% 0 0)',
        scale: 1,
      },
      scale: {
        scale: 0,
        borderRadius: '50%',
      },
      rotate: {
        rotation: -15,
        scale: 0.8,
        opacity: 0,
      },
    }

    const toAnimations: Record<string, gsap.TweenVars> = {
      bubble: {
        clipPath: 'circle(100% at 50% 50%)',
        scale: 1,
      },
      slide: {
        clipPath: 'inset(0 0% 0 0)',
        scale: 1,
      },
      scale: {
        scale: 1,
        borderRadius: '20px',
      },
      rotate: {
        rotation: 0,
        scale: 1,
        opacity: 1,
      },
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        animations[revealType],
        {
          ...toAnimations[revealType],
          duration: 1.2,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Parallax effect on scroll
      const imgElement = imageRef.current?.querySelector('img')
      if (imgElement) {
        gsap.to(imgElement, {
          yPercent: -10,
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
      className={`relative overflow-hidden rounded-[20px] group ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#141414] text-[#404040]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12 opacity-30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-[#141414] skeleton" />
          )}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            priority={priority}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </>
      )}
    </div>
  )
}

// Color swatch component
function ColorSwatch({ color, delay }: { color: string; delay: number }) {
  const swatchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!swatchRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        swatchRef.current,
        {
          scale: 0,
          rotation: -90,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: swatchRef.current,
            start: 'top 85%',
          },
        }
      )
    }, swatchRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={swatchRef}
      className="w-full h-full rounded-[16px] swatch"
      style={{ backgroundColor: color }}
    />
  )
}

function ProjectImageGrid({
  project,
  palette,
}: {
  project: Project
  palette: { primary: string; secondary: string; bg: string }
}) {
  const { t } = useLanguage()
  const images = project.images
  const revealTypes: Array<'bubble' | 'slide' | 'scale' | 'rotate'> = ['bubble', 'slide', 'scale', 'rotate']

  switch (project.gridLayout) {
    case 'bombay':
      return (
        <div className="space-y-4">
          <AnimatedImage
            src={images[0] || ''}
            alt={t(project.titleKey)}
            className="w-full h-[350px] md:h-[450px]"
            priority
            delay={0}
            bgColor="#B8D4E3"
            revealType="bubble"
          />
          <div className="grid grid-cols-4 gap-4">
            <div className="h-[120px] md:h-[150px]">
              <ColorSwatch color={palette.primary} delay={0.2} />
            </div>
            <div className="h-[120px] md:h-[150px]">
              <ColorSwatch color={palette.secondary} delay={0.3} />
            </div>
            <AnimatedImage
              src={images[3] || ''}
              alt={`${t(project.titleKey)} 4`}
              className="w-full h-[120px] md:h-[150px]"
              delay={0.4}
              revealType="slide"
            />
            <AnimatedImage
              src={images[4] || ''}
              alt={`${t(project.titleKey)} 5`}
              className="w-full h-[120px] md:h-[150px]"
              delay={0.5}
              revealType="slide"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AnimatedImage
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[180px] md:h-[220px]"
              delay={0.6}
              revealType="scale"
            />
            <AnimatedImage
              src={images[2] || ''}
              alt={`${t(project.titleKey)} 3`}
              className="w-full h-[180px] md:h-[220px]"
              delay={0.7}
              revealType="scale"
            />
            <AnimatedImage
              src={images[4] || ''}
              alt={`${t(project.titleKey)} 5`}
              className="w-full h-[180px] md:h-[220px]"
              delay={0.8}
              revealType="scale"
            />
          </div>
        </div>
      )

    case 'perfume':
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 space-y-4">
            <AnimatedImage
              src={images[0] || ''}
              alt={t(project.titleKey)}
              className="w-full h-[280px] md:h-[340px]"
              priority
              delay={0}
              bgColor="#0a0a0a"
              revealType="slide"
            />
            <AnimatedImage
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[280px] md:h-[340px]"
              delay={0.3}
              bgColor="#0a0a0a"
              revealType="slide"
            />
          </div>
          <div className="col-span-6">
            <AnimatedImage
              src={images[2] || ''}
              alt={`${t(project.titleKey)} 3`}
              className="w-full h-[576px] md:h-[696px]"
              delay={0.2}
              bgColor="#0a0a0a"
              revealType="bubble"
            />
          </div>
        </div>
      )

    case 'tableware':
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 space-y-4">
            <AnimatedImage
              src={images[0] || ''}
              alt={`${t(project.titleKey)} 1`}
              className="w-full h-[160px] md:h-[200px]"
              priority
              delay={0}
              bgColor="#E8E0D8"
              revealType="rotate"
            />
            <div className="grid grid-cols-2 gap-4">
              <AnimatedImage
                src={images[1] || ''}
                alt={`${t(project.titleKey)} 2`}
                className="w-full h-[160px] md:h-[200px]"
                delay={0.15}
                bgColor="#E8E0D8"
                revealType="bubble"
              />
              <AnimatedImage
                src={images[2] || ''}
                alt={`${t(project.titleKey)} 3`}
                className="w-full h-[160px] md:h-[200px]"
                delay={0.25}
                bgColor="#E8E0D8"
                revealType="bubble"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AnimatedImage
                src={images[4] || ''}
                alt={`${t(project.titleKey)} 5`}
                className="w-full h-[160px] md:h-[200px]"
                delay={0.45}
                bgColor="#E8E0D8"
                revealType="scale"
              />
              <AnimatedImage
                src={images[5] || ''}
                alt={`${t(project.titleKey)} 6`}
                className="w-full h-[160px] md:h-[200px]"
                delay={0.55}
                bgColor="#E8E0D8"
                revealType="scale"
              />
            </div>
          </div>
          <div className="col-span-6">
            <AnimatedImage
              src={images[3] || ''}
              alt={`${t(project.titleKey)} 4`}
              className="w-full h-full min-h-[520px] md:min-h-[640px]"
              delay={0.35}
              bgColor="#E8E0D8"
              revealType="slide"
            />
          </div>
        </div>
      )

    case 'luccica':
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 space-y-4">
            <AnimatedImage
              src={images[0] || ''}
              alt={`${t(project.titleKey)} 1`}
              className="w-full h-[200px] md:h-[260px]"
              priority
              delay={0}
              revealType="rotate"
            />
            <AnimatedImage
              src={images[2] || ''}
              alt={`${t(project.titleKey)} 3`}
              className="w-full h-[200px] md:h-[260px]"
              delay={0.2}
              revealType="rotate"
            />
          </div>
          <div className="col-span-7">
            <AnimatedImage
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[416px] md:h-[536px]"
              delay={0.1}
              revealType="bubble"
            />
          </div>
          <div className="col-span-4">
            <AnimatedImage
              src={images[3] || ''}
              alt={`${t(project.titleKey)} 4`}
              className="w-full h-[200px] md:h-[240px]"
              delay={0.3}
              revealType="slide"
            />
          </div>
          <div className="col-span-4">
            <AnimatedImage
              src={images[4] || ''}
              alt={`${t(project.titleKey)} 5`}
              className="w-full h-[200px] md:h-[240px]"
              delay={0.4}
              revealType="slide"
            />
          </div>
          <div className="col-span-4">
            <AnimatedImage
              src={images[5] || ''}
              alt={`${t(project.titleKey)} 6`}
              className="w-full h-[200px] md:h-[240px]"
              delay={0.5}
              revealType="slide"
            />
          </div>
        </div>
      )

    case 'raices':
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AnimatedImage
                src={images[0] || ''}
                alt={`${t(project.titleKey)} 1`}
                className="w-full h-[140px] md:h-[170px]"
                priority
                delay={0}
                revealType="bubble"
              />
              <AnimatedImage
                src={images[1] || ''}
                alt={`${t(project.titleKey)} 2`}
                className="w-full h-[140px] md:h-[170px]"
                delay={0.1}
                revealType="bubble"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AnimatedImage
                src={images[3] || ''}
                alt={`${t(project.titleKey)} 4`}
                className="w-full h-[140px] md:h-[170px]"
                delay={0.2}
                revealType="scale"
              />
              <AnimatedImage
                src={images[4] || ''}
                alt={`${t(project.titleKey)} 5`}
                className="w-full h-[140px] md:h-[170px]"
                delay={0.3}
                revealType="scale"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <AnimatedImage
                src={images[6] || ''}
                alt={`${t(project.titleKey)} 7`}
                className="w-full h-[140px] md:h-[170px]"
                delay={0.4}
                revealType="rotate"
              />
              <AnimatedImage
                src={images[7] || ''}
                alt={`${t(project.titleKey)} 8`}
                className="w-full h-[140px] md:h-[170px]"
                delay={0.5}
                revealType="rotate"
              />
              <AnimatedImage
                src={images[8] || ''}
                alt={`${t(project.titleKey)} 9`}
                className="w-full h-[140px] md:h-[170px]"
                delay={0.6}
                revealType="rotate"
              />
            </div>
          </div>
          <div className="col-span-8">
            <AnimatedImage
              src={images[2] || ''}
              alt={`${t(project.titleKey)} 3`}
              className="w-full h-full min-h-[468px] md:min-h-[558px]"
              delay={0.15}
              revealType="slide"
            />
          </div>
        </div>
      )

    case 'aura':
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <AnimatedImage
              src={images[0] || ''}
              alt={t(project.titleKey)}
              className="w-full h-[200px] md:h-[260px]"
              priority
              delay={0}
              bgColor="#F5E6D3"
              revealType="bubble"
            />
          </div>
          <div className="col-span-6">
            <AnimatedImage
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[200px] md:h-[260px]"
              delay={0.15}
              bgColor="#F5E6D3"
              revealType="bubble"
            />
          </div>
          <div className="col-span-6">
            <AnimatedImage
              src={images[2] || ''}
              alt={`${t(project.titleKey)} 3`}
              className="w-full h-[280px] md:h-[360px]"
              delay={0.3}
              bgColor="#E8DDD0"
              revealType="scale"
            />
          </div>
          <div className="col-span-6">
            <AnimatedImage
              src={images[3] || ''}
              alt={`${t(project.titleKey)} 4`}
              className="w-full h-[280px] md:h-[360px]"
              delay={0.45}
              bgColor="#3D3428"
              revealType="scale"
            />
          </div>
        </div>
      )

    case 'coleccion':
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 space-y-4">
            <AnimatedImage
              src={images[0] || ''}
              alt={`${t(project.titleKey)} 1`}
              className="w-full h-[280px] md:h-[340px]"
              priority
              delay={0}
              revealType="bubble"
            />
            <AnimatedImage
              src={images[2] || ''}
              alt={`${t(project.titleKey)} 3`}
              className="w-full h-[280px] md:h-[340px]"
              delay={0.3}
              revealType="bubble"
            />
          </div>
          <div className="col-span-7 space-y-4">
            <AnimatedImage
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[180px] md:h-[220px]"
              delay={0.15}
              revealType="slide"
            />
            <AnimatedImage
              src={images[3] || ''}
              alt={`${t(project.titleKey)} 4`}
              className="w-full h-[180px] md:h-[220px]"
              delay={0.35}
              revealType="slide"
            />
            <AnimatedImage
              src={images[4] || ''}
              alt={`${t(project.titleKey)} 5`}
              className="w-full h-[180px] md:h-[220px]"
              delay={0.45}
              revealType="slide"
            />
          </div>
        </div>
      )

    case 'diamantes':
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <AnimatedImage
              src={images[0] || ''}
              alt={`${t(project.titleKey)} 1`}
              className="w-full h-[220px] md:h-[280px]"
              priority
              delay={0}
              bgColor="#0a0a0a"
              revealType="rotate"
            />
          </div>
          <div className="col-span-4">
            <AnimatedImage
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[220px] md:h-[280px]"
              delay={0.12}
              bgColor="#0a0a0a"
              revealType="rotate"
            />
          </div>
          <div className="col-span-4">
            <AnimatedImage
              src={images[2] || ''}
              alt={`${t(project.titleKey)} 3`}
              className="w-full h-[220px] md:h-[280px]"
              delay={0.24}
              bgColor="#0a0a0a"
              revealType="rotate"
            />
          </div>
          <div className="col-span-6">
            <AnimatedImage
              src={images[3] || ''}
              alt={`${t(project.titleKey)} 4`}
              className="w-full h-[200px] md:h-[260px]"
              delay={0.36}
              revealType="bubble"
            />
          </div>
          <div className="col-span-6">
            <AnimatedImage
              src={images[4] || ''}
              alt={`${t(project.titleKey)} 5`}
              className="w-full h-[200px] md:h-[260px]"
              delay={0.48}
              revealType="bubble"
            />
          </div>
          <div className="col-span-12">
            <AnimatedImage
              src={images[5] || ''}
              alt={`${t(project.titleKey)} 6`}
              className="w-full h-[200px] md:h-[260px]"
              delay={0.6}
              revealType="slide"
            />
          </div>
        </div>
      )

    default:
      return (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <AnimatedImage
              key={i}
              src={img}
              alt={`${t(project.titleKey)} ${i + 1}`}
              className="w-full h-[250px]"
              priority={i === 0}
              delay={i * 0.15}
              revealType={revealTypes[i % revealTypes.length]}
            />
          ))}
        </div>
      )
  }
}
