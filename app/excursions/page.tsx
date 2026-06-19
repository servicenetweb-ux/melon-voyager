import ExcursionSearch from "../components/ExcursionSearch";
import PageHero from "../components/PageHero";
import SiteBackground from "../components/SiteBackground";
import { getExcursions, getPage, getSettings } from "../lib/data";
import { isManagedImage } from "../lib/images";

export default async function ExcursionsPage() {
  const [page, excursions, settings] = await Promise.all([
    getPage("excursions"),
    getExcursions(),
    getSettings(),
  ]);
  const editablePage = page as any;
  const siteBackground = isManagedImage(settings.backgroundColor)
    ? settings.backgroundColor
    : null;

  return (
    <main>
      <PageHero
        badge={editablePage?.heroBadge}
        title={editablePage?.heroTitle || page?.title || "Excursions"}
        subtitle={editablePage?.heroSubtitle || page?.subtitle}
        image={settings.ogImageUrl}
        buttonText={editablePage?.heroButtonText}
        buttonLink={editablePage?.heroButtonLink}
      />
      <SiteBackground image={siteBackground}>
        <div className="mx-auto max-w-7xl">
          <ExcursionSearch
            excursions={excursions.map((item) => ({
              id: item.id,
              title: item.title,
              slug: item.slug,
              coverImageUrl: item.coverImageUrl,
              availableDays: item.availableDays,
              departureTime: item.departureTime,
              category: item.category ? { name: item.category.name } : null,
            }))}
          />
        </div>
      </SiteBackground>
    </main>
  );
}
