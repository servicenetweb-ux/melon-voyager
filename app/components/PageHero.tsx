type PageHeroProps = {
  badge?: string | null;
  title: string;
  subtitle?: string | null;
  image?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
};

export default function PageHero({
  badge,
  title,
  subtitle,
  image,
  buttonText,
  buttonLink,
}: PageHeroProps) {
  return (
    <section className="relative h-[56vh] min-h-[420px] overflow-hidden bg-slate-900">
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-orange-100" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-900/18 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 py-20 text-white">
        <div className="max-w-3xl">
          {badge ? (
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-orange-200">
              {badge}
            </p>
          ) : null}
          <h1 className="text-4xl font-black md:text-6xl">{title}</h1>
          {subtitle ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              {subtitle}
            </p>
          ) : null}
          {buttonText && buttonLink ? (
            <a
              href={buttonLink}
              className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-cyan-500 px-5 text-sm font-bold text-white transition hover:bg-cyan-600"
            >
              {buttonText}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
