import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { getPage, getSite } from "@/lib/content";

export function ContactPage({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Container className="py-16">{null}</Container>}>
      <ContactPageContent slug={slug} />
    </Suspense>
  );
}

async function ContactPageContent({ slug }: { slug: string }) {
  await connection();
  const page = getPage(slug);
  const site = getSite();
  if (!page || page.status !== "published") notFound();

  return (
    <Container className="grid gap-10 py-16 md:grid-cols-2">
      <div>
        {page.eyebrow ? <p className="text-sm text-accent">{page.eyebrow}</p> : null}
        <h1 className="mt-2 text-4xl font-semibold">{page.title}</h1>
        {page.body || site.description ? (
          <p className="mt-6 whitespace-pre-wrap text-muted">{page.body || site.description}</p>
        ) : null}
        <div className="mt-6 space-y-1 text-sm">
          <p>{site.email}</p>
          {site.phone.includes("00000") ? null : <p>{site.phone}</p>}
          <p>{site.address}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-white p-6">
        <ContactForm />
      </div>
    </Container>
  );
}
