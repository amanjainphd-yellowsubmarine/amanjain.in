import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CaseletsHero } from "@/components/resources/CaseletsHero";
import { CaseletsBoard } from "@/components/resources/CaseletsBoard";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Practice Caselets" };

export default function PracticeCaseletsPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <CaseletsView />
    </Suspense>
  );
}

async function CaseletsView() {
  await connection();
  const page = getPage("resources/practice-caselets");
  if (!page || page.status !== "published" || !page.caselets) notFound();

  return (
    <div className="flex-1 bg-white">
      <CaseletsHero hero={page.caselets} />
      <CaseletsBoard hero={page.caselets} />
    </div>
  );
}
