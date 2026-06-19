import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "../components/PageHero";
import SiteBackground from "../components/SiteBackground";
import { getPage, getSettings } from "../lib/data";
import { resolveGoogleMapsEmbedUrl } from "../lib/googleMaps";
import { isManagedImage } from "../lib/images";

export default async function ContactPage() {
  const [p, s] = await Promise.all([getPage("contact"), getSettings()]);
  const page = p as any;
  const bg = isManagedImage(s.backgroundColor) ? s.backgroundColor : null;
  const whatsappHref = s.whatsapp
    ? `https://wa.me/${s.whatsapp.replace(/\D/g, "")}`
    : undefined;
  const mapUrl = await resolveGoogleMapsEmbedUrl(s.googleMapsEmbedUrl);

  return (
    <main>
      <PageHero
        badge={page?.heroBadge}
        title={page?.heroTitle || p?.title || "Contact"}
        subtitle={page?.heroSubtitle || p?.subtitle}
        image={s.ogImageUrl}
        buttonText={page?.heroButtonText}
        buttonLink={page?.heroButtonLink}
      />
      <SiteBackground image={bg}>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <a
            href={whatsappHref || `tel:${s.phone || ""}`}
            className="rounded-3xl bg-white/85 p-8 shadow-sm backdrop-blur-sm"
          >
            <MessageCircle className="h-9 w-9 text-emerald-600" />
            <h2 className="mt-5 text-xl font-black text-sky-950">WhatsApp</h2>
            <p className="mt-2 font-semibold text-slate-700">
              {s.whatsapp || s.phone}
            </p>
          </a>

          <a
            href={`mailto:${s.email || ""}`}
            className="rounded-3xl bg-white/85 p-8 shadow-sm backdrop-blur-sm"
          >
            <Mail className="h-9 w-9 text-cyan-600" />
            <h2 className="mt-5 text-xl font-black text-sky-950">Email</h2>
            <p className="mt-2 font-semibold text-slate-700">{s.email}</p>
          </a>

          <div className="rounded-3xl bg-white/85 p-8 shadow-sm backdrop-blur-sm">
            <Phone className="h-9 w-9 text-sky-700" />
            <h2 className="mt-5 text-xl font-black text-sky-950">Phone</h2>
            <p className="mt-2 font-semibold text-slate-700">{s.phone}</p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white/85 shadow-sm backdrop-blur-sm md:col-span-3">
            <div className="flex items-center gap-3 p-6">
              <MapPin className="h-8 w-8 text-red-600" />
              <div>
                <h2 className="text-xl font-black text-sky-950">Find us</h2>
                <p className="text-slate-600">{s.address}</p>
              </div>
            </div>
            {mapUrl ? (
              <iframe
                src={mapUrl}
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="grid h-64 place-items-center bg-slate-100 text-sm font-semibold text-slate-500">
                Add Google Maps embed URL from Site Settings.
              </div>
            )}
          </div>
        </div>
      </SiteBackground>
    </main>
  );
}
