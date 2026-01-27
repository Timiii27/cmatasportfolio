'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TransitionContextType {
  isTransitioning: boolean
  transitionColor: string
  startTransition: (color: string) => void
  endTransition: () => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  transitionColor: '#000000',
  startTransition: () => {},
  endTransition: () => {},
})

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionColor, setTransitionColor] = useState('#000000')

  const startTransition = (color: string) => {
    setTransitionColor(color)
    setIsTransitioning(true)
  }

  const endTransition = () => {
    setIsTransitioning(false)
  }

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, transitionColor, startTransition, endTransition }}
    >
      {children}
      {/* Global transition overlay */}
      <div
        className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-500 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: transitionColor }}
      />
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  return useContext(TransitionContext)
}
