Berikut adalah draf **README.md** yang profesional, terstruktur, dan menarik untuk portofolio 3D Anda. README ini dirancang agar mudah dipahami oleh developer lain maupun rekruter, dengan penekanan pada fitur 3D dan kemudahan kustomisasi.

---

# 🌌 Portofolio 3D — Abdullah Jiddan Al

Selamat datang di repositori portofolio web 3D interaktif saya. Proyek ini dibangun menggunakan **Next.js**, **React Three Fiber (R3F)**, dan **Tailwind CSS** untuk menciptakan pengalaman visual yang imersif, modern, dan responsif, sekaligus tetap performa tinggi.

## ✨ Fitur Utama

- 🎨 **Render 3D Interaktif**: Menggunakan `Three.js` dan `@react-three/fiber` untuk elemen visual yang dinamis.
- 📱 **Deteksi Kemampuan Perangkat**: Hook kustom (`useDeviceCapability`) untuk mengoptimalkan pengalaman berdasarkan perangkat pengguna (mobile/desktop).
- 🌓 **Mode Toggle**: Komponen `Portfolio.tsx` yang memungkinkan perpindahan mode tampilan dengan mulus.
- ⚡ **Performa Tinggi**: Dibangun di atas Next.js App Router dengan optimasi bawaan.
- 🎨 **Styling Modern**: Utilitas Tailwind CSS untuk desain yang responsif dan konsisten.
- 📝 **Mudah Dikustomisasi**: Semua data konten dipusatkan di satu file (`lib/data.ts`) untuk pengeditan yang cepat.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **3D React Integration**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)

---

## 🚀 Instalasi & Setup

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal di mesin Anda.

### 1. Inisialisasi Proyek Next.js
Jalankan perintah berikut untuk membuat proyek Next.js baru dengan konfigurasi yang sesuai:
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --eslint --import-alias "@/*" --no-src-dir
cd portfolio
```

### 2. Instalasi Dependensi 3D
Pasang pustaka yang diperlukan untuk rendering 3D:
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

> ⚠️ **Catatan Versi Penting**: 
> - Setup di atas menggunakan **R3F v9** yang kompatibel dengan **React 19** (default Next.js terbaru).
> - Jika Anda menggunakan **React 18**, pastikan untuk menginstal versi yang kompatibel:
>   ```bash
>   npm install @react-three/fiber@8 @react-three/drei@9
>   ```

### 3. Salin File Proyek
Salin isi folder dari repositori ini (`app/`, `components/`, `hooks/`, `lib/`, `public/`) ke dalam proyek Next.js Anda. Timpa file yang sudah ada jika diperlukan.

### 4. Jalankan Server Development
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

### 5. Build untuk Produksi
```bash
npm run build
npm start
```

---

## 📂 Struktur Proyek

```text
├── app/
│   ├── layout.tsx       # Layout utama aplikasi (metadata, font, global providers)
│   ├── page.tsx         # Halaman utama portofolio
│   └── globals.css      # Style global dan konfigurasi Tailwind
├── components/
│   ├── Portfolio.tsx    # Komponen utama: pemilih mode + toggle UI
│   ├── Content.tsx      # Komponen konten bersama (teks, info, layout 2D)
│   └── Scene3D.tsx      # Kanvas dan logika rendering React Three Fiber (R3F)
├── hooks/
│   └── useDeviceCapability.ts  # Hook kustom untuk mendeteksi kemampuan GPU/perangkat
├── lib/
│   └── data.ts          # ⭐ PUSAT DATA: Edit nama, deskripsi, pengalaman, dan link di sini
└── public/
    └── CV_Abdullah_Jiddan_Al.pdf  # File CV yang dapat diunduh oleh pengunjung
```

---

## ⚙️ Kustomisasi

Proyek ini dirancang agar mudah disesuaikan dengan kebutuhan Anda:

1. **Mengubah Konten**: Buka file `lib/data.ts`. Di sini Anda dapat mengubah nama, judul pekerjaan, deskripsi, daftar proyek, dan tautan sosial media tanpa perlu menyentuh kode komponen yang rumit.
2. **Mengganti CV**: Ganti file `public/CV_Abdullah_Jiddan_Al.pdf` dengan file CV terbaru Anda. Pastikan nama filenya sesuai atau perbarui referensinya di `lib/data.ts`.
3. **Menyesuaikan Scene 3D**: Edit `components/Scene3D.tsx` untuk mengubah model 3D, pencahayaan, kamera, atau efek partikel sesuai selera Anda.

---

## 🌐 Deployment

Cara termudah untuk men-deploy portofolio ini adalah menggunakan [Vercel](https://vercel.com/), platform yang dibuat oleh pembuat Next.js:

1. Push kode Anda ke repository GitHub/GitLab.
2. Buka [Vercel Dashboard](https://vercel.com/new) dan impor repository Anda.
3. Vercel akan secara otomatis mendeteksi konfigurasi Next.js. Klik **Deploy**.
4. Selesai! Portofolio 3D Anda sekarang live.

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan portofolio pribadi. Silakan gunakan kode ini sebagai referensi atau pembelajaran, namun harap berikan kredit jika menggunakan bagian signifikan dari kode ini untuk proyek Anda sendiri.

---

## 📬 Kontak

Jika Anda memiliki pertanyaan, saran, atau ingin berkolaborasi, jangan ragu untuk menghubungi saya:

- **Email**: abdullah.khairikk@gmail.com
- **LinkedIn**: [linkedin.com/in/abdullah-jiddan
- **GitHub**: github.com/massdoel

---

*Dibuat dengan ❤️ dan 🧊 (Three.js) oleh Abdullah Jiddan Al.*
