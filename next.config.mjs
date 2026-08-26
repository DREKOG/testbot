/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Admin dapat mengisi URL gambar bebas (logo, background hero, gambar
    // paket store) dari domain manapun, jadi optimasi gambar Next.js
    // dinonaktifkan agar tidak perlu mendaftarkan setiap domain di
    // remotePatterns satu per satu.
    unoptimized: true,
  },
};

export default nextConfig;
