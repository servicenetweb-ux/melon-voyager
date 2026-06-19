import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/lib/adminAuth";
import { AdminNav } from "./AdminNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="lg:flex">
        <AdminNav />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Travel agency content management
                </p>
                <h2 className="text-xl font-bold text-slate-950">
                  Melon Travel CMS
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  View Website
                </Link>
                <form action={logoutAdmin}>
                  <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
