import { connection } from "next/server";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getHeader, getSite } from "@/lib/content";

export async function LiveHeader() {
  await connection();
  return <SiteHeader header={getHeader()} />;
}

export async function LiveFooter() {
  await connection();
  return <SiteFooter site={getSite()} />;
}
