'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageCardProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto'
}

export default function ImageCard({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio = 'auto',
}: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: '',
  }

  return (
    <div
      className={`image-card relative overflow-hidden bg-[var(--card-bg)] ${aspectClasses[aspectRatio]} ${className}`}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
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
            <div className="absolute inset-0 bg-[var(--bg-secondary)] animate-pulse" />
          )}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            priority={priority}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
          />
        </>
      )}
    </div>
  )
}
