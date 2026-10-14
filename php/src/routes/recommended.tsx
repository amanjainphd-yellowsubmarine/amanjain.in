import { BookCloseCta } from "@/components/books/BookCloseCta";
import { RecommendedHero } from "@/components/books/RecommendedHero";
import { RecommendedList } from "@/components/books/RecommendedList";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Recommended({ page }: { page: PageContent | undefined }) {
  if (!page?.recommended) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <RecommendedHero hero={page.recommended} />
      <RecommendedList hero={page.recommended} />
      <BookCloseCta
        id="aj-reco-close"
        editId="reco-close"
        title={page.recommended.ctaTitle}
        subtitle={page.recommended.ctaSubtitle}
        label={page.recommended.ctaLabel}
        href={page.recommended.ctaHref}
      />
    </div>
  );
}
