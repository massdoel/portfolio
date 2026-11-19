'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState, type ReactNode } from 'react'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

// Three.js + seluruh tampilan 3D hanya diunduh saat mode 3D benar-benar aktif.
const Experience3D = dynamic(() => import('@/components/Experience3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black text-sm text-white/60" role="status">
      Memuat tampilan 3D…
    </div>
  ),
})

type Mode = '3d' | 'plain'
const KEY = 'portfolio-mode'

export default function Portfolio({ children }: { children: ReactNode }) {
  const cap = useDeviceCapability()
  const [manual, setManual] = useState<Mode | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === '3d' || saved === 'plain') setManual(saved)
    } catch {}
  }, [])

  const auto: Mode = cap.checked && cap.canUse3D ? '3d' : 'plain'
  const mode: Mode = manual ?? auto

  const switchTo = (m: Mode) => {
    setManual(m)
    try { localStorage.setItem(KEY, m) } catch {}
  }

  return (
    <div data-mode={mode} className="relative min-h-screen">
      {mode === '3d' ? <Experience3D /> : children}

      <button
        type="button"
        onClick={() => switchTo(mode === '3d' ? 'plain' : '3d')}
        title={cap.reasons.length ? `Mode ringan otomatis: ${cap.reasons.join(', ')}` : undefined}
        className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-violet/60 bg-black/80 px-4 py-2 text-sm font-medium text-violet backdrop-blur hover:bg-violet hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
      >
        {mode === '3d' ? 'Mode Ringan' : 'Mode 3D'}
      </button>
    </div>
  )
}
