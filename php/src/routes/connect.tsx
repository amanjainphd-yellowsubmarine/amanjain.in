import { ConnectContact } from "@/components/connect/ConnectContact";
import { ConnectHero } from "@/components/connect/ConnectHero";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Connect({ page }: { page: PageContent | undefined }) {
  if (!page?.connect) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <ConnectHero hero={page.connect} />
      <ConnectContact hero={page.connect} />
    </div>
  );
}
