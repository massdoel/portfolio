'use client'
import { useEffect, useState } from 'react'

export type DeviceCapability = {
  checked: boolean      // false selama SSR / sebelum deteksi selesai
  canUse3D: boolean     // true hanya jika SEMUA syarat terpenuhi
  reasons: string[]     // alasan fallback ke Plain Mode (untuk debugging / tooltip)
}

type NetInfo = { saveData?: boolean; effectiveType?: string }

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Default (SSR & render pertama) = Plain Mode, sehingga tidak ada aset 3D yang pernah dimuat dulu. */
export function useDeviceCapability(): DeviceCapability {
  const [cap, setCap] = useState<DeviceCapability>({ checked: false, canUse3D: false, reasons: [] })

  useEffect(() => {
    const reasons: string[] = []
    const nav = navigator as Navigator & { connection?: NetInfo; deviceMemory?: number }

    if (window.matchMedia('(max-width: 1023px)').matches) reasons.push('layar kecil')
    if (window.matchMedia('(pointer: coarse)').matches) reasons.push('perangkat sentuh')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) reasons.push('reduce motion')

    const conn = nav.connection
    if (conn?.saveData) reasons.push('data saver')
    if (conn?.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) reasons.push('koneksi lambat')

    // deviceMemory & hardwareConcurrency tidak tersedia di semua browser (Safari/Firefox) → hanya dicek jika ada
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) reasons.push('memori rendah')
    if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2) reasons.push('CPU lemah')

    if (!hasWebGL()) reasons.push('WebGL tidak tersedia')

    setCap({ checked: true, canUse3D: reasons.length === 0, reasons })
  }, [])

  return cap
}
