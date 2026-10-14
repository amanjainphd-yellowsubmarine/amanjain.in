import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PageEditor } from "@/components/pages/PageEditor";
import { Topbar } from "@/components/layout/Topbar";
import { getPage } from "@/lib/content";

type EditPageProps = { params: Promise<{ slug: string[] }> };

export const metadata: Metadata = { title: "Edit page" };

export default function EditPage({ params }: EditPageProps) {
  return (
    <Suspense fallback={null}>
      <EditPageContent params={params} />
    </Suspense>
  );
}

async function EditPageContent({ params }: EditPageProps) {
  await connection();
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();

  return (
    <>
      <Topbar title={page.title} />
      <PageEditor initialPage={page} />
    </>
  );
}
