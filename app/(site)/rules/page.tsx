import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Rules",
  description: "Peraturan server yang wajib dipatuhi oleh seluruh pemain.",
};

export default async function RulesPage() {
  const db = await readDb();
  const rules = [...db.rules].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="Wajib dibaca"
        title="Peraturan Server"
        description="Pelanggaran terhadap peraturan berikut dapat berakibat peringatan, kick, hingga banned permanen."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        {rules.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">Belum ada peraturan yang ditambahkan.</p>
        ) : (
          <ol className="flex flex-col gap-3">
            {rules.map((rule, i) => (
              <FadeIn key={rule.id} delay={(i % 8) * 60}>
                <li className="card flex items-start gap-4 p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-mono text-xs font-bold text-emerald-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-zinc-300">{rule.text}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
