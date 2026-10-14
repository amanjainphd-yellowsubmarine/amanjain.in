import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { RecommendedHero } from "@/components/books/RecommendedHero";
import { RecommendedList } from "@/components/books/RecommendedList";
import { BookCloseCta } from "@/components/books/BookCloseCta";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Recommended Books" };

export default function RecommendedBooksPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <RecommendedView />
    </Suspense>
  );
}

async function RecommendedView() {
  await connection();
  const page = getPage("books/recommended");
  if (!page || page.status !== "published" || !page.recommended) notFound();

  return (
    <div className="flex-1 bg-white">
      <RecommendedHero hero={page.recommended} />
      <RecommendedList hero={page.recommended} />
      <BookCloseCta id="aj-reco-close" editId="reco-close" title={page.recommended.ctaTitle} subtitle={page.recommended.ctaSubtitle} label={page.recommended.ctaLabel} href={page.recommended.ctaHref} />
    </div>
  );
}
