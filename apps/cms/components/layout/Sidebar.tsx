"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cmsNav } from "@/lib/nav";
import { logOut } from "@/lib/tab-session";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[280px] shrink-0 flex-col bg-[#17151f] text-white">
      <div className="px-6 pb-4 pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">Website editor</p>
        <p className="mt-2 text-xl font-semibold tracking-tight">Aman Jain</p>
        <p className="mt-2 text-xs leading-5 text-white/50">Edit what visitors see. Press Save when you are done.</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {cmsNav.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-3.5 py-2.5 ${active ? "bg-white text-[#17151f]" : "text-white/85 hover:bg-white/10"}`}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className={`mt-0.5 block text-xs ${active ? "text-[#17151f]/55" : "text-white/45"}`}>{item.hint}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3">
        <button type="button" onClick={() => void logOut()} className="w-full rounded-2xl px-3.5 py-2.5 text-left text-sm font-semibold text-white/80 hover:bg-white/10">
          Log out
        </button>
      </div>
    </aside>
  );
}
