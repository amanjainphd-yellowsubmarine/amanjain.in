import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Container } from "@/components/layout/Container";
import { getPage } from "@/lib/content";

export function EditablePage({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Container className="py-16">{null}</Container>}>
      <EditablePageContent slug={slug}>{children}</EditablePageContent>
    </Suspense>
  );
}

async function EditablePageContent({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  await connection();
  const page = getPage(slug);
  if (!page || page.status !== "published") notFound();

  return (
    <Container className="py-16">
      <div data-edit="page-copy">
        {page.eyebrow ? <p className="text-sm text-accent">{page.eyebrow}</p> : null}
        <h1 className={`text-4xl font-semibold ${page.eyebrow ? "mt-2" : ""}`}>{page.title}</h1>
        {page.body ? (
          <p className="mt-6 max-w-2xl whitespace-pre-wrap text-lg text-muted">{page.body}</p>
        ) : null}
      </div>
      {children ? <div className="mt-8">{children}</div> : null}
    </Container>
  );
}
