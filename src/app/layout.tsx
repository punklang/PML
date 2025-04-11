import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PunkLang',
  description: 'PUNK-style lyrics generator using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-900">
          {children}
        </main>
      </body>
    </html>
  )
} 