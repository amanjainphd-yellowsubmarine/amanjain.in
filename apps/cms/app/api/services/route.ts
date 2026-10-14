import { NextResponse } from "next/server";
import { saveServices } from "@/lib/content";
import { cleanServices } from "@/lib/sanitize";

export async function PUT(request: Request) {
  const services = cleanServices(await request.json());
  if (!services) {
    return NextResponse.json({ error: "Services data is incomplete." }, { status: 400 });
  }
  saveServices(services);
  return NextResponse.json(services);
}
