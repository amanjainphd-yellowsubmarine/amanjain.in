import fs from "node:fs";
import path from "node:path";
import type {
  Enquiry,
  HeaderContent,
  HomeContent,
  MediaItem,
  PageContent,
  Post,
  Service,
  SiteSettings,
  WorkItem,
} from "./types";

function contentPath(filename: string) {
  return path.join(process.cwd(), "..", "..", "content", filename);
}

function readJson<T>(filename: string): T {
  const raw = fs.readFileSync(contentPath(filename), "utf8");
  return JSON.parse(raw) as T;
}

function writeJson(filename: string, data: unknown) {
  fs.writeFileSync(contentPath(filename), `${JSON.stringify(data, null, 2)}\n`);
}

export function getSite(): SiteSettings {
  return readJson<SiteSettings>("site.json");
}

export function getHeader(): HeaderContent {
  return readJson<HeaderContent>("header.json");
}

export function saveHeader(header: HeaderContent) {
  writeJson("header.json", header);
}

export function saveSite(site: SiteSettings) {
  writeJson("site.json", site);
}

export function getHome(): HomeContent {
  return readJson<HomeContent>("home.json");
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

export function getPages(): PageContent[] {
  return readJson<PageContent[]>("pages.json");
}

export function getPage(slug: string): PageContent | undefined {
  return getPages().find((page) => page.slug === slug);
}

export function getServices(): Service[] {
  return readJson<Service[]>("services.json");
}

export function getWork(): WorkItem[] {
  return readJson<WorkItem[]>("work.json");
}

export function getPosts(): Post[] {
  return readJson<Post[]>("posts.json");
}

export function getPublishedPosts(): Post[] {
  return getPosts().filter((post) => post.status === "published");
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getMedia(): MediaItem[] {
  return readJson<MediaItem[]>("media.json");
}

export function getEnquiries(): Enquiry[] {
  return readJson<Enquiry[]>("enquiries.json");
}
