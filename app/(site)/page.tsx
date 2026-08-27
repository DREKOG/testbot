import Link from "next/link";
import Image from "next/image";
import { readDb } from "@/lib/db";
import ServerConsole from "@/components/ServerConsole";
import Icon from "@/components/Icon";
import FadeIn from "@/components/FadeIn";

export default async function HomePage() {
  const db = await readDb();
  const { general, hero, features, news } = db;
  const topFeatures = [...features].sort((a, b) => a.order - b.order).slice(0, 3);
  const topNews = [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {hero.backgroundImageUrl && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={hero.backgroundImageUrl}
              alt=""
              fill
              priority
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-base-950/40 via-base-950/70 to-base-950" />
          </div>
        )}

        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-16 text-center sm:pt-24 lg:px-8">
          <FadeIn>
            <span className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Season aktif sekarang
            </span>
          </FadeIn>

          <FadeIn delay={80}>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
          </FadeIn>

          <FadeIn delay={160}>
            <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-zinc-400 sm:text-lg">
              {hero.subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={240} className="mt-9 w-full flex justify-center">
            <ServerConsole serverIp={general.serverIp} serverPort={general.serverPort} />
          </FadeIn>

          <FadeIn delay={320}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={general.discordUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M20.3 5.4A17.7 17.7 0 0 0 15.9 4l-.3.6a13 13 0 0 1 3.7 1.4 15.6 15.6 0 0 0-13.6 0A13 13 0 0 1 9.4 4.6L9.1 4a17.7 17.7 0 0 0-4.4 1.4C2 9.6 1.3 13.7 1.6 17.7a17.9 17.9 0 0 0 5.4 2.7l.8-1.3a11.5 11.5 0 0 1-1.9-.9l.4-.3a12.7 12.7 0 0 0 11.4 0l.4.3a11.5 11.5 0 0 1-1.9.9l.8 1.3a17.8 17.8 0 0 0 5.4-2.7c.4-4.6-.7-8.7-2.1-12.3ZM8.7 15.3c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1Zm6.6 0c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1Z" />
                </svg>
                Join Discord
              </a>
              <Link href="/store" className="btn-secondary">
                Lihat Store
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES PREVIEW */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <span className="section-eyebrow">Kenapa main di sini</span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Fitur Unggulan</h2>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topFeatures.map((feature, i) => (
            <FadeIn key={feature.id} delay={i * 90}>
              <div className="card group h-full p-6 transition-transform hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Icon name={feature.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-8 flex justify-center">
            <Link href="/features" className="btn-ghost">
              Lihat semua fitur
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* NEWS PREVIEW */}
      <section className="border-t border-white/[0.05] bg-base-900/30">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <span className="section-eyebrow">Tetap update</span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Berita Terbaru</h2>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {topNews.map((post, i) => (
              <FadeIn key={post.id} delay={i * 90}>
                <Link href="/news" className="card block h-full p-6 transition-transform hover:-translate-y-1">
                  <p className="font-mono text-xs text-emerald-400">
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mt-2.5 text-base font-semibold text-white">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">
                    {post.content}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
