import { NextResponse } from "next/server";
import { saveHome } from "@/lib/content";
import { cleanHome } from "@/lib/sanitize";

export async function PUT(request: Request) {
  const home = cleanHome(await request.json());
  if (!home) {
    return NextResponse.json({ error: "Could not save. A required field is empty, or the email is not valid." }, { status: 400 });
  }
  saveHome(home);
  return NextResponse.json(home);
}
