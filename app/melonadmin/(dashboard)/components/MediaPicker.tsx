"use client";

import { useMemo, useState } from "react";
import { Check, ImageIcon, Search, Trash2, X } from "lucide-react";

type Props = {
  images: string[];
  targetId: string;
  initialValue?: string | null;
};

export default function MediaPicker({ images, targetId, initialValue }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(initialValue || "");
  const [draft, setDraft] = useState(initialValue || "");

  const filteredImages = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return images;
    return images.filter((image) => image.toLowerCase().includes(term));
  }, [images, query]);

  function setTargetValue(value: string) {
    const input = document.getElementById(targetId) as HTMLInputElement | null;
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function openPicker() {
    setDraft(selected);
    setQuery("");
    setOpen(true);
  }

  function confirmSelection() {
    setTargetValue(draft);
    setSelected(draft);
    setOpen(false);
  }

  function clearSelection() {
    setTargetValue("");
    setSelected("");
    setDraft("");
  }

  return (
    <>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex aspect-[4/3] w-full max-w-44 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
          {selected ? (
            <img
              src={selected}
              alt="Selected media"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 px-3 text-center text-xs font-semibold text-slate-400">
              <ImageIcon className="h-6 w-6" aria-hidden="true" />
              No image selected
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openPicker}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-bold text-white transition hover:bg-cyan-600"
          >
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Browse Gallery
          </button>

          {selected ? (
            <button
              type="button"
              onClick={clearSelection}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-100 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Remove
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
                  Choose Image
                </h3>
                <p className="text-sm text-slate-500">
                  Select a gallery image for this field.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                aria-label="Close media picker"
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

            {filteredImages.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No images found.
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredImages.map((image) => {
                    const isActive = draft === image;

                    return (
                      <button
                        key={`${targetId}-${image}`}
                        type="button"
                        onClick={() => setDraft(image)}
                        className={`overflow-hidden rounded-lg border bg-white text-left transition ${
                          isActive
                            ? "border-cyan-500 ring-4 ring-cyan-100"
                            : "border-slate-200 hover:border-cyan-400"
                        }`}
                      >
                        <div className="relative aspect-[4/3] bg-slate-100">
                          <img
                            src={image}
                            alt="Media option"
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
            )}

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
                disabled={!draft}
                className="min-h-10 rounded-lg bg-cyan-500 px-5 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Use Image
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
