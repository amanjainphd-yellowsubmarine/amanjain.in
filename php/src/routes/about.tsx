import { AboutAreas } from "@/components/about/AboutAreas";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutExperience } from "@/components/about/AboutExperience";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import type { PageContent } from "@/lib/content";
import { Missing } from "../missing";

export default function About({ page }: { page: PageContent | undefined }) {
  if (!page?.hero) return <Missing />;
  return (
    <div className="flex-1 bg-white">
      <AboutHero hero={page.hero} />
      <AboutStory hero={page.hero} />
      <AboutExperience hero={page.hero} />
      <AboutAreas hero={page.hero} />
      <AboutCta hero={page.hero} />
    </div>
  );
}
