"use client";

import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import type { HomeExpertise } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const expertiseCss = `
.aj-expertise-section,.aj-expertise-section *{box-sizing:border-box !important;font-family:inherit !important}
.aj-expertise-section{width:100% !important;max-width:1200px !important;margin:0 auto !important;padding:40px 20px !important;text-align:center !important;background:transparent !important}
.aj-expertise-title{font-size:2.25rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 12px !important;letter-spacing:-.5px !important;line-height:1.2 !important}
.aj-expertise-subtitle{font-size:1.15rem !important;font-weight:600 !important;color:#333 !important;margin:0 0 40px !important;line-height:1.4 !important}
.aj-expertise-grid{display:grid !important;grid-template-columns:repeat(4,1fr) !important;gap:20px !important;width:100% !important;margin:0 !important;padding:0 !important;list-style:none !important}
.aj-expertise-card{background:#fff !important;border-radius:20px !important;padding:35px 20px !important;display:flex !important;flex-direction:column !important;align-items:center !important;text-align:center !important;position:relative !important;transition:all .35s ease !important;cursor:pointer !important;overflow:hidden !important;z-index:1 !important;min-height:380px !important;justify-content:flex-start !important}
.aj-expertise-card::before{content:'' !important;position:absolute !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;border-radius:20px !important;padding:2px !important;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0) !important;-webkit-mask-composite:xor !important;mask-composite:exclude !important;pointer-events:none !important;transition:opacity .35s ease !important;z-index:2 !important}
.aj-expertise-card::after{content:'' !important;position:absolute !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;border-radius:20px !important;opacity:0 !important;transition:opacity .35s ease !important;z-index:-1 !important}
.aj-card-1::before,.aj-card-1::after{background:linear-gradient(135deg,#9333ea,#3b82f6) !important}
.aj-card-1 .aj-card-title{color:#3b82f6 !important}
.aj-card-2::before,.aj-card-2::after{background:linear-gradient(135deg,#3b82f6,#10b981) !important}
.aj-card-2 .aj-card-title{color:#0d9488 !important}
.aj-card-3::before,.aj-card-3::after{background:linear-gradient(135deg,#9333ea,#06b6d4) !important}
.aj-card-3 .aj-card-title{color:#3b82f6 !important}
.aj-card-4::before,.aj-card-4::after{background:linear-gradient(135deg,#0097b2,#00ab84,#00c97b) !important}
.aj-card-4 .aj-card-title{color:#0097b2 !important}
.aj-icon-wrap{height:70px !important;display:flex !important;align-items:center !important;justify-content:center !important;margin-bottom:24px !important;width:100% !important}
.aj-icon-wrap svg{width:55px !important;height:55px !important;transition:all .35s ease !important}
.aj-card-title{font-size:1.35rem !important;font-weight:700 !important;margin:0 0 16px !important;transition:color .35s ease !important;line-height:1.3 !important}
.aj-card-desc{font-size:.88rem !important;line-height:1.55 !important;color:#444 !important;font-weight:400 !important;margin:0 !important;transition:color .35s ease !important}
.aj-expertise-card:hover{transform:translateY(-6px) !important;box-shadow:0 14px 28px rgba(0,0,0,.15) !important}
.aj-expertise-card:hover::after{opacity:1 !important}
.aj-expertise-card:hover::before{opacity:0 !important}
.aj-expertise-card:hover .aj-card-title,.aj-expertise-card:hover .aj-card-desc{color:#fff !important}
.aj-expertise-card:hover .aj-icon-wrap svg{stroke:#fff !important}
@media (max-width:992px){
  .aj-expertise-title{font-size:1.85rem !important}
  .aj-expertise-section{padding:32px 16px !important}
  .aj-expertise-grid{grid-template-columns:repeat(2,1fr) !important}
}
@media (max-width:600px){
  .aj-expertise-title{font-size:1.7rem !important}
  .aj-expertise-subtitle{font-size:1rem !important}
  .aj-expertise-grid{grid-template-columns:1fr !important}
  .aj-expertise-card{min-height:auto !important;padding:28px 18px !important}
}
`;

const icons: ReactNode[] = [
  <svg key="talent" viewBox="0 0 64 64" fill="none" stroke="url(#ajGrad1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="ajGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M 38 12 A 12 12 0 0 1 50 24 A 12 12 0 0 1 44 33 L 44 38 L 20 38 L 20 30 C 20 25 24 20 28 18 C 26 15 28 10 33 10 C 35 10 38 12 38 12 Z" />
    <path d="M 20 38 L 44 38 L 46 50 L 18 50 Z" />
    <circle cx="40" cy="22" r="2" />
  </svg>,
  <svg key="leadership" viewBox="0 0 64 64" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="18" r="7" />
    <path d="M 20 34 C 20 27 25 25 32 25 C 39 25 44 27 44 34" />
    <path d="M 32 35 L 32 44" />
    <path d="M 18 44 L 46 44" />
    <path d="M 18 44 L 18 48" />
    <path d="M 32 44 L 32 48" />
    <path d="M 46 44 L 46 48" />
    <rect x="14" y="48" width="8" height="8" />
    <circle cx="32" cy="52" r="4" />
    <polygon points="46,48 50,56 42,56" />
  </svg>,
  <svg key="coaching" viewBox="0 0 64 64" fill="none" stroke="url(#ajGrad3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="ajGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect x="26" y="10" width="26" height="18" rx="2" />
    <path d="M 30 20 L 36 15 L 42 22 L 48 14" />
    <path d="M 39 28 L 39 34" />
    <circle cx="18" cy="18" r="4" />
    <path d="M 12 36 L 18 26 L 24 36" />
    <circle cx="24" cy="44" r="3" />
    <path d="M 19 54 C 19 49 29 49 29 54" />
    <circle cx="34" cy="44" r="3" />
    <path d="M 29 54 C 29 49 39 49 39 54" />
    <circle cx="44" cy="44" r="3" />
    <path d="M 39 54 C 39 49 49 49 49 54" />
  </svg>,
  <svg key="learning" viewBox="0 0 64 64" fill="none" stroke="#0097b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 12 36 C 18 34 26 34 32 37 C 38 34 46 34 52 36 L 52 50 C 46 48 38 48 32 51 C 26 48 18 48 12 50 Z" />
    <path d="M 32 37 L 32 51" />
    <path d="M 26 20 C 26 15 28 11 32 11 C 36 11 38 15 38 20 C 38 23 36 25 35 27 L 29 27 C 28 25 26 23 26 20 Z" />
    <path d="M 30 30 L 34 30" />
    <line x1="32" y1="5" x2="32" y2="8" />
    <line x1="21" y1="12" x2="23" y2="14" />
    <line x1="43" y1="12" x2="41" y2="14" />
  </svg>,
];

export function ExpertiseSection({ expertise }: { expertise: HomeExpertise }) {
  return (
    <section data-edit="home-expertise" className={`aj-expertise-section ${poppins.className}`}>
      <style>{expertiseCss}</style>
      <h2 className="aj-expertise-title">{expertise.title}</h2>
      <p className="aj-expertise-subtitle">{expertise.subtitle}</p>
      <div className="aj-expertise-grid">
        {expertise.cards.map((card, index) => (
          <div className={`aj-expertise-card aj-card-${index + 1}`} key={card.title}>
            <div className="aj-icon-wrap">{icons[index]}</div>
            <h3 className="aj-card-title">{card.title}</h3>
            <p className="aj-card-desc">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
