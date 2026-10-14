import { PodcastHero } from "@/components/on-air/PodcastHero";
import { PodcastGossip, PodcastRails } from "@/components/on-air/PodcastRails";
import { PodcastMedia } from "@/components/on-air/PodcastMedia";
import { PodcastSplit } from "@/components/on-air/PodcastSplit";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function Podcasts({ page }: { page: PageContent | undefined }) {
  if (!page?.podcast) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <PodcastHero hero={page.podcast} />
      <PodcastGossip hero={page.podcast} />
      <PodcastRails hero={page.podcast} />
      <PodcastSplit hero={page.podcast} />
    </div>
  );
}
