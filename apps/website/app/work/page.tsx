import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { EditablePage } from "@/components/content/EditablePage";
import { getWork } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkContent />
    </Suspense>
  );
}

async function WorkContent() {
  await connection();
  const work = getWork();

  return (
    <EditablePage slug="work">
      <div className="grid gap-4 md:grid-cols-2">
        {work.map((item) => (
          <article key={item.slug} className="rounded-2xl border border-line bg-white p-6">
            <p className="text-xs text-muted">{item.year}</p>
            <h2 className="mt-2 text-xl font-medium">{item.title}</h2>
            <p className="mt-2 text-muted">{item.summary}</p>
          </article>
        ))}
      </div>
    </EditablePage>
  );
}
