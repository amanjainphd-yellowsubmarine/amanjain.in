import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { EngagementEvents } from "@/components/engagements/EngagementEvents";
import { EngagementGallery } from "@/components/engagements/EngagementGallery";
import { EngagementHero } from "@/components/engagements/EngagementHero";
import { EngagementProjects } from "@/components/engagements/EngagementProjects";
import { EngagementRoles } from "@/components/engagements/EngagementRoles";
import { EngagementSplitCta } from "@/components/engagements/EngagementSplitCta";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Engagements" };

export default function EngagementsPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <EngagementsView />
    </Suspense>
  );
}

async function EngagementsView() {
  await connection();
  const page = getPage("engagements");
  if (!page || page.status !== "published" || !page.engagement) notFound();

  return (
    <div className="flex-1 bg-white">
      <EngagementHero hero={page.engagement} />
      <EngagementGallery images={page.engagement.gallery} />
      <EngagementEvents hero={page.engagement} />
      <EngagementRoles hero={page.engagement} />
      <EngagementProjects hero={page.engagement} />
      <EngagementSplitCta hero={page.engagement} />
    </div>
  );
}
