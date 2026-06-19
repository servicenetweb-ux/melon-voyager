import { notFound } from "next/navigation";
import SiteBackground from "@/app/components/SiteBackground";
import { getSettings } from "@/app/lib/data";
import { isManagedImage } from "@/app/lib/images";
import { prisma } from "@/app/lib/prisma";

export default async function ExcursionDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [x, settings] = await Promise.all([
    prisma.excursion.findUnique({
      where: { slug },
      include: {
        category: true,
        gallery: { orderBy: { order: "asc" } },
      },
    }),
    getSettings(),
  ]);

  if (!x || !x.active) notFound();

  const bg = isManagedImage(settings.backgroundColor)
    ? settings.backgroundColor
    : null;

  return (
    <main>
      <SiteBackground image={bg} className="py-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/84 p-5 shadow-sm backdrop-blur-sm">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-sky-100">
            {x.coverImageUrl ? (
              <img
                src={x.coverImageUrl}
                alt={x.title}
                className="h-[360px] w-full object-cover md:h-[420px]"
              />
            ) : null}
          </div>

          <div className="mt-10">
            {x.category ? (
              <p className="text-sm font-bold uppercase text-cyan-700">
                {x.category.name}
              </p>
            ) : null}
            <h1 className="mt-2 text-5xl font-black text-sky-950">
              {x.title}
            </h1>
            <p className="mt-4 text-xl text-slate-600">
              {x.shortDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl bg-sky-50 p-6 md:grid-cols-3">
            <div>
              <b>Days</b>
              <p>{x.availableDays}</p>
            </div>
            <div>
              <b>Departure</b>
              <p>{x.departureTime}</p>
            </div>
            <div>
              <b>Return</b>
              <p>{x.returnTime}</p>
            </div>
          </div>

          <article className="mt-10 whitespace-pre-line text-lg leading-8 text-slate-700">
            {x.fullDescription}
          </article>

          {x.gallery.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {x.gallery.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.altText || x.title}
                  className="h-64 w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          ) : null}
        </div>
      </SiteBackground>
    </main>
  );
}
