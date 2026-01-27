'use client'

import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { TransitionProvider } from '@/context/TransitionContext'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
