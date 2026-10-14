import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Topbar } from "@/components/layout/Topbar";
import { getPages } from "@/lib/content";
import { pageGroups, sitePages } from "@/lib/site-pages";

export const metadata: Metadata = { title: "Website pages" };

export default function PagesAdminPage() {
  return (
    <Suspense fallback={null}>
      <PagesAdmin />
    </Suspense>
  );
}

async function PagesAdmin() {
  await connection();
  const pages = getPages();
  const listed = sitePages.flatMap((guide) => {
    const page = pages.find((item) => item.slug === guide.slug);
    return page ? [guide] : [];
  });

  return (
    <>
      <Topbar title="Website pages" hint="Open a page. The real page is on the right. Click the part you want to change." />
      <div className="grid max-w-3xl gap-8 p-6">
        {pageGroups.map((group) => (
          <section key={group} className="grid gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">{group}</h2>
            {listed.filter((page) => page.group === group).map((page) => (
              <Link key={page.slug} href={`/pages/${page.slug}`} className="rounded-2xl border border-line bg-white p-4 shadow-[0_10px_30px_rgba(23,21,31,0.04)] transition hover:-translate-y-0.5 hover:border-accent">
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-semibold">{page.name}</span>
                    <span className="mt-1 block text-sm text-accent">{page.where}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{page.edits}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-[#f3f0ff] px-3 py-1 text-sm font-semibold text-accent">Edit</span>
                </span>
              </Link>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
