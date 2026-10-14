import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Topbar } from "@/components/layout/Topbar";
import { getEnquiries } from "@/lib/content";

const starts = [
  { href: "/home", title: "Home page", detail: "The top slider, about band, expertise, stories, and the home form." },
  { href: "/header", title: "Top menu", detail: "The logo, menu names, and the blue Let's talk button." },
  { href: "/pages", title: "Website pages", detail: "Opens the real page beside the editor. Click a part of the page to change it." },
  { href: "/settings", title: "Footer", detail: "The name, tagline, social icons, links, and address at the bottom." },
  { href: "/enquiries", title: "Messages", detail: "Messages people sent from the website forms." },
];

export default function DashboardPage() {
  return (
    <Suspense fallback={<Topbar title="Start" />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  await connection();
  const fresh = getEnquiries().filter((item) => item.status === "new").length;

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
            <Link key={item.href} href={item.href} className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(23,21,31,0.04)] transition hover:-translate-y-0.5 hover:border-accent">
              <p className="text-xs font-semibold tracking-wide text-accent">0{index + 1}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

