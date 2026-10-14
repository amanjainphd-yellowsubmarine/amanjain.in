import { Suspense } from "react";
import { connection } from "next/server";
import { AboutSection } from "@/components/home/AboutSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { ContactBand } from "@/components/home/ContactBand";
import { StoriesSection } from "@/components/home/StoriesSection";
import { SubscribeBand } from "@/components/home/SubscribeBand";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { getHome } from "@/lib/content";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex-1 bg-white" />}>
      <HomeHero />
    </Suspense>
  );
}

async function HomeHero() {
  await connection();

  const home = getHome();

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
