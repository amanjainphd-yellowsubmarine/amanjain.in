import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { CollectionEditor } from "@/components/editor/CollectionEditor";
import { Topbar } from "@/components/layout/Topbar";
import { getServices } from "@/lib/content";

export const metadata: Metadata = { title: "Services" };

export default function ServicesAdminPage() {
  return (
    <Suspense fallback={null}>
      <ServicesAdmin />
    </Suspense>
  );
}

async function ServicesAdmin() {
  await connection();

  return (
    <>
      <Topbar title="Services" />
      <CollectionEditor
        endpoint="/api/services"
        initialItems={getServices().map((item) => ({ slug: item.slug, title: item.title, summary: item.summary }))}
        savedMessage="Saved. The services page is updated."
        blank={{ slug: "", title: "New service", summary: "" }}
        fields={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "summary", label: "Summary", multiline: true },
        ]}
      />
    </>
  );
}
