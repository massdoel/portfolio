'use client'
import { useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { techBalls } from '@/lib/data'

export type Active = MutableRefObject<string>
const D = THREE.MathUtils.damp
const SKIN = '#c98a63'

function glowTexture(rgba: string) {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128)
  grd.addColorStop(0, rgba)
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

function labelTexture(label: string, yellow: boolean) {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 512
  const g = c.getContext('2d')!
  g.fillStyle = yellow ? '#f2de4d' : '#f4f4f6'
  g.fillRect(0, 0, 1024, 512)
  g.fillStyle = '#111'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  let fs = 72
  g.font = `800 ${fs}px sans-serif`
  while (g.measureText(label).width > 320 && fs > 20) {
    fs -= 4
    g.font = `800 ${fs}px sans-serif`
  }
  ;[170, 512, 853].forEach((x) => g.fillText(label, x, 256))
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ───────── Kepala karakter (dipakai di bust & di meja) ───────── */
function Head() {
  const ref = useRef<THREE.Group>(null)
  useFrame((s, dt) => {
    if (!ref.current) return
    ref.current.rotation.y = D(ref.current.rotation.y, s.pointer.x * 0.5, 4, dt)
    ref.current.rotation.x = D(ref.current.rotation.x, -s.pointer.y * 0.3, 4, dt)
  })
  const skin = <meshPhysicalMaterial color={SKIN} roughness={0.45} clearcoat={0.3} />
  return (
    <group ref={ref}>
      <mesh scale={[1.05, 1, 0.95]}>
        <sphereGeometry args={[1, 48, 32]} />
        {skin}
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 1.02, -0.05, 0]}>
          <mesh scale={[0.28, 0.42, 0.3]}>
            <sphereGeometry args={[1, 24, 16]} />
            {skin}
          </mesh>
          <mesh position={[s * 0.06, 0, 0.12]} scale={[0.12, 0.22, 0.1]}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color="#a8674a" />
          </mesh>
        </group>
      ))}
      {/* topi */}
      <group position={[0, 0.4, 0]} rotation={[-0.12, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.1, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color="#d8d8df" metalness={0.5} roughness={0.25} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0.02, 0.3]}>
          <cylinderGeometry args={[1.05, 1.05, 0.07, 40, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#1d1d22" roughness={0.5} />
        </mesh>
      </group>
      {/* wajah */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.4, 0.06, 0.8]} scale={[0.3, 0.19, 0.12]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[s * 0.4, 0.03, 0.9]} scale={[0.1, 0.1, 0.05]}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color="#2b2d6e" />
          </mesh>
          <mesh position={[s * 0.4, 0.17, 0.83]} rotation={[0, 0, s * 0.15]} scale={[0.33, 0.11, 0.14]}>
            <sphereGeometry args={[1, 24, 16]} />
            {skin}
          </mesh>
          <mesh position={[s * 0.42, 0.34, 0.92]} rotation={[0, s * 0.55, s * 0.3]}>
            <boxGeometry args={[0.5, 0.09, 0.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.22, 0.93]} scale={[1, 0.9, 1]}>
        <sphereGeometry args={[0.17, 24, 16]} />
        <meshStandardMaterial color="#b9744f" roughness={0.5} />
      </mesh>
      <RoundedBox args={[0.98, 0.3, 0.1]} radius={0.06} position={[0, -0.55, 0.78]}>
        <meshStandardMaterial color="#2a1212" />
      </RoundedBox>
      <RoundedBox args={[0.88, 0.2, 0.1]} radius={0.05} position={[0, -0.55, 0.83]}>
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </RoundedBox>
    </group>
  )
}

function Bust() {
  return (
    <group>
      <Head />
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.38, 0.4, 0.6, 24]} />
        <meshPhysicalMaterial color={SKIN} roughness={0.5} />
      </mesh>
      <mesh position={[0, -1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.09, 12, 32]} />
        <meshStandardMaterial color="#0d0d10" />
      </mesh>
      <mesh position={[0, -2.8, 0]} scale={[2.5, 1.6, 1.3]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color="#2a2429" roughness={0.8} />
      </mesh>
    </group>
  )
}

/* ───────── Meja kerja ───────── */
function Limb({ a, b, r, color, z = 0 }: { a: [number, number]; b: [number, number]; r: number; color: string; z?: number }) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy)
  return (
    <mesh position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, z]} rotation={[0, 0, Math.atan2(-dx, dy)]}>
      <capsuleGeometry args={[r, Math.max(len - 2 * r, 0.01), 8, 16]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  )
}

function Desk() {
  const dark = '#26222a'
  return (
    <group>
      {/* meja */}
      <mesh position={[1.4, 1.7, 0]}>
        <boxGeometry args={[2.8, 0.1, 1.7]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.4} />
      </mesh>
      {[[0.15, 0.7], [2.65, 0.7], [0.15, -0.7], [2.65, -0.7]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.85, z]}>
          <boxGeometry args={[0.07, 1.7, 0.07]} />
          <meshStandardMaterial color="#151515" />
        </mesh>
      ))}
      {/* monitor */}
      <mesh position={[2.0, 2.5, 0]}>
        <boxGeometry args={[0.08, 0.95, 1.55]} />
        <meshStandardMaterial color="#e88aa8" emissive="#e88aa8" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[2.1, 2.0, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.12]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.95, 1.77, 0]}>
        <boxGeometry args={[0.55, 0.04, 0.95]} />
        <meshStandardMaterial color="#1b1b1f" />
      </mesh>
      {/* kursi */}
      <mesh position={[-0.45, 1.0, 0]}>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[-1.0, 1.6, 0]}>
        <boxGeometry args={[0.1, 1.1, 1.1]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {[[-0.9, 0.45], [0, 0.45], [-0.9, -0.45], [0, -0.45]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.5, z]}>
          <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
          <meshStandardMaterial color="#8a5a3c" />
        </mesh>
      ))}
      {/* karakter duduk (menghadap +x) */}
      <Limb a={[-0.5, 1.35]} b={[-0.4, 2.55]} r={0.45} color={dark} />
      <group position={[-0.05, 3.05, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.42}>
        <Head />
      </group>
      {[-0.35, 0.35].map((z) => (
        <group key={z}>
          <Limb a={[-0.3, 2.45]} b={[0.9, 1.85]} r={0.12} color={dark} z={z} />
          <Limb a={[-0.35, 1.15]} b={[0.5, 1.1]} r={0.16} color="#18161b" z={z * 0.85} />
          <Limb a={[0.5, 1.1]} b={[0.5, 0.2]} r={0.14} color="#18161b" z={z * 0.85} />
          <mesh position={[0.65, 0.07, z * 0.85]}>
            <boxGeometry args={[0.55, 0.14, 0.28]} />
            <meshStandardMaterial color="#f1f1f1" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ───────── Bola keahlian (fisika 2D sederhana) ───────── */
function Balls({ active, group }: { active: Active; group: React.RefObject<THREE.Group | null> }) {
  const { viewport } = useThree()
  const items = useMemo(
    () => techBalls.map((label, i) => ({ label, r: 0.4 + (i % 4) * 0.12, yellow: i % 4 === 1 })),
    [],
  )
  const textures = useMemo(() => items.map((it) => labelTexture(it.label, it.yellow)), [items])
  const sim = useRef<{ p: THREE.Vector2; v: THREE.Vector2 }[]>([])
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const was = useRef(false)

  useFrame((state, dtRaw) => {
    if (active.current !== 'tech') { was.current = false; return }
    const dt = Math.min(dtRaw, 1 / 30)
    const hw = viewport.width / 2
    const hh = viewport.height / 2
    const sc = Math.min(1, viewport.width / 11)

    if (!was.current) {
      was.current = true
      sim.current = items.map((_, i) => ({
        p: new THREE.Vector2((Math.random() * 2 - 1) * hw * 0.7, hh + 1 + i * 0.8),
        v: new THREE.Vector2((Math.random() - 0.5) * 2, 0),
      }))
    }
    const px = state.pointer.x * hw
    const py = state.pointer.y * hh
    const S = sim.current

    items.forEach((it, i) => {
      const b = S[i]
      const r = it.r * sc
      b.v.y -= 5 * dt
      const dx = b.p.x - px
      const dy = b.p.y - py
      const d = Math.hypot(dx, dy)
      if (d < r + 1.3 && d > 0.001) {
        const f = (1 - (d - r) / 1.3) * 30 * dt
        b.v.x += (dx / d) * f
        b.v.y += (dy / d) * f
      }
      b.v.multiplyScalar(1 - 0.4 * dt)
      b.p.addScaledVector(b.v, dt)
      if (b.p.y < -hh + r) { b.p.y = -hh + r; b.v.y *= -0.45; b.v.x *= 0.98 }
      if (b.p.x < -hw + r) { b.p.x = -hw + r; b.v.x *= -0.6 }
      if (b.p.x > hw - r) { b.p.x = hw - r; b.v.x *= -0.6 }
    })

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = S[i], b = S[j]
        const ri = items[i].r * sc, rj = items[j].r * sc
        const dx = b.p.x - a.p.x, dy = b.p.y - a.p.y
        const d = Math.hypot(dx, dy)
        const min = ri + rj
        if (d < min && d > 0.0001) {
          const nx = dx / d, ny = dy / d
          const mi = ri * ri, mj = rj * rj
          const tot = mi + mj
          const ov = min - d
          a.p.x -= nx * ov * (mj / tot); a.p.y -= ny * ov * (mj / tot)
          b.p.x += nx * ov * (mi / tot); b.p.y += ny * ov * (mi / tot)
          const rv = (b.v.x - a.v.x) * nx + (b.v.y - a.v.y) * ny
          if (rv < 0) {
            const imp = -rv * 1.5
            a.v.x -= nx * imp * (mj / tot); a.v.y -= ny * imp * (mj / tot)
            b.v.x += nx * imp * (mi / tot); b.v.y += ny * imp * (mi / tot)
          }
        }
      }
    }

    items.forEach((it, i) => {
      const m = meshes.current[i]
      const b = S[i]
      if (!m || !b) return
      m.position.set(b.p.x, b.p.y, 0)
      m.scale.setScalar(sc)
      m.rotation.z -= (b.v.x * dt) / (it.r * sc)
      m.rotation.x += (b.v.y * dt) / (it.r * sc)
    })
  })

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={it.label} ref={(el) => { meshes.current[i] = el }} position={[0, 50, 0]}>
          <sphereGeometry args={[it.r, 40, 28]} />
          <meshPhysicalMaterial map={textures[i]} roughness={0.25} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

/* ───────── Pengatur adegan mengikuti scroll ───────── */
function Rig({ active }: { active: Active }) {
  const { viewport } = useThree()
  const bust = useRef<THREE.Group>(null)
  const desk = useRef<THREE.Group>(null)
  const balls = useRef<THREE.Group>(null)
  const glow = useRef<THREE.Mesh>(null)
  const w = useRef({ bust: 0, desk: 0, tech: 0 })
  const purple = useMemo(() => glowTexture('rgba(139,92,246,0.6)'), [])

  const narrow = viewport.width < 7
  const bx = narrow ? 0 : -viewport.width * 0.21
  const bs = Math.min(1.5, viewport.width / 2.8)
  const dx = narrow ? -viewport.width * 0.1 : -viewport.width * 0.08
  const ds = Math.min(1.35, viewport.width / 4)

  useFrame((_, dt) => {
    const a = active.current
    const t = {
      bust: a === 'hero' || a === 'about' || a === 'contact' ? 1 : 0,
      desk: a === 'whatido' ? 1 : 0,
      tech: a === 'tech' ? 1 : 0,
    }
    ;(Object.keys(t) as (keyof typeof t)[]).forEach((k) => { w.current[k] = D(w.current[k], t[k], 5, dt) })

    const set = (g: THREE.Group | null, v: number, base: number) => {
      if (!g) return
      g.visible = v > 0.02
      g.scale.setScalar(Math.max(v, 0.001) * base)
    }
    set(bust.current, w.current.bust, bs)
    set(desk.current, w.current.desk, ds)
    if (balls.current) balls.current.visible = w.current.tech > 0.05
    if (glow.current) glow.current.visible = w.current.bust > 0.05 || w.current.desk > 0.05
  })

  return (
    <>
      <mesh position={[bx, -0.3, -2]} ref={glow}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={purple} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[viewport.width / 2, -0.5, -3]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial map={purple} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <group ref={bust} position={[bx, 0.2, 0]}><Bust /></group>
      <group ref={desk} position={[dx, -2.8, 0]}><Desk /></group>
      <Balls active={active} group={balls} />
    </>
  )
}

export default function Scene3D({ active }: { active: Active }) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5])
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <PerformanceMonitor onDecline={() => setDpr([1, 1])} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 6]} intensity={2.2} />
        <pointLight position={[-5, 2, -1]} intensity={60} color="#8b5cf6" distance={14} />
        <Environment resolution={64}>
          <Lightformer form="rect" intensity={2} position={[0, 3, 6]} scale={[8, 4, 1]} />
          <Lightformer form="rect" intensity={2} color="#a78bfa" position={[-6, 1, 3]} scale={[4, 6, 1]} />
        </Environment>
        <Rig active={active} />
      </Canvas>
    </div>
  )
}
