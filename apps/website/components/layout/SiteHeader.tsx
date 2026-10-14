"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { HeaderContent, MenuItem } from "@/lib/content";

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" className="translate-y-px">
      <path
        d="M2.2 4.4 6 8l3.8-3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const menuCss = `
.aj-desk-item{position:relative}
.aj-desk-item::after{content:"";position:absolute;left:-16px;right:-16px;top:100%;height:22px}
.aj-desk-link{display:inline-flex;align-items:center;gap:6px;font-size:16px;font-weight:400;line-height:1;color:#222326;text-decoration:none}
.aj-desk-item:hover .aj-desk-link,.aj-desk-item:focus-within .aj-desk-link{color:#2562f1;text-decoration:underline;text-underline-offset:6px}
.aj-desk-menu{position:absolute;left:50%;top:100%;z-index:30;padding-top:14px;transform:translateX(-50%);opacity:0;visibility:hidden;pointer-events:none}
.aj-desk-item:hover .aj-desk-menu,.aj-desk-item:focus-within .aj-desk-menu{opacity:1;visibility:visible;pointer-events:auto}
.aj-desk-panel{min-width:230px;border-radius:16px;background:#fff;padding:12px 8px;box-shadow:0 10px 30px rgba(15,23,42,.12)}
.aj-desk-panel a{display:block;white-space:nowrap;padding:10px 16px;font-size:15px;color:#3a3d44;text-decoration:none}
.aj-desk-panel a:hover{color:#2562f1}
`;

function DesktopItem({ item }: { item: MenuItem }) {
  const className =
    "inline-flex items-center gap-1.5 text-[16px] font-normal leading-none text-[#222326] hover:text-black";

  if (item.children.length === 0) {
    return (
      <Link href={item.href} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="aj-desk-item">
      <Link href={item.href} className="aj-desk-link">
        {item.label}
        <Chevron />
      </Link>
      <div className="aj-desk-menu">
        <div className="aj-desk-panel">
          {item.children.map((child) => (
            <Link key={child.id} href={child.href}>
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ header }: { header: HeaderContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const logoIsRemote = header.logo.src.startsWith("http");
  const logoClass = "h-9 w-auto max-w-[118px] sm:h-11 sm:max-w-[170px] min-[1100px]:h-[52px] min-[1100px]:max-w-none";

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  return (
    <header data-edit="header" className="sticky top-0 z-50 w-full min-w-0 bg-white">
      <style>{menuCss}</style>
      <div className="relative mx-auto grid h-16 w-full min-w-0 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:h-[72px] sm:px-8 min-[1100px]:h-[76px] min-[1100px]:px-16">
        <Link href="/" className="relative z-10 min-w-0 justify-self-start" onClick={() => setOpen(false)}>
          {logoIsRemote ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={header.logo.src} alt={header.logo.alt} className={logoClass} />
          ) : (
            <Image
              src={header.logo.src}
              alt={header.logo.alt}
              width={1600}
              height={594}
              priority
              className={logoClass}
            />
          )}
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 min-[1100px]:flex">
          {header.menu.map((item) => (
            <DesktopItem key={item.id} item={item} />
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2">
          <Link
            href={header.cta.href}
            className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-[#2562f1] px-3.5 text-[13px] font-medium leading-none text-white hover:bg-[#1d4fd8] sm:px-5 sm:text-[15px]"
          >
            {header.cta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#17181a] min-[1100px]:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-[18px]">
              <span className={`absolute left-0 h-px w-full bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-black/[0.06] bg-white px-5 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:px-8 min-[1100px]:hidden">
          <div className="mx-auto w-full max-w-3xl">
            {header.menu.map((item) => {
              const active = pathname === item.href;
              const isOpen = expanded === item.id;
              return (
                <div key={item.id} className="border-b border-black/[0.05]">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={item.href}
                      className={`block flex-1 py-3.5 text-[17px] ${active ? "text-[#2562f1]" : "text-[#1c1d21]"}`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children.length > 0 ? (
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#3a3d44]"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Hide" : "Show"} ${item.label}`}
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                      >
                        <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
                          <Chevron />
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {isOpen ? (
                    <div className="mb-3 rounded-2xl bg-[#f6f8fb] px-3 py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className="block py-2.5 text-[15px] text-[#3a3d44]"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
