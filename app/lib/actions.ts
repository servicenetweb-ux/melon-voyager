"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function num(formData: FormData, key: string) {
  return Number(text(formData, key) || 0);
}

function galleryUrls(formData: FormData) {
  return text(formData, "galleryUrls")
    .split(/\r?\n/)
    .map((url) => url.trim())
    .filter(Boolean);
}

async function replaceExcursionGallery(excursionId: string, urls: string[]) {
  await prisma.media.deleteMany({ where: { excursionId } });
  if (urls.length === 0) return;
  await prisma.media.createMany({
    data: urls.map((url, order) => ({
      type: "IMAGE" as const,
      url,
      title: `Gallery image ${order + 1}`,
      order,
      excursionId,
    })),
  });
}

async function replaceCarGallery(carId: string, urls: string[]) {
  await prisma.media.deleteMany({ where: { carId } });
  if (urls.length === 0) return;
  await prisma.media.createMany({
    data: urls.map((url, order) => ({
      type: "IMAGE" as const,
      url,
      title: `Gallery image ${order + 1}`,
      order,
      carId,
    })),
  });
}

export async function updateSettings(formData: FormData) {
  const id = text(formData, "id");
  const keys = [
    "companyName", "tagline", "logoUrl", "faviconUrl",
    "phone", "whatsapp", "email", "address", "googleMapsEmbedUrl",
    "facebookUrl", "instagramUrl", "tiktokUrl", "tripadvisorUrl",
    "primaryColor", "secondaryColor", "accentColor", "backgroundColor",
    "adminUsername", "adminPassword",
    "seoTitle", "seoDescription", "ogImageUrl"
  ];

  const data: Record<string, string> = {};
  for (const key of keys) {
    if (formData.has(key)) data[key] = text(formData, key);
  }
  const updateData: Record<string, string | boolean> = { ...data };
  updateData.facebookActive = bool(formData, "facebookActive");
  updateData.instagramActive = bool(formData, "instagramActive");

  if (id) await prisma.siteSettings.update({ where: { id }, data: updateData });
  else await prisma.siteSettings.create({ data: updateData as any });

  revalidatePath("/", "layout");
  revalidatePath("/melonadmin/settings");
}


export async function saveExcursion(formData: FormData) {
  const id = text(formData, "id");
  const urls = galleryUrls(formData);
  const categoryId = text(formData, "categoryId") || null;
  const data = {
    categoryId,
    title: text(formData, "title"), slug: text(formData, "slug"), shortDescription: text(formData, "shortDescription"), fullDescription: text(formData, "fullDescription"),
    coverImageUrl: text(formData, "coverImageUrl"), duration: text(formData, "duration"), availableDays: text(formData, "availableDays"), departureTime: text(formData, "departureTime"), returnTime: text(formData, "returnTime"), included: text(formData, "included"), notIncluded: text(formData, "notIncluded"), meetingPoint: text(formData, "meetingPoint"),
    featured: bool(formData, "featured"), active: bool(formData, "active"), order: num(formData, "order"), seoTitle: text(formData, "seoTitle"), seoDescription: text(formData, "seoDescription"), ogImageUrl: text(formData, "ogImageUrl")
  };
  const excursion = id
    ? await prisma.excursion.update({ where: { id }, data })
    : await prisma.excursion.create({ data });
  await replaceExcursionGallery(excursion.id, urls);
  revalidatePath("/", "layout");
  revalidatePath("/melonadmin/excursions");
}

export async function saveExcursionCategory(formData: FormData) {
  const id = text(formData, "id");
  const data = {
    name: text(formData, "name"),
    slug: text(formData, "slug"),
    imageUrl: text(formData, "imageUrl"),
    active: bool(formData, "active"),
    order: num(formData, "order"),
  };
  if (id) await prisma.excursionCategory.update({ where: { id }, data });
  else await prisma.excursionCategory.create({ data });
  revalidatePath("/", "layout");
  revalidatePath("/melonadmin/excursions");
}

export async function deleteExcursion(formData: FormData) {
  const id = text(formData, "id");
  if (!id) return;
  await prisma.excursion.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/melonadmin/excursions");
}

export async function saveCarCategory(formData: FormData) {
  const id = text(formData, "id");
  const data = { name: text(formData, "name"), slug: text(formData, "slug"), imageUrl: text(formData, "imageUrl"), active: bool(formData, "active"), order: num(formData, "order") };
  if (id) await prisma.carCategory.update({ where: { id }, data });
  else await prisma.carCategory.create({ data });
  revalidatePath("/", "layout");
  revalidatePath("/car-rental");
  revalidatePath("/melonadmin/cars");
}

export async function saveCar(formData: FormData) {
  const id = text(formData, "id");
  const urls = galleryUrls(formData);
  const categoryId = text(formData, "categoryId") || null;
  const data = { categoryId, name: text(formData, "name"), slug: text(formData, "slug"), description: text(formData, "description"), coverImageUrl: text(formData, "coverImageUrl"), features: text(formData, "features"), featured: bool(formData, "featured"), active: bool(formData, "active"), order: num(formData, "order"), seoTitle: text(formData, "seoTitle"), seoDescription: text(formData, "seoDescription"), ogImageUrl: text(formData, "ogImageUrl") };
  const car = id
    ? await prisma.car.update({ where: { id }, data })
    : await prisma.car.create({ data });
  await replaceCarGallery(car.id, urls);
  revalidatePath("/", "layout");
  revalidatePath("/melonadmin/cars");
}

export async function savePage(formData: FormData) {
  const id = text(formData, "id");
  const data: any = {
    slug: text(formData, "slug"),
    title: text(formData, "title"),
    subtitle: text(formData, "subtitle"),
    body: text(formData, "body"),
    heroImageUrl: text(formData, "heroImageUrl"),
    heroBadge: text(formData, "heroBadge"),
    heroTitle: text(formData, "heroTitle"),
    heroSubtitle: text(formData, "heroSubtitle"),
    heroButtonText: text(formData, "heroButtonText"),
    heroButtonLink: text(formData, "heroButtonLink"),
    active: bool(formData, "active"),
    order: num(formData, "order"),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
    ogImageUrl: text(formData, "ogImageUrl")
  };

  if (id) await prisma.page.update({ where: { id }, data });
  else await prisma.page.create({ data: { ...data, type: "CUSTOM" } });

  revalidatePath("/", "layout");
}
