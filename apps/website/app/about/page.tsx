import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { AboutAreas } from "@/components/about/AboutAreas";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutExperience } from "@/components/about/AboutExperience";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <AboutView />
    </Suspense>
  );
}

async function AboutView() {
  await connection();
  const page = getPage("about");
  if (!page || page.status !== "published" || !page.hero) notFound();

  return (
    <div className="flex-1 bg-white">
      <AboutHero hero={page.hero} />
      <AboutStory hero={page.hero} />
      <AboutExperience hero={page.hero} />
      <AboutAreas hero={page.hero} />
      <AboutCta hero={page.hero} />
    </div>
  );
}
