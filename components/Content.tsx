// Server Component: HTML yang sama dipakai Mode 3D dan Plain Mode (cepat & ramah SEO).
import { profile, projects, skillGroups, facts } from '@/lib/data'

const btn =
  'inline-block rounded-md px-5 py-3 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

export default function Content() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      {/* HERO */}
      <section className="flex min-h-screen flex-col justify-center py-24">
        <div className="rise max-w-xl">
          <p className="text-mute">{profile.role}</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] sm:text-7xl">{profile.name}</h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-paper/85">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#proyek" className={`${btn} bg-gold text-ink hover:bg-paper`}>Lihat Proyek</a>
            <a href={profile.cv} download className={`${btn} border border-paper/30 hover:border-gold hover:text-gold`}>Unduh CV</a>
          </div>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section id="proyek" className="panel py-16">
        <h2 className="font-display text-3xl font-bold">Proyek & Pengalaman Pilihan</h2>
        <ul className="mt-8 divide-y divide-paper/10">
          {projects.map((p) => (
            <li key={p.title} className="grid gap-4 border-l-2 border-gold/70 py-6 pl-5 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <div>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-mute">{p.role}</p>
              </div>
              <div>
                <p className="leading-relaxed text-paper/85">{p.impact}</p>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded bg-paper/10 px-2 py-1">{t}</li>
                  ))}
                </ul>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-gold underline underline-offset-4">
                  Lihat studi kasus
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ABOUT & SKILLS */}
      <section id="tentang" className="panel py-16">
        <h2 className="font-display text-3xl font-bold">Keahlian Inti</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h3 className="font-display text-lg font-semibold text-gold">{g.title}</h3>
              <ul className="mt-3 space-y-1.5 text-paper/90">
                {g.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <ul className="mt-10 space-y-1 text-sm text-mute">
          {facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="panel py-16 pb-28">
        <h2 className="font-display text-3xl font-bold">Hubungi Saya</h2>
        <p className="mt-3 text-paper/80">Terbuka untuk posisi desain grafis, multimedia, dan produksi cetak.</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {[
            ['Email', `mailto:${profile.email}`],
            ['LinkedIn', profile.linkedin],
            ['GitHub', profile.github],
            ['Blog Portofolio', profile.blog],
          ].map(([label, href]) => (
            <li key={label}>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                 className={`${btn} border border-paper/30 hover:border-gold hover:text-gold`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
