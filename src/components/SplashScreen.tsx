'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface SplashScreenProps {
  onComplete: () => void
}

// Portfolio accent colors for particles
const particleColors = ['#7AC5D8', '#D4AF37', '#B87333', '#6366f1']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const burstRef = useRef(false)
  const animFrameRef = useRef<number>(0)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const particles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        opacity: Math.random() * 0.1 + 0.15,
      })
    }
    particlesRef.current = particles

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (const p of particles) {
        if (burstRef.current) {
          // Accelerate outward from center
          const dx = p.x - centerX
          const dy = p.y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          p.vx += (dx / dist) * 0.8
          p.vy += (dy / dist) * 0.8
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around (only if not bursting)
        if (!burstRef.current) {
          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          if (p.y > canvas.height) p.y = 0
        }

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }

      // Draw connecting lines
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = (1 - dist / 150) * 0.15
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger burst
        burstRef.current = true

        // Fade out the entire splash
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            cancelAnimationFrame(animFrameRef.current)
            onComplete()
          },
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
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Logo */}
      <div ref={logoRef} className="mb-8 relative z-10">
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
        className="w-24 h-[1px] bg-[var(--text-primary)] mb-6 origin-center relative z-10"
      />

      {/* Name with letter animation */}
      <div ref={nameRef} className="overflow-hidden relative z-10">
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
        className="w-24 h-[1px] bg-[var(--text-primary)] mt-6 origin-center relative z-10"
      />

      {/* Subtle loading indicator */}
      <div className="absolute bottom-12 flex items-center gap-2 z-10">
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
