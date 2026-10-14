import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { AssetsHero } from "@/components/resources/AssetsHero";
import { AssetsLists } from "@/components/resources/AssetsLists";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Assets" };

export default function AssetsPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <AssetsView />
    </Suspense>
  );
}

async function AssetsView() {
  await connection();
  const page = getPage("resources/assets");
  if (!page || page.status !== "published" || !page.assets) notFound();

  return (
    <div className="flex-1 bg-white">
      <AssetsHero hero={page.assets} />
      <AssetsLists hero={page.assets} />
    </div>
  );
}
