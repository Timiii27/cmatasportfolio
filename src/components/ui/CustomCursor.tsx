'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Make visible
    dot.style.opacity = '1'
    ring.style.opacity = '1'
    document.body.classList.add('custom-cursor-active')

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="expand"]')) {
        gsap.to(ring, { scale: 1.8, duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="expand"]')) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.body.classList.remove('custom-cursor-active')
      gsap.killTweensOf(dot)
      gsap.killTweensOf(ring)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white pointer-events-none z-[99999]"
        style={{ opacity: 0, transform: 'translate(-50%, -50%)', mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-[36px] h-[36px] rounded-full border border-white pointer-events-none z-[99999]"
        style={{ opacity: 0, transform: 'translate(-50%, -50%)', mixBlendMode: 'difference' }}
      />
    </>
  )
}
