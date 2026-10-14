import fs from "node:fs";
import path from "node:path";
import type { Enquiry } from "../../../packages/shared/src/types";

export {
  getEnquiries,
  getHeader,
  getHome,
  getMedia,
  getPage,
  getPages,
  getPost,
  getPosts,
  getPublishedPosts,
  getServices,
  getSite,
  getWork,
} from "../../../packages/shared/src/content";

export function saveEnquiries(enquiries: Enquiry[]) {
  const filePath = path.join(process.cwd(), "..", "..", "content", "enquiries.json");
  fs.writeFileSync(filePath, `${JSON.stringify(enquiries, null, 2)}\n`);
}

export type {
  BookChapter,
  BookPage,
  BookPoint,
  BookVoice,
  EngagementHero,
  GalleryImage,
  Enquiry,
  HeaderContent,
  HeroSlide,
  HomeAbout,
  HomeAchievements,
  HomeContact,
  HomeContent,
  HomeSubscribe,
  HomeExpertise,
  HomeStories,
  MediaItem,
  MenuItem,
  MenuLink,
  PageContent,
  PageHero,
  PodcastEpisode,
  MediaAppearanceItem,
  PodcastHero,
  CaseletsHero,
  CaseletCard,
  ArticlesHero,
  AssetsHero,
  NewsHero,
  ConnectHero,
  RecommendedHero,
  Post,
  Service,
  SiteSettings,
  WorkItem,
} from "../../../packages/shared/src/types";
