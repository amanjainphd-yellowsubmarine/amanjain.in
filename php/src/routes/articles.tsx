import { ArticlesHero } from "@/components/resources/ArticlesHero";
import { ArticlesList } from "@/components/resources/ArticlesList";
import { ArticlesMintCta } from "@/components/resources/ArticlesMintCta";
import { ArticlesNewsletter } from "@/components/resources/ArticlesNewsletter";
import { ArticlesResearch } from "@/components/resources/ArticlesResearch";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Articles({ page }: { page: PageContent | undefined }) {
  if (!page?.articles) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <ArticlesHero hero={page.articles} />
      <ArticlesNewsletter hero={page.articles} />
      <ArticlesList hero={page.articles} />
      <ArticlesResearch hero={page.articles} />
      <ArticlesMintCta hero={page.articles} />
    </div>
  );
}
