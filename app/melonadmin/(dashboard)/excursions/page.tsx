import fs from "fs";
import path from "path";
import { Plus, Save, Trash2 } from "lucide-react";
import {
  deleteExcursion,
  saveExcursion,
  saveExcursionCategory,
} from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import {
  AdminAccordionItem,
  AdminAccordionList,
} from "../components/AdminAccordion";
import GalleryPicker from "../components/GalleryPicker";
import MediaPicker from "../components/MediaPicker";

function getUploadedImageUrls() {
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

async function getMediaUrls() {
  const [media, files] = await Promise.all([
    prisma.media.findMany({
      where: { type: "IMAGE" },
      orderBy: { createdAt: "desc" },
    }),
    Promise.resolve(getUploadedImageUrls()),
  ]);

  return Array.from(new Set([...media.map((item) => item.url), ...files]));
}

function Field({
  name,
  label,
  defaultValue,
  area = false,
  type = "text",
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  area?: boolean;
  type?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {area ? (
        <textarea
          name={name}
          rows={rows}
          defaultValue={defaultValue || ""}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue || ""}
          className="mt-1 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
        />
      )}
    </label>
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
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <span className="text-sm font-bold text-slate-700">{title}</span>
      <input id={inputId} name={name} defaultValue={value || ""} type="hidden" />
      <MediaPicker images={images} targetId={inputId} initialValue={value} />
    </div>
  );
}

function GalleryField({
  inputId,
  value,
  images,
}: {
  inputId: string;
  value?: string[];
  images: string[];
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <span className="text-sm font-bold text-slate-700">Gallery</span>
      <input
        id={inputId}
        name="galleryUrls"
        defaultValue={(value || []).join("\n")}
        type="hidden"
      />
      <GalleryPicker
        images={images}
        targetId={inputId}
        initialValue={value || []}
      />
    </div>
  );
}

function StatusFields({
  featured = false,
  active = true,
}: {
  featured?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
        <input type="checkbox" name="featured" defaultChecked={featured} />
        Show on homepage
      </label>
      <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
        <input type="checkbox" name="active" defaultChecked={active} />
        Active
      </label>
    </div>
  );
}

function CategorySelect({
  categories,
  value,
}: {
  categories: { id: string; name: string }[];
  value?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">Category</span>
      <select
        name="categoryId"
        defaultValue={value || ""}
        className="mt-1 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
      >
        <option value="">No category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default async function AdminExcursions() {
  const [items, categories, images] = await Promise.all([
    prisma.excursion.findMany({
      include: { category: true, gallery: { orderBy: { order: "asc" } } },
      orderBy: [{ order: "asc" }, { title: "asc" }],
    }),
    prisma.excursionCategory.findMany({ orderBy: { order: "asc" } }),
    getMediaUrls(),
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase text-cyan-700">
          Excursions CMS
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Manage excursions
        </h1>
      </section>

      <form
        action={saveExcursion}
        className="space-y-5 rounded-lg border border-slate-200 bg-white p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">
            Create new excursion
          </h2>
          <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-white transition hover:bg-cyan-600">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CategorySelect categories={categories} />
          <Field name="title" label="Excursion Name" />
          <Field name="slug" label="URL Slug" />
          <Field name="availableDays" label="Available Days" />
          <Field name="departureTime" label="Departure Time" />
          <Field name="returnTime" label="Return Time" />
        </div>

        <ImageField
          title="Hero Image"
          inputId="new-excursion-cover"
          name="coverImageUrl"
          images={images}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Field area rows={4} name="shortDescription" label="Short Description" />
          <Field area rows={6} name="fullDescription" label="Description" />
        </div>

        <GalleryField inputId="new-excursion-gallery" images={images} />
        <StatusFields active />
        <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-white transition hover:bg-cyan-600">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Create excursion
        </button>
      </form>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">
            Excursion categories
          </h2>
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
            {categories.length} item{categories.length === 1 ? "" : "s"}
          </span>
        </div>

        <form action={saveExcursionCategory} className="space-y-4 rounded-lg border border-slate-200 p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Field name="name" label="Name" />
            <Field name="slug" label="Slug" />
            <Field name="order" label="Order" type="number" />
            <label className="mt-7 flex items-center gap-2 text-sm font-bold text-slate-700">
              <input type="checkbox" name="active" defaultChecked /> Active
            </label>
          </div>
          <ImageField
            title="Category Image"
            inputId="new-excursion-category-image"
            name="imageUrl"
            images={images}
          />
          <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-white">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add category
          </button>
        </form>

        <AdminAccordionList>
          {categories.map((category) => (
            <AdminAccordionItem
              key={category.id}
              id={category.id}
              title={category.name}
              subtitle={`/${category.slug}`}
              active={category.active}
            >
              <form action={saveExcursionCategory} className="space-y-4">
                <input type="hidden" name="id" value={category.id} />
                <div className="grid gap-4 md:grid-cols-3">
                  <Field name="name" label="Name" defaultValue={category.name} />
                  <Field name="slug" label="Slug" defaultValue={category.slug} />
                  <Field name="order" label="Order" type="number" defaultValue={category.order} />
                </div>
                <ImageField
                  title="Category Image"
                  inputId={`excursion-category-image-${category.id}`}
                  name="imageUrl"
                  value={category.imageUrl}
                  images={images}
                />
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <input type="checkbox" name="active" defaultChecked={category.active} /> Active
                </label>
                <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white">
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save category
                </button>
              </form>
            </AdminAccordionItem>
          ))}
        </AdminAccordionList>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">Excursions</h2>
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
            {items.length} item{items.length === 1 ? "" : "s"}
          </span>
        </div>

        <AdminAccordionList>
          {items.map((item) => (
            <AdminAccordionItem
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={`${item.category?.name || "No category"} / ${item.slug}`}
              active={item.active}
              featured={item.featured}
            >
              <form action={saveExcursion} className="space-y-5">
                <input type="hidden" name="id" value={item.id} />
                <div className="grid gap-4 md:grid-cols-2">
                  <CategorySelect categories={categories} value={item.categoryId} />
                  <Field name="title" label="Excursion Name" defaultValue={item.title} />
                  <Field name="slug" label="URL Slug" defaultValue={item.slug} />
                  <Field name="availableDays" label="Available Days" defaultValue={item.availableDays} />
                  <Field name="departureTime" label="Departure Time" defaultValue={item.departureTime} />
                  <Field name="returnTime" label="Return Time" defaultValue={item.returnTime} />
                </div>
                <ImageField
                  title="Hero Image"
                  inputId={`coverImageUrl-${item.id}`}
                  name="coverImageUrl"
                  value={item.coverImageUrl}
                  images={images}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field area rows={5} name="shortDescription" label="Short Description" defaultValue={item.shortDescription} />
                  <Field area rows={7} name="fullDescription" label="Description" defaultValue={item.fullDescription} />
                </div>
                <GalleryField
                  inputId={`galleryUrls-${item.id}`}
                  value={item.gallery.map((image) => image.url)}
                  images={images}
                />
                <StatusFields featured={item.featured} active={item.active} />
                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white">
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Save
                  </button>
                </div>
              </form>
              <form action={deleteExcursion} className="mt-3">
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-red-50 px-4 text-sm font-bold text-red-700">
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Delete
                </button>
              </form>
            </AdminAccordionItem>
          ))}
        </AdminAccordionList>
      </section>
    </div>
  );
}
