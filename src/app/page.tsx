'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { categories } from '@/lib/projects'
import CategoryQuadrant from '@/components/Landing/CategoryQuadrant'
import Header from '@/components/Header'
import SplashScreen from '@/components/SplashScreen'
import Image from 'next/image'
import gsap from 'gsap'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const logoRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const quadrantRefs = useRef<(HTMLDivElement | null)[]>([])
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

  // Corner offsets for staggered entrance
  const cornerOffsets: Record<string, { x: number; y: number }> = {
    'top-left': { x: -60, y: -60 },
    'top-right': { x: 60, y: -60 },
    'bottom-left': { x: -60, y: 60 },
    'bottom-right': { x: 60, y: 60 },
  }

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setShowSplash(false)
      setContentVisible(true)
    }
  }, [])

  // GSAP staggered entrance when contentVisible becomes true
  useEffect(() => {
    if (!contentVisible) return

    const tl = gsap.timeline()

    // Animate each quadrant from its corner
    quadrantRefs.current.forEach((el, i) => {
      if (!el) return
      const pos = positions[i]
      const offset = cornerOffsets[pos]
      gsap.set(el, { x: offset.x, y: offset.y, opacity: 0 })

      tl.to(el, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, i * 0.1)
    })

    // Logo bounces in last
    if (logoContainerRef.current) {
      gsap.set(logoContainerRef.current, { scale: 0, opacity: 0 })
      tl.to(logoContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
      }, 0.3)
    }

    return () => { tl.kill() }
  }, [contentVisible])

  // Logo 3D tilt quickTo refs
  const logoTiltXRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const logoTiltYRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  useEffect(() => {
    if (!logoContainerRef.current) return
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    logoTiltXRef.current = gsap.quickTo(logoContainerRef.current, 'rotateX', { duration: 0.5, ease: 'power2.out' })
    logoTiltYRef.current = gsap.quickTo(logoContainerRef.current, 'rotateY', { duration: 0.5, ease: 'power2.out' })
  }, [contentVisible])

  // Mousemove handler for parallax + logo tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1

    setMousePos({ x: nx, y: ny })

    // Logo 3D tilt: rotateX follows Y inversely, rotateY follows X
    if (logoTiltXRef.current && logoTiltYRef.current) {
      logoTiltXRef.current(-ny * 6)
      logoTiltYRef.current(nx * 6)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true')
    setShowSplash(false)
    setTimeout(() => setContentVisible(true), 100)
  }

  // Smooth unified transition
  const triggerLogoTransition = (destinationColor: string, callback: () => void) => {
    if (!logoRef.current || !overlayRef.current || !mainRef.current) {
      callback()
      return
    }

    const tl = gsap.timeline()

    // Start overlay with destination color (invisible)
    gsap.set(overlayRef.current, { backgroundColor: destinationColor })

    // Simultaneously: fade content, scale logo, reveal overlay
    tl.to(mainRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 0)

    tl.to(logoRef.current, {
      scale: 30,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 0)

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 0.15)

    // Navigate when the overlay is fully opaque
    tl.call(callback, [], 0.55)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <main
        ref={mainRef}
        onMouseMove={handleMouseMove}
        className="h-screen overflow-hidden"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        <Header />

        <div className="h-full grid grid-cols-2 grid-rows-2 relative">
          {categories.map((category, index) => (
            <CategoryQuadrant
              key={category.slug}
              ref={(el) => { quadrantRefs.current[index] = el }}
              category={category}
              position={positions[index]}
              onNavigate={triggerLogoTransition}
              mousePosition={mousePos}
            />
          ))}

          {/* Center Logo */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            style={{ perspective: '800px' }}
          >
            <div
              ref={logoContainerRef}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={logoRef}
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden"
              >
                <Image
                  src="/projects/logo.png"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="w-3/4 h-3/4 object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Color overlay - starts transparent */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none z-30"
            style={{ opacity: 0, backgroundColor: 'transparent' }}
          />
        </div>
      </main>
    </>
  )
}
