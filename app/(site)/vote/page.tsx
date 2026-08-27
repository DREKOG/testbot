import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Vote",
  description: "Vote server setiap hari dan dapatkan reward menarik.",
};

export default async function VotePage() {
  const db = await readDb();

  return (
    <>
      <PageHeader
        eyebrow="Dukung server"
        title="Vote Untuk Reward"
        description="Vote setiap 24 jam untuk membantu server naik peringkat dan dapatkan reward in-game gratis."
      />

      <section className="mx-auto max-w-2xl px-5 py-16 lg:px-8">
        <FadeIn>
          <div className="card flex flex-col items-center gap-5 p-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Icon name="star" className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Satu klik, banyak reward</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Voting membantu server kami ditemukan lebih banyak pemain baru. Sebagai balasannya,
                kamu akan mendapatkan koin dan item eksklusif secara otomatis di dalam game.
              </p>
            </div>
            <a href={db.general.voteUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              Vote Sekarang
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="text-xs text-zinc-600">Voting dapat dilakukan ulang setiap 24 jam.</p>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
