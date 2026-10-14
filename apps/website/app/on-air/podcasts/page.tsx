import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PodcastHero } from "@/components/on-air/PodcastHero";
import { PodcastGossip, PodcastRails } from "@/components/on-air/PodcastRails";
import { PodcastSplit } from "@/components/on-air/PodcastSplit";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Podcasts" };

export default function PodcastsPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <PodcastsView />
    </Suspense>
  );
}

async function PodcastsView() {
  await connection();
  const page = getPage("on-air/podcasts");
  if (!page || page.status !== "published" || !page.podcast) notFound();

  return (
    <div className="flex-1 bg-white">
      <PodcastHero hero={page.podcast} />
      <PodcastGossip hero={page.podcast} />
      <PodcastRails hero={page.podcast} />
      <PodcastSplit hero={page.podcast} />
    </div>
  );
}
