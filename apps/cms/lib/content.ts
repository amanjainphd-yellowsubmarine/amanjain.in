import fs from "node:fs";
import path from "node:path";
import type {
  Enquiry,
  HomeContent,
  MediaItem,
  PageContent,
  Post,
  Service,
  SiteSettings,
  WorkItem,
} from "../../../packages/shared/src/types";

export {
  getEnquiries,
  getHeader,
  getHome,
  getMedia,
  getPage,
  getPages,
  getPost,
  getPosts,
  getServices,
  getSite,
  getWork,
  saveHeader,
} from "../../../packages/shared/src/content";

function writeJson(filename: string, data: unknown) {
  const filePath = path.join(process.cwd(), "..", "..", "content", filename);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

export function saveSite(site: SiteSettings) {
  writeJson("site.json", site);
}

export function saveHome(home: HomeContent) {
  writeJson("home.json", home);
}

export function savePages(pages: PageContent[]) {
  writeJson("pages.json", pages);
}

export function savePosts(posts: Post[]) {
  writeJson("posts.json", posts);
}

export function saveServices(services: Service[]) {
  writeJson("services.json", services);
}

export function saveWork(work: WorkItem[]) {
  writeJson("work.json", work);
}

export function saveMedia(media: MediaItem[]) {
  writeJson("media.json", media);
}

export function saveEnquiries(enquiries: Enquiry[]) {
  writeJson("enquiries.json", enquiries);
}

export type {
  FooterLink,
  Enquiry,
  HeaderContent,
  HeroSlide,
  HomeContent,
  MediaItem,
  MenuItem,
  MenuLink,
  PageContent,
  Post,
  Service,
  SiteSettings,
  WorkItem,
} from "../../../packages/shared/src/types";
