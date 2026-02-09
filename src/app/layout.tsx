import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import CustomCursor from '@/components/ui/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['200', '300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Designer Portfolio',
  description: 'A showcase of design work across web, product, fashion, and graphic design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  )
}
