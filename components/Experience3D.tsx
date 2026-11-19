'use client'
import { useEffect, useRef, useState } from 'react'
import Scene3D from '@/components/Scene3D'
import { profile, projects, about, whatIDo, career, type Project } from '@/lib/data'

const IDS = ['hero', 'about', 'whatido', 'career', 'work', 'tech', 'contact']

function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0
    const mv = (e: PointerEvent) => { x = e.clientX; y = e.clientY }
    const tick = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      if (ref.current) ref.current.style.transform = `translate(${cx - 11}px, ${cy - 11}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', mv)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('pointermove', mv); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ transform: 'translate(-100px,-100px)' }}
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[22px] w-[22px] rounded-full bg-[#c9bbff] shadow-[0_0_24px_6px_rgba(157,140,255,0.55)]"
    />
  )
}

function Icon({ name }: { name: 'github' | 'linkedin' | 'mail' | 'globe' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true } as const
  if (name === 'github')
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  if (name === 'linkedin')
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    )
  if (name === 'mail')
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </svg>
  )
}

const section = 'relative flex min-h-screen px-6 md:px-16'

export default function Experience3D() {
  const active = useRef('hero')
  const [cat, setCat] = useState(0)
  const [cIdx, setCIdx] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) active.current = e.target.id }),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setCIdx(Number((e.target as HTMLElement).dataset.i)) }),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    document.querySelectorAll('[data-career]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const n = whatIDo.length
  const cur = whatIDo[cat]
  const prev = whatIDo[(cat - 1 + n) % n]
  const next = whatIDo[(cat + 1) % n]
  const list = projects as Project[]

  return (
    <>
      <Scene3D active={active} />
      <Cursor />

      {/* navigasi */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 text-[11px] font-bold tracking-wide md:px-16">
        <a href="#hero" className="font-wide">Abdullah Jiddan</a>
        <nav className="flex gap-8 md:gap-12">
          <a href="#about" className="hover:text-violet">ABOUT</a>
          <a href="#work" className="hover:text-violet">WORK</a>
          <a href="#contact" className="hover:text-violet">CONTACT</a>
        </nav>
      </header>

      {/* sosial */}
      <ul className="fixed bottom-6 left-5 z-40 flex flex-col gap-4 text-white/80 md:left-8">
        {([
          ['github', profile.github, 'GitHub'],
          ['linkedin', profile.linkedin, 'LinkedIn'],
          ['mail', `mailto:${profile.email}`, 'Email'],
          ['globe', profile.blog, 'Blog portofolio'],
        ] as const).map(([ic, href, label]) => (
          <li key={label}>
            <a href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:text-violet">
              <Icon name={ic} />
            </a>
          </li>
        ))}
      </ul>

      <a href={profile.cv} download className="fixed bottom-5 right-6 z-40 text-[11px] tracking-[0.3em] text-white/50 hover:text-white md:right-16">
        RESUME ↓
      </a>

      <main className="relative z-10">
        {/* HERO */}
        <section id="hero" className={`${section} items-end pb-28 md:items-center md:pb-0`}>
          <div className="ml-auto w-full md:w-[42%]">
            <p className="font-wide text-xl font-light text-white/70 md:text-2xl">Seorang Kreatif</p>
            <h1 className="font-wide text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.02]">
              <span className="block text-violet/80">DESIGNER</span>
              <span className="block">& PRINTING</span>
            </h1>
            <p className="mt-4 max-w-[42ch] text-sm text-white/60">{profile.name} — {profile.role}</p>
            <a href="#work" className="mt-6 inline-block border-b border-violet pb-1 text-sm font-semibold text-violet">Lihat Proyek</a>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={`${section} items-center`}>
          <div className="ml-auto w-full md:w-[48%]">
            <p className="text-xs tracking-[0.4em] text-white/40">ABOUT ME</p>
            <p className="mt-6 text-lg font-bold leading-relaxed md:text-2xl">{about}</p>
          </div>
        </section>

        {/* WHAT I DO */}
        <section id="whatido" className={`${section} flex-col items-start justify-center gap-10 md:flex-row md:items-center md:justify-between`}>
          <h2 className="font-wide text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.02]">
            WHAT<br />I <span className="text-violet">DO</span>
          </h2>
          <div className="w-full max-w-md">
            <p className="mb-3 select-none text-xs text-white/25">{prev.title}</p>
            <div className="relative border border-dashed border-white/25 bg-black/60 p-6 backdrop-blur-sm">
              <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-white" />
              <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-white" />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-white" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-white" />
              <h3 className="font-wide text-xl font-extrabold">{cur.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{cur.desc}</p>
              <p className="mt-5 text-xs text-white/40">Skills & tools</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-[11px]">
                {cur.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1">{t}</li>
                ))}
              </ul>
              <div className="absolute -right-12 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
                <button aria-label="Kategori sebelumnya" onClick={() => setCat((cat - 1 + n) % n)} className="h-8 w-8 rounded border border-white/30 hover:border-violet hover:text-violet">↑</button>
                <button aria-label="Kategori berikutnya" onClick={() => setCat((cat + 1) % n)} className="h-8 w-8 rounded border border-white/30 hover:border-violet hover:text-violet">↓</button>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="select-none text-xs text-white/25">{next.title}</p>
              <div className="flex gap-2 md:hidden">
                <button aria-label="Kategori sebelumnya" onClick={() => setCat((cat - 1 + n) % n)} className="h-8 w-8 rounded border border-white/30">↑</button>
                <button aria-label="Kategori berikutnya" onClick={() => setCat((cat + 1) % n)} className="h-8 w-8 rounded border border-white/30">↓</button>
              </div>
            </div>
          </div>
        </section>

        {/* CAREER */}
        <section id="career" className="relative px-6 py-32 md:px-16">
          <h2 className="text-center font-wide text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight">
            Karier &<br /><span className="text-violet">pengalaman</span>
          </h2>
          <ol className="mx-auto mt-20 max-w-5xl">
            {career.map((c, i) => (
              <li
                key={c.role}
                data-career
                data-i={i}
                className={`grid min-h-[26vh] items-start gap-x-6 gap-y-2 transition-opacity duration-300 md:grid-cols-[1fr_9rem_1.5rem_1.2fr] ${cIdx === i ? 'opacity-100' : 'opacity-30'}`}
              >
                <div>
                  <h3 className="font-wide text-lg font-bold leading-snug">{c.role}</h3>
                  <p className="mt-1 text-sm text-white/50">{c.org}</p>
                </div>
                <p className="font-wide text-xl md:text-right">{c.year}</p>
                <span className="relative hidden h-full justify-center md:flex">
                  <span className="absolute inset-y-0 w-px bg-white/15" />
                  <span className={`relative mt-2 h-2.5 w-2.5 rounded-full ${cIdx === i ? 'bg-violet shadow-[0_0_12px_3px_rgba(157,140,255,0.7)]' : 'bg-white/30'}`} />
                </span>
                <p className="text-sm leading-relaxed text-white/70">{c.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* WORK */}
        <section id="work" className="relative flex min-h-screen flex-col justify-center py-24">
          <h2 className="px-6 font-wide text-[clamp(2rem,4.5vw,3.5rem)] font-light md:px-16">
            Karya <span className="text-violet">Pilihan</span>
          </h2>
          <div className="mt-12 flex snap-x overflow-x-auto border-y border-white/10 bg-black/50 backdrop-blur-sm">
            {list.map((p, i) => (
              <article key={p.title} className="flex min-w-[85vw] snap-start flex-col gap-4 border-l border-white/10 p-8 first:border-l-0 md:min-w-[33.34vw]">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-wide text-4xl font-extrabold">{String(i + 1).padStart(2, '0')}</span>
                  <p className="max-w-[16ch] text-right text-xs text-white/50">{p.role}</p>
                </div>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full rounded object-cover" />
                ) : (
                  <div className="grid aspect-[4/3] place-items-center rounded bg-gradient-to-br from-violet/30 to-fuchsia-500/10 font-wide text-5xl font-extrabold text-white/20">
                    {p.title.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                  </div>
                )}
                <h3 className="font-wide text-lg font-bold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{p.impact}</p>
                <p className="text-xs text-white/40">Tools & fitur</p>
                <p className="text-xs text-white/70">{p.tags.join(', ')}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm font-semibold text-violet underline underline-offset-4">Lihat studi kasus</a>
              </article>
            ))}
          </div>
        </section>

        {/* TECHSTACK (bola 3D digambar di canvas) */}
        <section id="tech" className="relative grid min-h-screen place-items-center">
          <h2 className="font-wide text-[clamp(2rem,5vw,4rem)] font-light tracking-wide">KEAHLIAN SAYA</h2>
        </section>

        {/* CONTACT */}
        <section id="contact" className={`${section} items-center`}>
          <div className="ml-auto w-full md:w-[42%]">
            <p className="text-xs tracking-[0.4em] text-white/40">CONTACT</p>
            <h2 className="mt-4 font-wide text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-tight">
              Mari <span className="text-violet">bekerja sama</span>
            </h2>
            <p className="mt-4 text-white/70">Terbuka untuk posisi desain grafis, multimedia, dan produksi cetak.</p>
            <a href={`mailto:${profile.email}`} className="mt-6 block break-all font-wide text-lg font-bold underline underline-offset-4 hover:text-violet">{profile.email}</a>
            <ul className="mt-6 flex flex-wrap gap-3 text-sm">
              {[['LinkedIn', profile.linkedin], ['GitHub', profile.github], ['Blog Portofolio', profile.blog]].map(([l, h]) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-4 py-2 hover:border-violet hover:text-violet">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
