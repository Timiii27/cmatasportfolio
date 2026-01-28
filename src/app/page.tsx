'use client'

import { useState, useEffect, useRef } from 'react'
import { categories } from '@/lib/projects'
import CategoryQuadrant from '@/components/Landing/CategoryQuadrant'
import Header from '@/components/Header'
import SplashScreen from '@/components/SplashScreen'
import Image from 'next/image'
import gsap from 'gsap'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setShowSplash(false)
      setContentVisible(true)
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
        className={`h-screen overflow-hidden transition-opacity duration-500 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />

        <div className="h-full grid grid-cols-2 grid-rows-2 relative">
          {categories.map((category, index) => (
            <CategoryQuadrant
              key={category.slug}
              category={category}
              position={positions[index]}
              onNavigate={triggerLogoTransition}
            />
          ))}

          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
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
