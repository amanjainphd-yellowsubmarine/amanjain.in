import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { NewsHero } from "@/components/resources/NewsHero";
import { NewsBoard } from "@/components/resources/NewsBoard";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "In The News" };

export default function InTheNewsPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <NewsView />
    </Suspense>
  );
}

async function NewsView() {
  await connection();
  const page = getPage("resources/in-the-news");
  if (!page || page.status !== "published" || !page.news) notFound();

  return (
    <div className="flex-1 bg-white">
      <NewsHero hero={page.news} />
      <NewsBoard hero={page.news} />
    </div>
  );
}
