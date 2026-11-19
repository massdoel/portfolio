// Ganti semua nilai bertanda GANTI sebelum deploy.
export const profile = {
  name: 'Abdullah Jiddan Al',
  role: 'Designer Grafis & Multimedia',
  summary:
    'Lebih dari 3 tahun di industri digital printing, dari melayani customer sampai memegang produksi secara mandiri. Saya menjembatani desain dan mesin: file yang rapi di layar, hasil cetak yang tepat di media.',
  email: 'abdullah.khairikk@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abdullah-jiddan',
  github: 'https://github.com/massdoel',
  blog: 'https://my-portofolia.blogspot.com',
  cv: '/CV_Abdullah_Jiddan_Al.pdf',
}

export const projects = [
  {
    title: 'Produksi Digital Printing XP600',
    role: 'Lead Digital Printing Production Specialist · Echarm.id · 2025–sekarang',
    impact:
      'Memegang alur produksi dari prepress, printing XP600, laser cutting, sampai QC dan perawatan mesin. GANTI: tambahkan angka (mis. jumlah order/bulan, penurunan reject).',
    tags: ['Prepress', 'XP600', 'Laser Cutting', 'QC'],
    link: 'https://my-portofolia.blogspot.com',
    image: '/images/projects/p1-printing.jpg',
  },
  {
    title: 'Layout & Desain Produk Cetak',
    role: 'Designer & Layouting · CV Printku Jakarta · 2023–2025',
    impact:
      'Menyiapkan layout dan desain produk cetak untuk berbagai kebutuhan customer agar siap produksi. GANTI: sebutkan produk/klien dan hasilnya.',
    tags: ['Layout', 'Desain Produk', 'Print Media'],
    link: 'https://my-portofolia.blogspot.com',
    image: '/images/projects/p2-layout.jpg',
  },
  {
    title: 'Desain & Pengajaran Desain',
    role: 'Freelance Designer & Pengajar · Istana Mulia · 2022–2023',
    impact:
      'Mengerjakan desain untuk platform dan mengajar desain di tingkat SMA. GANTI: tambahkan jumlah siswa / karya yang dihasilkan.',
    tags: ['Graphic Design', 'Mengajar', 'Web Design'],
    link: 'https://my-portofolia.blogspot.com',
    image: '/images/projects/p3-teaching.jpg',
  },
  {
    title: 'Smart Farming & Otomasi (Magang)',
    role: 'Intern · TWP Istana Mulia & PT Eldikon Engineering · 2020–2022',
    impact:
      'Pengalaman awal di jaringan, SCADA, dan otomasi industri yang membentuk minat saya pada pemrograman.',
    tags: ['SCADA', 'Jaringan', 'Otomasi'],
    link: 'https://my-portofolia.blogspot.com',
    image: '/images/projects/p4-smartfarming.jpg',
  },
]

export const skillGroups = [
  { title: 'Produksi Cetak', items: ['Prepress', 'Printing XP600', 'Laser cutting', 'QC', 'Maintenance mesin'] },
  { title: 'Desain', items: ['Graphic design', 'Web design', 'Fotografi', 'Layout produk'] },
  { title: 'Digital', items: ['Pemasaran online', 'Pemrograman dasar', 'Jaringan', 'Microsoft Office', 'SCADA'] },
]

export const facts = [
  'Sertifikasi BNSP: Graphic Design & Multimedia TI',
  'Bahasa: Indonesia, Inggris, Arab',
  'Berbasis di Jakarta Barat',
]

// ====== Tambahan untuk tampilan 3D baru ======
export type Project = { title: string; role: string; impact: string; tags: string[]; link: string; image?: string }

export const about =
  'Saya designer grafis & multimedia dengan lebih dari 3 tahun di industri digital printing, dari melayani customer sampai memegang produksi secara mandiri. Saya menguasai prepress, printing XP600, laser cutting, QC, dan perawatan mesin, serta punya minat di desain, pemasaran online, dan pemrograman.'

export const whatIDo = [
  {
    title: 'DESAIN',
    desc: 'Desain grafis dan layout produk cetak yang siap produksi, dari file di layar sampai hasil di media.',
    tags: ['Graphic Design', 'Visual Communication', 'Layout Produk', 'Web Design', 'Fotografi'],
  },
  {
    title: 'PRODUKSI',
    desc: 'Menjalankan alur produksi digital printing secara mandiri dan menjaga kualitas serta kondisi mesin.',
    tags: ['Prepress', 'Printing XP600', 'Laser Cutting', 'QC', 'Maintenance Mesin'],
  },
  {
    title: 'DIGITAL',
    desc: 'Pemasaran online, pemrograman, serta dasar jaringan dan otomasi industri.',
    tags: ['Pemasaran Online', 'Pemrograman', 'Jaringan', 'SCADA', 'Microsoft Office'],
  },
]

export const career = [
  { role: 'Lead Digital Printing Production Specialist', org: 'Echarm.id', year: '2025 – Sekarang',
    desc: 'Memimpin produksi digital printing: prepress, printing XP600, laser cutting, QC, dan maintenance mesin.' },
  { role: 'Designer & Layouting Product', org: 'CV Printku Jakarta (Percetakan Print Media)', year: '2023 – 2025',
    desc: 'Mendesain dan melayout produk cetak untuk kebutuhan customer.' },
  { role: 'Freelance Design & Teach Design', org: 'Platform dan SMA Istana Mulia', year: '2022 – 2023',
    desc: 'Mengerjakan desain freelance dan mengajar desain.' },
  { role: 'School Operator', org: 'Istana Mulia Boarding School', year: '3 Bulan (2022)',
    desc: 'Mengoperasikan kebutuhan teknis sekolah.' },
  { role: 'Intern Smart Farming', org: 'TWP Istana Mulia', year: '2021 – 2022',
    desc: 'Magang di proyek smart farming.' },
  { role: 'Intern Engineering Automation', org: 'PT Eldikon Engineering', year: '2020 – 2021',
    desc: 'Magang di bidang otomasi dan SCADA.' },
]

// Label bola 3D (maks ±9 huruf agar terbaca)
export const techBalls = [
  'PREPRESS', 'XP600', 'LASER', 'QC', 'WEB', 'GRAFIS', 'FOTO',
  'MARKETING', 'JARINGAN', 'OFFICE', 'SCADA', 'LAYOUT', 'DESAIN', 'MESIN',
]
