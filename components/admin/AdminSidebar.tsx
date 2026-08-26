"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/admin", label: "Overview", icon: "grid" },
  { href: "/admin/general", label: "General", icon: "settings" },
  { href: "/admin/hero", label: "Hero", icon: "image" },
  { href: "/admin/features", label: "Features", icon: "sparkles" },
  { href: "/admin/news", label: "News", icon: "megaphone" },
  { href: "/admin/rules", label: "Rules", icon: "list" },
  { href: "/admin/store", label: "Store", icon: "shopping" },
];

const ICONS: Record<string, JSX.Element> = {
  grid: <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m6 17 4.5-4.5L13 15l3-3.5L20.5 17" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v3M12 18v3M4.2 4.2l2 2M17.8 17.8l2 2M3 12h3M18 12h3M4.2 19.8l2-2M17.8 6.2l2-2" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l3 5V4l-3 5H5a2 2 0 0 0-2 2Z" />
      <path d="M14 8a4 4 0 0 1 0 8M17.5 5.5a8 8 0 0 1 0 13" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6h.01M3 12h.01M3 18h.01" />
    </>
  ),
  shopping: (
    <>
      <path d="M4 6h16l-1.5 10.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 6Z" />
      <path d="M8 6V5a4 4 0 0 1 8 0v1" />
    </>
  ),
};

function SidebarIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const NavList = (
    <nav className="flex flex-1 flex-col gap-1">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-emerald-500/10 text-emerald-300"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
            }`}
          >
            <SidebarIcon name={link.icon} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-base-900/60 px-4 py-3 lg:hidden">
        <span className="font-display text-sm font-bold text-white">Admin Panel</span>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 hover:bg-white/5"
          aria-label="Buka menu admin"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-b border-white/[0.06] bg-base-900/95 px-4 py-3 lg:hidden">
          {NavList}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
          >
            Keluar
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-white/[0.06] bg-base-900/40 p-4 lg:flex">
        <div className="mb-6 flex items-center gap-2.5 px-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-base-950" fill="currentColor">
              <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />
            </svg>
          </span>
          <span className="font-display text-sm font-bold text-white">Admin Panel</span>
        </div>

        {NavList}

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {loggingOut ? "Keluar…" : "Keluar"}
        </button>

        <Link href="/" target="_blank" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-600 hover:text-zinc-400">
          Lihat situs publik ↗
        </Link>
      </aside>
    </>
  );
}
