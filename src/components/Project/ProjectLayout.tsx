'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Project, getNextProject, getPreviousProject } from '@/lib/projects'
import Header from '@/components/Header'
import ImageCard from '@/components/ui/ImageCard'
import Link from 'next/link'

interface ProjectLayoutProps {
  project: Project
}

export default function ProjectLayout({ project }: ProjectLayoutProps) {
  const { t } = useLanguage()
  const nextProject = getNextProject(project)
  const prevProject = getPreviousProject(project)

  return (
    <div className="min-h-screen">
      <Header showBackButton backHref="/" />

      <main className="pt-20 pb-12 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left side - Title and Description */}
          <div className="lg:w-[35%] lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm text-[var(--text-secondary)] font-light mb-2 tracking-wider uppercase">
              {t(`category.${project.category}`)}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-6">
              {t(project.titleKey)}
            </h1>
            <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-md">
              {t(project.descriptionKey)}
            </p>

            {/* Navigation */}
            <div className="mt-12 flex items-center gap-6">
              {prevProject && (
                <Link
                  href={`/${prevProject.category}/${prevProject.slug}`}
                  className="flex items-center gap-2 text-sm font-light hover:opacity-70 transition-opacity"
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
                  {t('nav.prev')}
                </Link>
              )}
              {nextProject && (
                <Link
                  href={`/${nextProject.category}/${nextProject.slug}`}
                  className="flex items-center gap-2 text-sm font-light hover:opacity-70 transition-opacity"
                >
                  {t('nav.next')}
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Image Grid */}
          <div className="lg:w-[65%]">
            <ProjectImageGrid project={project} />
          </div>
        </div>
      </main>
    </div>
  )
}

function ProjectImageGrid({ project }: { project: Project }) {
  const { t } = useLanguage()
  const images = project.images

  switch (project.gridLayout) {
    case 'bombay':
      return (
        <div className="space-y-4">
          {/* Large image on top */}
          <ImageCard
            src={images[0] || ''}
            alt={t(project.titleKey)}
            className="w-full h-[400px] md:h-[500px]"
            priority
          />
          {/* 4 small images below */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.slice(1, 5).map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`${t(project.titleKey)} ${i + 2}`}
                className="w-full h-[150px] md:h-[180px]"
              />
            ))}
          </div>
        </div>
      )

    case 'perfume':
      return (
        <div className="grid grid-cols-2 gap-4">
          {/* Two medium images on left */}
          <div className="space-y-4">
            <ImageCard
              src={images[0] || ''}
              alt={t(project.titleKey)}
              className="w-full h-[250px] md:h-[300px]"
              priority
            />
            <ImageCard
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[250px] md:h-[300px]"
            />
          </div>
          {/* One tall image on right */}
          <ImageCard
            src={images[2] || ''}
            alt={`${t(project.titleKey)} 3`}
            className="w-full h-[516px] md:h-[616px]"
          />
        </div>
      )

    case 'tableware':
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.slice(0, 6).map((img, i) => (
            <ImageCard
              key={i}
              src={img}
              alt={`${t(project.titleKey)} ${i + 1}`}
              className="w-full h-[200px] md:h-[250px]"
              priority={i === 0}
            />
          ))}
        </div>
      )

    case 'luccica':
      return (
        <div className="space-y-4">
          {/* First row: 2 images */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(0, 2).map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`${t(project.titleKey)} ${i + 1}`}
                className="w-full h-[250px] md:h-[300px]"
                priority={i === 0}
              />
            ))}
          </div>
          {/* Second row: 1 wide image */}
          <ImageCard
            src={images[2] || ''}
            alt={`${t(project.titleKey)} 3`}
            className="w-full h-[300px] md:h-[400px]"
          />
          {/* Third row: 3 images */}
          <div className="grid grid-cols-3 gap-4">
            {images.slice(3, 6).map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`${t(project.titleKey)} ${i + 4}`}
                className="w-full h-[180px] md:h-[220px]"
              />
            ))}
          </div>
        </div>
      )

    case 'raices':
      return (
        <div className="grid grid-cols-3 gap-4">
          {images.slice(0, 9).map((img, i) => (
            <ImageCard
              key={i}
              src={img}
              alt={`${t(project.titleKey)} ${i + 1}`}
              className="w-full h-[180px] md:h-[220px]"
              priority={i === 0}
            />
          ))}
        </div>
      )

    case 'coleccion':
      return (
        <div className="space-y-4">
          {/* First row: 2 images */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(0, 2).map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`${t(project.titleKey)} ${i + 1}`}
                className="w-full h-[280px] md:h-[350px]"
                priority={i === 0}
              />
            ))}
          </div>
          {/* Second row: 1 wide image */}
          <ImageCard
            src={images[2] || ''}
            alt={`${t(project.titleKey)} 3`}
            className="w-full h-[300px] md:h-[400px]"
          />
          {/* Third row: 2 images */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(3, 5).map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`${t(project.titleKey)} ${i + 4}`}
                className="w-full h-[280px] md:h-[350px]"
              />
            ))}
          </div>
        </div>
      )

    case 'aura':
      return (
        <div className="space-y-4">
          {/* First row: 2x2 grid with one spanning full width */}
          <div className="grid grid-cols-2 gap-4">
            <ImageCard
              src={images[0] || ''}
              alt={t(project.titleKey)}
              className="w-full h-[250px] md:h-[300px]"
              priority
            />
            <ImageCard
              src={images[1] || ''}
              alt={`${t(project.titleKey)} 2`}
              className="w-full h-[250px] md:h-[300px]"
            />
          </div>
          {/* Full width image */}
          <ImageCard
            src={images[2] || ''}
            alt={`${t(project.titleKey)} 3`}
            className="w-full h-[300px] md:h-[400px]"
          />
          {/* Last image */}
          <ImageCard
            src={images[3] || ''}
            alt={`${t(project.titleKey)} 4`}
            className="w-full h-[250px] md:h-[300px]"
          />
        </div>
      )

    case 'diamantes':
      return (
        <div className="space-y-4">
          {/* First row: 3 images */}
          <div className="grid grid-cols-3 gap-4">
            {images.slice(0, 3).map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`${t(project.titleKey)} ${i + 1}`}
                className="w-full h-[180px] md:h-[220px]"
                priority={i === 0}
              />
            ))}
          </div>
          {/* Second row: 2 images centered */}
          <div className="grid grid-cols-2 gap-4 max-w-[66%] mx-auto">
            {images.slice(3, 5).map((img, i) => (
              <ImageCard
                key={i}
                src={img}
                alt={`${t(project.titleKey)} ${i + 4}`}
                className="w-full h-[180px] md:h-[220px]"
              />
            ))}
          </div>
          {/* Third row: 1 image centered */}
          {images[5] && (
            <div className="max-w-[33%] mx-auto">
              <ImageCard
                src={images[5]}
                alt={`${t(project.titleKey)} 6`}
                className="w-full h-[180px] md:h-[220px]"
              />
            </div>
          )}
        </div>
      )

    default:
      return (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <ImageCard
              key={i}
              src={img}
              alt={`${t(project.titleKey)} ${i + 1}`}
              className="w-full h-[250px]"
              priority={i === 0}
            />
          ))}
        </div>
      )
  }
}
