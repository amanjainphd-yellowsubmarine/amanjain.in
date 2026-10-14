import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { saveHeader, type HeaderContent, type MenuItem, type MenuLink } from "@/lib/content";

function isSafeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function cleanLink(value: unknown): MenuLink | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const label = String(record.label ?? "").trim().slice(0, 80);
  const href = String(record.href ?? "").trim().slice(0, 300);
  const id = String(record.id ?? "").trim().slice(0, 80) || randomUUID();
  if (!label || !isSafeHref(href)) return null;
  return { id, label, href };
}

function cleanHeader(value: unknown): HeaderContent | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const logo = record.logo as Record<string, unknown> | undefined;
  const cta = record.cta as Record<string, unknown> | undefined;
  const logoSrc = String(logo?.src ?? "").trim().slice(0, 300);
  const logoAlt = String(logo?.alt ?? "Aman Jain").trim().slice(0, 80) || "Aman Jain";
  const ctaLabel = String(cta?.label ?? "").trim().slice(0, 40);
  const ctaHref = String(cta?.href ?? "").trim().slice(0, 300);
  if (!logoSrc.startsWith("/") && !logoSrc.startsWith("http")) return null;
  if (!ctaLabel || !isSafeHref(ctaHref)) return null;
  if (!Array.isArray(record.menu)) return null;

  const menu: MenuItem[] = [];
  for (const item of record.menu.slice(0, 20)) {
    const link = cleanLink(item);
    if (!link) continue;
    const children = Array.isArray((item as { children?: unknown }).children)
      ? (item as { children: unknown[] }).children
          .slice(0, 12)
          .map(cleanLink)
          .filter((child): child is MenuLink => child !== null)
      : [];
    menu.push({ ...link, children });
  }

  if (menu.length === 0) return null;
  return {
    logo: { src: logoSrc, alt: logoAlt },
    menu,
    cta: { label: ctaLabel, href: ctaHref },
  };
}

export async function PUT(request: Request) {
  const header = cleanHeader(await request.json());
  if (!header) {
    return NextResponse.json({ error: "Header data is incomplete." }, { status: 400 });
  }
  saveHeader(header);
  return NextResponse.json(header);
}
