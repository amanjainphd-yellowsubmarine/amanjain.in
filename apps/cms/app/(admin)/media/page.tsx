import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Topbar } from "@/components/layout/Topbar";
import { DataTable } from "@/components/ui/DataTable";
import { getMedia } from "@/lib/content";

export const metadata: Metadata = { title: "Media" };

export default function MediaAdminPage() {
  return (
    <Suspense fallback={null}>
      <MediaAdmin />
    </Suspense>
  );
}

async function MediaAdmin() {
  await connection();
  const media = getMedia();

  return (
    <>
      <Topbar title="Media" />
      <div className="p-6">
        <DataTable
          columns={["Name", "Alt", "URL"]}
          rows={media.map((item) => [item.name, item.alt, item.url])}
        />
      </div>
    </>
  );
}
