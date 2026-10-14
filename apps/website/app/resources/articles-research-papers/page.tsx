import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArticlesHero } from "@/components/resources/ArticlesHero";
import { ArticlesNewsletter } from "@/components/resources/ArticlesNewsletter";
import { ArticlesList } from "@/components/resources/ArticlesList";
import { ArticlesResearch } from "@/components/resources/ArticlesResearch";
import { ArticlesMintCta } from "@/components/resources/ArticlesMintCta";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Article & Research Papers" };

export default function ArticlesResearchPapersPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <ArticlesView />
    </Suspense>
  );
}

async function ArticlesView() {
  await connection();
  const page = getPage("resources/articles-research-papers");
  if (!page || page.status !== "published" || !page.articles) notFound();

  return (
    <div className="flex-1 bg-white">
      <ArticlesHero hero={page.articles} />
      <ArticlesNewsletter hero={page.articles} />
      <ArticlesList hero={page.articles} />
      <ArticlesResearch hero={page.articles} />
      <ArticlesMintCta hero={page.articles} />
    </div>
  );
}
