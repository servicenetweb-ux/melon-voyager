import fs from "fs";
import path from "path";
import { Plus, Save } from "lucide-react";
import { saveCarCategory } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import {
  AdminAccordionItem,
  AdminAccordionList,
} from "../components/AdminAccordion";
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
      select: { url: true },
    }),
    Promise.resolve(getUploadedImageUrls()),
  ]);

  return Array.from(new Set([...media.map((item) => item.url), ...files]));
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue || ""}
        className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
      />
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

export default async function AdminCars() {
  const [categories, images] = await Promise.all([
    prisma.carCategory.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] }),
    getMediaUrls(),
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase text-cyan-700">
          Car Rental CMS
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Manage car rental categories
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Add categories like Compact, Family or SUV with one representative
          image from the Media Library.
        </p>
      </section>

      <form
        action={saveCarCategory}
        className="space-y-4 rounded-lg border border-slate-200 bg-white p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-950">New car category</h2>
          <button
            type="submit"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add category
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field name="name" label="Category Name" />
          <Field name="slug" label="URL Slug" />
          <Field name="order" label="Order" type="number" />
        </div>
        <ImageField
          title="Category Image"
          inputId="new-car-category-image"
          name="imageUrl"
          images={images}
        />
        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <input type="checkbox" name="active" defaultChecked /> Active
        </label>
        <button
          type="submit"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add category
        </button>
      </form>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold text-slate-950">Car categories</h2>

        <AdminAccordionList>
          {categories.map((category) => (
            <AdminAccordionItem
              key={category.id}
              id={category.id}
              title={category.name}
              subtitle={`/${category.slug}`}
              active={category.active}
            >
              <form action={saveCarCategory} className="space-y-4">
                <input type="hidden" name="id" value={category.id} />
                <div className="grid gap-4 md:grid-cols-3">
                  <Field name="name" label="Category Name" defaultValue={category.name} />
                  <Field name="slug" label="URL Slug" defaultValue={category.slug} />
                  <Field
                    name="order"
                    label="Order"
                    type="number"
                    defaultValue={category.order}
                  />
                </div>
                <ImageField
                  title="Category Image"
                  inputId={`car-category-image-${category.id}`}
                  name="imageUrl"
                  value={category.imageUrl}
                  images={images}
                />
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={category.active}
                  />{" "}
                  Active
                </label>
                <button
                  type="submit"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white"
                >
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save category
                </button>
              </form>
            </AdminAccordionItem>
          ))}
        </AdminAccordionList>
      </section>
    </div>
  );
}
