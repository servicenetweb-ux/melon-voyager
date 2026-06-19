import { getNavigation, getSettings } from "@/app/lib/data";

export default async function Header() {
  const [settings, nav] = await Promise.all([getSettings(), getNavigation()]);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="/" className="flex items-center gap-3 font-bold text-sky-950">
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt={settings.companyName}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan-100 text-cyan-700">
              M
            </span>
          )}
          <span>{settings.companyName}</span>
        </a>

        <nav className="hidden gap-6 text-sm font-semibold text-slate-700 md:flex">
          {nav.map((item) => (
            <a key={item.id} href={item.href} className="hover:text-cyan-600">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/contact"
          className="hidden rounded-full px-5 py-2 text-sm font-bold text-white md:inline-block"
          style={{ background: settings.primaryColor }}
        >
          Contact
        </a>

        <details className="md:hidden">
          <summary
            aria-label="Open menu"
            className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-slate-200 bg-white text-sky-950 shadow-sm [&::-webkit-details-marker]:hidden"
          >
            <span className="grid gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </summary>

          <div className="absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
            <nav className="grid p-2 text-sm font-bold text-slate-700">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="rounded-xl px-4 py-3 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/contact"
                className="mt-1 rounded-xl px-4 py-3 text-white"
                style={{ background: settings.primaryColor }}
              >
                Contact
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
