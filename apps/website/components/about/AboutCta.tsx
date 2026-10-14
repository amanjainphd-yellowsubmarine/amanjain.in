"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import type { PageHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ctaCss = `
.aj-cta-section,.aj-cta-section *{box-sizing:border-box !important;font-family:inherit !important}
.aj-cta-section{width:100% !important;max-width:100% !important;margin:0 !important;padding:60px 24px !important;text-align:center !important;background:#fff !important;display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important}
.aj-cta-title{font-size:2.5rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.2 !important}
.aj-cta-subtitle{font-size:1.15rem !important;font-weight:600 !important;color:#111 !important;margin:0 0 32px !important;line-height:1.4 !important}
.aj-cta-btn{display:inline-flex !important;align-items:center !important;justify-content:center !important;background:linear-gradient(90deg,#7c51fe 0%,#5ba7d9 100%) !important;color:#fff !important;font-size:1.05rem !important;font-weight:700 !important;text-decoration:none !important;padding:12px 36px !important;border-radius:50px !important;border:none !important;cursor:pointer !important;transition:transform .25s ease,box-shadow .25s ease,opacity .25s ease !important;box-shadow:0 6px 20px rgba(124,81,254,.3) !important}
.aj-cta-btn:hover{transform:translateY(-2px) !important;box-shadow:0 10px 25px rgba(124,81,254,.4) !important;opacity:.95 !important;color:#fff !important}
@media (max-width:768px){
  .aj-cta-section{padding:45px 20px !important}
  .aj-cta-title{font-size:1.85rem !important}
  .aj-cta-subtitle{font-size:.98rem !important;margin-bottom:24px !important}
  .aj-cta-btn{padding:10px 28px !important;font-size:.95rem !important}
}
`;

export function AboutCta({ hero }: { hero: PageHero }) {
  return (
    <section data-edit="about-close" className={`aj-cta-section ${poppins.className}`}>
      <style>{ctaCss}</style>
      <h2 className="aj-cta-title">{hero.ctaTitle}</h2>
      <p className="aj-cta-subtitle">{hero.ctaSubtitle}</p>
      <Link href={hero.ctaHref} className="aj-cta-btn">
        {hero.ctaLabel}
      </Link>
    </section>
  );
}
