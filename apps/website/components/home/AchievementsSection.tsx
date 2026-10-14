"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import type { HomeAchievements } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageSize = 4;

const achieveCss = `
.aj-achieve-section,.aj-achieve-section *{box-sizing:border-box !important;font-family:inherit !important}
.aj-achieve-section{width:100% !important;max-width:1080px !important;margin:0 auto !important;padding:40px 16px 30px !important;text-align:center !important;background:transparent !important;position:relative !important}
.aj-achieve-title{font-size:3rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 10px !important;letter-spacing:-.5px !important;line-height:1.2 !important}
.aj-achieve-subtitle{font-size:1.05rem !important;font-weight:600 !important;color:#333 !important;margin:0 0 35px !important;line-height:1.4 !important}
.aj-slider-wrapper{position:relative !important;width:100% !important;display:flex !important;align-items:center !important;justify-content:center !important}
.aj-achieve-track{width:100% !important;position:relative !important}
.aj-achieve-grid{display:none !important;grid-template-columns:repeat(4,1fr) !important;gap:15px !important;width:100% !important;margin:0 !important;padding:0 !important;list-style:none !important}
.aj-achieve-grid.aj-active{display:grid !important}
.aj-achieve-card{background:#fff !important;border-radius:16px !important;padding:16px 12px 14px !important;display:flex !important;flex-direction:column !important;align-items:center !important;text-align:center !important;position:relative !important;transition:all .35s ease !important;cursor:pointer !important;overflow:hidden !important;z-index:1 !important;min-height:210px !important;justify-content:flex-start !important}
.aj-achieve-card::before{content:'' !important;position:absolute !important;inset:0 !important;border-radius:16px !important;padding:1.5px !important;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0) !important;-webkit-mask-composite:xor !important;mask-composite:exclude !important;pointer-events:none !important;transition:opacity .35s ease !important;z-index:2 !important}
.aj-achieve-card::after{content:'' !important;position:absolute !important;inset:0 !important;border-radius:16px !important;opacity:0 !important;transition:opacity .35s ease !important;z-index:-1 !important}
.aj-acard-1::before,.aj-acard-1::after{background:linear-gradient(135deg,#9333ea,#3b82f6) !important}
.aj-acard-1 .aj-acard-title{color:#3b82f6 !important}
.aj-acard-2::before,.aj-acard-2::after{background:linear-gradient(135deg,#3b82f6,#10b981) !important}
.aj-acard-2 .aj-acard-title{color:#0d9488 !important}
.aj-acard-3::before,.aj-acard-3::after{background:linear-gradient(135deg,#7c51fe,#5ba7d9) !important}
.aj-acard-3 .aj-acard-title{color:#7c51fe !important}
.aj-acard-4::before,.aj-acard-4::after{background:linear-gradient(135deg,#0097b2,#00c97b) !important}
.aj-acard-4 .aj-acard-title{color:#0097b2 !important}
.aj-badge-icon{height:38px !important;display:flex !important;align-items:center !important;justify-content:center !important;margin-bottom:8px !important;width:100% !important}
.aj-badge-icon svg{width:36px !important;height:36px !important;transition:all .35s ease !important}
.aj-acard-year{font-size:.72rem !important;font-weight:700 !important;letter-spacing:.5px !important;color:#999 !important;margin:0 0 6px !important;transition:color .35s ease !important}
.aj-acard-title{font-size:.92rem !important;font-weight:700 !important;margin:0 0 10px !important;transition:color .35s ease !important;line-height:1.3 !important}
.aj-acard-desc{font-size:.78rem !important;line-height:1.45 !important;color:#444 !important;font-weight:400 !important;margin:0 !important;transition:color .35s ease !important}
.aj-achieve-card:hover{transform:translateY(-4px) !important;box-shadow:0 10px 22px rgba(0,0,0,.12) !important}
.aj-achieve-card:hover::after{opacity:1 !important}
.aj-achieve-card:hover::before{opacity:0 !important}
.aj-achieve-card:hover .aj-acard-title,.aj-achieve-card:hover .aj-acard-desc,.aj-achieve-card:hover .aj-acard-year{color:#fff !important}
.aj-achieve-card:hover .aj-badge-icon svg{stroke:#fff !important}
.aj-nav-arrow{position:absolute !important;top:50% !important;transform:translateY(-50%) !important;width:28px !important;height:50px !important;background:rgba(0,0,0,.06) !important;border-radius:6px !important;display:flex !important;align-items:center !important;justify-content:center !important;cursor:pointer !important;z-index:5 !important;transition:background .25s ease !important;border:none !important;padding:0 !important}
.aj-nav-arrow:hover{background:rgba(0,0,0,.15) !important}
.aj-nav-arrow.aj-disabled{opacity:.3 !important;cursor:not-allowed !important;pointer-events:none !important}
.aj-nav-arrow.prev{left:-38px !important}
.aj-nav-arrow.next{right:-38px !important}
.aj-nav-arrow svg{width:12px !important;height:12px !important;fill:#666 !important}
.aj-dots-wrap{display:flex !important;justify-content:center !important;align-items:center !important;gap:0 !important;margin-top:12px !important}
.aj-dot{width:44px !important;height:44px !important;border-radius:50% !important;background:transparent !important;cursor:pointer !important;border:none !important;padding:0 !important;position:relative !important}
.aj-dot::before{content:"" !important;position:absolute !important;left:50% !important;top:50% !important;width:8px !important;height:8px !important;border-radius:50% !important;background:#e0e0e0 !important;transform:translate(-50%,-50%) !important}
.aj-dot.active::before{background:#3b82f6 !important;transform:translate(-50%,-50%) scale(1.2) !important}
@media (max-width:1200px){
  .aj-nav-arrow{display:none !important}
}
@media (max-width:992px){
  .aj-achieve-title{font-size:2.15rem !important}
  .aj-achieve-section{padding:32px 16px 24px !important}
  .aj-achieve-grid{grid-template-columns:repeat(2,1fr) !important;gap:12px !important}
}
@media (max-width:600px){
  .aj-achieve-title{font-size:1.85rem !important}
  .aj-achieve-grid{grid-template-columns:1fr !important}
  .aj-achieve-card{min-height:auto !important}
}
`;

const strokes = ["#0d9488", "#7c51fe", "#0097b2"];

function BadgeIcon({ index }: { index: number }) {
  const slot = index % 4;
  const gradientId = slot === 0 ? `ajBadgeGrad${index}` : "";
  const stroke = slot === 0 ? `url(#${gradientId})` : strokes[slot - 1];

  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {gradientId ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      ) : null}
      <rect x="20" y="10" width="24" height="28" rx="2" />
      <polygon points="32,16 34.5,21 40,21.8 36,25.6 37,31 32,28.4 27,31 28,25.6 24,21.8 29.5,21" />
      <path d="M 22 38 L 16 52 L 24 48 L 28 52 L 26 38" />
      <path d="M 42 38 L 48 52 L 40 48 L 36 52 L 38 38" />
    </svg>
  );
}

export function AchievementsSection({ achievements }: { achievements: HomeAchievements }) {
  const [page, setPage] = useState(0);
  const cards = achievements?.cards ?? [];
  const pages: HomeAchievements["cards"][] = [];
  for (let index = 0; index < cards.length; index += pageSize) {
    pages.push(cards.slice(index, index + pageSize));
  }
  const current = Math.min(page, Math.max(pages.length - 1, 0));

  return (
    <section data-edit="home-achievements" className={`aj-achieve-section ${poppins.className}`}>
      <style>{achieveCss}</style>
      <h2 className="aj-achieve-title">{achievements?.title}</h2>
      <p className="aj-achieve-subtitle">{achievements?.subtitle}</p>
      <div className="aj-slider-wrapper">
        <button
          type="button"
          className={`aj-nav-arrow prev${current === 0 ? " aj-disabled" : ""}`}
          aria-label="Previous awards"
          onClick={() => setPage((value) => Math.max(0, value - 1))}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <div className="aj-achieve-track">
          {pages.map((cards, pageIndex) => (
            <div className={`aj-achieve-grid${pageIndex === current ? " aj-active" : ""}`} key={pageIndex}>
              {cards.map((card, cardIndex) => {
                const index = pageIndex * pageSize + cardIndex;
                return (
                  <div className={`aj-achieve-card aj-acard-${(index % 4) + 1}`} key={`${card.title}-${index}`}>
                    <div className="aj-badge-icon">
                      <BadgeIcon index={index} />
                    </div>
                    {card.year ? <p className="aj-acard-year">{card.year}</p> : null}
                    <h3 className="aj-acard-title">{card.title}</h3>
                    <p className="aj-acard-desc">{card.description}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`aj-nav-arrow next${current >= pages.length - 1 ? " aj-disabled" : ""}`}
          aria-label="Next awards"
          onClick={() => setPage((value) => Math.min(pages.length - 1, value + 1))}
        >
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
      <div className="aj-dots-wrap">
        {pages.map((_, pageIndex) => (
          <button
            key={pageIndex}
            type="button"
            className={`aj-dot${pageIndex === current ? " active" : ""}`}
            aria-label={`Go to page ${pageIndex + 1}`}
            onClick={() => setPage(pageIndex)}
          />
        ))}
      </div>
    </section>
  );
}
