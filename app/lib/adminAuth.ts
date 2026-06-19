"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

const adminCookieName = "melon_admin_session";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "melonadmin2026";
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || adminPassword();
}

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const next = formData.get("next");
  const settings = await prisma.siteSettings.findFirst();
  const expectedUsername = settings?.adminUsername || "admin";
  const expectedPassword = settings?.adminPassword || adminPassword();

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== expectedUsername ||
    password !== expectedPassword
  ) {
    redirect("/melonadmin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, sessionSecret(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(typeof next === "string" && next.startsWith("/melonadmin") ? next : "/melonadmin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
  redirect("/melonadmin/login");
}
