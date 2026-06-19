import { unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { prisma } from "@/app/lib/prisma";

function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const sessionSecret =
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "melonadmin2026";
  return cookie
    .split(";")
    .map((part) => part.trim())
    .includes(`melon_admin_session=${sessionSecret}`);
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const rawUrl = formData.get("url");

  if (typeof rawUrl !== "string") {
    return NextResponse.redirect(new URL("/melonadmin/media", request.url), 303);
  }

  if (rawUrl.startsWith("data:image/")) {
    await prisma.media.deleteMany({ where: { url: rawUrl } });
    return NextResponse.redirect(new URL("/melonadmin/media", request.url), 303);
  }

  if (rawUrl.startsWith("https://")) {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        await del(rawUrl);
      } catch {
        // The database entry should still be removed if Blob deletion fails.
      }
    }
    await prisma.media.deleteMany({ where: { url: rawUrl } });
    return NextResponse.redirect(new URL("/melonadmin/media", request.url), 303);
  }

  if (!rawUrl.startsWith("/uploads/")) {
    return NextResponse.redirect(new URL("/melonadmin/media", request.url), 303);
  }

  const fileName = path.basename(rawUrl);
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, fileName);

  try {
    await unlink(filePath);
  } catch {
    // The database entry should still be removed if the file is already gone.
  }

  await prisma.media.deleteMany({
    where: { url: `/uploads/${fileName}` },
  });

  return NextResponse.redirect(new URL("/melonadmin/media", request.url), 303);
}
