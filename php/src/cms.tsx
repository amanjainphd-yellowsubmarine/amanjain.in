import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HeaderEditor } from "@/components/header/HeaderEditor";
import { HomeEditor } from "@/components/home/HomeEditor";
import { PageEditor } from "@/components/pages/PageEditor";
import { SettingsEditor } from "@/components/settings/SettingsEditor";
import { Sidebar } from "@/components/layout/Sidebar";
import { TabGate } from "@/components/layout/TabGate";
import { Topbar } from "@/components/layout/Topbar";
import { DataTable } from "@/components/ui/DataTable";
import { pageGroups, sitePages } from "@/lib/site-pages";
import type { HeaderContent, HomeContent, PageContent, SiteSettings } from "@/lib/content";
import LoginPage from "../../apps/cms/app/login/page";

type Enquiry = { name: string; email: string; message: string; status: string };

function useJson<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let alive = true;
    fetch(url)
      .then(async (response) => {
        if (response.status === 401) {
          window.location.href = "/login";
          return null;
        }
        if (!response.ok) throw new Error("Could not load this page.");
        return response.json() as Promise<T>;
      })
      .then((json) => {
        if (alive && json) setData(json);
      })
      .catch((reason: Error) => {
        if (alive) setError(reason.message);
      });
    return () => {
      alive = false;
    };
  }, [url]);
  return { data, error };
}

function Dashboard() {
  const { data } = useJson<Enquiry[]>("/api/enquiries");
  const fresh = (data ?? []).filter((item) => item.status === "new").length;
  const starts = [
    { href: "/home", title: "Home page", detail: "The top slider, about band, expertise, stories, and the home form." },
    { href: "/header", title: "Top menu", detail: "The logo, menu names, and the blue Let's talk button." },
    { href: "/pages", title: "Website pages", detail: "Opens the real page beside the editor. Click a part of the page to change it." },
    { href: "/settings", title: "Footer", detail: "The name, tagline, social icons, links, and address at the bottom." },
    { href: "/enquiries", title: "Messages", detail: "Form messages are saved here and emailed." },
  ];
  return (
    <>
      <Topbar title="Start" hint="Pick a box, edit the text or photo, then press Save." />
      <div className="grid max-w-3xl gap-4 p-6">
        <div className="rounded-2xl bg-[#17151f] px-5 py-4 text-white shadow-[0_16px_40px_rgba(23,21,31,0.12)]">
          <p className="text-sm font-semibold">How to edit</p>
          <p className="mt-1 text-sm leading-6 text-white/70">Type the same words visitors should see. Use the photo button to change a picture. Nothing goes live until you press Save.</p>
          {fresh > 0 ? <p className="mt-3 text-sm font-medium text-[#d7d0ff]">{fresh} new message. Open Messages to read it.</p> : null}
        </div>
        <div className="grid gap-3">
          {starts.map((item, index) => (
            <a key={item.href} href={item.href} className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(23,21,31,0.04)] transition hover:-translate-y-0.5 hover:border-accent">
              <p className="text-xs font-semibold tracking-wide text-accent">0{index + 1}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function PagesList() {
  const { data } = useJson<PageContent[]>("/api/pages");
  const listed = sitePages.flatMap((guide) => ((data ?? []).some((item) => item.slug === guide.slug) ? [guide] : []));
  return (
    <>
      <Topbar title="Website pages" hint="Open a page. The real page is on the right. Click the part you want to change." />
      <div className="grid max-w-3xl gap-8 p-6">
        {pageGroups.map((group) => (
          <section key={group} className="grid gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">{group}</h2>
            {listed.filter((page) => page.group === group).map((page) => (
              <a key={page.slug} href={`/pages/${page.slug}`} className="rounded-2xl border border-line bg-white p-4 shadow-[0_10px_30px_rgba(23,21,31,0.04)] transition hover:-translate-y-0.5 hover:border-accent">
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-semibold">{page.name}</span>
                    <span className="mt-1 block text-sm text-accent">{page.where}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{page.edits}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-[#f3f0ff] px-3 py-1 text-sm font-semibold text-accent">Edit</span>
                </span>
              </a>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}

function Messages() {
  const { data } = useJson<Enquiry[]>("/api/enquiries");
  return (
    <>
      <Topbar title="Messages" hint="Form messages and resource downloads or article opens are saved here. A copy is also emailed. You cannot reply from here." />
      <div className="grid gap-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">Contact form messages, newsletter sign-ups, and who downloaded or read a resource (name, email, and which page item).</p>
          <a href="/api/enquiries/subscribe.xls" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">Download subscribe Excel</a>
        </div>
        <DataTable
          columns={["Name", "Email", "Type", "Page content"]}
          rows={(data ?? []).map((item) => [
            item.status === "new" ? `${item.name} (new)` : item.name,
            item.email,
            item.type === "resource" ? (item.resourceAction === "download" ? "Download" : "Read") : "Message",
            item.type === "resource" ? `${item.resourceTitle ?? item.message} — ${item.resourcePage ?? ""}` : item.message,
          ])}
        />
      </div>
    </>
  );
}

function EditHome() {
  const { data, error } = useJson<HomeContent>("/api/home");
  if (error) return <p className="p-6 text-sm text-red-600">{error}</p>;
  if (!data) return null;
  return (
    <>
      <Topbar title="Home page" hint="Use the buttons above to jump to a section. Press Save after you change text or a photo." />
      <HomeEditor initialHome={data} />
    </>
  );
}

function EditHeader() {
  const { data, error } = useJson<HeaderContent>("/api/header");
  if (error) return <p className="p-6 text-sm text-red-600">{error}</p>;
  if (!data) return null;
  return (
    <>
      <Topbar title="Top menu" hint="The logo, the blue Let's talk button, and the top menu names." />
      <HeaderEditor initialHeader={data} />
    </>
  );
}

function EditFooter() {
  const { data, error } = useJson<SiteSettings>("/api/settings");
  if (error) return <p className="p-6 text-sm text-red-600">{error}</p>;
  if (!data) return null;
  return (
    <>
      <Topbar title="Footer" hint="The bottom of every page: name, links, address, and social icons." />
      <SettingsEditor initialSite={data} />
    </>
  );
}

function EditPage({ slug }: { slug: string }) {
  const { data, error } = useJson<PageContent[]>(`/api/pages`);
  if (error) return <p className="p-6 text-sm text-red-600">{error}</p>;
  if (!data) return null;
  const page = data.find((item) => item.slug === slug);
  if (!page) return <p className="p-6 text-sm">That page does not exist.</p>;
  return (
    <>
      <Topbar title={page.title} />
      <PageEditor initialPage={page} />
    </>
  );
}

function Screen() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/editor") return <Dashboard />;
  if (path === "/home") return <EditHome />;
  if (path === "/header") return <EditHeader />;
  if (path === "/settings") return <EditFooter />;
  if (path === "/pages") return <PagesList />;
  if (path === "/enquiries") return <Messages />;
  if (path.startsWith("/pages/")) return <EditPage slug={decodeURIComponent(path.slice("/pages/".length))} />;
  return <p className="p-6 text-sm">That editor page does not exist.</p>;
}

function Admin() {
  return (
    <TabGate>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Screen />
        </div>
      </div>
    </TabGate>
  );
}

const path = window.location.pathname.replace(/\/+$/, "") || "/";
createRoot(document.getElementById("root")!).render(path === "/login" ? <LoginPage /> : <Admin />);
