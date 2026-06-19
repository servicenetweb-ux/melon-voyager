import Link from "next/link";
import { Car, FileText, Images, Map, Settings } from "lucide-react";
import { prisma } from "@/app/lib/prisma";

const managementLinks = [
  {
    title: "Site Settings",
    description: "Company info, logo, contact details, SEO and colors.",
    href: "/melonadmin/settings",
    icon: Settings,
  },
  {
    title: "Pages CMS",
    description: "Hero content and SEO for Home, Excursions, Cars and pages.",
    href: "/melonadmin/pages",
    icon: FileText,
  },
  {
    title: "Excursions CMS",
    description: "Create, edit, feature and publish excursion pages.",
    href: "/melonadmin/excursions",
    icon: Map,
  },
  {
    title: "Car Rental CMS",
    description: "Manage rental categories and their representative images.",
    href: "/melonadmin/cars",
    icon: Car,
  },
  {
    title: "Media Library",
    description: "Upload, preview, browse and reuse website images.",
    href: "/melonadmin/media",
    icon: Images,
  },
];

export default async function AdminDashboard() {
  const [excursions, carCategories, pages, media] = await Promise.all([
    prisma.excursion.count(),
    prisma.carCategory.count(),
    prisma.page.count(),
    prisma.media.count(),
  ]);

  const stats = [
    { label: "Excursions", value: excursions, href: "/melonadmin/excursions" },
    { label: "Car categories", value: carCategories, href: "/melonadmin/cars" },
    { label: "Pages", value: pages, href: "/melonadmin/pages" },
    { label: "Media", value: media, href: "/melonadmin/media" },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-cyan-700">
            Admin dashboard
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
            Manage the Melon Travel website
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Every public website section should be editable from this admin
            area: settings, pages, excursions, cars, navigation and media.
          </p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {stat.value}
            </p>
          </Link>
        ))}
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        {managementLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-bold text-slate-950">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
