'use client'

import { categories } from '@/lib/projects'
import CategoryQuadrant from '@/components/Landing/CategoryQuadrant'
import Header from '@/components/Header'

export default function Home() {
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

  return (
    <main className="h-screen overflow-hidden">
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
  )
}
