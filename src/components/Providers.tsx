'use client'

import { LanguageProvider } from '@/context/LanguageContext'
import { TransitionProvider } from '@/context/TransitionContext'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <TransitionProvider>
        {children}
      </TransitionProvider>
    </LanguageProvider>
  )
}
