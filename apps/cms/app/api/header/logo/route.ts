import { NextResponse } from "next/server";
import { getHeader, saveHeader } from "@/lib/content";
import { writeLogoFile } from "@/lib/header-files";

const types: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("logo");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a logo file." }, { status: 400 });
  }
  const extension = types[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Use a PNG, JPG, WEBP, GIF, or SVG logo." }, { status: 400 });
  }
  if (file.size > 2_000_000) {
    return NextResponse.json({ error: "Logo must be under 2 MB." }, { status: 400 });
  }

  const filename = `header-logo-${Date.now()}${extension}`;
  writeLogoFile(filename, Buffer.from(await file.arrayBuffer()));

  const header = getHeader();
  header.logo.src = `/images/${filename}`;
  saveHeader(header);
  return NextResponse.json(header);
}
