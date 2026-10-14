import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getEnquiries, saveEnquiries } from "@/lib/content";
import type { Enquiry } from "../../../../../packages/shared/src/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 80);
  const email = String(body?.email ?? "").trim().slice(0, 120);
  const type = String(body?.type ?? "message").trim().slice(0, 24);
  const message = String(body?.message ?? "").trim().slice(0, 2000);
  let entry: Enquiry;
  if (type === "resource") {
    const resourceTitle = String(body?.resourceTitle ?? "").trim().slice(0, 200);
    const resourcePage = String(body?.resourcePage ?? "").trim().slice(0, 120);
    const resourceAction = String(body?.resourceAction ?? "").trim() === "download" ? "download" : "read";
    const resourceHref = String(body?.resourceHref ?? "").trim().slice(0, 800);
    if (!name || !email.includes("@") || !resourceTitle || !resourcePage) {
      return NextResponse.json({ error: "Name, email, and content details are required." }, { status: 400 });
    }
    const verb = resourceAction === "download" ? "Downloaded" : "Read";
    entry = {
      id: randomUUID(),
      name,
      email,
      message: `${verb}: ${resourceTitle} (${resourcePage})`,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "new",
      type: "resource",
      resourceTitle,
      resourcePage,
      resourceAction,
      resourceHref,
    };
  } else {
    if (!name || !email.includes("@") || message.length < 2) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    entry = {
      id: randomUUID(),
      name,
      email,
      message,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "new",
    };
  }
  const enquiries = getEnquiries();
  enquiries.unshift(entry);
  saveEnquiries(enquiries.slice(0, 200));
  return NextResponse.json({ ok: true });
}
