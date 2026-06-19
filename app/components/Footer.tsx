import { getSettings } from "@/app/lib/data";

export default async function Footer() {
  const s = await getSettings();
  const socialLinks = [
    s.instagramActive && s.instagramUrl
      ? { label: "Instagram", href: s.instagramUrl }
      : null,
    s.facebookActive && s.facebookUrl
      ? { label: "Facebook", href: s.facebookUrl }
      : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="mt-20 bg-sky-950 text-white">
      <div
        className={`mx-auto grid max-w-7xl gap-8 px-5 py-12 ${
          socialLinks.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        <div>
          <h3 className="text-xl font-bold">{s.companyName}</h3>
          {s.tagline ? <p className="mt-3 text-sky-100">{s.tagline}</p> : null}
        </div>

        <div>
          <h4 className="font-bold">Contact</h4>
          {s.phone ? <p className="mt-3 text-sky-100">{s.phone}</p> : null}
          {s.email ? <p className="text-sky-100">{s.email}</p> : null}
          {s.address ? <p className="text-sky-100">{s.address}</p> : null}
        </div>

        {socialLinks.length > 0 ? (
          <div>
            <h4 className="font-bold">Social</h4>
            <div className="mt-3 flex gap-4 text-sky-100">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
