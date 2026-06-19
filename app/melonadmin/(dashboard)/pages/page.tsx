import { savePage } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";

function Field({
  name,
  label,
  defaultValue,
  area = false,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {area ? (
        <textarea name={name} defaultValue={defaultValue || ""} className="mt-1 h-28 w-full rounded-xl border p-3" />
      ) : (
        <input name={name} defaultValue={defaultValue || ""} className="mt-1 w-full rounded-xl border p-3" />
      )}
    </label>
  );
}

export default async function AdminPages() {
  const pages = await prisma.page.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="grid gap-5">
      {pages.map((p) => {
        const page = p as any;

        return (
          <form key={p.id} action={savePage} className="rounded-3xl bg-white p-8 shadow-sm">
            <input type="hidden" name="id" value={p.id} />

            <div className="mb-6">
              <h2 className="text-2xl font-black text-sky-950">{p.title}</h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage page content, SEO and homepage hero options.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field name="title" label="Title" defaultValue={p.title} />
              <Field name="slug" label="Slug" defaultValue={p.slug} />
              <Field name="subtitle" label="Subtitle" defaultValue={p.subtitle} />
              <Field name="order" label="Order" defaultValue={String(p.order)} />

              <Field name="heroBadge" label="Hero Badge" defaultValue={page.heroBadge} />
              <Field name="heroTitle" label="Hero Title" defaultValue={page.heroTitle} />
              <Field name="heroSubtitle" label="Hero Subtitle" defaultValue={page.heroSubtitle} />
              <Field name="heroButtonText" label="Hero Button Text" defaultValue={page.heroButtonText} />
              <Field name="heroButtonLink" label="Hero Button Link" defaultValue={page.heroButtonLink} />

              <Field name="seoTitle" label="SEO title" defaultValue={p.seoTitle} />
              <Field name="seoDescription" label="SEO description" defaultValue={p.seoDescription} />
              <Field name="ogImageUrl" label="OG image" defaultValue={p.ogImageUrl} />
              <Field area name="body" label="Body" defaultValue={p.body} />
            </div>

            <label className="mt-4 block font-bold text-slate-700">
              <input type="checkbox" name="active" defaultChecked={p.active} className="mr-2" />
              Active
            </label>

            {p.slug === "home" ? (
              <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
                <h3 className="mb-2 font-black text-sky-950">Homepage Hero Manager</h3>
                <p className="text-sm text-slate-600">
                  Change the homepage badge, title, subtitle and button from here. The background image is global in Settings.
                </p>
              </div>
            ) : null}

            <button type="submit" className="mt-5 rounded-full bg-sky-950 px-6 py-2 font-bold text-white">
              Save page
            </button>
          </form>
        );
      })}
    </div>
  );
}
