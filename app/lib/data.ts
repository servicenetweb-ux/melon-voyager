import { prisma } from "./prisma";

export async function getSettings() {
  const settings = await prisma.siteSettings.findFirst();
  return settings ?? prisma.siteSettings.create({ data: {} });
}

export async function getNavigation() {
  return prisma.navigationItem.findMany({ where: { active: true }, orderBy: { order: "asc" } });
}

export async function getPage(slug: string) {
  return prisma.page.findUnique({ where: { slug }, include: { sections: { orderBy: { order: "asc" } } } });
}

export async function getFeaturedExcursions() {
  return prisma.excursion.findMany({ where: { active: true, featured: true }, include: { category: true }, orderBy: { order: "asc" }, take: 6 });
}

export async function getExcursions() {
  return prisma.excursion.findMany({ where: { active: true }, include: { category: true }, orderBy: { order: "asc" } });
}

export async function getExcursionCategories() {
  return prisma.excursionCategory.findMany({ where: { active: true }, include: { _count: { select: { excursions: true } } }, orderBy: { order: "asc" } });
}

export async function getExcursionsByCategory(slug: string) {
  return prisma.excursion.findMany({ where: { active: true, category: { slug, active: true } }, include: { category: true }, orderBy: { order: "asc" } });
}

export async function getCars() {
  return prisma.car.findMany({ where: { active: true }, include: { category: true }, orderBy: { order: "asc" } });
}

export async function getCarCategories() {
  return prisma.carCategory.findMany({ where: { active: true }, orderBy: { order: "asc" } });
}
