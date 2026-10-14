import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { HeaderEditor } from "@/components/header/HeaderEditor";
import { Topbar } from "@/components/layout/Topbar";
import { getHeader } from "@/lib/content";

export const metadata: Metadata = { title: "Header" };

export default function HeaderAdminPage() {
  return (
    <Suspense fallback={<Topbar title="Top menu" />}>
      <HeaderAdmin />
    </Suspense>
  );
}

async function HeaderAdmin() {
  await connection();
  const header = getHeader();

  return (
    <>
      <Topbar title="Top menu" hint="The logo, the blue Let's talk button, and the top menu names." />
      <HeaderEditor initialHeader={header} />
    </>
  );
}
