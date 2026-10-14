import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { CollectionEditor } from "@/components/editor/CollectionEditor";
import { Topbar } from "@/components/layout/Topbar";
import { getWork } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function WorkAdminPage() {
  return (
    <Suspense fallback={null}>
      <WorkAdmin />
    </Suspense>
  );
}

async function WorkAdmin() {
  await connection();

  return (
    <>
      <Topbar title="Work" />
      <CollectionEditor
        endpoint="/api/work"
        initialItems={getWork().map((item) => ({
          slug: item.slug,
          title: item.title,
          summary: item.summary,
          year: item.year,
        }))}
        savedMessage="Saved. The work page is updated."
        blank={{ slug: "", title: "New project", summary: "", year: "" }}
        fields={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "year", label: "Year" },
          { key: "summary", label: "Summary", multiline: true },
        ]}
      />
    </>
  );
}
