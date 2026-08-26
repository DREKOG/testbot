import Link from "next/link";
import type { GeneralSettings } from "@/lib/types";

export default function Footer({ general }: { general: GeneralSettings }) {
  return (
    <footer className="border-t border-white/[0.06] bg-base-900/60">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-base-950" fill="currentColor">
                  <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />
                </svg>
              </span>
              <span className="font-display text-base font-bold text-white">
                {general.serverName}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              {general.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Navigasi
            </h4>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/features" className="text-zinc-400 hover:text-emerald-300">Features</Link>
              <Link href="/news" className="text-zinc-400 hover:text-emerald-300">News</Link>
              <Link href="/rules" className="text-zinc-400 hover:text-emerald-300">Rules</Link>
              <Link href="/store" className="text-zinc-400 hover:text-emerald-300">Store</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Sosial
            </h4>
            <div className="mt-3 flex items-center gap-3">
              <a
                href={general.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                aria-label="Discord"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M20.3 5.4A17.7 17.7 0 0 0 15.9 4l-.3.6a13 13 0 0 1 3.7 1.4 15.6 15.6 0 0 0-13.6 0A13 13 0 0 1 9.4 4.6L9.1 4a17.7 17.7 0 0 0-4.4 1.4C2 9.6 1.3 13.7 1.6 17.7a17.9 17.9 0 0 0 5.4 2.7l.8-1.3a11.5 11.5 0 0 1-1.9-.9l.4-.3a12.7 12.7 0 0 0 11.4 0l.4.3a11.5 11.5 0 0 1-1.9.9l.8 1.3a17.8 17.8 0 0 0 5.4-2.7c.4-4.6-.7-8.7-2.1-12.3ZM8.7 15.3c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1Zm6.6 0c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1Z" />
                </svg>
              </a>
              <Link
                href="/vote"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                aria-label="Vote"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {general.serverName}. Bukan produk resmi Mojang/Microsoft.
          </p>
          <p className="font-mono">{general.serverIp}</p>
        </div>
      </div>
    </footer>
  );
}
