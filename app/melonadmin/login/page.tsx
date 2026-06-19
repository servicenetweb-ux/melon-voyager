import { Lock } from "lucide-react";
import { loginAdmin } from "@/app/lib/adminAuth";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12">
      <form
        action={loginAdmin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500 text-white">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-950">
          Login
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Enter your admin username and password.
        </p>

        {params.error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
            Wrong username or password.
          </p>
        ) : null}

        <input type="hidden" name="next" value={params.next || "/melonadmin"} />

        <label className="mt-5 block">
          <span className="text-sm font-bold text-slate-700">Username</span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            required
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-slate-700">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />
        </label>

        <button type="submit" className="mt-5 h-11 w-full rounded-lg bg-cyan-500 text-sm font-bold text-white transition hover:bg-cyan-600">
          Login
        </button>
      </form>
    </main>
  );
}
