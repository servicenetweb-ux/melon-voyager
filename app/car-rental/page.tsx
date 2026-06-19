import PageHero from "../components/PageHero";
import SiteBackground from "../components/SiteBackground";
import { getCarCategories, getPage, getSettings } from "../lib/data";
import { isManagedImage } from "../lib/images";

export default async function CarsPage() {
  const [page, categories, settings] = await Promise.all([
    getPage("car-rental"),
    getCarCategories(),
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
        title={editablePage?.heroTitle || page?.title || "Car Rental"}
        subtitle={editablePage?.heroSubtitle || page?.subtitle}
        image={settings.ogImageUrl}
        buttonText={editablePage?.heroButtonText}
        buttonLink={editablePage?.heroButtonLink}
      />
      <SiteBackground image={siteBackground}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex h-72 items-center justify-center bg-white p-5">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-sky-50 text-sm font-bold text-slate-400">
                      No image selected
                    </div>
                  )}
                </div>
                <div className="border-t border-slate-100 p-5">
                  <h2 className="text-2xl font-black text-sky-950">
                    {category.name}
                  </h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SiteBackground>
    </main>
  );
}
