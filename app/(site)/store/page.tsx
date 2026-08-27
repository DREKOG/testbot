import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Store",
  description: "Dukung server dan dapatkan benefit eksklusif lewat paket rank donasi.",
};

export default async function StorePage() {
  const db = await readDb();
  const packages = [...db.store].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="Donation Store"
        title="Paket Rank & Donasi"
        description="Donasi kamu membantu biaya operasional server tetap berjalan. Semua pembelian bersifat opsional dan tidak pay-to-win."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        {packages.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">Belum ada paket yang tersedia.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.id} delay={i * 90}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 transition-transform hover:-translate-y-1 ${
                    pkg.highlighted
                      ? "border-emerald-400/50 bg-emerald-500/[0.06] shadow-glow"
                      : "border-white/[0.07] bg-base-800/50 backdrop-blur-md"
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-base-950">
                      Terpopuler
                    </span>
                  )}

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        pkg.highlighted ? "bg-emerald-400/20 text-emerald-300" : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      <Icon name="crown" className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                  </div>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">
                      {pkg.currency === "IDR" ? "Rp" : pkg.currency} {pkg.price}
                    </span>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                    {pkg.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-400">
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={db.general.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pkg.highlighted ? "btn-primary mt-7 w-full" : "btn-secondary mt-7 w-full"}
                  >
                    Beli Sekarang
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn>
          <p className="mt-10 text-center text-xs text-zinc-600">
            Pembelian diproses manual oleh staff lewat Discord. Simpan bukti transfer untuk klaim benefit.
          </p>
        </FadeIn>
      </section>
    </>
  );
}
