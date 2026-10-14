"use client";

import { useState } from "react";
import type { HeroSlide, PageContent } from "@/lib/content";
import { Customizer } from "@/components/editor/Customizer";
import { ImageButton, MobilePhotoField, fieldClass } from "@/components/editor/ui";
import { pageGuide, pageOutlines } from "@/lib/site-pages";

export function PageEditor({ initialPage }: { initialPage: PageContent }) {
  const [page, setPage] = useState(initialPage);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    let payload = page;
    if (page.slug === "on-air/media-appearances" && page.podcast) {
      const items = page.podcast.mediaItems?.length
        ? page.podcast.mediaItems
        : [{ title: page.podcast.mediaCaption, caption: page.podcast.mediaCaption, video: page.podcast.mediaVideo }];
      payload = { ...page, podcast: { ...page.podcast, mediaItems: items } };
    }
    const response = await fetch("/api/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const saved = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(saved.error ?? "Save failed.");
      return;
    }
    setPage(saved);
    setStatus("Saved. This page is updated.");
  }

  async function uploadMobile(file: File, apply: (url: string) => void) {
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    apply(saved.url);
    setStatus("Phone photo uploaded. Press Save to publish it.");
  }

  async function uploadHero(file: File) {
    if (!page.hero) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, hero: { ...page.hero, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadRecommended(file: File) {
    if (!page.recommended) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, recommended: { ...page.recommended, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadCaselets(file: File) {
    if (!page.caselets) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, caselets: { ...page.caselets, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadArticles(file: File) {
    if (!page.articles) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, articles: { ...page.articles, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadAssets(file: File) {
    if (!page.assets) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, assets: { ...page.assets, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadNews(file: File) {
    if (!page.news) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, news: { ...page.news, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadConnect(file: File) {
    if (!page.connect) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, connect: { ...page.connect, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadNewsCard(index: number, file: File) {
    if (!page.news) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({
      ...page,
      news: {
        ...page.news,
        cards: page.news.cards.map((card, cardIndex) => (cardIndex === index ? { ...card, image: saved.url } : card)),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  function patchNewsCard(index: number, field: "alt" | "year" | "category" | "title" | "description" | "href" | "buttonLabel", value: string) {
    if (!page.news) return;
    setPage({
      ...page,
      news: {
        ...page.news,
        cards: page.news.cards.map((card, cardIndex) => (cardIndex === index ? { ...card, [field]: value } : card)),
      },
    });
  }

  function patchAssetCategory(index: number, title: string) {
    if (!page.assets) return;
    setPage({
      ...page,
      assets: {
        ...page.assets,
        categories: page.assets.categories.map((category, categoryIndex) => (categoryIndex === index ? { ...category, title } : category)),
      },
    });
  }

  function patchAssetCard(categoryIndex: number, cardIndex: number, field: "title" | "description" | "href" | "buttonLabel", value: string) {
    if (!page.assets) return;
    setPage({
      ...page,
      assets: {
        ...page.assets,
        categories: page.assets.categories.map((category, index) =>
          index === categoryIndex
            ? { ...category, cards: category.cards.map((card, current) => (current === cardIndex ? { ...card, [field]: value } : card)) }
            : category,
        ),
      },
    });
  }

  async function uploadArticleCard(index: number, file: File) {
    if (!page.articles) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({
      ...page,
      articles: {
        ...page.articles,
        cards: page.articles.cards.map((card, cardIndex) => (cardIndex === index ? { ...card, image: saved.url } : card)),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  function patchArticleFeature(index: number, field: "magazine" | "title" | "description" | "href" | "buttonLabel", value: string) {
    if (!page.articles) return;
    setPage({
      ...page,
      articles: {
        ...page.articles,
        features: page.articles.features.map((feature, featureIndex) => (featureIndex === index ? { ...feature, [field]: value } : feature)),
      },
    });
  }

  function patchResearchPaper(index: number, field: "label" | "title" | "description" | "href" | "buttonLabel", value: string) {
    if (!page.articles) return;
    setPage({
      ...page,
      articles: {
        ...page.articles,
        papers: page.articles.papers.map((paper, paperIndex) => (paperIndex === index ? { ...paper, [field]: value } : paper)),
      },
    });
  }

  function patchArticleCard(index: number, field: "title" | "description" | "alt" | "duration" | "href" | "buttonLabel", value: string) {
    if (!page.articles) return;
    setPage({
      ...page,
      articles: {
        ...page.articles,
        cards: page.articles.cards.map((card, cardIndex) => (cardIndex === index ? { ...card, [field]: value } : card)),
      },
    });
  }

  async function uploadRecoCover(index: number, file: File) {
    if (!page.recommended) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({
      ...page,
      recommended: {
        ...page.recommended,
        books: page.recommended.books.map((book, bookIndex) => (bookIndex === index ? { ...book, cover: saved.url } : book)),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadPodcast(field: "image" | "camera" | "mic" | "closeImage", file: File) {
    if (!page.podcast) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, podcast: { ...page.podcast, [field]: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadMediaItemThumb(index: number, file: File) {
    if (!page.podcast) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    const items = page.podcast.mediaItems ?? [
      {
        title: page.podcast.mediaCaption,
        caption: page.podcast.mediaCaption,
        video: page.podcast.mediaVideo,
      },
    ];
    setPage({
      ...page,
      podcast: {
        ...page.podcast,
        mediaItems: items.map((item, itemIndex) =>
          itemIndex === index ? { ...item, thumbnail: saved.url, thumbnailAlt: item.thumbnailAlt || item.title } : item,
        ),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadPodcastCover(list: "featuring" | "recommended" | "gossip", index: number, file: File) {
    if (!page.podcast) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    const episodes = list === "gossip" ? page.podcast.gossip ?? [] : page.podcast[list];
    setPage({
      ...page,
      podcast: {
        ...page.podcast,
        [list]: episodes.map((episode, episodeIndex) => (episodeIndex === index ? { ...episode, image: saved.url } : episode)),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadLogo(index: number, file: File) {
    if (!page.hero) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({
      ...page,
      hero: {
        ...page.hero,
        education: page.hero.education.map((item, itemIndex) =>
          itemIndex === index ? { ...item, logo: saved.url } : item,
        ),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadJobLogo(index: number, file: File) {
    if (!page.hero) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({
      ...page,
      hero: {
        ...page.hero,
        experience: page.hero.experience.map((item, itemIndex) =>
          itemIndex === index ? { ...item, logo: saved.url } : item,
        ),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadEngagement(file: File) {
    if (!page.engagement) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, engagement: { ...page.engagement, image: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadGallery(index: number, file: File) {
    if (!page.engagement) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({
      ...page,
      engagement: {
        ...page.engagement,
        gallery: page.engagement.gallery.map((item, itemIndex) =>
          itemIndex === index ? { ...item, image: saved.url } : item,
        ),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadSplit(file: File) {
    if (!page.engagement) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, engagement: { ...page.engagement, splitImage: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadBookImage(field: "logo" | "cover" | "authorPhoto", file: File) {
    if (!page.book) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({ ...page, book: { ...page.book, [field]: saved.url } });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  function setBookSlides(slides: HeroSlide[]) {
    if (!page.book) return;
    setPage({ ...page, book: { ...page.book, slides } });
  }

  function moveBookSlides(slides: HeroSlide[], index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return slides;
    const next = [...slides];
    const [item] = next.splice(index, 1);
    if (!item) return slides;
    next.splice(target, 0, item);
    return next;
  }

  async function uploadBookSlide(index: number, file: File) {
    if (!page.book) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    const slides = page.book.slides ?? [];
    setBookSlides(slides.map((slide, slideIndex) => (slideIndex === index ? { ...slide, image: saved.url } : slide)));
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadChapter(index: number, file: File) {
    if (!page.book) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setPage({
      ...page,
      book: {
        ...page.book,
        chapters: page.book.chapters.map((chapter, chapterIndex) =>
          chapterIndex === index ? { ...chapter, image: saved.url } : chapter,
        ),
      },
    });
    setStatus("Image uploaded. Press Save to publish it.");
  }

  async function uploadVoiceImage(target: "featured" | number, field: "photo" | "logo", file: File) {
    if (!page.book) return;
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    if (target === "featured") {
      setPage({ ...page, book: { ...page.book, featured: { ...page.book.featured, [field]: saved.url } } });
    } else {
      setPage({
        ...page,
        book: {
          ...page.book,
          voices: page.book.voices.map((voice, voiceIndex) => (voiceIndex === target ? { ...voice, [field]: saved.url } : voice)),
        },
      });
    }
    setStatus("Image uploaded. Press Save to publish it.");
  }

  function updateCategoryTitle(index: number, title: string) {
    if (!page.engagement) return;
    setPage({
      ...page,
      engagement: {
        ...page.engagement,
        projectCategories: page.engagement.projectCategories.map((category, categoryIndex) =>
          categoryIndex === index ? { ...category, title } : category,
        ),
      },
    });
  }

  function updateProject(categoryIndex: number, itemIndex: number, field: "company" | "type", value: string) {
    if (!page.engagement) return;
    setPage({
      ...page,
      engagement: {
        ...page.engagement,
        projectCategories: page.engagement.projectCategories.map((category, index) =>
          index === categoryIndex
            ? {
                ...category,
                items: category.items.map((item, rowIndex) => (rowIndex === itemIndex ? { ...item, [field]: value } : item)),
              }
            : category,
        ),
      },
    });
  }

  function patchEpisode(list: "featuring" | "recommended" | "gossip", index: number, field: "title" | "description" | "alt" | "duration" | "href", value: string) {
    if (!page.podcast) return;
    const episodes = list === "gossip" ? page.podcast.gossip ?? [] : page.podcast[list];
    setPage({
      ...page,
      podcast: {
        ...page.podcast,
        [list]: episodes.map((episode, episodeIndex) => (episodeIndex === index ? { ...episode, [field]: value } : episode)),
      },
    });
  }

  function patchCaselet(index: number, field: "tag" | "title" | "description" | "outcome" | "href" | "buttonLabel", value: string) {
    if (!page.caselets) return;
    setPage({
      ...page,
      caselets: {
        ...page.caselets,
        cards: page.caselets.cards.map((card, cardIndex) => (cardIndex === index ? { ...card, [field]: value } : card)),
      },
    });
  }

  const hidesPageCopy = page.slug === "about" || page.slug === "engagements" || page.slug === "books/from-fomo-to-jomo" || page.slug === "books/recommended" || page.slug === "on-air/podcasts" || page.slug === "on-air/media-appearances" || page.slug === "resources/practice-caselets" || page.slug === "resources/articles-research-papers" || page.slug === "resources/assets" || page.slug === "resources/in-the-news" || page.slug === "connect";
  const extraId = hidesPageCopy ? "page-settings" : "page-copy";
  const sections = [
    ...(pageOutlines[page.slug] ?? []).map((item) => ({ id: item.href.slice(1), label: item.label })),
    { id: extraId, label: hidesPageCopy ? "Page name" : "Page text" },
  ];
  const [open, setOpen] = useState<string | null>(sections.length === 1 ? sections[0].id : null);

  return (
    <Customizer
      backHref="/pages"
      title={pageGuide(page.slug)?.name ?? page.title}
      sections={sections}
      open={open}
      onOpen={setOpen}
      previewPath={`/${page.slug}`}
      status={status}
      saving={saving}
      onSubmit={save}
    >
      {page.slug === "resources/practice-caselets" && page.caselets ? (
        <section id="caselets-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="caselets-hero">
          <div>
            <h2 className="text-lg font-semibold">Practice Caselets hero</h2>
            <p className="mt-1 text-sm text-muted">The red-orange banner at the top of Practice Caselets. Press Enter in the heading for a new line. The document photo and rings are on the right.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <textarea className={fieldClass} rows={2} value={page.caselets.title} onChange={(event) => setPage({ ...page, caselets: { ...page.caselets!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.caselets.description} onChange={(event) => setPage({ ...page, caselets: { ...page.caselets!, description: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.caselets.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change document photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadCaselets(file)} />
          </div>
          <MobilePhotoField src={page.caselets.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, caselets: { ...page.caselets!, mobileImage: url } }))} />
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.caselets.alt} onChange={(event) => setPage({ ...page, caselets: { ...page.caselets!, alt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/practice-caselets" && page.caselets ? (
        <section id="caselets-cards" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="caselets-cards">
          <div>
            <h2 className="text-lg font-semibold">Caselet cards</h2>
            <p className="mt-1 text-sm text-muted">Under the banner. Three cards on desktop, two on tablet, one on phone. Six cards per page. Read Article opens the PDF in a new tab.</p>
          </div>
          {page.caselets.cards.map((card, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Card {index + 1} — {card.title || "empty"}</p>
                {page.caselets!.cards.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, caselets: { ...page.caselets!, cards: page.caselets!.cards.filter((_, cardIndex) => cardIndex !== index) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">Tag<input className={fieldClass} value={card.tag} onChange={(event) => patchCaselet(index, "tag", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={card.title} onChange={(event) => patchCaselet(index, "title", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Problem<textarea className={fieldClass} rows={3} value={card.description} onChange={(event) => patchCaselet(index, "description", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Outcome text<textarea className={fieldClass} rows={3} value={card.outcome} onChange={(event) => patchCaselet(index, "outcome", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Button text<input className={fieldClass} value={card.buttonLabel} onChange={(event) => patchCaselet(index, "buttonLabel", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Button link<span className="text-xs font-normal text-muted">PDF or article link. Visitors enter name and email before it opens; saved under Messages.</span><input className={fieldClass} placeholder="https://" value={card.href} onChange={(event) => patchCaselet(index, "href", event.target.value)} /></label>
            </div>
          ))}
          {page.caselets.cards.length < 24 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, caselets: { ...page.caselets!, cards: [...page.caselets!.cards, { tag: "Industry", title: "New caselet", description: "What the team was facing.", outcome: "What changed after the work.", href: "https://sjartistry.in", buttonLabel: "Read Article" }] } })}>Add caselet</button>
          ) : null}
          <label className="grid gap-2 text-sm">
            Heading below
            <input className={fieldClass} value={page.caselets.ctaTitle} onChange={(event) => setPage({ ...page, caselets: { ...page.caselets!, ctaTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under that
            <input className={fieldClass} value={page.caselets.ctaSubtitle} onChange={(event) => setPage({ ...page, caselets: { ...page.caselets!, ctaSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.caselets.ctaLabel} onChange={(event) => setPage({ ...page, caselets: { ...page.caselets!, ctaLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link
            <input className={fieldClass} value={page.caselets.ctaHref} onChange={(event) => setPage({ ...page, caselets: { ...page.caselets!, ctaHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/articles-research-papers" && page.articles ? (
        <section id="articles-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="articles-hero">
          <div>
            <h2 className="text-lg font-semibold">Articles & Research Papers hero</h2>
            <p className="mt-1 text-sm text-muted">The teal-and-gold banner at the top of Article & Research Papers. Press Enter in the heading for a new line.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <textarea className={fieldClass} rows={2} value={page.articles.title} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={4} value={page.articles.description} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, description: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.articles.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change icon" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadArticles(file)} />
          </div>
          <MobilePhotoField src={page.articles.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, articles: { ...page.articles!, mobileImage: url } }))} />
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.articles.alt} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, alt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/articles-research-papers" && page.articles ? (
        <section id="articles-newsletter" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="articles-newsletter">
          <div>
            <h2 className="text-lg font-semibold">LinkedIn newsletter</h2>
            <p className="mt-1 text-sm text-muted">The band under the banner. The button can open any link.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <input className={fieldClass} value={page.articles.newsletterTitle ?? ""} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, newsletterTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.articles.newsletterText ?? ""} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, newsletterText: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.articles.newsletterLabel ?? ""} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, newsletterLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link
            <input className={fieldClass} placeholder="https://" value={page.articles.newsletterHref ?? ""} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, newsletterHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/articles-research-papers" && page.articles ? (
        <section id="articles-list" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="articles-list">
          <div>
            <h2 className="text-lg font-semibold">Published Articles</h2>
            <p className="mt-1 text-sm text-muted">Under the banner. Two magazine PDFs on top, then the cards. Nine cards per page. Three on desktop, two on tablet, one on phone. Links open in a new tab.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.articles.listTitle} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, listTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading — press Enter for a new line
            <textarea className={fieldClass} rows={3} value={page.articles.listSubtitle} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, listSubtitle: event.target.value } })} />
          </label>
          {page.articles.features.map((feature, index) => (
            <div key={`feature-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Featured PDF {index + 1}</p>
                {page.articles!.features.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, articles: { ...page.articles!, features: page.articles!.features.filter((_, featureIndex) => featureIndex !== index) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">Magazine<input className={fieldClass} value={feature.magazine} onChange={(event) => patchArticleFeature(index, "magazine", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={feature.title} onChange={(event) => patchArticleFeature(index, "title", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Description<textarea className={fieldClass} rows={3} value={feature.description} onChange={(event) => patchArticleFeature(index, "description", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Key highlights — one point per line<textarea className={fieldClass} rows={4} value={feature.highlights.join("\n")} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, features: page.articles!.features.map((item, featureIndex) => featureIndex === index ? { ...item, highlights: event.target.value.split("\n") } : item) } })} /></label>
              <label className="grid gap-2 text-sm">Button text<input className={fieldClass} value={feature.buttonLabel} onChange={(event) => patchArticleFeature(index, "buttonLabel", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Button link<span className="text-xs font-normal text-muted">PDF link. Visitors enter name and email before download; saved under Messages.</span><input className={fieldClass} placeholder="https://" value={feature.href} onChange={(event) => patchArticleFeature(index, "href", event.target.value)} /></label>
            </div>
          ))}
          {page.articles.features.length < 6 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, articles: { ...page.articles!, features: [...page.articles!.features, { magazine: "Business Manager Magazine", title: "New cover feature", description: "What this article covers.", highlights: ["Highlight"], href: "https://thepridethaispa.com", buttonLabel: "Download PDF" }] } })}>Add featured PDF</button>
          ) : null}
          {page.articles.cards.map((card, index) => (
            <details key={`card-${index}`} className="rounded-lg border border-line p-3">
              <summary className="cursor-pointer text-sm font-semibold">Card {index + 1} — {card.title || "empty"}</summary>
              <div className="mt-3 grid gap-3">
                {page.articles!.cards.length > 1 ? (
                  <button type="button" className="justify-self-start text-sm text-red-600" onClick={() => setPage({ ...page, articles: { ...page.articles!, cards: page.articles!.cards.filter((_, cardIndex) => cardIndex !== index) } })}>Remove</button>
                ) : null}
                <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={card.title} onChange={(event) => patchArticleCard(index, "title", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Short line<textarea className={fieldClass} rows={2} value={card.description} onChange={(event) => patchArticleCard(index, "description", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Reading time — for example 5 min<input className={fieldClass} value={card.duration} onChange={(event) => patchArticleCard(index, "duration", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Button text<input className={fieldClass} value={card.buttonLabel} onChange={(event) => patchArticleCard(index, "buttonLabel", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Article link<input className={fieldClass} value={card.href} onChange={(event) => patchArticleCard(index, "href", event.target.value)} /></label>
                <div className="flex flex-wrap items-end gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt="" className="h-20 w-32 rounded-lg bg-slate-50 object-cover" />
                  <ImageButton label="Change thumbnail" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadArticleCard(index, file)} />
                </div>
                <label className="grid gap-2 text-sm">Photo name<input className={fieldClass} value={card.alt} onChange={(event) => patchArticleCard(index, "alt", event.target.value)} /></label>
              </div>
            </details>
          ))}
          {page.articles.cards.length < 60 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, articles: { ...page.articles!, cards: [...page.articles!.cards, { title: "New article", description: "Short line about the article.", image: page.articles!.image, alt: "Thumbnail", duration: "3 min", href: "https://www.linkedin.com/", buttonLabel: "Read Article" }] } })}>Add article</button>
          ) : null}
        </section>
      ) : null}
      {page.slug === "resources/articles-research-papers" && page.articles ? (
        <section id="articles-research" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="articles-research">
          <div>
            <h2 className="text-lg font-semibold">Research Papers & Case Studies</h2>
            <p className="mt-1 text-sm text-muted">Under Published Articles. The research paper is teal and the case study is orange. The PDF opens in a new tab.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.articles.researchTitle} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, researchTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.articles.researchSubtitle} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, researchSubtitle: event.target.value } })} />
          </label>
          {page.articles.papers.map((paper, index) => (
            <div key={`paper-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Item {index + 1} — {paper.title || "empty"}</p>
                {page.articles!.papers.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, articles: { ...page.articles!, papers: page.articles!.papers.filter((_, paperIndex) => paperIndex !== index) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">
                Type
                <select className={fieldClass} value={paper.tone} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, papers: page.articles!.papers.map((item, paperIndex) => paperIndex === index ? { ...item, tone: event.target.value === "orange" ? "orange" : "teal" } : item) } })}>
                  <option value="teal">Research paper — teal</option>
                  <option value="orange">Case study — orange</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">Label<input className={fieldClass} value={paper.label} onChange={(event) => patchResearchPaper(index, "label", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={paper.title} onChange={(event) => patchResearchPaper(index, "title", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Description<textarea className={fieldClass} rows={3} value={paper.description} onChange={(event) => patchResearchPaper(index, "description", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Key highlights — one point per line<textarea className={fieldClass} rows={4} value={paper.highlights.join("\n")} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, papers: page.articles!.papers.map((item, paperIndex) => paperIndex === index ? { ...item, highlights: event.target.value.split("\n") } : item) } })} /></label>
              <label className="grid gap-2 text-sm">Button text<input className={fieldClass} value={paper.buttonLabel} onChange={(event) => patchResearchPaper(index, "buttonLabel", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Button link<span className="text-xs font-normal text-muted">PDF link. Visitors enter name and email before download; saved under Messages.</span><input className={fieldClass} placeholder="https://" value={paper.href} onChange={(event) => patchResearchPaper(index, "href", event.target.value)} /></label>
            </div>
          ))}
          {page.articles.papers.length < 12 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, articles: { ...page.articles!, papers: [...page.articles!.papers, { tone: "teal", label: "Research Paper", title: "New paper", description: "What this paper covers.", highlights: ["Highlight"], href: "https://sjartistry.in", buttonLabel: "Download PDF" }] } })}>Add paper</button>
          ) : null}
          <label className="grid gap-2 text-sm">
            Heading below
            <input className={fieldClass} value={page.articles.closeTitle} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, closeTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under that
            <input className={fieldClass} value={page.articles.closeSubtitle} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, closeSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.articles.closeLabel} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, closeLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link. Use /connect to open the Connect page.
            <input className={fieldClass} value={page.articles.closeHref} onChange={(event) => setPage({ ...page, articles: { ...page.articles!, closeHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/assets" && page.assets ? (
        <section id="assets-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="assets-hero">
          <div>
            <h2 className="text-lg font-semibold">Assets hero</h2>
            <p className="mt-1 text-sm text-muted">The teal-and-orange banner at the top of Assets. Press Enter in the heading for a new line.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <textarea className={fieldClass} rows={2} value={page.assets.title} onChange={(event) => setPage({ ...page, assets: { ...page.assets!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.assets.description} onChange={(event) => setPage({ ...page, assets: { ...page.assets!, description: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.assets.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change box icon" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadAssets(file)} />
          </div>
          <MobilePhotoField src={page.assets.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, assets: { ...page.assets!, mobileImage: url } }))} />
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.assets.alt} onChange={(event) => setPage({ ...page, assets: { ...page.assets!, alt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/assets" && page.assets ? (
        <section id="assets-lists" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="assets-lists">
          <div>
            <h2 className="text-lg font-semibold">Asset lists</h2>
            <p className="mt-1 text-sm text-muted">
              Under the banner, on a mint background. Four cards per category on desktop, two on tablet, one on phone. Download and Read buttons ask for name and email first; those details appear under Messages.
            </p>
          </div>
          {page.assets.categories.map((category, categoryIndex) => (
            <div key={`asset-cat-${categoryIndex}`} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Category {categoryIndex + 1}</p>
                {page.assets!.categories.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, assets: { ...page.assets!, categories: page.assets!.categories.filter((_, index) => index !== categoryIndex) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">Category heading<input className={fieldClass} value={category.title} onChange={(event) => patchAssetCategory(categoryIndex, event.target.value)} /></label>
              {category.cards.map((card, cardIndex) => (
                <div key={`asset-card-${categoryIndex}-${cardIndex}`} className="grid gap-2 rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">Card {cardIndex + 1}</p>
                    {category.cards.length > 1 ? (
                      <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, assets: { ...page.assets!, categories: page.assets!.categories.map((item, index) => index === categoryIndex ? { ...item, cards: item.cards.filter((_, current) => current !== cardIndex) } : item) } })}>Remove</button>
                    ) : null}
                  </div>
                  <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={card.title} onChange={(event) => patchAssetCard(categoryIndex, cardIndex, "title", event.target.value)} /></label>
                  <label className="grid gap-2 text-sm">Short line<textarea className={fieldClass} rows={2} value={card.description} onChange={(event) => patchAssetCard(categoryIndex, cardIndex, "description", event.target.value)} /></label>
                  <label className="grid gap-2 text-sm">Button text<input className={fieldClass} value={card.buttonLabel} onChange={(event) => patchAssetCard(categoryIndex, cardIndex, "buttonLabel", event.target.value)} /></label>
                  <label className="grid gap-2 text-sm">Button link<span className="text-xs font-normal text-muted">PDF or page link. Visitors enter name and email before the file opens; saved under Messages.</span><input className={fieldClass} placeholder="https://" value={card.href} onChange={(event) => patchAssetCard(categoryIndex, cardIndex, "href", event.target.value)} /></label>
                </div>
              ))}
              {category.cards.length < 16 ? (
                <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, assets: { ...page.assets!, categories: page.assets!.categories.map((item, index) => index === categoryIndex ? { ...item, cards: [...item.cards, { title: "New asset", description: "What this file is for.", href: "#", buttonLabel: "Download PDF" }] } : item) } })}>Add card</button>
              ) : null}
            </div>
          ))}
          {page.assets.categories.length < 6 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, assets: { ...page.assets!, categories: [...page.assets!.categories, { title: "New category", cards: [{ title: "New asset", description: "What this file is for.", href: "#", buttonLabel: "Download PDF" }] }] } })}>Add category</button>
          ) : null}
          <label className="grid gap-2 text-sm">
            Heading below
            <input className={fieldClass} value={page.assets.closeTitle} onChange={(event) => setPage({ ...page, assets: { ...page.assets!, closeTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under that
            <input className={fieldClass} value={page.assets.closeSubtitle} onChange={(event) => setPage({ ...page, assets: { ...page.assets!, closeSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.assets.closeLabel} onChange={(event) => setPage({ ...page, assets: { ...page.assets!, closeLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link. Use /connect to open the Connect page.
            <input className={fieldClass} value={page.assets.closeHref} onChange={(event) => setPage({ ...page, assets: { ...page.assets!, closeHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/in-the-news" && page.news ? (
        <section id="news-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="news-hero">
          <div>
            <h2 className="text-lg font-semibold">In the News hero</h2>
            <p className="mt-1 text-sm text-muted">The red-and-orange banner at the top of In The News. Press Enter in the heading for a new line.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <textarea className={fieldClass} rows={2} value={page.news.title} onChange={(event) => setPage({ ...page, news: { ...page.news!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.news.description} onChange={(event) => setPage({ ...page, news: { ...page.news!, description: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.news.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change news icon" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadNews(file)} />
          </div>
          <MobilePhotoField src={page.news.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, news: { ...page.news!, mobileImage: url } }))} />
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.news.alt} onChange={(event) => setPage({ ...page, news: { ...page.news!, alt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "resources/in-the-news" && page.news ? (
        <section id="news-cards" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="news-cards">
          <div>
            <h2 className="text-lg font-semibold">News cards</h2>
            <p className="mt-1 text-sm text-muted">Under the banner. Three cards on desktop, two on tablet, one on phone. Nine cards per page. Read Article opens in a new tab.</p>
          </div>
          {page.news.cards.map((card, index) => (
            <details key={`news-card-${index}`} className="rounded-lg border border-line p-3">
              <summary className="cursor-pointer text-sm font-semibold">Card {index + 1} — {card.title || "empty"}</summary>
              <div className="mt-3 grid gap-3">
                {page.news!.cards.length > 1 ? (
                  <button type="button" className="justify-self-start text-sm text-red-600" onClick={() => setPage({ ...page, news: { ...page.news!, cards: page.news!.cards.filter((_, cardIndex) => cardIndex !== index) } })}>Remove</button>
                ) : null}
                <label className="grid gap-2 text-sm">Year<input className={fieldClass} value={card.year} onChange={(event) => patchNewsCard(index, "year", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Publication<input className={fieldClass} value={card.category} onChange={(event) => patchNewsCard(index, "category", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={card.title} onChange={(event) => patchNewsCard(index, "title", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Short line<textarea className={fieldClass} rows={2} value={card.description} onChange={(event) => patchNewsCard(index, "description", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Button text<input className={fieldClass} value={card.buttonLabel} onChange={(event) => patchNewsCard(index, "buttonLabel", event.target.value)} /></label>
                <label className="grid gap-2 text-sm">Article link<input className={fieldClass} value={card.href} onChange={(event) => patchNewsCard(index, "href", event.target.value)} /></label>
                <div className="flex flex-wrap items-end gap-4">
                  {card.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={card.image} alt="" className="h-20 w-32 rounded-lg bg-slate-100 object-cover" />
                  ) : (
                    <div className="h-20 w-32 rounded-lg bg-slate-200" />
                  )}
                  <ImageButton label="Change thumbnail" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadNewsCard(index, file)} />
                </div>
                <label className="grid gap-2 text-sm">Photo name<input className={fieldClass} value={card.alt} onChange={(event) => patchNewsCard(index, "alt", event.target.value)} /></label>
              </div>
            </details>
          ))}
          {page.news.cards.length < 36 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, news: { ...page.news!, cards: [...page.news!.cards, { image: "", alt: "News Image", year: "2026", category: "Publication", title: "New story", description: "Short line about the coverage.", href: "https://example.com", buttonLabel: "Read Article" }] } })}>Add story</button>
          ) : null}
        </section>
      ) : null}
      {page.slug === "connect" && page.connect ? (
        <section id="connect-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="connect-hero">
          <div>
            <h2 className="text-lg font-semibold">Let's talk hero</h2>
            <p className="mt-1 text-sm text-muted">The pink-and-orange banner on the Connect page. Press Enter in the heading for a new line.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <textarea className={fieldClass} rows={2} value={page.connect.title} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.connect.description} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, description: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.connect.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadConnect(file)} />
          </div>
          <MobilePhotoField src={page.connect.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, connect: { ...page.connect!, mobileImage: url } }))} />
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.connect.alt} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, alt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "connect" && page.connect ? (
        <section id="connect-form" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="connect-form">
          <div>
            <h2 className="text-lg font-semibold">Contact form</h2>
            <p className="mt-1 text-sm text-muted">Under the banner. The email button and the form. Messages are saved under Messages, including the agenda and subject.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading — press Enter for a new line
            <textarea className={fieldClass} rows={2} value={page.connect.contactTitle} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, contactTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Email
            <input className={fieldClass} value={page.connect.email} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, email: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">Name placeholder<input className={fieldClass} value={page.connect.namePlaceholder} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, namePlaceholder: event.target.value } })} /></label>
          <label className="grid gap-2 text-sm">Email placeholder<input className={fieldClass} value={page.connect.emailPlaceholder} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, emailPlaceholder: event.target.value } })} /></label>
          <label className="grid gap-2 text-sm">First line of the agenda menu<input className={fieldClass} value={page.connect.agendaPlaceholder} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, agendaPlaceholder: event.target.value } })} /></label>
          <label className="grid gap-2 text-sm">
            Agenda options — one per line
            <textarea className={fieldClass} rows={6} value={page.connect.agendas.join("\n")} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, agendas: event.target.value.split("\n") } })} />
          </label>
          <label className="grid gap-2 text-sm">Subject placeholder<input className={fieldClass} value={page.connect.subjectPlaceholder} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, subjectPlaceholder: event.target.value } })} /></label>
          <label className="grid gap-2 text-sm">Message placeholder<input className={fieldClass} value={page.connect.messagePlaceholder} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, messagePlaceholder: event.target.value } })} /></label>
          <label className="grid gap-2 text-sm">Form button text<input className={fieldClass} value={page.connect.buttonLabel} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, buttonLabel: event.target.value } })} /></label>
          <label className="grid gap-2 text-sm">
            Heading below
            <input className={fieldClass} value={page.connect.closeTitle} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, closeTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under that
            <input className={fieldClass} value={page.connect.closeSubtitle} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, closeSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.connect.closeLabel} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, closeLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link. #contact scrolls to the form on this page.
            <input className={fieldClass} value={page.connect.closeHref} onChange={(event) => setPage({ ...page, connect: { ...page.connect!, closeHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {(page.slug === "on-air/podcasts" || page.slug === "on-air/media-appearances") && page.podcast ? (
        <section id="podcasts-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="podcasts-hero">
          <div>
            <h2 className="text-lg font-semibold">{page.slug === "on-air/media-appearances" ? "Media Appearances hero" : "Podcasts hero"}</h2>
            <p className="mt-1 text-sm text-muted">
              Pink-to-gold banner (desktop, iPad, and phone). Press Enter in the heading for a new line — line breaks show on all screen sizes. Tablet keeps the side-by-side layout; phone stacks text, Let&apos;s Talk, then the centered photo with camera and mic. The circle pattern behind the person is fixed on the website; you edit the person, camera, and mic only.
            </p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading — use Enter for line breaks
            <textarea className={fieldClass} rows={3} value={page.podcast.title} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.podcast.description} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, description: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            White button text
            <input className={fieldClass} value={page.podcast.heroButtonLabel ?? "Let's Talk"} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, heroButtonLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            White button link — usually /connect
            <input className={fieldClass} value={page.podcast.heroButtonHref ?? "/connect"} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, heroButtonHref: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.podcast.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change person photo (desktop & tablet)" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadPodcast("image", file)} />
          </div>
          <MobilePhotoField
            src={page.podcast.mobileImage}
            description="Optional crop for phones only (767px wide and below). iPad and desktop use the main person photo above."
            onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, podcast: { ...page.podcast!, mobileImage: url } }))}
          />
          <label className="grid gap-2 text-sm">
            Person photo name
            <input className={fieldClass} value={page.podcast.imageAlt} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, imageAlt: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.podcast.camera} alt="" className="h-20 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change camera" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" onPick={(file) => uploadPodcast("camera", file)} />
          </div>
          <label className="grid gap-2 text-sm">
            Camera name (accessibility)
            <input className={fieldClass} value={page.podcast.cameraAlt} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, cameraAlt: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.podcast.mic} alt="" className="h-16 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change mic" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" onPick={(file) => uploadPodcast("mic", file)} />
          </div>
          <label className="grid gap-2 text-sm">
            Mic name
            <input className={fieldClass} value={page.podcast.micAlt} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, micAlt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "on-air/podcasts" && page.podcast ? (
        <section id="podcasts-upcoming" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="podcasts-upcoming">
          <div>
            <h2 className="text-lg font-semibold">The Leadership Gossip</h2>
            <p className="mt-1 text-sm text-muted">The row under the banner, above Podcasts Featuring Dr. Aman Jain. Same cards. Add a podcast here when the show is ready, then press Save. Until then, visitors only see the section name.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section name
            <input className={fieldClass} value={page.podcast.gossipTitle ?? "The Leadership Gossip"} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, gossipTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the name — optional
            <input className={fieldClass} value={page.podcast.gossipSubtitle ?? ""} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, gossipSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.podcast.gossipButton ?? "Listen Now"} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, gossipButton: event.target.value } })} />
          </label>
          {(page.podcast.gossip ?? []).map((episode, index) => (
            <div key={`gossip-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Podcast {index + 1} — {episode.title || "empty"}</p>
                <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, podcast: { ...page.podcast!, gossip: (page.podcast!.gossip ?? []).filter((_, itemIndex) => itemIndex !== index) } })}>Remove</button>
              </div>
              <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={episode.title} onChange={(event) => patchEpisode("gossip", index, "title", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Tags — separate with |<input className={fieldClass} value={episode.tags.join(" | ")} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, gossip: (page.podcast!.gossip ?? []).map((item, itemIndex) => itemIndex === index ? { ...item, tags: event.target.value.split("|").map((tag) => tag.trim()).filter(Boolean) } : item) } })} /></label>
              <label className="grid gap-2 text-sm">Short line<textarea className={fieldClass} rows={3} value={episode.description} onChange={(event) => patchEpisode("gossip", index, "description", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Duration<input className={fieldClass} value={episode.duration} onChange={(event) => patchEpisode("gossip", index, "duration", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Listen Now link<input className={fieldClass} value={episode.href} onChange={(event) => patchEpisode("gossip", index, "href", event.target.value)} /></label>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={episode.image} alt="" className="h-20 w-auto rounded-lg bg-slate-50 object-contain" />
                <ImageButton label={`Change podcast ${index + 1} cover`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadPodcastCover("gossip", index, file)} />
              </div>
              <label className="grid gap-2 text-sm">Cover name<input className={fieldClass} value={episode.alt} onChange={(event) => patchEpisode("gossip", index, "alt", event.target.value)} /></label>
            </div>
          ))}
          {(page.podcast.gossip ?? []).length < 12 ? (
            <button
              type="button"
              className="justify-self-start rounded-lg bg-[#6d5ce7] px-4 py-2 text-sm font-semibold text-white"
              onClick={() =>
                setPage({
                  ...page,
                  podcast: {
                    ...page.podcast!,
                    gossipTitle: page.podcast!.gossipTitle || "The Leadership Gossip",
                    gossipButton: page.podcast!.gossipButton || "Listen Now",
                    gossip: [
                      ...(page.podcast!.gossip ?? []),
                      {
                        title: "New podcast",
                        description: "Short line about this podcast.",
                        image: page.podcast!.featuring[0]?.image ?? page.podcast!.image,
                        alt: "New podcast",
                        duration: "30 min",
                        href: "https://www.youtube.com",
                        tags: ["Topic"],
                      },
                    ],
                  },
                })
              }
            >
              Add podcast
            </button>
          ) : null}
        </section>
      ) : null}
      {page.slug === "on-air/podcasts" && page.podcast ? (
        <section id="podcasts-cards" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="podcasts-cards">
          <div>
            <h2 className="text-lg font-semibold">Podcast cards</h2>
            <p className="mt-1 text-sm text-muted">Two sliders under the banner. The first is teal, the second is purple. Separate tags with |. Listen Now opens in a new tab.</p>
          </div>
          <label className="grid gap-2 text-sm">
            First heading — the words before the purple word
            <input className={fieldClass} value={page.podcast.featuringLead} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, featuringLead: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Purple word
            <input className={fieldClass} value={page.podcast.featuringAccent} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, featuringAccent: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the first heading
            <input className={fieldClass} value={page.podcast.featuringSubtitle} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, featuringSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            First slider button
            <input className={fieldClass} value={page.podcast.featuringButton} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, featuringButton: event.target.value } })} />
          </label>
          {page.podcast.featuring.map((episode, index) => (
            <div key={`featuring-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Featuring {index + 1} — {episode.title || "empty"}</p>
                {page.podcast!.featuring.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, podcast: { ...page.podcast!, featuring: page.podcast!.featuring.filter((_, itemIndex) => itemIndex !== index) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={episode.title} onChange={(event) => patchEpisode("featuring", index, "title", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Tags — separate with |<input className={fieldClass} value={episode.tags.join(" | ")} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, featuring: page.podcast!.featuring.map((item, itemIndex) => itemIndex === index ? { ...item, tags: event.target.value.split("|").map((tag) => tag.trim()) } : item) } })} /></label>
              <label className="grid gap-2 text-sm">Short line<textarea className={fieldClass} rows={3} value={episode.description} onChange={(event) => patchEpisode("featuring", index, "description", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Duration<input className={fieldClass} value={episode.duration} onChange={(event) => patchEpisode("featuring", index, "duration", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Listen Now link<input className={fieldClass} value={episode.href} onChange={(event) => patchEpisode("featuring", index, "href", event.target.value)} /></label>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={episode.image} alt="" className="h-16 w-28 rounded object-cover" />
                <ImageButton label={`Change featuring ${index + 1} cover`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadPodcastCover("featuring", index, file)} />
              </div>
              <label className="grid gap-2 text-sm">Cover name<input className={fieldClass} value={episode.alt} onChange={(event) => patchEpisode("featuring", index, "alt", event.target.value)} /></label>
            </div>
          ))}
          {page.podcast.featuring.length < 12 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, podcast: { ...page.podcast!, featuring: [...page.podcast!.featuring, { title: "New podcast", description: "Short line about this podcast.", image: page.podcast!.featuring[0]?.image ?? page.podcast!.image, alt: "New podcast", duration: "30 min", href: "https://www.youtube.com", tags: ["Topic"] }] } })}>Add featuring podcast</button>
          ) : null}
          <label className="grid gap-2 text-sm">
            Second heading
            <input className={fieldClass} value={page.podcast.recommendedTitle} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, recommendedTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the second heading
            <input className={fieldClass} value={page.podcast.recommendedSubtitle} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, recommendedSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Second slider button
            <input className={fieldClass} value={page.podcast.recommendedButton} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, recommendedButton: event.target.value } })} />
          </label>
          {page.podcast.recommended.map((episode, index) => (
            <div key={`recommended-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Recommended {index + 1} — {episode.title || "empty"}</p>
                {page.podcast!.recommended.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, podcast: { ...page.podcast!, recommended: page.podcast!.recommended.filter((_, itemIndex) => itemIndex !== index) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">Title<input className={fieldClass} value={episode.title} onChange={(event) => patchEpisode("recommended", index, "title", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Pills — separate with |<input className={fieldClass} value={episode.tags.join(" | ")} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, recommended: page.podcast!.recommended.map((item, itemIndex) => itemIndex === index ? { ...item, tags: event.target.value.split("|").map((tag) => tag.trim()) } : item) } })} /></label>
              <label className="grid gap-2 text-sm">Short line<textarea className={fieldClass} rows={3} value={episode.description} onChange={(event) => patchEpisode("recommended", index, "description", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Duration<input className={fieldClass} value={episode.duration} onChange={(event) => patchEpisode("recommended", index, "duration", event.target.value)} /></label>
              <label className="grid gap-2 text-sm">Listen Now link<input className={fieldClass} value={episode.href} onChange={(event) => patchEpisode("recommended", index, "href", event.target.value)} /></label>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={episode.image} alt="" className="h-16 w-28 rounded object-cover" />
                <ImageButton label={`Change recommended ${index + 1} cover`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadPodcastCover("recommended", index, file)} />
              </div>
              <label className="grid gap-2 text-sm">Cover name<input className={fieldClass} value={episode.alt} onChange={(event) => patchEpisode("recommended", index, "alt", event.target.value)} /></label>
            </div>
          ))}
          {page.podcast.recommended.length < 12 ? (
            <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => setPage({ ...page, podcast: { ...page.podcast!, recommended: [...page.podcast!.recommended, { title: "New podcast", description: "Short line about this podcast.", image: page.podcast!.recommended[0]?.image ?? page.podcast!.image, alt: "New podcast", duration: "30 min", href: "https://open.spotify.com", tags: ["Topic"] }] } })}>Add recommended podcast</button>
          ) : null}
        </section>
      ) : null}
      {page.slug === "on-air/media-appearances" && page.podcast ? (
        <section id="podcasts-media" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="podcasts-media">
          <div>
            <h2 className="text-lg font-semibold">Media Appearances</h2>
            <p className="mt-1 text-sm text-muted">Videos on the Media Appearances page. Add one or more. YouTube watch or embed links work. Upload an optional cover image for each video.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.podcast.mediaTitle} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, mediaTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the section heading
            <input className={fieldClass} value={page.podcast.mediaSubtitle} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, mediaSubtitle: event.target.value } })} />
          </label>
          {(page.podcast.mediaItems ?? [
            { title: page.podcast.mediaCaption, caption: page.podcast.mediaCaption, video: page.podcast.mediaVideo },
          ]).map((item, index) => (
            <div key={`media-item-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Video {index + 1}</p>
                {(page.podcast!.mediaItems ?? []).length > 1 ? (
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() => {
                      const next = (page.podcast!.mediaItems ?? []).filter((_, itemIndex) => itemIndex !== index);
                      setPage({ ...page, podcast: { ...page.podcast!, mediaItems: next } });
                    }}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">
                Video title (shown on the page)
                <input
                  className={fieldClass}
                  value={item.title}
                  onChange={(event) => {
                    const items = [...(page.podcast!.mediaItems ?? [{ title: page.podcast!.mediaCaption, caption: page.podcast!.mediaCaption, video: page.podcast!.mediaVideo }])];
                    items[index] = { ...items[index], title: event.target.value };
                    setPage({ ...page, podcast: { ...page.podcast!, mediaItems: items } });
                  }}
                />
              </label>
              <label className="grid gap-2 text-sm">
                YouTube link
                <input
                  className={fieldClass}
                  value={item.video}
                  onChange={(event) => {
                    const items = [...(page.podcast!.mediaItems ?? [{ title: page.podcast!.mediaCaption, caption: page.podcast!.mediaCaption, video: page.podcast!.mediaVideo }])];
                    items[index] = { ...items[index], video: event.target.value };
                    setPage({ ...page, podcast: { ...page.podcast!, mediaItems: items } });
                  }}
                />
              </label>
              <label className="grid gap-2 text-sm">
                Line under the video
                <input
                  className={fieldClass}
                  value={item.caption}
                  onChange={(event) => {
                    const items = [...(page.podcast!.mediaItems ?? [{ title: page.podcast!.mediaCaption, caption: page.podcast!.mediaCaption, video: page.podcast!.mediaVideo }])];
                    items[index] = { ...items[index], caption: event.target.value };
                    setPage({ ...page, podcast: { ...page.podcast!, mediaItems: items } });
                  }}
                />
              </label>
              <div className="flex flex-wrap items-end gap-4">
                {item.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.thumbnail} alt="" className="h-20 w-32 rounded-lg object-cover" />
                ) : null}
                <ImageButton label="Upload cover image (optional)" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadMediaItemThumb(index, file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Cover image name
                <input
                  className={fieldClass}
                  value={item.thumbnailAlt ?? ""}
                  onChange={(event) => {
                    const items = [...(page.podcast!.mediaItems ?? [{ title: page.podcast!.mediaCaption, caption: page.podcast!.mediaCaption, video: page.podcast!.mediaVideo }])];
                    items[index] = { ...items[index], thumbnailAlt: event.target.value };
                    setPage({ ...page, podcast: { ...page.podcast!, mediaItems: items } });
                  }}
                />
              </label>
            </div>
          ))}
          {(page.podcast.mediaItems ?? []).length < 12 ? (
            <button
              type="button"
              className="justify-self-start rounded-lg bg-[#6d5ce7] px-4 py-2 text-sm font-semibold text-white"
              onClick={() =>
                setPage({
                  ...page,
                  podcast: {
                    ...page.podcast!,
                    mediaItems: [
                      ...(page.podcast!.mediaItems ?? [
                        { title: page.podcast!.mediaCaption, caption: page.podcast!.mediaCaption, video: page.podcast!.mediaVideo },
                      ]),
                      {
                        title: "New media appearance",
                        caption: "Short line under the video.",
                        video: "https://www.youtube.com/watch?v=OJl8bQ8j6C0",
                      },
                    ],
                  },
                })
              }
            >
              Add video
            </button>
          ) : null}
        </section>
      ) : null}
      {(page.slug === "on-air/podcasts" || page.slug === "on-air/media-appearances") && page.podcast ? (
        <section id="podcasts-close" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="podcasts-close">
          <div>
            <h2 className="text-lg font-semibold">Ready to Transform</h2>
            <p className="mt-1 text-sm text-muted">
              {page.slug === "on-air/media-appearances"
                ? "Bottom section after the media videos. Photo on the left, text on the right. Press Enter in the heading for a new line."
                : "Bottom section after the podcast card sliders. Photo on the left, text on the right. Press Enter in the heading for a new line."}{" "}
              Use /connect for the Connect page.
            </p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <textarea className={fieldClass} rows={2} value={page.podcast.closeTitle} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, closeTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={page.podcast.closeSubtitle} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, closeSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.podcast.closeLabel} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, closeLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link
            <input className={fieldClass} value={page.podcast.closeHref} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, closeHref: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.podcast.closeImage} alt="" className="h-24 w-36 rounded-lg object-cover" />
            <ImageButton label="Change group photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadPodcast("closeImage", file)} />
          </div>
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.podcast.closeAlt} onChange={(event) => setPage({ ...page, podcast: { ...page.podcast!, closeAlt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "books/recommended" && page.recommended ? (
        <section id="reco-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="reco-hero">
          <div>
            <h2 className="text-lg font-semibold">Recommended Books hero</h2>
            <p className="mt-1 text-sm text-muted">The blue, purple, and amber banner at the top of Recommended Books. Heading on the left, book photo and rings on the right.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <input className={fieldClass} value={page.recommended.title} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.recommended.description} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, description: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.recommended.image} alt="" className="h-28 w-28 rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change books photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadRecommended(file)} />
          </div>
          <MobilePhotoField src={page.recommended.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, recommended: { ...page.recommended!, mobileImage: url } }))} />
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.recommended.alt} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, alt: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "books/recommended" && page.recommended ? (
        <section id="reco-list" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="reco-list">
          <div>
            <h2 className="text-lg font-semibold">Book list</h2>
            <p className="mt-1 text-sm text-muted">Under the banner. Four books per page. The stars stay as they are. You can change the rating text. Use the photo button for the cover.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.recommended.listTitle} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, listTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={page.recommended.listSubtitle} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, listSubtitle: event.target.value } })} />
          </label>
          {page.recommended.books.map((book, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Book {index + 1} — {book.title || "empty"}</p>
                {page.recommended!.books.length > 1 ? (
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() =>
                      setPage({
                        ...page,
                        recommended: { ...page.recommended!, books: page.recommended!.books.filter((_, bookIndex) => bookIndex !== index) },
                      })
                    }
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">
                Title
                <input
                  className={fieldClass}
                  value={book.title}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      recommended: {
                        ...page.recommended!,
                        books: page.recommended!.books.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Author
                <input
                  className={fieldClass}
                  value={book.author}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      recommended: {
                        ...page.recommended!,
                        books: page.recommended!.books.map((item, itemIndex) => (itemIndex === index ? { ...item, author: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  Year
                  <input
                    className={fieldClass}
                    value={book.year}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        recommended: {
                          ...page.recommended!,
                          books: page.recommended!.books.map((item, itemIndex) => (itemIndex === index ? { ...item, year: event.target.value } : item)),
                        },
                      })
                    }
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  Publisher
                  <input
                    className={fieldClass}
                    value={book.publisher}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        recommended: {
                          ...page.recommended!,
                          books: page.recommended!.books.map((item, itemIndex) => (itemIndex === index ? { ...item, publisher: event.target.value } : item)),
                        },
                      })
                    }
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm">
                Rating text — for example 4.6 (2234 reviews)
                <input
                  className={fieldClass}
                  value={book.rating}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      recommended: {
                        ...page.recommended!,
                        books: page.recommended!.books.map((item, itemIndex) => (itemIndex === index ? { ...item, rating: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                About the Book
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={book.about}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      recommended: {
                        ...page.recommended!,
                        books: page.recommended!.books.map((item, itemIndex) => (itemIndex === index ? { ...item, about: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              {book.highlights.map((point, pointIndex) => (
                <label key={pointIndex} className="grid gap-2 text-sm">
                  Highlight {pointIndex + 1}
                  <input
                    className={fieldClass}
                    value={point}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        recommended: {
                          ...page.recommended!,
                          books: page.recommended!.books.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, highlights: item.highlights.map((line, lineIndex) => (lineIndex === pointIndex ? event.target.value : line)) }
                              : item,
                          ),
                        },
                      })
                    }
                  />
                </label>
              ))}
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={book.cover} alt="" className="h-24 w-16 rounded object-cover" />
                <ImageButton label={`Change book ${index + 1} cover`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadRecoCover(index, file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Cover name
                <input
                  className={fieldClass}
                  value={book.alt}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      recommended: {
                        ...page.recommended!,
                        books: page.recommended!.books.map((item, itemIndex) => (itemIndex === index ? { ...item, alt: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
          {page.recommended.books.length < 24 ? (
            <button
              type="button"
              className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
              onClick={() =>
                setPage({
                  ...page,
                  recommended: {
                    ...page.recommended!,
                    books: [
                      ...page.recommended!.books,
                      {
                        title: "New book",
                        cover: page.recommended!.books[0]?.cover ?? page.recommended!.image,
                        alt: "New book",
                        rating: "4.5 (0 reviews)",
                        author: "Author",
                        year: "2026",
                        publisher: "Publisher",
                        about: "About this book.",
                        highlights: ["Highlight one", "Highlight two", "Highlight three", "Highlight four"],
                      },
                    ],
                  },
                })
              }
            >
              Add book
            </button>
          ) : null}
        </section>
      ) : null}
      {page.slug === "books/recommended" && page.recommended ? (
        <section id="reco-close" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="reco-close">
          <div>
            <h2 className="text-lg font-semibold">Ready to Transform</h2>
            <p className="mt-1 text-sm text-muted">Under the book list. A pale yellow fade and a purple-to-teal button. Use /connect to open the Connect page.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <input className={fieldClass} value={page.recommended.ctaTitle} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, ctaTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under that
            <input className={fieldClass} value={page.recommended.ctaSubtitle} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, ctaSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.recommended.ctaLabel} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, ctaLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link
            <input className={fieldClass} value={page.recommended.ctaHref} onChange={(event) => setPage({ ...page, recommended: { ...page.recommended!, ctaHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "about" && page.hero ? (
        <section id="about-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="about-hero">
          <div>
            <h2 className="text-lg font-semibold">About page hero</h2>
            <p className="mt-1 text-sm text-muted">The purple-to-teal banner at the top of About. Large name, the line under it, the photo, and the white card heading.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Large white name
            <input className={fieldClass} value={page.hero.title} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the name
            <textarea className={fieldClass} rows={3} value={page.hero.description} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, description: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            White card heading
            <input className={fieldClass} value={page.hero.cardTitle} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, cardTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.hero.alt} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, alt: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.hero.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change hero photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={uploadHero} />
          </div>
          <MobilePhotoField src={page.hero.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, hero: { ...page.hero!, mobileImage: url } }))} />
        </section>
      ) : null}
      {page.slug === "about" && page.hero
        ? page.hero.blocks.map((block, index) => (
            <section data-panel="about-bio" key={`about-bio-${index}`} className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5">
              <div>
                <h2 className="text-lg font-semibold">Biography {index + 1} — {block.title}</h2>
                <p className="mt-1 text-sm text-muted">The white card under the banner. Wrap words in **double asterisks** to make them bold.</p>
              </div>
              <label className="grid gap-2 text-sm">
                Heading
                <input
                  className={fieldClass}
                  value={block.title}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        blocks: page.hero!.blocks.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              {block.paragraphs.map((paragraph, paragraphIndex) => (
                <label key={paragraphIndex} className="grid gap-2 text-sm">
                  Paragraph {paragraphIndex + 1}
                  <textarea
                    className={fieldClass}
                    rows={3}
                    value={paragraph}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        hero: {
                          ...page.hero!,
                          blocks: page.hero!.blocks.map((item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  paragraphs: item.paragraphs.map((line, lineIndex) =>
                                    lineIndex === paragraphIndex ? event.target.value : line,
                                  ),
                                }
                              : item,
                          ),
                        },
                      })
                    }
                  />
                </label>
              ))}
            </section>
          ))
        : null}
      {page.slug === "about" && page.hero ? (
        <section id="about-education" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="about-education">
          <div>
            <h2 className="text-lg font-semibold">Education</h2>
            <p className="mt-1 text-sm text-muted">The four circles under the biography. Press Enter in the degree or college for a new line. Use the photo button to change a logo.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input
              className={fieldClass}
              value={page.hero.educationTitle}
              onChange={(event) => setPage({ ...page, hero: { ...page.hero!, educationTitle: event.target.value } })}
            />
          </label>
          {page.hero.education.map((item, index) => (
            <div key={`edu-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <p className="text-sm font-semibold">College {index + 1} — {item.alt}</p>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.logo} alt="" className="h-14 w-14 rounded-full bg-slate-50 object-contain" />
                <ImageButton label="Change college logo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadLogo(index, file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Degree
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={item.degree}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        education: page.hero!.education.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, degree: event.target.value } : entry,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                College
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={item.institution}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        education: page.hero!.education.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, institution: event.target.value } : entry,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Year
                <input
                  className={fieldClass}
                  value={item.year}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        education: page.hero!.education.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, year: event.target.value } : entry,
                        ),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
        </section>
      ) : null}
      {page.slug === "about" && page.hero ? (
        <section id="about-experience" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="about-experience">
          <div>
            <h2 className="text-lg font-semibold">Professional Experience</h2>
            <p className="mt-1 text-sm text-muted">The timeline under Education. The first job sits above the line, the second below it, then they alternate. Use the photo button to change a logo.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.hero.experienceTitle} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, experienceTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={page.hero.experienceSubtitle} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, experienceSubtitle: event.target.value } })} />
          </label>
          {page.hero.experience.map((job, index) => (
            <div key={`job-${index}`} className="grid gap-3 rounded-lg border border-line p-3">
              <p className="text-sm font-semibold">Job {index + 1} — {job.alt} {index % 2 === 0 ? "(above the line)" : "(below the line)"}</p>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={job.logo} alt="" className="h-14 w-14 rounded-full bg-slate-50 object-contain" />
                <ImageButton label="Change company logo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadJobLogo(index, file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Dates
                <input
                  className={fieldClass}
                  value={job.dates}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        experience: page.hero!.experience.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, dates: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Role
                <input
                  className={fieldClass}
                  value={job.role}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        experience: page.hero!.experience.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, role: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Company
                <input
                  className={fieldClass}
                  value={job.company}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        experience: page.hero!.experience.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, company: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
        </section>
      ) : null}
      {page.slug === "about" && page.hero ? (
        <section id="about-expertise" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="about-expertise">
          <div>
            <h2 className="text-lg font-semibold">Areas of Expertise</h2>
            <p className="mt-1 text-sm text-muted">The pink carousel under Experience. Press Enter in the subtitle for a new line. Arrows and dots are automatic.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.hero.areasTitle} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, areasTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={2} value={page.hero.areasSubtitle} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, areasSubtitle: event.target.value } })} />
          </label>
          {page.hero.areas.map((area, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <p className="text-sm font-semibold">Card {index + 1} — {area.title || "empty"}</p>
              <label className="grid gap-2 text-sm">
                Heading
                <input
                  className={fieldClass}
                  value={area.title}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        areas: page.hero!.areas.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Description
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={area.description}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      hero: {
                        ...page.hero!,
                        areas: page.hero!.areas.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, description: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
        </section>
      ) : null}
      {page.slug === "about" && page.hero ? (
        <section id="about-close" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="about-close">
          <div>
            <h2 className="text-lg font-semibold">Ready to Transform</h2>
            <p className="mt-1 text-sm text-muted">The white band under the expertise carousel. The button opens a page on this site, for example /connect.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <input className={fieldClass} value={page.hero.ctaTitle} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, ctaTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={page.hero.ctaSubtitle} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, ctaSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.hero.ctaLabel} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, ctaLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Where the button opens — for example /connect
            <input className={fieldClass} value={page.hero.ctaHref} onChange={(event) => setPage({ ...page, hero: { ...page.hero!, ctaHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "engagements" && page.engagement ? (
        <section id="engagements-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="engagements-hero">
          <div>
            <h2 className="text-lg font-semibold">Engagements page hero</h2>
            <p className="mt-1 text-sm text-muted">The purple-and-orange banner at the top of Engagements. Press Enter in the heading for a new line.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading — press Enter for a new line
            <textarea className={fieldClass} rows={2} value={page.engagement.title} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, title: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={page.engagement.description} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, description: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.engagement.alt} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, alt: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.engagement.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change hero photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={uploadEngagement} />
          </div>
          <MobilePhotoField src={page.engagement.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, engagement: { ...page.engagement!, mobileImage: url } }))} />
        </section>
      ) : null}
      {page.slug === "engagements" && page.engagement ? (
        <section id="engagements-gallery" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="engagements-gallery">
          <div>
            <h2 className="text-lg font-semibold">Photo gallery</h2>
            <p className="mt-1 text-sm text-muted">The moving strip under the banner. The photos scroll on their own. Each photo can be changed on its own.</p>
          </div>
          {page.engagement.gallery.map((photo, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <p className="text-sm font-semibold">Photo {index + 1}</p>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.image} alt="" className="h-24 w-auto rounded-lg bg-slate-50 object-cover" />
                <ImageButton label={`Change photo ${index + 1}`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadGallery(index, file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Photo name
                <input
                  className={fieldClass}
                  value={photo.alt}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        gallery: page.engagement!.gallery.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, alt: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
        </section>
      ) : null}
      {page.slug === "engagements" && page.engagement ? (
        <section id="engagements-events" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="engagements-events">
          <div>
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="mt-1 text-sm text-muted">The cards under the gallery. Press Enter in the subtitle for a new line. Future is purple, Past is green, and the session type is teal. The cards scroll sideways.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.engagement.eventsTitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, eventsTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={2} value={page.engagement.eventsSubtitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, eventsSubtitle: event.target.value } })} />
          </label>
          {page.engagement.events.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Event {index + 1} — {item.title || "empty"}</p>
                {page.engagement!.events.length > 1 ? (
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() =>
                      setPage({
                        ...page,
                        engagement: {
                          ...page.engagement!,
                          events: page.engagement!.events.filter((_, eventIndex) => eventIndex !== index),
                        },
                      })
                    }
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">
                When it is
                <select
                  className={fieldClass}
                  value={item.timing}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        events: page.engagement!.events.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, timing: event.target.value as "future" | "past" } : entry,
                        ),
                      },
                    })
                  }
                >
                  <option value="future">Future</option>
                  <option value="past">Past</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                Session type
                <select
                  className={fieldClass}
                  value={item.format}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        events: page.engagement!.events.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, format: event.target.value as "" | "keynote" | "masterclass" | "panel" } : entry,
                        ),
                      },
                    })
                  }
                >
                  <option value="">No type</option>
                  <option value="keynote">Keynote Session</option>
                  <option value="masterclass">Masterclass</option>
                  <option value="panel">Panel Discussion</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                Event name
                <input
                  className={fieldClass}
                  value={item.title}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        events: page.engagement!.events.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, title: event.target.value } : entry,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Jagah
                <input
                  className={fieldClass}
                  value={item.place}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        events: page.engagement!.events.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, place: event.target.value } : entry,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Date
                <input
                  className={fieldClass}
                  value={item.date}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        events: page.engagement!.events.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, date: event.target.value } : entry,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Topic
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={item.topic}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        events: page.engagement!.events.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, topic: event.target.value } : entry,
                        ),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
            onClick={() =>
              setPage({
                ...page,
                engagement: {
                  ...page.engagement!,
                  events: [
                    ...page.engagement!.events,
                    { timing: "future", format: "keynote", title: "New event", place: "Place", date: "Date", topic: "Topic" },
                  ],
                },
              })
            }
          >
            Add event
          </button>
        </section>
      ) : null}
      {page.slug === "engagements" && page.engagement ? (
        <section id="engagements-roles" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="engagements-roles">
          <div>
            <h2 className="text-lg font-semibold">Professional Engagements</h2>
            <p className="mt-1 text-sm text-muted">The two cards under Events. Press Enter in a card heading for a new line. The first card is purple-to-teal, the second is teal-to-green.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.engagement.rolesTitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, rolesTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={page.engagement.rolesSubtitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, rolesSubtitle: event.target.value } })} />
          </label>
          {page.engagement.roles.map((role, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <p className="text-sm font-semibold">Card {index + 1} — {role.title.split("\n")[0] || "empty"}</p>
              <label className="grid gap-2 text-sm">
                Heading — press Enter for a new line
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={role.title}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        roles: page.engagement!.roles.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Description
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={role.description}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      engagement: {
                        ...page.engagement!,
                        roles: page.engagement!.roles.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, description: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
        </section>
      ) : null}
      {page.slug === "engagements" && page.engagement ? (
        <section id="engagements-projects" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="engagements-projects">
          <div>
            <h2 className="text-lg font-semibold">Projects Delivered</h2>
            <p className="mt-1 text-sm text-muted">Under the professional cards. The left menu is the category name. The right side is the company and project type. Project type can be left blank.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.engagement.projectsTitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, projectsTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={4} value={page.engagement.projectsSubtitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, projectsSubtitle: event.target.value } })} />
          </label>
          {page.engagement.projectCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="grid gap-3 rounded-lg border border-line p-3">
              <label className="grid gap-2 text-sm">
                Category {categoryIndex + 1} — name in the left menu
                <input className={fieldClass} value={category.title} onChange={(event) => updateCategoryTitle(categoryIndex, event.target.value)} />
              </label>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="grid gap-3 rounded-lg bg-slate-50 p-3 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    Company {itemIndex + 1}
                    <input className={fieldClass} value={item.company} onChange={(event) => updateProject(categoryIndex, itemIndex, "company", event.target.value)} />
                  </label>
                  <label className="grid gap-2 text-sm">
                    Project type
                    <input className={fieldClass} value={item.type} onChange={(event) => updateProject(categoryIndex, itemIndex, "type", event.target.value)} />
                  </label>
                  {category.items.length > 1 ? (
                    <button
                      type="button"
                      className="text-sm text-red-600 sm:col-span-2 justify-self-start"
                      onClick={() =>
                        setPage({
                          ...page,
                          engagement: {
                            ...page.engagement!,
                            projectCategories: page.engagement!.projectCategories.map((entry, entryIndex) =>
                              entryIndex === categoryIndex ? { ...entry, items: entry.items.filter((_, row) => row !== itemIndex) } : entry,
                            ),
                          },
                        })
                      }
                    >
                      Remove company
                    </button>
                  ) : null}
                </div>
              ))}
              <button
                type="button"
                className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
                onClick={() =>
                  setPage({
                    ...page,
                    engagement: {
                      ...page.engagement!,
                      projectCategories: page.engagement!.projectCategories.map((entry, entryIndex) =>
                        entryIndex === categoryIndex ? { ...entry, items: [...entry.items, { company: "Company name", type: "Project type" }] } : entry,
                      ),
                    },
                  })
                }
              >
                Add company
              </button>
            </div>
          ))}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
            onClick={() =>
              setPage({
                ...page,
                engagement: {
                  ...page.engagement!,
                  projectCategories: [...page.engagement!.projectCategories, { title: "New industry", items: [{ company: "Company name", type: "Project type" }] }],
                },
              })
            }
          >
            Add industry
          </button>
        </section>
      ) : null}
      {page.slug === "engagements" && page.engagement ? (
        <section id="engagements-contact" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="engagements-contact">
          <div>
            <h2 className="text-lg font-semibold">Get in Touch</h2>
            <p className="mt-1 text-sm text-muted">Under the projects list. Photo on the left, text on the right. Press Enter in the heading for a new line. Use /connect to open the Connect page.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading — press Enter for a new line
            <textarea className={fieldClass} rows={2} value={page.engagement.splitTitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, splitTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={2} value={page.engagement.splitSubtitle} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, splitSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.engagement.splitLabel} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, splitLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link — use /connect for the Connect page
            <input className={fieldClass} value={page.engagement.splitHref} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, splitHref: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Photo name
            <input className={fieldClass} value={page.engagement.splitAlt} onChange={(event) => setPage({ ...page, engagement: { ...page.engagement!, splitAlt: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.engagement.splitImage} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-cover" />
            <ImageButton label="Change photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={uploadSplit} />
          </div>
        </section>
      ) : null}
      {page.slug === "books/from-fomo-to-jomo" && page.book ? (
        <section id="fomo-hero" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="fomo-hero">
          <div>
            <h2 className="text-lg font-semibold">From FOMO to JOMO</h2>
            <p className="mt-1 text-sm text-muted">The Coming Soon banner below stays on the page until you hide it. The only other slides are the three book designs. Press Save after you add or edit one.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-lg bg-[#6d5ce7] px-4 py-2 text-sm font-semibold text-white" onClick={() => setBookSlides([...(page.book!.slides ?? []), { id: crypto.randomUUID(), template: "panel", eyebrow: "RELEASING NOVEMBER 2026", title: "Coming\nSoon!", subtitle: "When did you last choose where your attention went?", quote: "“…makes a compelling case for stepping away from the fear of missing out and discovering the joy of choosing what truly matters.”", quoteName: "Kiran Mazumdar-Shaw", quoteRole: "Executive Chairperson, Biocon Ltd.", buttonLabel: "Notify me", href: "/connect", image: "/images/books/fomo-hills.svg", alt: "Quiet hills", rings: [{ background: "#DFF7EF", opacity: 0.35 }, { background: "#CDEFF0", opacity: 0.45 }, { background: "#C9D8F5", opacity: 0.55 }] }])}>Add Coming Soon panel</button>
            <button type="button" className="rounded-lg bg-[#6d5ce7] px-4 py-2 text-sm font-semibold text-white" onClick={() => setBookSlides([...(page.book!.slides ?? []), { id: crypto.randomUUID(), template: "arch", eyebrow: "TOOLS INSIDE", title: "Not Just a Read.\nA Practice.", subtitle: "Turn ideas into habits with Try This prompts, the Frequency Check and the 30-day JOMO Journal.", badge: "30-day JOMO Journal inside", ticker: "PAUSE  ◆  CHOOSE  ◆  BE PRESENT", buttonLabel: "Notify me", href: "/connect", image: page.book!.cover, alt: "From FOMO to JOMO", rings: [{ background: "#DFF7EF", opacity: 0.35 }, { background: "#CDEFF0", opacity: 0.45 }, { background: "#C9D8F5", opacity: 0.55 }] }])}>Add Tools inside</button>
            <button type="button" className="rounded-lg bg-[#6d5ce7] px-4 py-2 text-sm font-semibold text-white" onClick={() => setBookSlides([...(page.book!.slides ?? []), { id: crypto.randomUUID(), template: "word", eyebrow: "THE IDEA", title: "Stop Scrolling.\nStart Choosing.", subtitle: "From the fear of missing out to the joy of being present.", bigWord: "JOMO", badge: "NOV", ticker: "RELEASING NOVEMBER 2026", buttonLabel: "Notify me", href: "/connect", image: page.book!.cover, alt: "From FOMO to JOMO", rings: [{ background: "#DFF7EF", opacity: 0.35 }, { background: "#CDEFF0", opacity: 0.45 }, { background: "#C9D8F5", opacity: 0.55 }] }])}>Add Big word</button>
          </div>
          <div className="grid gap-3">
            {(page.book.slides ?? []).length > 0 ? <p className="text-sm font-semibold">Slides after the book banner</p> : null}
            {(page.book.slides ?? []).map((slide, index) => {
              const template = slide.template === "arch" || slide.template === "word" || slide.template === "panel" ? slide.template : "";
              const slides = page.book!.slides ?? [];
              const update = (patch: Partial<HeroSlide>) => setBookSlides(slides.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
              if (!template) {
                return (
                  <div key={slide.id} className="flex items-center justify-between gap-3 rounded-lg border border-line p-3">
                    <p className="text-sm">This older slide is not one of the three book designs.</p>
                    <button type="button" className="text-sm text-red-600" onClick={() => setBookSlides(slides.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
                  </div>
                );
              }
              return (
                <div key={slide.id} className="grid gap-3 rounded-lg border border-line p-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold">Slide {index + 2}</p>
                    <div className="flex gap-2 text-sm">
                      <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setBookSlides(moveBookSlides(slides, index, -1))}>Up</button>
                      <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setBookSlides(moveBookSlides(slides, index, 1))}>Down</button>
                      <button type="button" className="rounded-lg border border-line px-3 py-1 text-red-600" onClick={() => setBookSlides(slides.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
                    </div>
                  </div>
                  <label className="grid gap-2 text-sm">
                    Template
                    <select
                      className={fieldClass}
                      value={template}
                      onChange={(event) => {
                        const next = event.target.value === "arch" || event.target.value === "word" ? event.target.value : "panel";
                        update({ template: next });
                      }}
                    >
                      <option value="panel">Coming Soon panel</option>
                      <option value="arch">Tools inside</option>
                      <option value="word">Big word</option>
                    </select>
                    <span className="text-xs font-normal text-muted">
                      {template === "arch"
                        ? "Words on the left, the book inside an arch, and a moving line along the bottom."
                        : template === "word"
                          ? "Olive page, a giant word, a round badge, and a picture on the right."
                          : "Words on the left. A picture on the right, with a quote card over it."}
                    </span>
                  </label>
                  <label className="grid gap-2 text-sm">Small label<input className={fieldClass} value={slide.eyebrow ?? ""} onChange={(event) => update({ eyebrow: event.target.value })} /></label>
                  <label className="grid gap-2 text-sm">Heading — press Enter for a new line<textarea className={fieldClass} rows={2} value={slide.title} onChange={(event) => update({ title: event.target.value })} /></label>
                  <label className="grid gap-2 text-sm">Line under the heading<textarea className={fieldClass} rows={2} value={slide.subtitle} onChange={(event) => update({ subtitle: event.target.value })} /></label>
                  <label className="grid gap-2 text-sm">Button text — leave empty to hide the button<input className={fieldClass} value={slide.buttonLabel} onChange={(event) => update({ buttonLabel: event.target.value })} /></label>
                  <label className="grid gap-2 text-sm">Button link<input className={fieldClass} value={slide.href} onChange={(event) => update({ href: event.target.value })} /></label>
                  {template === "panel" ? (
                    <>
                      <label className="grid gap-2 text-sm">Quote on the card<textarea className={fieldClass} rows={3} value={slide.quote ?? ""} onChange={(event) => update({ quote: event.target.value })} /></label>
                      <label className="grid gap-2 text-sm">Name under the quote<input className={fieldClass} value={slide.quoteName ?? ""} onChange={(event) => update({ quoteName: event.target.value })} /></label>
                      <label className="grid gap-2 text-sm">Role under the quote<input className={fieldClass} value={slide.quoteRole ?? ""} onChange={(event) => update({ quoteRole: event.target.value })} /></label>
                    </>
                  ) : null}
                  {template === "arch" ? (
                    <>
                      <label className="grid gap-2 text-sm">Label on the book<input className={fieldClass} value={slide.badge ?? ""} onChange={(event) => update({ badge: event.target.value })} /></label>
                      <label className="grid gap-2 text-sm">Moving line along the bottom<input className={fieldClass} value={slide.ticker ?? ""} onChange={(event) => update({ ticker: event.target.value })} /></label>
                    </>
                  ) : null}
                  {template === "word" ? (
                    <>
                      <label className="grid gap-2 text-sm">Giant word<input className={fieldClass} value={slide.bigWord ?? ""} onChange={(event) => update({ bigWord: event.target.value })} /></label>
                      <label className="grid gap-2 text-sm">Centre of the round badge<input className={fieldClass} value={slide.badge ?? ""} onChange={(event) => update({ badge: event.target.value })} /></label>
                      <label className="grid gap-2 text-sm">Words around the badge<input className={fieldClass} value={slide.ticker ?? ""} onChange={(event) => update({ ticker: event.target.value })} /></label>
                    </>
                  ) : null}
                  <label className="grid gap-2 text-sm">Picture name<input className={fieldClass} value={slide.alt} onChange={(event) => update({ alt: event.target.value })} /></label>
                  <div className="flex flex-wrap items-end gap-4">
                    {slide.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={slide.image} alt="" className="h-24 w-auto rounded-lg bg-slate-50 object-contain" />
                    ) : (
                      <p className="text-sm text-muted">No picture yet.</p>
                    )}
                    <ImageButton label={template === "word" ? "Change the whole picture" : template === "arch" ? "Change book picture" : slide.image ? "Change picture" : "Add picture"} accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" onPick={(file) => uploadBookSlide(index, file)} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm font-semibold">Coming Soon banner</p>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input type="checkbox" checked={page.book.bannerHidden === true} onChange={(event) => setPage({ ...page, book: { ...page.book!, bannerHidden: event.target.checked } })} />
            Hide this banner on the public page
          </label>
          <label className="grid gap-2 text-sm">
            Main heading
            <input className={fieldClass} value={page.book.heading} onChange={(event) => setPage({ ...page, book: { ...page.book!, heading: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading — press Enter for a new line
            <textarea className={fieldClass} rows={2} value={page.book.subheading} onChange={(event) => setPage({ ...page, book: { ...page.book!, subheading: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.book.logo} alt="" className="h-16 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change Aman Jain sign" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadBookImage("logo", file)} />
          </div>
          <label className="grid gap-2 text-sm">
            Signature name
            <input className={fieldClass} value={page.book.logoAlt} onChange={(event) => setPage({ ...page, book: { ...page.book!, logoAlt: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.book.cover} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton label="Change book cover" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadBookImage("cover", file)} />
          </div>
          <MobilePhotoField src={page.book.mobileImage} onPick={(file) => uploadMobile(file, (url) => setPage({ ...page, book: { ...page.book!, mobileImage: url } }))} />
          <label className="grid gap-2 text-sm">
            Cover name
            <input className={fieldClass} value={page.book.coverAlt} onChange={(event) => setPage({ ...page, book: { ...page.book!, coverAlt: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            What opens when the cover is clicked
            <input className={fieldClass} value={page.book.coverHref} onChange={(event) => setPage({ ...page, book: { ...page.book!, coverHref: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Quote on the gold band below
            <textarea className={fieldClass} rows={3} value={page.book.quote} onChange={(event) => setPage({ ...page, book: { ...page.book!, quote: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Quote author's name
            <input className={fieldClass} value={page.book.authorName} onChange={(event) => setPage({ ...page, book: { ...page.book!, authorName: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Their details — press Enter for a new line
            <textarea className={fieldClass} rows={2} value={page.book.authorInfo} onChange={(event) => setPage({ ...page, book: { ...page.book!, authorInfo: event.target.value } })} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            {page.book.authorPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={page.book.authorPhoto} alt="" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <p className="text-sm text-muted">No photo yet for this quote.</p>
            )}
            <ImageButton label="Add quote photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadBookImage("authorPhoto", file)} />
          </div>
          <label className="grid gap-2 text-sm">
            What's Inside heading
            <input className={fieldClass} value={page.book.insideTitle} onChange={(event) => setPage({ ...page, book: { ...page.book!, insideTitle: event.target.value } })} />
          </label>
          <p className="text-sm text-muted">The chapter cards scroll across the page on their own. The row pauses on hover, and a visitor can also scroll it by hand.</p>
          {page.book.chapters.map((chapter, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Chapter {chapter.number} — {chapter.title.split("\n")[0]}</p>
                {page.book!.chapters.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, book: { ...page.book!, chapters: page.book!.chapters.filter((_, chapterIndex) => chapterIndex !== index) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">
                Number
                <input
                  className={fieldClass}
                  value={chapter.number}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        chapters: page.book!.chapters.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, number: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Title — press Enter for a new line
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={chapter.title}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        chapters: page.book!.chapters.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Description
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={chapter.description}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        chapters: page.book!.chapters.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, description: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
              {chapter.points.map((point, pointIndex) => (
                <div key={pointIndex} className="grid gap-3 sm:grid-cols-[80px_1fr]">
                  <label className="grid gap-2 text-sm">
                    Point {pointIndex + 1} number
                    <input
                      className={fieldClass}
                      value={point.number}
                      onChange={(event) =>
                        setPage({
                          ...page,
                          book: {
                            ...page.book!,
                            chapters: page.book!.chapters.map((item, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...item,
                                    points: item.points.map((entry, entryIndex) =>
                                      entryIndex === pointIndex ? { ...entry, number: event.target.value } : entry,
                                    ),
                                  }
                                : item,
                            ),
                          },
                        })
                      }
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    Point {pointIndex + 1} — press Enter for a new line
                    <textarea
                      className={fieldClass}
                      rows={2}
                      value={point.text}
                      onChange={(event) =>
                        setPage({
                          ...page,
                          book: {
                            ...page.book!,
                            chapters: page.book!.chapters.map((item, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...item,
                                    points: item.points.map((entry, entryIndex) =>
                                      entryIndex === pointIndex ? { ...entry, text: event.target.value } : entry,
                                    ),
                                  }
                                : item,
                            ),
                          },
                        })
                      }
                    />
                  </label>
                </div>
              ))}
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chapter.image} alt="" className="h-20 w-auto rounded-lg bg-slate-50 object-cover" />
                <ImageButton label={`Change chapter ${index + 1} photo`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadChapter(index, file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Photo name
                <input
                  className={fieldClass}
                  value={chapter.alt}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        chapters: page.book!.chapters.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, alt: event.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
          {page.book.chapters.length < 8 ? (
            <button
              type="button"
              className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
              onClick={() =>
                setPage({
                  ...page,
                  book: {
                    ...page.book!,
                    chapters: [
                      ...page.book!.chapters,
                      {
                        number: String(page.book!.chapters.length + 1).padStart(2, "0"),
                        title: "New chapter",
                        description: "What this chapter covers.",
                        image: page.book!.chapters[0]?.image ?? "",
                        alt: "Chapter",
                        points: [
                          { number: "01", text: "First point" },
                          { number: "02", text: "Second point" },
                          { number: "03", text: "Third point" },
                        ],
                      },
                    ],
                  },
                })
              }
            >
              Add chapter
            </button>
          ) : null}
        </section>
      ) : null}
      {page.slug === "books/from-fomo-to-jomo" && page.book ? (
        <section id="fomo-voices" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="fomo-voices">
          <div>
            <h2 className="text-lg font-semibold">In the Words of Leaders</h2>
            <p className="mt-1 text-sm text-muted">Under What's Inside. A large quote on top, then a card slider. The full quote opens on hover.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.book.voicesTitle} onChange={(event) => setPage({ ...page, book: { ...page.book!, voicesTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={page.book.voicesSubtitle} onChange={(event) => setPage({ ...page, book: { ...page.book!, voicesSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Short line under that
            <input className={fieldClass} value={page.book.voicesDesc} onChange={(event) => setPage({ ...page, book: { ...page.book!, voicesDesc: event.target.value } })} />
          </label>
          <div className="grid gap-3 rounded-lg border border-line p-3">
            <p className="text-sm font-semibold">Featured — {page.book.featured.name || "empty"}</p>
            <label className="grid gap-2 text-sm">
              Name
              <input className={fieldClass} value={page.book.featured.name} onChange={(event) => setPage({ ...page, book: { ...page.book!, featured: { ...page.book!.featured, name: event.target.value } } })} />
            </label>
            <label className="grid gap-2 text-sm">
              Quote
              <textarea className={fieldClass} rows={5} value={page.book.featured.quote} onChange={(event) => setPage({ ...page, book: { ...page.book!, featured: { ...page.book!.featured, quote: event.target.value } } })} />
            </label>
            <div className="flex flex-wrap items-end gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.book.featured.photo} alt="" className="h-24 w-24 rounded-lg object-cover" />
              <ImageButton label="Change featured photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadVoiceImage("featured", "photo", file)} />
            </div>
            <label className="grid gap-2 text-sm">
              Photo name
              <input className={fieldClass} value={page.book.featured.photoAlt} onChange={(event) => setPage({ ...page, book: { ...page.book!, featured: { ...page.book!.featured, photoAlt: event.target.value } } })} />
            </label>
            <div className="flex flex-wrap items-end gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.book.featured.logo} alt="" className="h-10 w-auto rounded-lg bg-slate-50 object-contain" />
              <ImageButton label="Change featured logo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadVoiceImage("featured", "logo", file)} />
            </div>
            <label className="grid gap-2 text-sm">
              Logo name
              <input className={fieldClass} value={page.book.featured.logoAlt} onChange={(event) => setPage({ ...page, book: { ...page.book!, featured: { ...page.book!.featured, logoAlt: event.target.value } } })} />
            </label>
          </div>
          {page.book.voices.map((voice, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Card {index + 1} — {voice.name || "empty"}</p>
                {page.book!.voices.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setPage({ ...page, book: { ...page.book!, voices: page.book!.voices.filter((_, voiceIndex) => voiceIndex !== index) } })}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">
                Name
                <input
                  className={fieldClass}
                  value={voice.name}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        voices: page.book!.voices.map((item, itemIndex) => (itemIndex === index ? { ...item, name: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Role
                <input
                  className={fieldClass}
                  value={voice.role}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        voices: page.book!.voices.map((item, itemIndex) => (itemIndex === index ? { ...item, role: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Quote
                <textarea
                  className={fieldClass}
                  rows={4}
                  value={voice.quote}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        voices: page.book!.voices.map((item, itemIndex) => (itemIndex === index ? { ...item, quote: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={voice.photo} alt="" className="h-16 w-16 rounded-full object-cover" />
                <ImageButton label={`Change card ${index + 1} photo`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadVoiceImage(index, "photo", file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Photo name
                <input
                  className={fieldClass}
                  value={voice.photoAlt}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        voices: page.book!.voices.map((item, itemIndex) => (itemIndex === index ? { ...item, photoAlt: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={voice.logo} alt="" className="h-8 w-auto rounded-lg bg-slate-50 object-contain" />
                <ImageButton label={`Change card ${index + 1} logo`} accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadVoiceImage(index, "logo", file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Logo name
                <input
                  className={fieldClass}
                  value={voice.logoAlt}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        voices: page.book!.voices.map((item, itemIndex) => (itemIndex === index ? { ...item, logoAlt: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
          {page.book.voices.length < 8 ? (
            <button
              type="button"
              className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
              onClick={() =>
                setPage({
                  ...page,
                  book: {
                    ...page.book!,
                    voices: [
                      ...page.book!.voices,
                      {
                        name: "Name",
                        role: "Role, Company",
                        quote: "Paste the endorsement here.",
                        photo: page.book!.voices[0]?.photo ?? page.book!.featured.photo,
                        photoAlt: "Person",
                        logo: page.book!.voices[0]?.logo ?? page.book!.featured.logo,
                        logoAlt: "Company",
                      },
                    ],
                  },
                })
              }
            >
              Add quote
            </button>
          ) : null}
        </section>
      ) : null}
      {page.slug === "books/from-fomo-to-jomo" && page.book ? (
        <section id="fomo-who" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="fomo-who">
          <div>
            <h2 className="text-lg font-semibold">Who is it for?</h2>
            <p className="mt-1 text-sm text-muted">Under the leader quotes. Three speech cards, then the notify form. The form is saved under Messages.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={page.book.whoTitle} onChange={(event) => setPage({ ...page, book: { ...page.book!, whoTitle: event.target.value } })} />
          </label>
          {page.book.whoAudiences.map((audience, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <p className="text-sm font-semibold">Card {index + 1}</p>
              <label className="grid gap-2 text-sm">
                Heading
                <input
                  className={fieldClass}
                  value={audience.title}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        whoAudiences: page.book!.whoAudiences.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Card text
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={audience.text}
                  onChange={(event) =>
                    setPage({
                      ...page,
                      book: {
                        ...page.book!,
                        whoAudiences: page.book!.whoAudiences.map((item, itemIndex) => (itemIndex === index ? { ...item, text: event.target.value } : item)),
                      },
                    })
                  }
                />
              </label>
            </div>
          ))}
          <label className="grid gap-2 text-sm">
            Line under the cards
            <input className={fieldClass} value={page.book.whoLine} onChange={(event) => setPage({ ...page, book: { ...page.book!, whoLine: event.target.value } })} />
          </label>
        </section>
      ) : null}
      {page.slug === "books/from-fomo-to-jomo" && page.book ? (
        <section id="fomo-close" className="scroll-mt-32 grid gap-4 rounded-xl border border-line bg-white p-5" data-panel="fomo-close">
          <div>
            <h2 className="text-lg font-semibold">Ready to Transform</h2>
            <p className="mt-1 text-sm text-muted">Under Who is it for. A pale yellow fade and a purple-to-teal button. Use /connect to open the Connect page.</p>
          </div>
          <label className="grid gap-2 text-sm">
            Heading
            <input className={fieldClass} value={page.book.ctaTitle} onChange={(event) => setPage({ ...page, book: { ...page.book!, ctaTitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under that
            <input className={fieldClass} value={page.book.ctaSubtitle} onChange={(event) => setPage({ ...page, book: { ...page.book!, ctaSubtitle: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button text
            <input className={fieldClass} value={page.book.ctaLabel} onChange={(event) => setPage({ ...page, book: { ...page.book!, ctaLabel: event.target.value } })} />
          </label>
          <label className="grid gap-2 text-sm">
            Button link
            <input className={fieldClass} value={page.book.ctaHref} onChange={(event) => setPage({ ...page, book: { ...page.book!, ctaHref: event.target.value } })} />
          </label>
        </section>
      ) : null}
      <section data-panel={extraId} className="grid gap-4">
        {hidesPageCopy ? null : (
          <label className="grid gap-2 text-sm">
            Eyebrow
            <input className={fieldClass} value={page.eyebrow} onChange={(event) => setPage({ ...page, eyebrow: event.target.value })} />
          </label>
        )}
        <label className="grid gap-2 text-sm">
          {hidesPageCopy ? "Name in this editor only — not the big heading on the page" : "Page title — the heading visitors see"}
          <input className={fieldClass} value={page.title} onChange={(event) => setPage({ ...page, title: event.target.value })} />
        </label>
        {hidesPageCopy ? null : (
          <>
            <label className="grid gap-2 text-sm">
              Summary
              <input className={fieldClass} value={page.summary} onChange={(event) => setPage({ ...page, summary: event.target.value })} />
            </label>
            <label className="grid gap-2 text-sm">
              Body
              <textarea className={fieldClass} rows={10} value={page.body} onChange={(event) => setPage({ ...page, body: event.target.value })} />
            </label>
          </>
        )}
        <label className="grid gap-2 text-sm">
          Show this page
          <span className="text-xs font-normal text-muted">Published means visitors can open it. Draft hides it.</span>
          <select className={fieldClass} value={page.status} onChange={(event) => setPage({ ...page, status: event.target.value as PageContent["status"] })}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
      </section>
    </Customizer>
  );
}
