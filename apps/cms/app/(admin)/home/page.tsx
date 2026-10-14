import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { HomeEditor } from "@/components/home/HomeEditor";
import { Topbar } from "@/components/layout/Topbar";
import { getHome } from "@/lib/content";

export const metadata: Metadata = { title: "Home" };

export default function HomeAdminPage() {
  return (
    <Suspense fallback={null}>
      <HomeAdmin />
    </Suspense>
  );
}

async function HomeAdmin() {
  await connection();

  return (
    <>
      <Topbar title="Home page" hint="Use the buttons above to jump to a section. Press Save after you change text or a photo." />
      <HomeEditor initialHome={getHome()} />
    </>
  );
}
