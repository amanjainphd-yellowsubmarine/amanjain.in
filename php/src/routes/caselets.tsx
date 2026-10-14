import { CaseletsBoard } from "@/components/resources/CaseletsBoard";
import { CaseletsHero } from "@/components/resources/CaseletsHero";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Caselets({ page }: { page: PageContent | undefined }) {
  if (!page?.caselets) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <CaseletsHero hero={page.caselets} />
      <CaseletsBoard hero={page.caselets} />
    </div>
  );
}
