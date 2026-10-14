import { BookCloseCta } from "@/components/books/BookCloseCta";
import { BookHero } from "@/components/books/BookHero";
import { BookVoices } from "@/components/books/BookVoices";
import { BookWho } from "@/components/books/BookWho";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Fomo({ page }: { page: PageContent | undefined }) {
  if (!page?.book) return <Missing />;
  return (
    <div className="flex-1" style={{ background: "#fbfbed" }}>
      <BookHero book={page.book} />
      <BookVoices book={page.book} />
      <BookWho book={page.book} />
      <BookCloseCta
        editId="fomo-close"
        title={page.book.ctaTitle}
        subtitle={page.book.ctaSubtitle}
        label={page.book.ctaLabel}
        href={page.book.ctaHref}
      />
    </div>
  );
}
