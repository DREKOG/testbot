import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Features",
  description: "Fitur dan mode permainan unggulan yang tersedia di server.",
};

export default async function FeaturesPage() {
  const db = await readDb();
  const features = [...db.features].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="Gameplay"
        title="Fitur & Mode Permainan"
        description="Semua yang membuat pengalaman bermain di server ini lebih seru dan berbeda."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        {features.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">Belum ada fitur yang ditambahkan.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FadeIn key={feature.id} delay={(i % 6) * 80}>
                <div className="card group h-full p-6 transition-transform hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                    <Icon name={feature.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
