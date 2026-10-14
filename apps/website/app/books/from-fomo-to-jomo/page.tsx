import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { BookHero } from "@/components/books/BookHero";
import { BookVoices } from "@/components/books/BookVoices";
import { BookWho } from "@/components/books/BookWho";
import { BookCloseCta } from "@/components/books/BookCloseCta";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "From FOMO to JOMO" };

export default function FromFomoToJomoPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1" style={{ background: "#fbfbed" }} />}>
      <BookView />
    </Suspense>
  );
}

async function BookView() {
  await connection();
  const page = getPage("books/from-fomo-to-jomo");
  if (!page || page.status !== "published" || !page.book) notFound();

  return (
    <div className="flex-1" style={{ background: "#fbfbed" }}>
      <BookHero book={page.book} />
      <BookVoices book={page.book} />
      <BookWho book={page.book} />
      <BookCloseCta editId="fomo-close" title={page.book.ctaTitle} subtitle={page.book.ctaSubtitle} label={page.book.ctaLabel} href={page.book.ctaHref} />
    </div>
  );
}
