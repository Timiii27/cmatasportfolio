'use client'

import { useState, useEffect } from 'react'
import { categories } from '@/lib/projects'
import CategoryQuadrant from '@/components/Landing/CategoryQuadrant'
import Header from '@/components/Header'
import SplashScreen from '@/components/SplashScreen'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

  // Check if user has seen splash before in this session
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
    // Small delay before showing content for smooth transition
    setTimeout(() => setContentVisible(true), 100)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <main
        className={`h-screen overflow-hidden transition-opacity duration-500 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />

        <div className="h-full grid grid-cols-2 grid-rows-2">
          {categories.map((category, index) => (
            <CategoryQuadrant
              key={category.slug}
              category={category}
              position={positions[index]}
            />
          ))}
        </div>
      </main>
    </>
  )
}
