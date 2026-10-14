import { lazy, Suspense, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { PreviewBridge } from "@/components/layout/PreviewBridge";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { PageContent, SiteSettings } from "@/lib/content";
import { Missing } from "./missing";
import type { HomeContent } from "./routes/home";

const HomePage = lazy(() => import("./routes/home"));
const AboutPage = lazy(() => import("./routes/about"));
const EngagementsPage = lazy(() => import("./routes/engagements"));
const FomoPage = lazy(() => import("./routes/fomo"));
const RecommendedPage = lazy(() => import("./routes/recommended"));
const PodcastsPage = lazy(() => import("./routes/podcasts"));
const MediaAppearancesPage = lazy(() => import("./routes/media-appearances"));
const CaseletsPage = lazy(() => import("./routes/caselets"));
const ArticlesPage = lazy(() => import("./routes/articles"));
const AssetsPage = lazy(() => import("./routes/assets"));
const NewsPage = lazy(() => import("./routes/news"));
const ConnectPage = lazy(() => import("./routes/connect"));

type Content = {
  header: Parameters<typeof SiteHeader>[0]["header"];
  site: SiteSettings;
  home: HomeContent;
  pages: PageContent[];
};

declare global {
  interface Window {
    __CONTENT__: Content;
  }
}

function pathName() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path || "/";
}

function findPage(pages: PageContent[], slug: string) {
  return pages.find((page) => page.slug === slug && page.status === "published");
}

function SimplePage({ page }: { page: PageContent }) {
  return (
    <Container className="py-16">
      <div data-edit="page-copy">
        {page.eyebrow ? <p className="text-sm text-accent">{page.eyebrow}</p> : null}
        <h1 className={`text-4xl font-semibold ${page.eyebrow ? "mt-2" : ""}`}>{page.title}</h1>
        {page.body ? <p className="mt-6 max-w-2xl whitespace-pre-wrap text-lg text-muted">{page.body}</p> : null}
      </div>
    </Container>
  );
}

function ContactView({ page, site }: { page: PageContent; site: SiteSettings }) {
  return (
    <Container className="grid gap-10 py-16 md:grid-cols-2">
      <div>
        {page.eyebrow ? <p className="text-sm text-accent">{page.eyebrow}</p> : null}
        <h1 className="mt-2 text-4xl font-semibold">{page.title}</h1>
        {page.body || site.description ? (
          <p className="mt-6 whitespace-pre-wrap text-muted">{page.body || site.description}</p>
        ) : null}
        <div className="mt-6 space-y-1 text-sm">
          <p>{site.email}</p>
          {site.phone.includes("00000") ? null : <p>{site.phone}</p>}
          <p>{site.address}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-white p-6">
        <ContactForm />
      </div>
    </Container>
  );
}

function PageBody({ content, path }: { content: Content; path: string }) {
  const page = (slug: string) => findPage(content.pages, slug);

  if (path === "/on-air" || path === "/on-air/media-appearance") {
    window.location.replace("/on-air/podcasts");
    return null;
  }
  if (path === "/books" || path === "/resources" || path === "/contact") {
    const target = path === "/books" ? "/books/from-fomo-to-jomo" : path === "/resources" ? "/resources/practice-caselets" : "/connect";
    window.location.replace(target);
    return null;
  }

  let view = null;
  if (path === "/") view = <HomePage home={content.home} />;
  else if (path === "/about") view = <AboutPage page={page("about")} />;
  else if (path === "/engagements") view = <EngagementsPage page={page("engagements")} />;
  else if (path === "/books/from-fomo-to-jomo") view = <FomoPage page={page("books/from-fomo-to-jomo")} />;
  else if (path === "/books/recommended") view = <RecommendedPage page={page("books/recommended")} />;
  else if (path === "/on-air/podcasts") view = <PodcastsPage page={page("on-air/podcasts")} />;
  else if (path === "/on-air/media-appearances") view = <MediaAppearancesPage page={page("on-air/media-appearances")} />;
  else if (path === "/resources/practice-caselets") view = <CaseletsPage page={page("resources/practice-caselets")} />;
  else if (path === "/resources/articles-research-papers") view = <ArticlesPage page={page("resources/articles-research-papers")} />;
  else if (path === "/resources/assets") view = <AssetsPage page={page("resources/assets")} />;
  else if (path === "/resources/in-the-news") view = <NewsPage page={page("resources/in-the-news")} />;
  else if (path === "/connect") view = <ConnectPage page={page("connect")} />;
  else {
    const current = findPage(content.pages, path.replace(/^\//, ""));
    if (!current) return <Missing />;
    if (current.slug === "contact") return <ContactView page={current} site={content.site} />;
    return <SimplePage page={current} />;
  }

  return view;
}

function Site() {
  const content = window.__CONTENT__;
  const path = pathName();

  useLayoutEffect(() => {
    document.getElementById("aj-boot")?.remove();
  }, [path]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
    <div className="flex min-h-full w-full min-w-0 flex-col overflow-x-clip">
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2" href="#main">
        Skip to content
      </a>
      <style>{`a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid #2562f1;outline-offset:3px}`}</style>
      <SiteHeader header={content.header} />
      <main id="main" className="flex w-full min-w-0 flex-1 flex-col">
        <PageBody content={content} path={path} />
      </main>
      <SiteFooter site={content.site} />
      <PreviewBridge />
    </div>
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(<Site />);
