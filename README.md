# Portofolio 3D — Abdullah Jiddan Al

## Instalasi
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --eslint --import-alias "@/*" --no-src-dir
cd portfolio
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```
Salin isi folder ini (app/, components/, hooks/, lib/, public/) ke proyek, timpa file yang sama, lalu:
```bash
npm run dev      # http://localhost:3000
npm run build && npm start
```
Catatan versi: R3F v9 untuk React 19 (default Next.js terbaru); jika memakai React 18, pasang `@react-three/fiber@8 @react-three/drei@9`.

## Struktur
```
app/        layout.tsx, page.tsx, globals.css
components/ Portfolio.tsx (pemilih mode + toggle), Content.tsx (konten bersama), Scene3D.tsx (R3F)
hooks/      useDeviceCapability.ts
lib/        data.ts  ← edit konten di sini
public/     CV_Abdullah_Jiddan_Al.pdf
```
