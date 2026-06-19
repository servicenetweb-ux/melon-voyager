"use client";

import { useMemo, useState } from "react";
import ExcursionCard from "./ExcursionCard";

type Excursion = {
  id: string;
  title: string;
  slug: string;
  coverImageUrl?: string | null;
  availableDays?: string | null;
  departureTime?: string | null;
  category?: { name: string } | null;
};

export default function ExcursionSearch({
  excursions,
}: {
  excursions: Excursion[];
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return excursions;
    return excursions.filter((item) =>
      item.title.toLowerCase().includes(term),
    );
  }, [excursions, query]);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search excursion by name"
        className="mb-8 h-12 w-full rounded-xl border border-slate-300 bg-white/95 px-4 text-sm font-semibold shadow-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white/90 p-8 text-center font-semibold text-slate-600">
          No excursions found.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {filtered.map((item) => (
            <ExcursionCard
              key={item.id}
              title={item.title}
              image={item.coverImageUrl}
              href={`/excursions/${item.slug}`}
              availableDays={item.availableDays}
              departureTime={item.departureTime}
              categoryName={item.category?.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
