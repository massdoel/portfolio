import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree, Syne } from 'next/font/google'
import './globals.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const sans = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })
const wide = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' })

export const metadata: Metadata = {
  title: 'Abdullah Jiddan Al — Designer Grafis & Multimedia',
  description: 'Portofolio desain grafis, multimedia, dan produksi digital printing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} ${wide.variable}`}>
      <body>{children}</body>
    </html>
  )
}
