import { updateSettings } from "@/app/lib/actions";
import { getSettings } from "@/app/lib/data";
import MediaPicker from "../components/MediaPicker";
import fs from "fs";
import path from "path";
import { isManagedImage } from "@/app/lib/images";
import { prisma } from "@/app/lib/prisma";

function getUploadedImages() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  try {
    return fs
      .readdirSync(uploadsDir)
      .filter((file) => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
      .map((file) => `/uploads/${file}`)
      .reverse();
  } catch {
    return [];
  }
}

async function getMediaImages() {
  const media = await prisma.media.findMany({
    where: { type: "IMAGE" },
    orderBy: { createdAt: "desc" },
    select: { url: true },
  });

  return Array.from(
    new Set([...media.map((image) => image.url), ...getUploadedImages()]),
  );
}

function ImageField({
  title,
  inputId,
  name,
  value,
  images,
}: {
  title: string;
  inputId: string;
  name: string;
  value?: string | null;
  images: string[];
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
      <span className="font-bold text-sky-950">{title}</span>
      <input id={inputId} name={name} defaultValue={value || ""} type="hidden" />
      <MediaPicker images={images} targetId={inputId} initialValue={value} />
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  area = false,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  area?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {area ? (
        <textarea
          name={name}
          defaultValue={defaultValue || ""}
          className="mt-1 h-28 w-full rounded-xl border border-slate-300 p-3 text-sm"
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue || ""}
          className="mt-1 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
        />
      )}
    </label>
  );
}

function SocialField({
  label,
  urlName,
  activeName,
  url,
  active,
}: {
  label: string;
  urlName: string;
  activeName: string;
  url?: string | null;
  active?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Field name={urlName} label={`${label} URL`} defaultValue={url} />
      <label className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-700">
        <input
          type="checkbox"
          name={activeName}
          defaultChecked={active}
          className="h-4 w-4 rounded border-slate-300 text-cyan-600"
        />
        Show {label}
      </label>
    </div>
  );
}

export default async function Settings() {
  const [s, images] = await Promise.all([getSettings(), getMediaImages()]);

  return (
    <form action={updateSettings} className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
      <input type="hidden" name="id" value={s.id} />

      <div>
        <h2 className="text-2xl font-black text-sky-950">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose images from the Media Library. No manual URL typing needed.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field name="companyName" label="Company Name" defaultValue={s.companyName} />
        <Field name="tagline" label="Tagline" defaultValue={s.tagline} />
        <Field name="phone" label="Phone" defaultValue={s.phone} />
        <Field name="whatsapp" label="WhatsApp" defaultValue={s.whatsapp} />
        <Field name="email" label="Email" defaultValue={s.email} />
        <Field name="address" label="Address" defaultValue={s.address} />
        <Field name="adminUsername" label="Admin Username" defaultValue={s.adminUsername} />
        <Field name="adminPassword" label="Admin Password" type="password" defaultValue={s.adminPassword} />
        <Field area name="googleMapsEmbedUrl" label="Google Maps share link or embed URL" defaultValue={s.googleMapsEmbedUrl} />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-black text-sky-950">Social links</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <SocialField
            label="Instagram"
            urlName="instagramUrl"
            activeName="instagramActive"
            url={s.instagramUrl}
            active={s.instagramActive}
          />
          <SocialField
            label="Facebook"
            urlName="facebookUrl"
            activeName="facebookActive"
            url={s.facebookUrl}
            active={s.facebookActive}
          />
        </div>
      </div>

      <ImageField title="Logo" inputId="logoUrl" name="logoUrl" value={s.logoUrl} images={images} />
      <ImageField title="Favicon" inputId="faviconUrl" name="faviconUrl" value={s.faviconUrl} images={images} />
      <ImageField title="Global hero image" inputId="ogImageUrl" name="ogImageUrl" value={s.ogImageUrl} images={images} />
      <ImageField title="Site background image" inputId="backgroundColor" name="backgroundColor" value={isManagedImage(s.backgroundColor) ? s.backgroundColor : ""} images={images} />

      <button type="submit" className="rounded-full bg-cyan-500 px-8 py-3 font-bold text-white hover:bg-cyan-600">
        Save settings
      </button>
    </form>
  );
}
