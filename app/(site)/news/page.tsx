import type { Metadata } from "next";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "News",
  description: "Pengumuman dan update terbaru dari tim server.",
};

export default async function NewsPage() {
  const db = await readDb();
  const news = [...db.news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageHeader
        eyebrow="Pengumuman"
        title="Berita & Update"
        description="Ikuti perkembangan terbaru seputar update, event, dan maintenance server."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        {news.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">Belum ada pengumuman.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {news.map((post, i) => (
              <FadeIn key={post.id} delay={(i % 6) * 70}>
                <article className="card p-6 sm:p-7">
                  <p className="font-mono text-xs font-medium text-emerald-400">
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-white sm:text-xl">{post.title}</h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-400">
                    {post.content}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
