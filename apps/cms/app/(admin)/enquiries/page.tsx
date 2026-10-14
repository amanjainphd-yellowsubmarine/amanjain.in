import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Topbar } from "@/components/layout/Topbar";
import { DataTable } from "@/components/ui/DataTable";
import { getEnquiries } from "@/lib/content";

export const metadata: Metadata = { title: "Messages" };

export default function EnquiriesAdminPage() {
  return (
    <Suspense fallback={null}>
      <EnquiriesAdmin />
    </Suspense>
  );
}

async function EnquiriesAdmin() {
  await connection();
  const enquiries = getEnquiries();

  return (
    <>
      <Topbar title="Messages" hint="Form messages and resource downloads or article opens are saved here. You cannot reply from here." />
      <div className="grid gap-3 p-6">
        <p className="text-sm text-muted">Contact messages and who downloaded or read a resource (name, email, and which page item).</p>
        <DataTable
          columns={["Name", "Email", "Type", "Page content"]}
          rows={enquiries.map((item) => [
            item.status === "new" ? `${item.name} (new)` : item.name,
            item.email,
            item.type === "resource" ? (item.resourceAction === "download" ? "Download" : "Read") : "Message",
            item.type === "resource" ? `${item.resourceTitle ?? item.message} — ${item.resourcePage ?? ""}` : item.message,
          ])}
        />
      </div>
    </>
  );
}
