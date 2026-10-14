import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { SettingsEditor } from "@/components/settings/SettingsEditor";
import { Topbar } from "@/components/layout/Topbar";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Footer" };

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsAdmin />
    </Suspense>
  );
}

async function SettingsAdmin() {
  await connection();

  return (
    <>
      <Topbar title="Footer" hint="The bottom of every page: name, links, address, and social icons." />
      <SettingsEditor initialSite={getSite()} />
    </>
  );
}
