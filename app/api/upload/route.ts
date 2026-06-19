import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/app/lib/prisma";

const allowedTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const maxUploadSize = 3 * 1024 * 1024;

function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const sessionSecret =
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "melonadmin2026";
  return cookie
    .split(";")
    .map((part) => part.trim())
    .includes(`melon_admin_session=${sessionSecret}`);
}

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = [...formData.getAll("files"), ...formData.getAll("file")].filter(
    (item): item is File => item instanceof File && item.size > 0,
  );

  if (files.length === 0) {
    return NextResponse.json({ error: "No image uploaded." }, { status: 400 });
  }

  for (const file of files) {
    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: "Only PNG, JPG, WEBP and GIF images are allowed." },
        { status: 400 },
      );
    }
    if (file.size > maxUploadSize) {
      return NextResponse.json(
        { error: "Each image must be smaller than 3MB." },
        { status: 400 },
      );
    }
  }

  const useBlobStorage = process.env.VERCEL === "1";
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!useBlobStorage) {
    await mkdir(uploadDir, { recursive: true });
  } else if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Missing Vercel Blob storage token." },
      { status: 500 },
    );
  }

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalFileName = sanitizeFileName(file.name) || "upload";
    const safeName = `${Date.now()}-${randomUUID()}-${originalFileName}`;
    let url = `/uploads/${safeName}`;

    if (useBlobStorage) {
      const blob = await put(`uploads/${safeName}`, buffer, {
        access: "public",
        contentType: file.type,
      });
      url = blob.url;
    } else {
      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);
    }

    await prisma.media.create({
      data: {
        type: "IMAGE",
        url,
        title: file.name,
        altText: file.name.replace(/\.[^.]+$/, ""),
        originalFileName: file.name,
        fileName: safeName,
        mimeType: file.type,
        size: file.size,
      },
    });
  }

  return NextResponse.redirect(new URL("/melonadmin/media", request.url), 303);
}
