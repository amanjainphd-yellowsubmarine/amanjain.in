import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { EditablePage } from "@/components/content/EditablePage";
import { getServices } from "@/lib/content";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesContent />
    </Suspense>
  );
}

async function ServicesContent() {
  await connection();
  const services = getServices();

  return (
    <EditablePage slug="services">
      <div className="grid gap-4">
        {services.map((service) => (
          <article key={service.slug} className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-xl font-medium">{service.title}</h2>
            <p className="mt-2 text-muted">{service.summary}</p>
          </article>
        ))}
      </div>
    </EditablePage>
  );
}
