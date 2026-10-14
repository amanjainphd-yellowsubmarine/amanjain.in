"use client";

import { Poppins } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import type { PageHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const areasCss = `
.aj-aoe-wrap{width:100%;padding:8px 20px 48px}
.aj-aoe-section,.aj-aoe-section *{box-sizing:border-box !important;font-family:inherit !important}
.aj-aoe-section{width:100% !important;max-width:100% !important;margin:0 !important;border-radius:36px !important;padding:60px 40px 45px !important;text-align:center !important;background:linear-gradient(110deg,#ff4fa8 0%,#ff6b8b 40%,#ff8c68 75%,#ff9e43 100%) !important;position:relative !important;overflow:hidden !important;box-shadow:0 15px 35px rgba(255,79,168,.25) !important}
.aj-aoe-title{font-size:2.75rem !important;font-weight:800 !important;color:#fff !important;margin:0 0 12px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
.aj-aoe-subtitle{font-size:1.05rem !important;font-weight:600 !important;color:#fff !important;max-width:720px !important;margin:0 auto 45px !important;line-height:1.5 !important;opacity:.95 !important}
.aj-aoe-carousel{display:flex !important;gap:20px !important;width:100% !important;margin:0 0 35px !important;padding:10px 0 !important;overflow-x:auto !important;scroll-behavior:smooth !important;scrollbar-width:none !important;-ms-overflow-style:none !important}
.aj-aoe-carousel::-webkit-scrollbar{display:none !important}
.aj-aoe-card{flex:0 0 calc(25% - 15px) !important;min-width:240px !important;background:#fff !important;border-radius:28px !important;padding:40px 24px 35px !important;display:flex !important;flex-direction:column !important;align-items:center !important;text-align:center !important;box-shadow:0 10px 25px rgba(0,0,0,.08) !important;transition:transform .35s ease,box-shadow .35s ease !important;cursor:pointer !important}
.aj-aoe-card:hover{transform:translateY(-6px) !important;box-shadow:0 15px 30px rgba(0,0,0,.14) !important}
.aj-aoe-icon-wrap{height:70px !important;display:flex !important;align-items:center !important;justify-content:center !important;margin-bottom:24px !important;width:100% !important}
.aj-aoe-icon-wrap svg{width:58px !important;height:58px !important}
.aj-aoe-card-title{font-size:1.35rem !important;font-weight:800 !important;color:#111 !important;margin:0 0 16px !important;line-height:1.25 !important}
.aj-aoe-card-desc{font-size:.85rem !important;line-height:1.55 !important;color:#444 !important;font-weight:400 !important;margin:0 !important}
.aj-aoe-controls{display:flex !important;justify-content:center !important;align-items:center !important;gap:14px !important;position:relative !important;z-index:2 !important}
.aj-aoe-arrow{width:22px !important;height:32px !important;background:rgba(255,255,255,.4) !important;border-radius:6px !important;display:flex !important;align-items:center !important;justify-content:center !important;cursor:pointer !important;transition:background .25s ease !important;border:none !important;padding:0 !important}
.aj-aoe-arrow:hover{background:rgba(255,255,255,.7) !important}
.aj-aoe-arrow svg{width:12px !important;height:12px !important;fill:#fff !important}
.aj-aoe-dots{display:flex !important;align-items:center !important;gap:8px !important}
.aj-aoe-dot{width:10px !important;height:10px !important;border-radius:50% !important;background:rgba(255,255,255,.5) !important;cursor:pointer !important;transition:all .3s ease !important;border:none !important;padding:0 !important}
.aj-aoe-dot.active{background:#00d2ff !important;transform:scale(1.25) !important}
@media (max-width:1024px){
  .aj-aoe-card{flex:0 0 calc(50% - 10px) !important}
}
@media (max-width:600px){
  .aj-aoe-section{padding:40px 20px 30px !important;border-radius:24px !important}
  .aj-aoe-title{font-size:2rem !important}
  .aj-aoe-subtitle{font-size:.95rem !important;margin-bottom:28px !important}
  .aj-aoe-card{flex:0 0 calc(100% - 20px) !important}
}
`;

function BoardIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    </svg>
  );
}

export function AboutAreas({ hero }: { hero: PageHero }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setPage(maxScroll > 8 && track.scrollLeft > maxScroll / 2 ? 1 : 0);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  function jump(next: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: next === 0 ? 0 : track.scrollWidth, behavior: "smooth" });
  }

  return (
    <div className={`aj-aoe-wrap ${poppins.className}`}>
      <style>{areasCss}</style>
      <section data-edit="about-expertise" className="aj-aoe-section">
        <h2 className="aj-aoe-title">{hero.areasTitle}</h2>
        <p className="aj-aoe-subtitle">
          {hero.areasSubtitle.split("\n").map((line, index, lines) => (
            <span key={line}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
        <div className="aj-aoe-carousel" ref={trackRef}>
          {hero.areas.map((area) => (
            <article className="aj-aoe-card" key={area.title}>
              <div className="aj-aoe-icon-wrap">
                <BoardIcon />
              </div>
              <h3 className="aj-aoe-card-title">{area.title}</h3>
              <p className="aj-aoe-card-desc">{area.description}</p>
            </article>
          ))}
        </div>
        <div className="aj-aoe-controls">
          <button type="button" className="aj-aoe-arrow" aria-label="Previous areas" onClick={() => move(-1)}>
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <div className="aj-aoe-dots">
            {[0, 1].map((dot) => (
              <button
                key={dot}
                type="button"
                className={`aj-aoe-dot${page === dot ? " active" : ""}`}
                aria-label={dot === 0 ? "First areas" : "Last areas"}
                onClick={() => jump(dot)}
              />
            ))}
          </div>
          <button type="button" className="aj-aoe-arrow" aria-label="Next areas" onClick={() => move(1)}>
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
