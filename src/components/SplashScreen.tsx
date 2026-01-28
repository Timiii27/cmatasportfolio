'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire splash
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: onComplete,
        })
      },
    })

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 })
    gsap.set(nameRef.current?.querySelectorAll('.letter') || [], { opacity: 0, y: 40 })
    gsap.set([line1Ref.current, line2Ref.current], { scaleX: 0 })

    // Logo appears with scale and rotation
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })

    // Logo subtle pulse
    tl.to(logoRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    })

    // Lines expand from center
    tl.to(
      [line1Ref.current, line2Ref.current],
      {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
      },
      '-=0.3'
    )

    // Letters appear one by one
    tl.to(
      nameRef.current?.querySelectorAll('.letter') || [],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
      },
      '-=0.3'
    )

    // Hold for a moment
    tl.to({}, { duration: 0.8 })

    // Logo and name move up slightly before exit
    tl.to(
      [logoRef.current, nameRef.current, line1Ref.current, line2Ref.current],
      {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.in',
      }
    )

    return () => {
      tl.kill()
    }
  }, [onComplete])

  const name = 'Clara Matas'

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-primary)]"
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-8">
        <Image
          src="/projects/logo.png"
          alt="Clara Matas Logo"
          width={120}
          height={150}
          priority
        />
      </div>

      {/* Decorative lines */}
      <div
        ref={line1Ref}
        className="w-24 h-[1px] bg-[var(--text-primary)] mb-6 origin-center"
      />

      {/* Name with letter animation */}
      <div ref={nameRef} className="overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] text-[var(--text-primary)] uppercase">
          {name.split('').map((letter, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{ marginRight: letter === ' ' ? '0.5em' : '0' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Second decorative line */}
      <div
        ref={line2Ref}
        className="w-24 h-[1px] bg-[var(--text-primary)] mt-6 origin-center"
      />

      {/* Subtle loading indicator */}
      <div className="absolute bottom-12 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
