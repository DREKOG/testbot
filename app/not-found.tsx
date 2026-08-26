import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-32 text-center">
      <span className="font-display text-6xl font-extrabold text-emerald-500/30">404</span>
      <h2 className="text-lg font-bold text-white">Halaman tidak ditemukan</h2>
      <p className="text-sm text-zinc-500">
        Sepertinya blok yang kamu cari sudah ditambang orang lain. Coba kembali ke beranda.
      </p>
      <Link href="/" className="btn-primary">
        Kembali ke Home
      </Link>
    </div>
  );
}
