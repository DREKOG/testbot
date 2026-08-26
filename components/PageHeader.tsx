import FadeIn from "@/components/FadeIn";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-white/[0.05] bg-grid-fade">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center lg:px-8">
        <FadeIn>
          <span className="section-eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
          {description && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
