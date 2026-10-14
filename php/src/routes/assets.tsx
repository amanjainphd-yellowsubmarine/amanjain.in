import { AssetsHero } from "@/components/resources/AssetsHero";
import { AssetsLists } from "@/components/resources/AssetsLists";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Assets({ page }: { page: PageContent | undefined }) {
  if (!page?.assets) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <AssetsHero hero={page.assets} />
      <AssetsLists hero={page.assets} />
    </div>
  );
}
