import { NextResponse } from "next/server";
import { getPages, savePages } from "@/lib/content";
import { cleanPage } from "@/lib/sanitize";

export async function PUT(request: Request) {
  const page = cleanPage(await request.json());
  if (!page) {
    return NextResponse.json({ error: "Page data is incomplete." }, { status: 400 });
  }
  const pages = getPages();
  const index = pages.findIndex((item) => item.slug === page.slug);
  if (index < 0) {
    return NextResponse.json({ error: "That page does not exist." }, { status: 404 });
  }
  pages[index] = page;
  savePages(pages);
  return NextResponse.json(page);
}
