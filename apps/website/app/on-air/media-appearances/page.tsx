import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PodcastHero } from "@/components/on-air/PodcastHero";
import { PodcastMedia } from "@/components/on-air/PodcastMedia";
import { PodcastSplit } from "@/components/on-air/PodcastSplit";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Media Appearances" };

export default function MediaAppearancesPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <MediaAppearancesView />
    </Suspense>
  );
}

async function MediaAppearancesView() {
  await connection();
  const page = getPage("on-air/media-appearances");
  if (!page || page.status !== "published" || !page.podcast) notFound();

  return (
    <div className="flex-1 bg-white">
      <PodcastHero hero={page.podcast} />
      <PodcastMedia hero={page.podcast} />
      <PodcastSplit hero={page.podcast} />
    </div>
  );
}
