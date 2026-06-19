import { notFound } from "next/navigation";
import SiteBackground from "@/app/components/SiteBackground";
import { getSettings } from "@/app/lib/data";
import { isManagedImage } from "@/app/lib/images";
import { prisma } from "@/app/lib/prisma";

export default async function CarDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [car, settings] = await Promise.all([
    prisma.car.findUnique({ where: { slug }, include: { category: true } }),
    getSettings(),
  ]);

  if (!car || !car.active) notFound();

  const bg = isManagedImage(settings.backgroundColor)
    ? settings.backgroundColor
    : null;

  return (
    <main>
      <SiteBackground image={bg} className="py-12">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-white/84 p-5 shadow-sm backdrop-blur-sm">
          {car.coverImageUrl ? (
            <img
              src={car.coverImageUrl}
              alt={car.name}
              className="aspect-[16/10] w-full rounded-[1.5rem] object-cover"
            />
          ) : null}
          <div className="p-4">
            {car.category ? (
              <p className="text-sm font-bold uppercase text-cyan-700">
                {car.category.name}
              </p>
            ) : null}
            <h1 className="mt-2 text-5xl font-black text-sky-950">
              {car.name}
            </h1>
          </div>
        </div>
      </SiteBackground>
    </main>
  );
}
