import Link from "next/link";
import { readDb } from "@/lib/db";

export default async function AdminOverviewPage() {
  const db = await readDb();

  const stats = [
    { label: "Fitur", value: db.features.length, href: "/admin/features" },
    { label: "Pengumuman", value: db.news.length, href: "/admin/news" },
    { label: "Peraturan", value: db.rules.length, href: "/admin/rules" },
    { label: "Paket Store", value: db.store.length, href: "/admin/store" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Overview</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Kelola seluruh konten website {db.general.serverName} dari sini. Perubahan langsung
        tampil di situs publik tanpa perlu deploy ulang.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card p-5 transition-transform hover:-translate-y-0.5"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <h2 className="text-sm font-semibold text-white">Ringkasan Server</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-zinc-500">Nama Server</dt>
            <dd className="mt-1 text-sm text-zinc-300">{db.general.serverName}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Alamat IP</dt>
            <dd className="mt-1 font-mono text-sm text-zinc-300">
              {db.general.serverIp}:{db.general.serverPort}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Discord</dt>
            <dd className="mt-1 truncate text-sm text-zinc-300">{db.general.discordUrl}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Link Vote</dt>
            <dd className="mt-1 truncate text-sm text-zinc-300">{db.general.voteUrl}</dd>
          </div>
        </dl>
        <Link href="/admin/general" className="btn-secondary mt-5 !py-2">
          Edit pengaturan umum
        </Link>
      </div>
    </div>
  );
}
