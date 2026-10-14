import { readFileSync } from "node:fs";
import path from "node:path";
import { connection } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  await connection();
  let site = "http://localhost:3000";
  try {
    const raw = readFileSync(path.join(process.cwd(), "..", "..", "content", "public-urls.json"), "utf8");
    const value = JSON.parse(raw).site;
    if (typeof value === "string" && value.startsWith("http")) site = value.replace(/\/$/, "");
  } catch {
    site = "http://localhost:3000";
  }
  return NextResponse.json({ site });
}
