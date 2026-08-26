export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-32">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-400" />
      <p className="text-sm text-zinc-500">Memuat…</p>
    </div>
  );
}
