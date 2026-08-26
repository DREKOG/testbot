"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { GeneralSettings } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/news", label: "News" },
  { href: "/rules", label: "Rules" },
  { href: "/vote", label: "Vote" },
  { href: "/store", label: "Store" },
];

export default function Navbar({ general }: { general: GeneralSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-base-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-glow">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-base-950" fill="currentColor">
              <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-white">
            {general.serverName}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <a
            href={general.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !py-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M20.3 5.4A17.7 17.7 0 0 0 15.9 4l-.3.6a13 13 0 0 1 3.7 1.4 15.6 15.6 0 0 0-13.6 0A13 13 0 0 1 9.4 4.6L9.1 4a17.7 17.7 0 0 0-4.4 1.4C2 9.6 1.3 13.7 1.6 17.7a17.9 17.9 0 0 0 5.4 2.7l.8-1.3a11.5 11.5 0 0 1-1.9-.9l.4-.3a12.7 12.7 0 0 0 11.4 0l.4.3a11.5 11.5 0 0 1-1.9.9l.8 1.3a17.8 17.8 0 0 0 5.4-2.7c.4-4.6-.7-8.7-2.1-12.3ZM8.7 15.3c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1Zm6.6 0c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1Z" />
            </svg>
            Discord
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 hover:bg-white/5 md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-base-950/95 px-5 pb-5 pt-2 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "text-zinc-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={general.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-2"
            >
              Join Discord
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
