"use client";

import { useEffect, useState } from "react";

interface StatusResponse {
  online: boolean;
  players?: { online: number; max: number };
  version?: string | null;
  error?: string;
}

export default function ServerConsole({
  serverIp,
  serverPort,
}: {
  serverIp: string;
  serverPort: string;
}) {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const displayAddress =
    serverPort && serverPort !== "25565" ? `${serverIp}:${serverPort}` : serverIp;

  useEffect(() => {
    let cancelled = false;

    async function fetchStatus() {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setStatus(data);
      } catch {
        if (!cancelled) setStatus({ online: false, error: "Gagal memuat status" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(displayAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="glass-strong w-full max-w-md rounded-2xl p-1 shadow-glow">
      <div className="rounded-xl bg-base-950/70 px-5 py-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
              server.address
            </span>
          </div>

          {loading ? (
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500" />
              Memeriksa…
            </span>
          ) : status?.online ? (
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              ONLINE · {status.players?.online ?? 0}/{status.players?.max ?? 0} pemain
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-zinc-600" />
              OFFLINE
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <code className="flex-1 truncate font-mono text-lg font-semibold text-white sm:text-xl">
            {displayAddress}
          </code>
          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-base-950 transition-all hover:bg-emerald-400 active:scale-95"
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Disalin
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="8" y="8" width="12" height="12" rx="2" />
                  <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
                Copy IP
              </>
            )}
          </button>
        </div>

        {status?.online && status.version && (
          <p className="mt-2 text-[11px] text-zinc-600">Versi server: {status.version}</p>
        )}
        {!loading && !status?.online && (
          <p className="mt-2 text-[11px] text-zinc-600">
            Server sedang offline atau maintenance — coba lagi sebentar lagi.
          </p>
        )}
      </div>
    </div>
  );
}
