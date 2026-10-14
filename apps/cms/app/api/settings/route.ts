import { NextResponse } from "next/server";
import { saveSite } from "@/lib/content";
import { cleanSite } from "@/lib/sanitize";

export async function PUT(request: Request) {
  const site = cleanSite(await request.json());
  if (!site) {
    return NextResponse.json({ error: "Settings data is incomplete." }, { status: 400 });
  }
  saveSite(site);
  return NextResponse.json(site);
}
