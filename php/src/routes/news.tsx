import { NewsBoard } from "@/components/resources/NewsBoard";
import { NewsHero } from "@/components/resources/NewsHero";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function News({ page }: { page: PageContent | undefined }) {
  if (!page?.news) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <NewsHero hero={page.news} />
      <NewsBoard hero={page.news} />
    </div>
  );
}
