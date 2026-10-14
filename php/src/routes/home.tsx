import { AboutSection } from "@/components/home/AboutSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { ContactBand } from "@/components/home/ContactBand";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { StoriesSection } from "@/components/home/StoriesSection";
import { SubscribeBand } from "@/components/home/SubscribeBand";

export type HomeContent = {
  slides: Parameters<typeof HeroSlider>[0]["slides"];
  about: Parameters<typeof AboutSection>[0]["about"];
  expertise: Parameters<typeof ExpertiseSection>[0]["expertise"];
  achievements: Parameters<typeof AchievementsSection>[0]["achievements"];
  stories: Parameters<typeof StoriesSection>[0]["stories"];
  subscribe?: Parameters<typeof SubscribeBand>[0]["subscribe"];
  contact: Parameters<typeof ContactBand>[0]["contact"];
};

export default function Home({ home }: { home: HomeContent }) {
  return (
    <div className="flex-1 bg-white">
      <HeroSlider slides={home.slides} />
      <AboutSection about={home.about} />
      <ExpertiseSection expertise={home.expertise} />
      <AchievementsSection achievements={home.achievements} />
      <StoriesSection stories={home.stories} />
      {home.subscribe ? <SubscribeBand subscribe={home.subscribe} /> : null}
      <ContactBand contact={home.contact} />
    </div>
  );
}
