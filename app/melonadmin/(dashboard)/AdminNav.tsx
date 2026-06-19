"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  FileText,
  Gauge,
  Images,
  Map,
  Menu,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/melonadmin", icon: Gauge },
  { label: "Site Settings", href: "/melonadmin/settings", icon: Settings },
  { label: "Pages CMS", href: "/melonadmin/pages", icon: FileText },
  { label: "Excursions", href: "/melonadmin/excursions", icon: Map },
  { label: "Car Rental", href: "/melonadmin/cars", icon: Car },
  { label: "Media Library", href: "/melonadmin/media", icon: Images },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500 text-white">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">
            Melon Travel
          </p>
          <h1 className="text-lg font-bold text-slate-950">CMS Admin</h1>
        </div>
      </div>

      <nav className="grid gap-1 p-3 sm:grid-cols-2 lg:block">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
