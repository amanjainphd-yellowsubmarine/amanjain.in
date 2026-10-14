import { NextResponse } from "next/server";
import { SESSION_COOKIE, checkAdmin, createSession, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const admin = checkAdmin(email, password);
  if (!admin) {
    return NextResponse.json({ error: "Email or password is wrong." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSession(admin), sessionCookieOptions());
  return response;
}
