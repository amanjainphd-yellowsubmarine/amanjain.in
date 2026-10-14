import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getMedia, saveMedia } from "@/lib/content";
import { writePublicImage } from "@/lib/header-files";

const types: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  }
  const extension = types[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Use a PNG, JPG, WEBP, GIF, or SVG image." }, { status: 400 });
  }
  const maxSize = file.type === "image/svg+xml" ? 500_000 : 4_000_000;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: file.type === "image/svg+xml" ? "SVG must be under 500 KB." : "Image must be under 4 MB." },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (file.type === "image/svg+xml") {
    const raw = bytes.toString("utf8").toLowerCase();
    if (raw.includes("<script") || raw.includes("javascript:") || raw.includes("onload=")) {
      return NextResponse.json({ error: "This SVG is not allowed. Use a simple illustration without scripts." }, { status: 400 });
    }
  }

  const filename = `upload-${Date.now()}${extension}`;
  writePublicImage(filename, bytes);
  const url = `/images/uploads/${filename}`;
  const media = getMedia();
  media.unshift({ id: randomUUID(), name: file.name.slice(0, 120), alt: "", url });
  saveMedia(media.slice(0, 100));
  return NextResponse.json({ url });
}
