import { notFound } from "next/navigation";
import ExcursionCard from "@/app/components/ExcursionCard";
import PageHero from "@/app/components/PageHero";
import SiteBackground from "@/app/components/SiteBackground";
import { prisma } from "@/app/lib/prisma";
import { getSettings } from "@/app/lib/data";
import { isManagedImage } from "@/app/lib/images";

export default async function ExcursionCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, category] = await Promise.all([
    getSettings(),
    prisma.excursionCategory.findUnique({
      where: { slug },
      include: {
        excursions: {
          where: { active: true },
          include: { category: true },
          orderBy: { order: "asc" },
        },
      },
    }),
  ]);

  if (!category || !category.active) notFound();

  const siteBackground = isManagedImage(settings.backgroundColor)
    ? settings.backgroundColor
    : null;

  return (
    <main>
      <PageHero
        title={category.name}
        subtitle="Browse excursions in this category."
        image={settings.ogImageUrl}
      />
      <SiteBackground image={siteBackground}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {category.excursions.map((item) => (
              <ExcursionCard
                key={item.id}
                title={item.title}
                image={item.coverImageUrl}
                href={`/excursions/${item.slug}`}
                availableDays={item.availableDays}
                departureTime={item.departureTime}
                categoryName={item.category?.name}
              />
            ))}
          </div>
        </div>
      </SiteBackground>
    </main>
  );
}
