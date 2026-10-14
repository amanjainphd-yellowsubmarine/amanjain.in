import { EngagementEvents } from "@/components/engagements/EngagementEvents";
import { EngagementGallery } from "@/components/engagements/EngagementGallery";
import { EngagementHero } from "@/components/engagements/EngagementHero";
import { EngagementProjects } from "@/components/engagements/EngagementProjects";
import { EngagementRoles } from "@/components/engagements/EngagementRoles";
import { EngagementSplitCta } from "@/components/engagements/EngagementSplitCta";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Engagements({ page }: { page: PageContent | undefined }) {
  if (!page?.engagement) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <EngagementHero hero={page.engagement} />
      <EngagementGallery images={page.engagement.gallery} />
      <EngagementEvents hero={page.engagement} />
      <EngagementRoles hero={page.engagement} />
      <EngagementProjects hero={page.engagement} />
      <EngagementSplitCta hero={page.engagement} />
    </div>
  );
}
