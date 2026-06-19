import fs from "fs";
import path from "path";
import { ExternalLink, ImageIcon, Trash2, Upload } from "lucide-react";
import { prisma } from "@/app/lib/prisma";

type LibraryImage = {
  id?: string;
  url: string;
  title?: string | null;
  fileName?: string | null;
  mimeType?: string | null;
  size?: number | null;
  createdAt?: Date;
};

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

function formatBytes(size?: number | null) {
  if (!size) return "Unknown size";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

async function getLibraryImages(): Promise<LibraryImage[]> {
  const [records, files] = await Promise.all([
    prisma.media.findMany({
      where: { type: "IMAGE" },
      orderBy: { createdAt: "desc" },
    }),
    Promise.resolve(getUploadedImageUrls()),
  ]);

  const seen = new Set(records.map((record) => record.url));
  const orphanFiles = files
    .filter((url) => !seen.has(url))
    .map((url) => ({
      url,
      title: path.basename(url),
      fileName: path.basename(url),
    }));

  return [...records, ...orphanFiles];
}

export default async function MediaPage() {
  const images = await getLibraryImages();

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-cyan-700">
              Media Library
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950">
              Upload and manage website images
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Locally images are stored in public/uploads. On Vercel they are
              stored in the database and can be reused from MediaPicker fields.
            </p>
          </div>
          <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
            {images.length} image{images.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
          <Upload className="h-5 w-5 text-cyan-600" aria-hidden="true" />
          Upload images
        </h2>

        <form
          action="/api/upload"
          method="post"
          encType="multipart/form-data"
          className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]"
        >
          <input
            type="file"
            name="files"
            accept="image/png,image/jpeg,image/webp,image/gif"
            multiple
            required
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-bold file:text-slate-700"
          />
          <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 text-sm font-bold text-white transition hover:bg-cyan-600">
            <Upload className="h-4 w-4" aria-hidden="true" />
            Upload
          </button>
        </form>
      </section>

      {images.length === 0 ? (
        <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
          <ImageIcon
            className="mx-auto h-10 w-10 text-slate-300"
            aria-hidden="true"
          />
          <h2 className="mt-3 font-bold text-slate-950">
            No images uploaded yet
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Upload your first JPG, PNG, WEBP or GIF image above.
          </p>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article
              key={image.id || image.url}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div className="aspect-[4/3] bg-slate-100">
                <img
                  src={image.url}
                  alt={image.title || "Uploaded media"}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <h2 className="truncate text-sm font-bold text-slate-950">
                    {image.title || image.fileName || image.url}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {image.mimeType || "Image"} / {formatBytes(image.size)}
                  </p>
                </div>

                <input
                  readOnly
                  value={image.url}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600"
                  aria-label="Image URL"
                />

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={image.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Preview
                  </a>

                  <form action="/api/media/delete" method="post">
                    <input type="hidden" name="url" value={image.url} />
                    <button
                      type="submit"
                      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
