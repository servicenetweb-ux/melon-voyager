import ExcursionCard from "./components/ExcursionCard";
import PageHero from "./components/PageHero";
import SiteBackground from "./components/SiteBackground";
import {
  getExcursionCategories,
  getFeaturedExcursions,
  getPage,
  getSettings,
} from "./lib/data";
import { isManagedImage } from "./lib/images";

export default async function Home() {
  const [settings, page, excursions, categories] = await Promise.all([
    getSettings(),
    getPage("home"),
    getFeaturedExcursions(),
    getExcursionCategories(),
  ]);

  const homePage = page as any;
  const siteBackground = isManagedImage(settings.backgroundColor)
    ? settings.backgroundColor
    : null;

  return (
    <main>
      <PageHero
        badge={homePage?.heroBadge || "Melon Travel"}
        title={homePage?.heroTitle || page?.title || settings.companyName}
        subtitle={homePage?.heroSubtitle || page?.subtitle || settings.tagline}
        image={settings.ogImageUrl}
        buttonText={homePage?.heroButtonText || "Explore excursions"}
        buttonLink={homePage?.heroButtonLink || "/excursions"}
      />

      <SiteBackground image={siteBackground}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-cyan-700">
                Featured
              </p>
              <h2 className="mt-2 text-4xl font-black text-sky-950">
                Popular excursions
              </h2>
            </div>
            <a
              href="/excursions"
              className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white"
            >
              View all excursions
            </a>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {excursions.map((item) => (
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

          <div className="mt-20">
            <p className="text-sm font-bold uppercase text-cyan-700">
              Categories
            </p>
            <h2 className="mt-2 text-4xl font-black text-sky-950">
              Choose your tour style
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/excursions/category/${category.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[16/10] bg-sky-100">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl font-black text-sky-950">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      {category._count.excursions} excursions
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </SiteBackground>
    </main>
  );
}
