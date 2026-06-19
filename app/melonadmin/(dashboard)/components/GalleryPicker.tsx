"use client";

import { useMemo, useState } from "react";
import { Check, Images, Search, Trash2, X } from "lucide-react";

type Props = {
  images: string[];
  targetId: string;
  initialValue?: string[];
};

export default function GalleryPicker({
  images,
  targetId,
  initialValue = [],
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(initialValue);
  const [draft, setDraft] = useState(initialValue);

  const filteredImages = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return images;
    return images.filter((image) => image.toLowerCase().includes(term));
  }, [images, query]);

  function setTargetValue(value: string[]) {
    const input = document.getElementById(targetId) as HTMLInputElement | null;
    if (input) {
      input.value = value.join("\n");
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function toggleImage(image: string) {
    setDraft((current) =>
      current.includes(image)
        ? current.filter((item) => item !== image)
        : [...current, image],
    );
  }

  function openPicker() {
    setDraft(selected);
    setQuery("");
    setOpen(true);
  }

  function confirmSelection() {
    setSelected(draft);
    setTargetValue(draft);
    setOpen(false);
  }

  function clearGallery() {
    setSelected([]);
    setDraft([]);
    setTargetValue([]);
  }

  return (
    <>
      <div className="mt-3 space-y-3">
        {selected.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {selected.map((image) => (
              <div
                key={image}
                className="aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <img
                  src={image}
                  alt="Gallery image"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-sm font-semibold text-slate-400">
            No gallery images selected
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openPicker}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-white transition hover:bg-cyan-600"
          >
            <Images className="h-4 w-4" aria-hidden="true" />
            Browse Gallery
          </button>
          {selected.length > 0 ? (
            <button
              type="button"
              onClick={clearGallery}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-100 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Clear
            </button>
          ) : null}
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Choose Gallery Images
                </h3>
                <p className="text-sm text-slate-500">
                  Select one or more images for this gallery.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                aria-label="Close gallery picker"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="border-b border-slate-200 p-4">
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search images"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />
              </label>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages.map((image) => {
                  const isActive = draft.includes(image);
                  return (
                    <button
                      key={`${targetId}-${image}`}
                      type="button"
                      onClick={() => toggleImage(image)}
                      className={`overflow-hidden rounded-lg border bg-white text-left transition ${
                        isActive
                          ? "border-cyan-500 ring-4 ring-cyan-100"
                          : "border-slate-200 hover:border-cyan-400"
                      }`}
                    >
                      <div className="relative aspect-[4/3] bg-slate-100">
                        <img
                          src={image}
                          alt="Gallery option"
                          className="h-full w-full object-cover"
                        />
                        {isActive ? (
                          <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-white">
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <span className="block truncate px-3 py-2 text-xs font-semibold text-slate-600">
                        {image}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-10 rounded-lg bg-slate-100 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSelection}
                className="min-h-10 rounded-lg bg-cyan-500 px-5 text-sm font-bold text-white transition hover:bg-cyan-600"
              >
                Use Images
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
