import { NextResponse } from "next/server";
import { saveWork } from "@/lib/content";
import { cleanWork } from "@/lib/sanitize";

export async function PUT(request: Request) {
  const work = cleanWork(await request.json());
  if (!work) {
    return NextResponse.json({ error: "Work data is incomplete." }, { status: 400 });
  }
  saveWork(work);
  return NextResponse.json(work);
}
