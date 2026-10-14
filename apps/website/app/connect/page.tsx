import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ConnectHero } from "@/components/connect/ConnectHero";
import { ConnectContact } from "@/components/connect/ConnectContact";
import { getPage } from "@/lib/content";

export const metadata: Metadata = { title: "Let's talk" };

export default function ConnectRoute() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <ConnectView />
    </Suspense>
  );
}

async function ConnectView() {
  await connection();
  const page = getPage("connect");
  if (!page || page.status !== "published" || !page.connect) notFound();

  return (
    <div className="flex-1 bg-white">
      <ConnectHero hero={page.connect} />
      <ConnectContact hero={page.connect} />
    </div>
  );
}
