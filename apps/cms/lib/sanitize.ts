import { randomUUID } from "node:crypto";
import type {
  FooterLink,
  HeroSlide,
  HomeContent,
  PageContent,
  Post,
  Service,
  SiteSettings,
  WorkItem,
} from "@/lib/content";

export function isSafeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  if (/^#[A-Za-z][\w-]*$/.test(href) || href === "#") return true;
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function text(value: unknown, max: number) {
  return String(value ?? "").replace(/\u0000/g, "").trim().slice(0, max);
}

function youtubeEmbed(value: unknown) {
  const raw = text(value, 300);
  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");
    let id = "";
    if ((host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") && url.pathname.startsWith("/embed/")) {
      id = url.pathname.split("/")[2] ?? "";
    } else if ((host === "youtube.com" || host === "m.youtube.com") && url.pathname === "/watch") {
      id = url.searchParams.get("v") ?? "";
    } else if (host === "youtu.be") {
      id = url.pathname.replace(/^\//, "").split("/")[0] ?? "";
    }
    if (!/^[\w-]{6,20}$/.test(id)) return "";
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return "";
  }
}

function optionalMobile(record: Record<string, unknown>) {
  const mobile = text(record.mobileImage, 300);
  return isSafeImage(mobile) ? { mobileImage: mobile } : {};
}

function isSafeImage(src: string) {
  if (src.startsWith("/images/") && !src.includes("..")) return true;
  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isSafeBackground(value: string) {
  if (/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) return true;
  return /^linear-gradient\([#%,. 0-9a-zA-Z()-]+\)$/.test(value) && value.length <= 180;
}

function cleanFooterLinks(value: unknown, max: number): FooterLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const record = item as Record<string, unknown>;
      const label = text(record.label, 40);
      const href = text(record.href, 300);
      return label && isSafeHref(href) ? [{ label, href }] : [];
    })
    .slice(0, max);
}

export function cleanSite(value: unknown): SiteSettings | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const name = text(record.name, 80);
  const tagline = text(record.tagline, 160);
  const email = text(record.email, 120);
  const address = text(record.address, 160);
  const footerRecord = record.footer && typeof record.footer === "object" ? (record.footer as Record<string, unknown>) : null;
  if (!name || !tagline || !email.includes("@") || !address || !footerRecord) return null;
  const bookingLabel = text(footerRecord.bookingLabel, 30);
  const bookingHref = text(footerRecord.bookingHref, 300);
  const quickTitle = text(footerRecord.quickTitle, 40);
  const resourcesTitle = text(footerRecord.resourcesTitle, 40);
  const contactTitle = text(footerRecord.contactTitle, 40);
  const quickLinks = cleanFooterLinks(footerRecord.quickLinks, 8);
  const resourceLinks = cleanFooterLinks(footerRecord.resourceLinks, 8);
  const socials = cleanFooterLinks(footerRecord.socials, 8);
  if (!bookingLabel || !isSafeHref(bookingHref) || !quickTitle || !resourcesTitle || !contactTitle || quickLinks.length < 1 || resourceLinks.length < 1 || socials.length < 1) return null;
  return {
    name,
    tagline,
    description: text(record.description, 500),
    email,
    phone: text(record.phone, 40),
    address,
    footer: { bookingLabel, bookingHref, quickTitle, quickLinks, resourcesTitle, resourceLinks, contactTitle, socials },
  };
}

export function cleanPage(value: unknown): PageContent | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const slug = text(record.slug, 80);
  const title = text(record.title, 120);
  const status = record.status === "draft" ? "draft" : record.status === "published" ? "published" : null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(slug) || !title || !status) return null;
  const page: PageContent = {
    slug,
    title,
    eyebrow: text(record.eyebrow, 80),
    summary: text(record.summary, 300),
    body: text(record.body, 8000),
    status,
  };
  if (slug === "books/from-fomo-to-jomo") {
    const book = cleanBookPage(record.book);
    if (!book) return null;
    return { ...page, book };
  }
  if (slug === "engagements") {
    const engagement = cleanEngagementHero(record.engagement);
    if (!engagement) return null;
    return { ...page, engagement };
  }
  if (slug === "books/recommended") {
    const recommended = cleanRecommendedHero(record.recommended);
    if (!recommended) return null;
    return { ...page, recommended };
  }
  if (slug === "on-air/podcasts") {
    const podcast = cleanPodcastListingHero(record.podcast);
    if (!podcast) return null;
    return { ...page, podcast };
  }
  if (slug === "on-air/media-appearances") {
    const podcast = cleanMediaAppearanceHero(record.podcast);
    if (!podcast) return null;
    return { ...page, podcast };
  }
  if (slug === "resources/practice-caselets") {
    const caselets = cleanCaseletsHero(record.caselets);
    if (!caselets) return null;
    return { ...page, caselets };
  }
  if (slug === "resources/articles-research-papers") {
    const articles = cleanArticlesHero(record.articles);
    if (!articles) return null;
    return { ...page, articles };
  }
  if (slug === "resources/assets") {
    const assets = cleanAssetsHero(record.assets);
    if (!assets) return null;
    return { ...page, assets };
  }
  if (slug === "resources/in-the-news") {
    const news = cleanNewsHero(record.news);
    if (!news) return null;
    return { ...page, news };
  }
  if (slug === "connect") {
    const connect = cleanConnectHero(record.connect);
    if (!connect) return null;
    return { ...page, connect };
  }
  if (slug !== "about") return page;
  const hero = cleanPageHero(record.hero);
  if (!hero) return null;
  return { ...page, hero };
}

function cleanConnectHero(value: unknown): PageContent["connect"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 40);
  const description = text(record.description, 180);
  const image = text(record.image, 300);
  const alt = text(record.alt, 80);
  if (!title || !description || !alt || !isSafeImage(image)) return null;
  const contactTitle = text(record.contactTitle, 50);
  const email = text(record.email, 80);
  const namePlaceholder = text(record.namePlaceholder, 40);
  const emailPlaceholder = text(record.emailPlaceholder, 40);
  const agendaPlaceholder = text(record.agendaPlaceholder, 40);
  const subjectPlaceholder = text(record.subjectPlaceholder, 40);
  const messagePlaceholder = text(record.messagePlaceholder, 60);
  const buttonLabel = text(record.buttonLabel, 30);
  const closeTitle = text(record.closeTitle, 80);
  const closeSubtitle = text(record.closeSubtitle, 180);
  const closeLabel = text(record.closeLabel, 40);
  const closeHref = text(record.closeHref, 200);
  const agendas = Array.isArray(record.agendas)
    ? record.agendas.flatMap((item) => {
        const line = text(item, 40);
        return line ? [line] : [];
      }).slice(0, 8)
    : [];
  if (!contactTitle || !email.includes("@") || email.includes(" ") || !namePlaceholder || !emailPlaceholder || !agendaPlaceholder || !subjectPlaceholder || !messagePlaceholder || !buttonLabel || agendas.length < 1 || !closeTitle || !closeSubtitle || !closeLabel || !isSafeHref(closeHref)) return null;
  return { title, description, image, alt, ...optionalMobile(record), contactTitle, email, namePlaceholder, emailPlaceholder, agendaPlaceholder, agendas, subjectPlaceholder, messagePlaceholder, buttonLabel, closeTitle, closeSubtitle, closeLabel, closeHref };
}

function cleanNewsHero(value: unknown): PageContent["news"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 40);
  const description = text(record.description, 160);
  const image = text(record.image, 300);
  const alt = text(record.alt, 80);
  if (!title || !description || !alt || !isSafeImage(image)) return null;
  const cards = Array.isArray(record.cards)
    ? record.cards.slice(0, 36).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const card = item as Record<string, unknown>;
        const cardImage = text(card.image, 300);
        const cardAlt = text(card.alt, 80);
        const year = text(card.year, 8);
        const category = text(card.category, 48);
        const cardTitle = text(card.title, 140);
        const cardDescription = text(card.description, 240);
        const href = text(card.href, 400);
        const buttonLabel = text(card.buttonLabel, 30);
        if (!cardAlt || !year || !category || !cardTitle || !cardDescription || !buttonLabel || !isSafeHref(href)) return [];
        if (cardImage && !isSafeImage(cardImage)) return [];
        return [{ image: cardImage, alt: cardAlt, year, category, title: cardTitle, description: cardDescription, href, buttonLabel }];
      })
    : [];
  if (cards.length < 1) return null;
  return { title, description, image, alt, ...optionalMobile(record), cards };
}

function cleanAssetsHero(value: unknown): PageContent["assets"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 40);
  const description = text(record.description, 180);
  const image = text(record.image, 300);
  const alt = text(record.alt, 80);
  if (!title || !description || !alt || !isSafeImage(image)) return null;
  const closeTitle = text(record.closeTitle, 80);
  const closeSubtitle = text(record.closeSubtitle, 180);
  const closeLabel = text(record.closeLabel, 40);
  const closeHref = text(record.closeHref, 200);
  const categories = Array.isArray(record.categories)
    ? record.categories.slice(0, 6).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const category = item as Record<string, unknown>;
        const categoryTitle = text(category.title, 40);
        const cards = Array.isArray(category.cards)
          ? category.cards.slice(0, 16).flatMap((cardItem) => {
              if (!cardItem || typeof cardItem !== "object") return [];
              const card = cardItem as Record<string, unknown>;
              const cardTitle = text(card.title, 80);
              const cardDescription = text(card.description, 180);
              const href = text(card.href, 800);
              const buttonLabel = text(card.buttonLabel, 30);
              if (!cardTitle || !cardDescription || !buttonLabel || !isSafeHref(href)) return [];
              return [{ title: cardTitle, description: cardDescription, href, buttonLabel }];
            })
          : [];
        if (!categoryTitle || cards.length < 1) return [];
        return [{ title: categoryTitle, cards }];
      })
    : [];
  if (!closeTitle || !closeSubtitle || !closeLabel || !isSafeHref(closeHref) || categories.length < 1) return null;
  return { title, description, image, alt, ...optionalMobile(record), categories, closeTitle, closeSubtitle, closeLabel, closeHref };
}

function cleanArticlesHero(value: unknown): PageContent["articles"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 60);
  const description = text(record.description, 400);
  const image = text(record.image, 300);
  const alt = text(record.alt, 80);
  const listTitle = text(record.listTitle, 80);
  const listSubtitle = text(record.listSubtitle, 280);
  if (!title || !description || !alt || !listTitle || !listSubtitle || !isSafeImage(image)) return null;
  const features = Array.isArray(record.features)
    ? record.features.slice(0, 6).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const feature = item as Record<string, unknown>;
        const magazine = text(feature.magazine, 60);
        const featureTitle = text(feature.title, 160);
        const featureDescription = text(feature.description, 520);
        const href = text(feature.href, 800);
        const buttonLabel = text(feature.buttonLabel, 30);
        const highlights = Array.isArray(feature.highlights)
          ? feature.highlights.flatMap((highlight) => {
              const line = text(highlight, 80);
              return line ? [line] : [];
            }).slice(0, 8)
          : [];
        if (!magazine || !featureTitle || !featureDescription || !buttonLabel || highlights.length < 1 || !isSafeHref(href)) return [];
        return [{ magazine, title: featureTitle, description: featureDescription, highlights, href, buttonLabel }];
      })
    : [];
  const cards = Array.isArray(record.cards)
    ? record.cards.slice(0, 60).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const card = item as Record<string, unknown>;
        const cardTitle = text(card.title, 200);
        const cardDescription = text(card.description, 240);
        const cardImage = text(card.image, 300);
        const cardAlt = text(card.alt, 80);
        const duration = text(card.duration, 20);
        const href = text(card.href, 800);
        const buttonLabel = text(card.buttonLabel, 30);
        if (!cardTitle || !cardDescription || !cardAlt || !duration || !buttonLabel || !isSafeImage(cardImage) || !isSafeHref(href)) return [];
        return [{ title: cardTitle, description: cardDescription, image: cardImage, alt: cardAlt, duration, href, buttonLabel }];
      })
    : [];
  const researchTitle = text(record.researchTitle, 80);
  const researchSubtitle = text(record.researchSubtitle, 400);
  const papers = Array.isArray(record.papers)
    ? record.papers.slice(0, 12).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const paper = item as Record<string, unknown>;
        const tone: "teal" | "orange" | "" = paper.tone === "orange" ? "orange" : paper.tone === "teal" ? "teal" : "";
        const label = text(paper.label, 40);
        const paperTitle = text(paper.title, 160);
        const paperDescription = text(paper.description, 520);
        const href = text(paper.href, 800);
        const buttonLabel = text(paper.buttonLabel, 30);
        const highlights = Array.isArray(paper.highlights)
          ? paper.highlights.flatMap((highlight) => {
              const line = text(highlight, 80);
              return line ? [line] : [];
            }).slice(0, 8)
          : [];
        if (!tone || !label || !paperTitle || !paperDescription || !buttonLabel || highlights.length < 1 || !isSafeHref(href)) return [];
        return [{ tone, label, title: paperTitle, description: paperDescription, highlights, href, buttonLabel }];
      })
    : [];
  const closeTitle = text(record.closeTitle, 80);
  const closeSubtitle = text(record.closeSubtitle, 180);
  const closeLabel = text(record.closeLabel, 40);
  const closeHref = text(record.closeHref, 200);
  if (features.length < 1 || cards.length < 1 || !researchTitle || !researchSubtitle || papers.length < 1 || !closeTitle || !closeSubtitle || !closeLabel || !isSafeHref(closeHref)) return null;
  const newsletterTitle = text(record.newsletterTitle, 80);
  const newsletterText = text(record.newsletterText, 300);
  const newsletterLabel = text(record.newsletterLabel, 40);
  const newsletterHref = text(record.newsletterHref, 300);
  return {
    title, description, image, alt, ...optionalMobile(record), listTitle, listSubtitle, features, cards, researchTitle, researchSubtitle, papers, closeTitle, closeSubtitle, closeLabel, closeHref,
    ...(newsletterTitle && newsletterText && newsletterLabel && isSafeHref(newsletterHref) ? { newsletterTitle, newsletterText, newsletterLabel, newsletterHref } : {}),
  };
}

function cleanCaseletsHero(value: unknown): PageContent["caselets"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 40);
  const description = text(record.description, 220);
  const image = text(record.image, 300);
  const alt = text(record.alt, 80);
  if (!title || !description || !alt || !isSafeImage(image)) return null;
  const ctaTitle = text(record.ctaTitle, 80);
  const ctaSubtitle = text(record.ctaSubtitle, 180);
  const ctaLabel = text(record.ctaLabel, 40);
  const ctaHref = text(record.ctaHref, 200);
  const cards = Array.isArray(record.cards)
    ? record.cards.slice(0, 24).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const card = item as Record<string, unknown>;
        const tag = text(card.tag, 60);
        const cardTitle = text(card.title, 120);
        const cardDescription = text(card.description, 400);
        const outcome = text(card.outcome, 420);
        const href = text(card.href, 800);
        const buttonLabel = text(card.buttonLabel, 30);
        if (!tag || !cardTitle || !cardDescription || !outcome || !buttonLabel || !isSafeHref(href)) return [];
        return [{ tag, title: cardTitle, description: cardDescription, outcome, href, buttonLabel }];
      })
    : [];
  if (!ctaTitle || !ctaSubtitle || !ctaLabel || !isSafeHref(ctaHref) || cards.length < 1) return null;
  return { title, description, image, alt, ...optionalMobile(record), cards, ctaTitle, ctaSubtitle, ctaLabel, ctaHref };
}

function cleanPodcastHeroCore(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 90);
  const description = text(record.description, 280);
  const image = text(record.image, 300);
  const imageAlt = text(record.imageAlt, 80);
  const camera = text(record.camera, 300);
  const cameraAlt = text(record.cameraAlt, 80);
  const mic = text(record.mic, 300);
  const micAlt = text(record.micAlt, 80);
  if (!title || !description || !imageAlt || !cameraAlt || !micAlt || !isSafeImage(image) || !isSafeImage(camera) || !isSafeImage(mic)) return null;
  const closeTitle = text(record.closeTitle, 80);
  const closeSubtitle = text(record.closeSubtitle, 180);
  const closeLabel = text(record.closeLabel, 40);
  const closeHref = text(record.closeHref, 200);
  const closeImage = text(record.closeImage, 300);
  const closeAlt = text(record.closeAlt, 80);
  if (!closeTitle || !closeSubtitle || !closeLabel || !closeAlt || !isSafeHref(closeHref) || !isSafeImage(closeImage)) return null;
  const gossipTitle = text(record.gossipTitle, 80) || "The Leadership Gossip";
  const gossipSubtitle = text(record.gossipSubtitle, 180);
  const gossipButton = text(record.gossipButton, 30) || "Listen Now";
  const gossip = cleanPodcastEpisodes(record.gossip);
  const heroButtonLabel = text(record.heroButtonLabel, 40) || "Let's Talk";
  const heroButtonHrefRaw = text(record.heroButtonHref, 200) || "/connect";
  const heroButtonHref = isSafeHref(heroButtonHrefRaw) ? heroButtonHrefRaw : "/connect";
  return {
    record,
    title,
    description,
    heroButtonLabel,
    heroButtonHref,
    image,
    imageAlt,
    camera,
    cameraAlt,
    mic,
    micAlt,
    closeTitle,
    closeSubtitle,
    closeLabel,
    closeHref,
    closeImage,
    closeAlt,
    gossipTitle,
    gossipSubtitle,
    gossipButton,
    gossip,
  };
}

function cleanPodcastListingHero(value: unknown): PageContent["podcast"] | null {
  const core = cleanPodcastHeroCore(value);
  if (!core) return null;
  const record = core.record;
  const featuringLead = text(record.featuringLead, 60);
  const featuringAccent = text(record.featuringAccent, 40);
  const featuringSubtitle = text(record.featuringSubtitle, 180);
  const featuringButton = text(record.featuringButton, 30);
  const recommendedTitle = text(record.recommendedTitle, 60);
  const recommendedSubtitle = text(record.recommendedSubtitle, 180);
  const recommendedButton = text(record.recommendedButton, 30);
  const featuring = cleanPodcastEpisodes(record.featuring);
  const recommended = cleanPodcastEpisodes(record.recommended);
  if (!featuringLead || !featuringAccent || !featuringSubtitle || !featuringButton || !recommendedTitle || !recommendedSubtitle || !recommendedButton || featuring.length < 1 || recommended.length < 1) return null;
  const mediaTitle = text(record.mediaTitle, 60) || "Media Appearances";
  const mediaSubtitle = text(record.mediaSubtitle, 180) || "Featured interviews, talks, and media coverage";
  const mediaCaption = text(record.mediaCaption, 160) || "Featured media";
  const mediaVideo = youtubeEmbed(record.mediaVideo) || "https://www.youtube.com/embed/OJl8bQ8j6C0";
  return {
    title: core.title,
    description: core.description,
    heroButtonLabel: core.heroButtonLabel,
    heroButtonHref: core.heroButtonHref,
    image: core.image,
    ...optionalMobile(record),
    imageAlt: core.imageAlt,
    camera: core.camera,
    cameraAlt: core.cameraAlt,
    mic: core.mic,
    micAlt: core.micAlt,
    featuringLead,
    featuringAccent,
    featuringSubtitle,
    featuringButton,
    featuring,
    recommendedTitle,
    recommendedSubtitle,
    recommendedButton,
    recommended,
    mediaTitle,
    mediaSubtitle,
    mediaVideo,
    mediaCaption,
    closeTitle: core.closeTitle,
    closeSubtitle: core.closeSubtitle,
    closeLabel: core.closeLabel,
    closeHref: core.closeHref,
    closeImage: core.closeImage,
    closeAlt: core.closeAlt,
    gossipTitle: core.gossipTitle,
    ...(core.gossipSubtitle ? { gossipSubtitle: core.gossipSubtitle } : {}),
    gossipButton: core.gossipButton,
    gossip: core.gossip,
  };
}

function cleanMediaAppearanceItems(value: unknown, fallbackVideo: string, fallbackCaption: string) {
  const cleaned = Array.isArray(value)
    ? value.slice(0, 12).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const row = item as Record<string, unknown>;
        const title = text(row.title, 160);
        const caption = text(row.caption, 200);
        const video = youtubeEmbed(row.video);
        const thumbnail = text(row.thumbnail, 300);
        const thumbnailAlt = text(row.thumbnailAlt, 120);
        if (!title || !caption || !video) return [];
        return [
          {
            title,
            caption,
            video,
            ...(isSafeImage(thumbnail) ? { thumbnail, thumbnailAlt: thumbnailAlt || title } : {}),
          },
        ];
      })
    : [];
  if (cleaned.length > 0) return cleaned;
  const video = youtubeEmbed(fallbackVideo);
  const caption = text(fallbackCaption, 200);
  if (!video || !caption) return [];
  return [{ title: caption, caption, video }];
}

function cleanMediaAppearanceHero(value: unknown): PageContent["podcast"] | null {
  const core = cleanPodcastHeroCore(value);
  if (!core) return null;
  const record = core.record;
  const mediaTitle = text(record.mediaTitle, 60);
  const mediaSubtitle = text(record.mediaSubtitle, 180);
  const mediaCaption = text(record.mediaCaption, 160);
  const mediaVideo = youtubeEmbed(record.mediaVideo);
  const mediaItems = cleanMediaAppearanceItems(record.mediaItems, record.mediaVideo, record.mediaCaption);
  if (!mediaTitle || !mediaSubtitle || mediaItems.length < 1) return null;
  const primary = mediaItems[0];
  const syncedVideo = primary.video;
  const syncedCaption = primary.caption;
  const featuring = cleanPodcastEpisodes(record.featuring);
  const recommended = cleanPodcastEpisodes(record.recommended);
  const stub = featuring[0] ?? recommended[0];
  const featuringLead = text(record.featuringLead, 60) || "Podcasts Featuring";
  const featuringAccent = text(record.featuringAccent, 40) || "Dr. Aman Jain";
  const featuringSubtitle = text(record.featuringSubtitle, 180) || "Expert insights and thought leadership";
  const featuringButton = text(record.featuringButton, 30) || "Listen Now";
  const recommendedTitle = text(record.recommendedTitle, 60) || "Recommended Podcasts";
  const recommendedSubtitle = text(record.recommendedSubtitle, 180) || "Curated podcasts for continuous learning";
  const recommendedButton = text(record.recommendedButton, 30) || "Listen Now";
  const fallbackEpisode = stub ?? {
    title: "Podcast",
    description: "Listen on the Podcasts page.",
    image: core.image,
    alt: core.imageAlt,
    duration: "30 min",
    href: "/on-air/podcasts",
    tags: ["Podcast"],
  };
  return {
    title: core.title,
    description: core.description,
    heroButtonLabel: core.heroButtonLabel,
    heroButtonHref: core.heroButtonHref,
    image: core.image,
    ...optionalMobile(record),
    imageAlt: core.imageAlt,
    camera: core.camera,
    cameraAlt: core.cameraAlt,
    mic: core.mic,
    micAlt: core.micAlt,
    featuringLead,
    featuringAccent,
    featuringSubtitle,
    featuringButton,
    featuring: featuring.length > 0 ? featuring : [fallbackEpisode],
    recommendedTitle,
    recommendedSubtitle,
    recommendedButton,
    recommended: recommended.length > 0 ? recommended : [fallbackEpisode],
    mediaTitle,
    mediaSubtitle,
    mediaVideo: syncedVideo,
    mediaCaption: syncedCaption,
    mediaItems,
    closeTitle: core.closeTitle,
    closeSubtitle: core.closeSubtitle,
    closeLabel: core.closeLabel,
    closeHref: core.closeHref,
    closeImage: core.closeImage,
    closeAlt: core.closeAlt,
    gossipTitle: core.gossipTitle,
    ...(core.gossipSubtitle ? { gossipSubtitle: core.gossipSubtitle } : {}),
    gossipButton: core.gossipButton,
    gossip: core.gossip,
  };
}

function cleanPodcastEpisodes(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 12).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const episode = item as Record<string, unknown>;
    const title = text(episode.title, 160);
    const description = text(episode.description, 400);
    const image = text(episode.image, 300);
    const alt = text(episode.alt, 120);
    const duration = text(episode.duration, 30);
    const href = text(episode.href, 400);
    const tags = Array.isArray(episode.tags) ? episode.tags.slice(0, 6).flatMap((tag) => {
      const line = text(tag, 60);
      return line ? [line] : [];
    }) : [];
    if (!title || !description || !alt || !duration || tags.length < 1 || !isSafeImage(image) || !isSafeHref(href)) return [];
    return [{ title, description, image, alt, duration, href, tags }];
  });
}

function cleanRecommendedHero(value: unknown): PageContent["recommended"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const description = text(record.description, 240);
  const image = text(record.image, 300);
  const alt = text(record.alt, 80);
  const listTitle = text(record.listTitle, 80);
  const listSubtitle = text(record.listSubtitle, 180);
  const ctaTitle = text(record.ctaTitle, 80);
  const ctaSubtitle = text(record.ctaSubtitle, 180);
  const ctaLabel = text(record.ctaLabel, 40);
  const ctaHref = text(record.ctaHref, 200);
  const books = Array.isArray(record.books)
    ? record.books.slice(0, 24).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const book = item as Record<string, unknown>;
        const bookTitle = text(book.title, 120);
        const cover = text(book.cover, 300);
        const coverAlt = text(book.alt, 120);
        const rating = text(book.rating, 40);
        const author = text(book.author, 80);
        const year = text(book.year, 12);
        const publisher = text(book.publisher, 80);
        const about = text(book.about, 700);
        const highlights = Array.isArray(book.highlights)
          ? book.highlights.slice(0, 4).flatMap((point) => {
              const line = text(point, 140);
              return line ? [line] : [];
            })
          : [];
        if (!bookTitle || !coverAlt || !rating || !author || !year || !publisher || !about || highlights.length !== 4 || !isSafeImage(cover)) return [];
        return [{ title: bookTitle, cover, alt: coverAlt, rating, author, year, publisher, about, highlights }];
      })
    : [];
  if (!title || !description || !alt || !listTitle || !listSubtitle || !ctaTitle || !ctaSubtitle || !ctaLabel || !isSafeHref(ctaHref) || !isSafeImage(image) || books.length < 1) return null;
  return { title, description, image, alt, ...optionalMobile(record), listTitle, listSubtitle, books, ctaTitle, ctaSubtitle, ctaLabel, ctaHref };
}

function cleanBookPage(value: unknown): PageContent["book"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const heading = text(record.heading, 40);
  const subheading = text(record.subheading, 180);
  const namePlaceholder = text(record.namePlaceholder, 40);
  const emailPlaceholder = text(record.emailPlaceholder, 40);
  const buttonLabel = text(record.buttonLabel, 30);
  const logo = text(record.logo, 300);
  const logoAlt = text(record.logoAlt, 80);
  const cover = text(record.cover, 300);
  const coverAlt = text(record.coverAlt, 120);
  const coverHref = text(record.coverHref, 300);
  const quote = text(record.quote, 500);
  const authorName = text(record.authorName, 80);
  const authorInfo = text(record.authorInfo, 220);
  const authorPhoto = text(record.authorPhoto, 300);
  const authorPhotoAlt = text(record.authorPhotoAlt, 80);
  const insideTitle = text(record.insideTitle, 40);
  if (!heading || !subheading || !namePlaceholder || !emailPlaceholder || !buttonLabel || !logoAlt || !coverAlt || !quote || !authorName || !authorInfo || !insideTitle) return null;
  if (!isSafeImage(logo) || !isSafeImage(cover) || !isSafeHref(coverHref) || !Array.isArray(record.chapters)) return null;
  const chapters = record.chapters.slice(0, 8).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const chapter = item as Record<string, unknown>;
    const number = text(chapter.number, 8);
    const title = text(chapter.title, 80);
    const description = text(chapter.description, 220);
    const image = text(chapter.image, 300);
    const alt = text(chapter.alt, 80);
    const points = Array.isArray(chapter.points)
      ? chapter.points.slice(0, 3).flatMap((point) => {
          if (!point || typeof point !== "object") return [];
          const entry = point as Record<string, unknown>;
          const pointNumber = text(entry.number, 8);
          const pointText = text(entry.text, 80);
          if (!pointNumber || !pointText) return [];
          return [{ number: pointNumber, text: pointText }];
        })
      : [];
    if (!number || !title || !description || !alt || points.length !== 3 || !isSafeImage(image)) return [];
    return [{ number, title, description, points, image, alt }];
  });
  if (chapters.length !== 5) return null;
  const voicesTitle = text(record.voicesTitle, 80);
  const voicesSubtitle = text(record.voicesSubtitle, 120);
  const voicesDesc = text(record.voicesDesc, 160);
  const featured = cleanBookVoice(record.featured, false);
  const voices = Array.isArray(record.voices) ? record.voices.slice(0, 8).flatMap((item) => {
    const voice = cleanBookVoice(item, true);
    return voice ? [voice] : [];
  }) : [];
  if (!voicesTitle || !voicesSubtitle || !voicesDesc || !featured || voices.length < 1) return null;
  const whoTitle = text(record.whoTitle, 60);
  const whoLine = text(record.whoLine, 140);
  const whoNamePlaceholder = text(record.whoNamePlaceholder, 40);
  const whoEmailPlaceholder = text(record.whoEmailPlaceholder, 40);
  const whoButtonLabel = text(record.whoButtonLabel, 30);
  const whoAudiences = Array.isArray(record.whoAudiences)
    ? record.whoAudiences.slice(0, 3).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const audience = item as Record<string, unknown>;
        const title = text(audience.title, 80);
        const body = text(audience.text, 320);
        if (!title || !body) return [];
        return [{ title, text: body }];
      })
    : [];
  if (!whoTitle || !whoLine || !whoNamePlaceholder || !whoEmailPlaceholder || !whoButtonLabel || whoAudiences.length !== 3) return null;
  const ctaTitle = text(record.ctaTitle, 80);
  const ctaSubtitle = text(record.ctaSubtitle, 180);
  const ctaLabel = text(record.ctaLabel, 40);
  const ctaHref = text(record.ctaHref, 200);
  if (!ctaTitle || !ctaSubtitle || !ctaLabel || !isSafeHref(ctaHref)) return null;
  const slides = cleanHeroSlides(record.slides);
  return {
    heading, subheading, namePlaceholder, emailPlaceholder, buttonLabel, logo, logoAlt, cover, coverAlt, coverHref, ...optionalMobile(record), quote, authorName, authorInfo, insideTitle, chapters, voicesTitle, voicesSubtitle, voicesDesc, featured, voices, whoTitle, whoAudiences, whoLine, whoNamePlaceholder, whoEmailPlaceholder, whoButtonLabel, ctaTitle, ctaSubtitle, ctaLabel, ctaHref,
    ...(authorPhoto && isSafeImage(authorPhoto) ? { authorPhoto, authorPhotoAlt: authorPhotoAlt || authorName } : {}),
    ...(record.bannerHidden === true ? { bannerHidden: true } : {}),
    ...(slides.length > 0 ? { slides } : {}),
  };
}

function cleanHeroSlides(value: unknown): HeroSlide[] {
  if (!Array.isArray(value)) return [];
  const slides: HeroSlide[] = [];
  for (const item of value.slice(0, 8)) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const template = record.template === "story" || record.template === "buy" || record.template === "panel" || record.template === "arch" || record.template === "word" ? record.template : "portrait";
    const bookDesign = template === "panel" || template === "arch" || template === "word";
    const title = text(record.title, 160);
    const subtitle = text(record.subtitle, 240);
    const buttonLabel = text(record.buttonLabel, 40);
    const href = text(record.href, 300);
    const image = text(record.image, 300);
    const alt = text(record.alt, 120);
    const eyebrow = text(record.eyebrow, 48);
    const quote = text(record.quote, 600);
    const quoteName = text(record.quoteName, 80);
    const quoteRole = text(record.quoteRole, 140);
    const badge = text(record.badge, 80);
    const ticker = text(record.ticker, 80);
    const bigWord = text(record.bigWord, 16);
    const rings = Array.isArray(record.rings) ? record.rings.slice(0, 3).map(cleanRing) : [];
    const lines = Array.isArray(record.lines)
      ? record.lines.slice(0, 6).flatMap((line) => {
          if (!line || typeof line !== "object") return [];
          const row = line as Record<string, unknown>;
          const label = text(row.label, 40);
          const rowText = text(row.text, 160);
          return label && rowText ? [{ label, text: rowText }] : [];
        })
      : [];
    const links = Array.isArray(record.links)
      ? record.links.slice(0, 6).flatMap((link) => {
          if (!link || typeof link !== "object") return [];
          const row = link as Record<string, unknown>;
          const label = text(row.label, 40);
          const linkHref = text(row.href, 300);
          return label && isSafeHref(linkHref) ? [{ label, href: linkHref }] : [];
        })
      : [];
    if (!title) continue;
    if (!bookDesign && (!buttonLabel || !isSafeHref(href) || !isSafeImage(image) || !alt)) continue;
    if (bookDesign && image && !isSafeImage(image)) continue;
    if ((template === "panel" || template === "arch") && !isSafeImage(image)) continue;
    if (bookDesign && buttonLabel && href && !isSafeHref(href)) continue;
    if (template === "portrait" && (rings.length !== 3 || rings.some((ring) => ring === null))) continue;
    if (template === "buy" && links.length === 0) continue;
    slides.push({
      id: text(record.id, 80) || randomUUID(),
      template,
      ...(eyebrow ? { eyebrow } : {}),
      title,
      subtitle,
      ...(quote ? { quote } : {}),
      ...(quoteName ? { quoteName } : {}),
      ...(quoteRole ? { quoteRole } : {}),
      ...(badge ? { badge } : {}),
      ...(ticker ? { ticker } : {}),
      ...(bigWord ? { bigWord } : {}),
      ...(lines.length > 0 ? { lines } : {}),
      ...(links.length > 0 ? { links } : {}),
      buttonLabel,
      href: href && isSafeHref(href) ? href : "#",
      image: template === "word" ? (isSafeImage(image) ? image : "") : (image || "/images/books/book-front.webp"),
      alt: alt || title,
      ...optionalMobile(record),
      rings: rings.length === 3 && rings.every((ring) => ring !== null) ? (rings as HeroSlide["rings"]) : [
        { background: "#DFF7EF", opacity: 0.35 },
        { background: "#CDEFF0", opacity: 0.45 },
        { background: "#C9D8F5", opacity: 0.55 },
      ],
    });
  }
  return slides;
}

function cleanBookVoice(value: unknown, requireRole: boolean) {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const name = text(record.name, 80);
  const role = text(record.role, 140);
  const quote = text(record.quote, 1600);
  const photo = text(record.photo, 300);
  const photoAlt = text(record.photoAlt, 80);
  const logo = text(record.logo, 300);
  const logoAlt = text(record.logoAlt, 80);
  if (!name || !quote || !photoAlt || !logoAlt || (requireRole && !role) || !isSafeImage(photo) || !isSafeImage(logo)) return null;
  return { name, role, quote, photo, photoAlt, logo, logoAlt };
}

function cleanEngagementHero(value: unknown): PageContent["engagement"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const description = text(record.description, 300);
  const image = text(record.image, 300);
  const alt = text(record.alt, 120);
  if (!title || !description || !alt || !isSafeImage(image) || !Array.isArray(record.gallery)) return null;
  const gallery = record.gallery.slice(0, 12).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const photo = item as Record<string, unknown>;
    const photoSrc = text(photo.image, 300);
    const photoAlt = text(photo.alt, 80);
    if (!photoAlt || !isSafeImage(photoSrc)) return [];
    return [{ image: photoSrc, alt: photoAlt }];
  });
  const eventsTitle = text(record.eventsTitle, 80);
  const eventsSubtitle = text(record.eventsSubtitle, 240);
  if (gallery.length === 0 || !eventsTitle || !eventsSubtitle || !Array.isArray(record.events)) return null;
  const events = record.events.slice(0, 24).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const event = item as Record<string, unknown>;
    const timing: "future" | "past" | null = event.timing === "future" ? "future" : event.timing === "past" ? "past" : null;
    const format: "" | "keynote" | "masterclass" | "panel" | null =
      event.format === "keynote" || event.format === "masterclass" || event.format === "panel"
        ? event.format
        : event.format === "" || event.format == null
          ? ""
          : null;
    const eventTitle = text(event.title, 160);
    const place = text(event.place, 160);
    const date = text(event.date, 40);
    const topic = text(event.topic, 240);
    if (!timing || format === null || !eventTitle || !place || !date || !topic) return [];
    return [{ timing, format, title: eventTitle, place, date, topic }];
  });
  if (events.length === 0) return null;
  const rolesTitle = text(record.rolesTitle, 80);
  const rolesSubtitle = text(record.rolesSubtitle, 200);
  if (!rolesTitle || !rolesSubtitle || !Array.isArray(record.roles)) return null;
  const roles = record.roles.slice(0, 2).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const role = item as Record<string, unknown>;
    const roleTitle = text(role.title, 80);
    const roleDescription = text(role.description, 400);
    if (!roleTitle || !roleDescription) return [];
    return [{ title: roleTitle, description: roleDescription }];
  });
  if (roles.length !== 2) return null;
  const projectsTitle = text(record.projectsTitle, 80);
  const projectsSubtitle = text(record.projectsSubtitle, 500);
  if (!projectsTitle || !projectsSubtitle || !Array.isArray(record.projectCategories)) return null;
  const projectCategories = record.projectCategories.slice(0, 24).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const category = item as Record<string, unknown>;
    const categoryTitle = text(category.title, 120);
    const items = Array.isArray(category.items)
      ? category.items.slice(0, 40).flatMap((row) => {
          if (!row || typeof row !== "object") return [];
          const project = row as Record<string, unknown>;
          const company = text(project.company, 160);
          const type = text(project.type, 300);
          if (!company) return [];
          return [{ company, type }];
        })
      : [];
    if (!categoryTitle || items.length === 0) return [];
    return [{ title: categoryTitle, items }];
  });
  if (projectCategories.length === 0) return null;
  const splitTitle = text(record.splitTitle, 80);
  const splitSubtitle = text(record.splitSubtitle, 240);
  const splitLabel = text(record.splitLabel, 40);
  const splitHref = text(record.splitHref, 300);
  const splitImage = text(record.splitImage, 300);
  const splitAlt = text(record.splitAlt, 120);
  if (!splitTitle || !splitSubtitle || !splitLabel || !splitAlt || !isSafeHref(splitHref) || !isSafeImage(splitImage)) return null;
  return { title, description, image, alt, ...optionalMobile(record), gallery, eventsTitle, eventsSubtitle, events, rolesTitle, rolesSubtitle, roles, projectsTitle, projectsSubtitle, projectCategories, splitTitle, splitSubtitle, splitLabel, splitHref, splitImage, splitAlt };
}

function cleanPageHero(value: unknown): PageContent["hero"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const description = text(record.description, 400);
  const cardTitle = text(record.cardTitle, 80);
  const image = text(record.image, 300);
  const alt = text(record.alt, 120);
  const educationTitle = text(record.educationTitle, 40);
  const experienceTitle = text(record.experienceTitle, 80);
  const experienceSubtitle = text(record.experienceSubtitle, 160);
  const areasTitle = text(record.areasTitle, 80);
  const areasSubtitle = text(record.areasSubtitle, 240);
  const ctaTitle = text(record.ctaTitle, 120);
  const ctaSubtitle = text(record.ctaSubtitle, 240);
  const ctaLabel = text(record.ctaLabel, 40);
  const ctaHref = text(record.ctaHref, 300);
  if (!title || !description || !cardTitle || !alt || !educationTitle || !experienceTitle || !experienceSubtitle || !areasTitle || !areasSubtitle || !ctaTitle || !ctaSubtitle || !ctaLabel || !isSafeHref(ctaHref) || !isSafeImage(image)) return null;
  if (!Array.isArray(record.blocks) || !Array.isArray(record.education) || !Array.isArray(record.experience) || !Array.isArray(record.areas)) return null;
  const blocks = record.blocks.slice(0, 6).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const block = item as Record<string, unknown>;
    const blockTitle = text(block.title, 120);
    const paragraphs = Array.isArray(block.paragraphs)
      ? block.paragraphs.map((paragraph) => text(paragraph, 800)).filter(Boolean).slice(0, 6)
      : [];
    if (!blockTitle || paragraphs.length === 0) return [];
    return [{ title: blockTitle, paragraphs }];
  });
  const education = record.education.slice(0, 8).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const entry = item as Record<string, unknown>;
    const degree = text(entry.degree, 200);
    const institution = text(entry.institution, 200);
    const year = text(entry.year, 20);
    const logo = text(entry.logo, 300);
    const logoAlt = text(entry.alt, 80);
    if (!degree || !institution || !year || !logoAlt || !isSafeImage(logo)) return [];
    return [{ degree, institution, year, logo, alt: logoAlt }];
  });
  const experience = record.experience.slice(0, 12).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const job = item as Record<string, unknown>;
    const dates = text(job.dates, 40);
    const role = text(job.role, 120);
    const company = text(job.company, 160);
    const logo = text(job.logo, 300);
    const logoAlt = text(job.alt, 80);
    if (!dates || !role || !company || !logoAlt || !isSafeImage(logo)) return [];
    return [{ dates, role, company, logo, alt: logoAlt }];
  });
  const areas = record.areas.slice(0, 8).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const area = item as Record<string, unknown>;
    const areaTitle = text(area.title, 40);
    const areaDescription = text(area.description, 400);
    if (!areaTitle || !areaDescription) return [];
    return [{ title: areaTitle, description: areaDescription }];
  });
  if (blocks.length === 0 || education.length === 0 || experience.length === 0 || areas.length === 0) return null;
  return { title, description, cardTitle, image, alt, ...optionalMobile(record), blocks, educationTitle, education, experienceTitle, experienceSubtitle, experience, areasTitle, areasSubtitle, areas, ctaTitle, ctaSubtitle, ctaLabel, ctaHref };
}

function cleanRing(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const background = text(record.background, 180);
  const opacity = Number(record.opacity);
  if (!isSafeBackground(background) || !Number.isFinite(opacity)) return null;
  return { background, opacity: Math.min(1, Math.max(0, opacity)) };
}

export function cleanHome(value: unknown): HomeContent | null {
  if (!value || typeof value !== "object" || !Array.isArray((value as { slides?: unknown }).slides)) {
    return null;
  }
  const slides: HeroSlide[] = [];
  for (const item of (value as { slides: unknown[] }).slides.slice(0, 12)) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const template = record.template === "story" || record.template === "buy" ? record.template : "portrait";
    const title = text(record.title, 160);
    const subtitle = text(record.subtitle, 240);
    const buttonLabel = text(record.buttonLabel, 40);
    const href = text(record.href, 300);
    const image = text(record.image, 300);
    const alt = text(record.alt, 120);
    const eyebrow = text(record.eyebrow, 40);
    const quote = text(record.quote, 600);
    const rings = Array.isArray(record.rings) ? record.rings.slice(0, 3).map(cleanRing) : [];
    const lines = Array.isArray(record.lines)
      ? record.lines.slice(0, 6).flatMap((line) => {
          if (!line || typeof line !== "object") return [];
          const row = line as Record<string, unknown>;
          const label = text(row.label, 40);
          const rowText = text(row.text, 160);
          return label && rowText ? [{ label, text: rowText }] : [];
        })
      : [];
    const links = Array.isArray(record.links)
      ? record.links.slice(0, 6).flatMap((link) => {
          if (!link || typeof link !== "object") return [];
          const row = link as Record<string, unknown>;
          const label = text(row.label, 40);
          const linkHref = text(row.href, 300);
          return label && isSafeHref(linkHref) ? [{ label, href: linkHref }] : [];
        })
      : [];
    if (!title || !buttonLabel || !isSafeHref(href) || !isSafeImage(image) || !alt) continue;
    if (template === "portrait" && (rings.length !== 3 || rings.some((ring) => ring === null))) continue;
    if (template === "buy" && links.length === 0) continue;
    slides.push({
      id: text(record.id, 80) || randomUUID(),
      template,
      ...(eyebrow ? { eyebrow } : {}),
      title,
      subtitle,
      ...(quote ? { quote } : {}),
      ...(lines.length > 0 ? { lines } : {}),
      ...(links.length > 0 ? { links } : {}),
      buttonLabel,
      href,
      image,
      alt,
      ...optionalMobile(record),
      rings: rings.length === 3 && rings.every((ring) => ring !== null) ? (rings as HeroSlide["rings"]) : [
        { background: "#DFF7EF", opacity: 0.35 },
        { background: "#CDEFF0", opacity: 0.45 },
        { background: "#C9D8F5", opacity: 0.55 },
      ],
    });
  }
  if (slides.length === 0) return null;
  const about = cleanAbout((value as { about?: unknown }).about);
  const expertise = cleanExpertise((value as { expertise?: unknown }).expertise);
  const achievements = cleanAchievements((value as { achievements?: unknown }).achievements);
  const stories = cleanStories((value as { stories?: unknown }).stories);
  const subscribe = cleanSubscribe((value as { subscribe?: unknown }).subscribe);
  const contact = cleanContact((value as { contact?: unknown }).contact);
  if (!about || !expertise || !achievements || !stories || !subscribe || !contact) return null;
  return { slides, about, expertise, achievements, stories, subscribe, contact };
}

function cleanSubscribe(value: unknown): HomeContent["subscribe"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const subtitle = text(record.subtitle, 300);
  const note = text(record.note, 200);
  const buttonLabel = text(record.buttonLabel, 40);
  const linkedinLabel = text(record.linkedinLabel, 60);
  const linkedinHref = text(record.linkedinHref, 300);
  const namePlaceholder = text(record.namePlaceholder, 80);
  const emailPlaceholder = text(record.emailPlaceholder, 80);
  if (!title || !subtitle || !note || !buttonLabel || !linkedinLabel || !namePlaceholder || !emailPlaceholder || !isSafeHref(linkedinHref)) return null;
  return { title, subtitle, note, buttonLabel, linkedinLabel, linkedinHref, namePlaceholder, emailPlaceholder };
}

function cleanContact(value: unknown): HomeContent["contact"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const headline = text(record.headline, 180);
  const intro = text(record.intro, 300);
  const orLabel = text(record.orLabel, 20);
  const prompt = text(record.prompt, 120);
  const email = text(record.email, 120);
  const namePlaceholder = text(record.namePlaceholder, 80);
  const emailPlaceholder = text(record.emailPlaceholder, 80);
  const subjectPlaceholder = text(record.subjectPlaceholder, 80);
  const messagePlaceholder = text(record.messagePlaceholder, 120);
  const buttonLabel = text(record.buttonLabel, 40);
  if (!title || !headline || !intro || !orLabel || !prompt || !namePlaceholder || !emailPlaceholder || !subjectPlaceholder || !messagePlaceholder || !buttonLabel) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { title, headline, intro, orLabel, prompt, email, namePlaceholder, emailPlaceholder, subjectPlaceholder, messagePlaceholder, buttonLabel };
}

function cleanStories(value: unknown): HomeContent["stories"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const subtitle = text(record.subtitle, 160);
  if (!title || !subtitle || !Array.isArray(record.cards)) return null;
  const cards = record.cards.slice(0, 8).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const card = item as Record<string, unknown>;
    const quote = text(card.quote, 2000);
    const name = text(card.name, 80);
    const role = text(card.role, 400);
    const photo = text(card.photo, 300);
    const logo = text(card.logo, 300);
    const logoAlt = text(card.logoAlt, 80);
    const profileUrl = text(card.profileUrl, 300);
    if (!quote || !name || !role || !logoAlt || !isSafeImage(photo) || !isSafeImage(logo)) return [];
    return [{ quote, name, role, photo, logo, logoAlt, ...(profileUrl && isSafeHref(profileUrl) ? { profileUrl } : {}) }];
  });
  if (cards.length < 1) return null;
  return { title, subtitle, cards };
}

function cleanAchievements(value: unknown): HomeContent["achievements"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const subtitle = text(record.subtitle, 160);
  if (!title || !subtitle || !Array.isArray(record.cards)) return null;
  const cards = record.cards.slice(0, 16).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const card = item as Record<string, unknown>;
    const cardTitle = text(card.title, 160);
    const description = text(card.description, 400);
    const year = text(card.year, 8);
    if (!cardTitle || !description) return [];
    return [{ year, title: cardTitle, description }];
  });
  if (cards.length === 0) return null;
  return { title, subtitle, cards };
}

function cleanExpertise(value: unknown): HomeContent["expertise"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 80);
  const subtitle = text(record.subtitle, 160);
  if (!title || !subtitle || !Array.isArray(record.cards)) return null;
  const cards = record.cards.slice(0, 4).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const card = item as Record<string, unknown>;
    const cardTitle = text(card.title, 60);
    const description = text(card.description, 400);
    if (!cardTitle || !description) return [];
    return [{ title: cardTitle, description }];
  });
  if (cards.length !== 4) return null;
  return { title, subtitle, cards };
}

function cleanAbout(value: unknown): HomeContent["about"] | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const image = text(record.image, 300);
  const alt = text(record.alt, 120);
  const name = text(record.name, 80);
  const tagline = text(record.tagline, 180);
  const role = text(record.role, 120);
  if (!isSafeImage(image) || !alt || !name || !tagline || !role) return null;
  const paragraphs = Array.isArray(record.paragraphs)
    ? record.paragraphs.map((item) => text(item, 2000)).filter(Boolean).slice(0, 4)
    : [];
  if (paragraphs.length === 0) return null;
  if (!Array.isArray(record.stats)) return null;
  const stats = record.stats.slice(0, 6).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const stat = item as Record<string, unknown>;
    const target = Number(stat.target);
    const suffix = text(stat.suffix, 8);
    const label = text(stat.label, 40);
    if (!Number.isFinite(target) || target < 0 || target > 100000 || !label) return [];
    return [{ target: Math.round(target), suffix, label }];
  });
  if (stats.length === 0) return null;
  return { image, alt, name, tagline, role, paragraphs, stats };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function cleanPost(value: unknown): Post | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = text(record.title, 160);
  const slug = slugify(text(record.slug, 80) || title);
  const status = record.status === "published" ? "published" : record.status === "draft" ? "draft" : null;
  const publishedAt = text(record.publishedAt, 10);
  if (!title || !slug || !status || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) return null;
  return {
    slug,
    title,
    excerpt: text(record.excerpt, 300),
    body: text(record.body, 12000),
    status,
    publishedAt,
  };
}

export function cleanServices(value: unknown): Service[] | null {
  if (!Array.isArray(value)) return null;
  const services: Service[] = [];
  for (const item of value.slice(0, 30)) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const title = text(record.title, 120);
    const slug = slugify(text(record.slug, 80) || title);
    if (!title || !slug) continue;
    services.push({ slug, title, summary: text(record.summary, 400) });
  }
  return services;
}

export function cleanWork(value: unknown): WorkItem[] | null {
  if (!Array.isArray(value)) return null;
  const work: WorkItem[] = [];
  for (const item of value.slice(0, 30)) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const title = text(record.title, 120);
    const slug = slugify(text(record.slug, 80) || title);
    if (!title || !slug) continue;
    work.push({
      slug,
      title,
      summary: text(record.summary, 400),
      year: text(record.year, 12),
    });
  }
  return work;
}
