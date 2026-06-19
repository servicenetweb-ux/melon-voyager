"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

const AccordionContext = createContext<{
  openId: string;
  setOpenId: (id: string) => void;
} | null>(null);

export function AdminAccordionList({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState("");

  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className="space-y-3">{children}</div>
    </AccordionContext.Provider>
  );
}

type Props = {
  id: string;
  title: string;
  subtitle?: string | null;
  active?: boolean;
  featured?: boolean;
  children: ReactNode;
};

export function AdminAccordionItem({
  id,
  title,
  subtitle,
  active,
  featured,
  children,
}: Props) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AdminAccordionItem must be inside list.");

  const open = context.openId === id;

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => context.setOpenId(open ? "" : id)}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-slate-50"
      >
        <div className="min-w-0">
          <h3 className="truncate font-bold text-slate-950">{title}</h3>
          {subtitle ? (
            <p className="truncate text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {featured ? (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
              Featured
            </span>
          ) : null}
          {typeof active === "boolean" ? (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                active
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {active ? "Active" : "Draft"}
            </span>
          ) : null}
          <ChevronDown
            className={`h-5 w-5 text-slate-500 transition ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </button>

      {open ? <div className="border-t border-slate-200 p-4">{children}</div> : null}
    </section>
  );
}
