'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollProgressProps {
  accentColor: string
}

export default function ScrollProgress({ accentColor }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`
        }
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 w-full h-[2px] z-[9998] origin-left"
      style={{ backgroundColor: accentColor, transform: 'scaleX(0)' }}
    />
  )
}
