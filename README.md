# EmeraldCraft — Website Server Minecraft

Website resmi server Minecraft dibangun dengan **Next.js 14 (App Router)** + **Tailwind CSS**,
lengkap dengan panel admin untuk mengelola seluruh konten tanpa perlu edit kode.

## Fitur

- **Publik**: Home (hero + status server live + copy IP), Features, News, Rules, Vote, Store
- **Panel Admin** (`/admin`): login, kelola General, Hero, Features, News, Rules, Store — CRUD penuh
- Status server live memakai API [mcstatus.io](https://mcstatus.io) (di-proxy lewat `/api/status`)
- Penyimpanan data: file JSON (`data/db.json`) — mudah diganti ke database lain nantinya
- Dark mode profesional dengan aksen emerald, glassmorphism tipis, animasi fade-in saat scroll
- Fully responsive, SEO dasar (title & meta description dinamis per halaman)

## Menjalankan Secara Lokal

```bash
# 1. Install dependency
npm install

# 2. Salin file environment
cp .env.local.example .env.local
# lalu edit ADMIN_USERNAME, ADMIN_PASSWORD, dan SESSION_SECRET

# 3. Jalankan development server
npm run dev
```

Buka `http://localhost:3000` untuk situs publik, dan `http://localhost:3000/admin/login`
untuk masuk ke panel admin.

**Kredensial default** (ganti sebelum deploy!): `admin` / `admin123`

## Build Produksi

```bash
npm run build
npm run start
```

## Struktur Folder

```
app/
  (site)/              → grup halaman publik (punya Navbar & Footer sendiri)
    page.tsx            → Home
    features/page.tsx
    news/page.tsx
    rules/page.tsx
    vote/page.tsx
    store/page.tsx
    layout.tsx           → layout khusus grup (site): Navbar + Footer
  admin/
    login/               → halaman login admin (tanpa sidebar)
    (dashboard)/          → grup halaman admin yang butuh login
      layout.tsx           → sidebar + auth guard server-side
      page.tsx              → overview/dashboard
      general/ hero/ features/ news/ rules/ store/
  api/
    auth/login, auth/logout    → login & logout (set/hapus cookie sesi)
    status/                     → proxy ke mcstatus.io
    general/ hero/               → GET publik, PUT admin
    features/ news/ rules/ store/ → GET publik, POST admin, [id] → PUT/DELETE admin
  layout.tsx             → root layout (html/body, font, metadata dasar)
  globals.css
components/              → Navbar, Footer, ServerConsole (IP + status), Icon, FadeIn, dst.
  admin/                  → AdminSidebar, AdminPageHeader, FormNotice
lib/
  db.ts                  → baca/tulis data/db.json
  auth.ts                 → session cookie ber-signature HMAC
  requireAuth.ts           → guard untuk API route admin
  types.ts
data/db.json             → "database" JSON (general, hero, features, news, rules, store)
middleware.ts             → gerbang cepat: redirect ke /admin/login jika cookie sesi tak ada
```

## Cara Kerja Autentikasi Admin

1. Form login mengirim `username`/`password` ke `POST /api/auth/login`.
2. Jika cocok dengan `ADMIN_USERNAME`/`ADMIN_PASSWORD` di `.env.local`, server membuat token
   sesi yang ditandatangani (HMAC-SHA256 dengan `SESSION_SECRET`) dan menyimpannya sebagai
   cookie `httpOnly`.
3. `middleware.ts` (Edge Runtime) melakukan pengecekan cepat: apakah cookie sesi ada sama sekali.
4. `app/admin/(dashboard)/layout.tsx` (Node.js runtime) melakukan verifikasi tanda tangan penuh
   lewat `isAuthenticated()` sebelum merender halaman apa pun di dalam grup `(dashboard)`.
5. Setiap API route admin (`PUT`/`POST`/`DELETE`) juga memanggil `requireAuth()` secara mandiri,
   jadi endpoint tetap aman meskipun diakses langsung tanpa lewat UI.

> Catatan keamanan: skema di atas cukup untuk single-admin site skala kecil–menengah. Untuk
> produksi dengan banyak admin/role, pertimbangkan migrasi ke database asli + library auth
> (mis. NextAuth/Auth.js) dan hashing password (bcrypt/argon2).

## Mengganti Penyimpanan ke SQLite

Semua akses data terpusat di `lib/db.ts` (`readDb`, `writeDb`, `updateDb`, `genId`). Untuk
migrasi ke SQLite, cukup ganti isi fungsi-fungsi tersebut agar membaca/menulis lewat driver
SQLite (mis. `better-sqlite3` atau `drizzle-orm`) — seluruh API route dan halaman admin tidak
perlu diubah karena semuanya memanggil fungsi-fungsi ini, bukan mengakses file JSON langsung.

## Mengubah IP/Nama Server yang Dicek Status

Status live diambil berdasarkan `serverIp` + `serverPort` yang tersimpan di **General settings**
(`/admin/general`). Ubah nilainya lalu simpan — badge status di Home akan otomatis memakai
alamat baru pada request berikutnya (polling setiap 30 detik).
