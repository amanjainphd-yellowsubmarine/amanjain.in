"use client";

import { Poppins } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import type { PodcastEpisode, PodcastHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const railsCss = `
.aj-pod-rails,.aj-pod-rails *{box-sizing:border-box !important;font-family:inherit !important}
.aj-pod-rails{position:relative !important;width:100% !important;max-width:100% !important;min-width:0 !important;background:linear-gradient(180deg,#fff 0%,#fdf5eb 100%) !important;padding:80px 0 !important;display:flex !important;flex-direction:column !important;align-items:center !important;overflow:hidden !important}
.aj-pod-rails .aj-pod-header{text-align:center !important;margin-bottom:40px !important;padding:0 20px !important;width:100% !important;max-width:760px !important;box-sizing:border-box !important}
.aj-pod-rails .aj-pod-title{font-size:clamp(1.7rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 12px !important;letter-spacing:-.5px !important;line-height:1.15 !important;text-wrap:balance !important;overflow-wrap:anywhere !important}
.aj-pod-rails .aj-pod-title span{color:#8A58FC !important}
.aj-pod-rails .aj-pod-subtitle{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#111 !important;margin:0 !important;line-height:1.5 !important}
.aj-pod-rails .aj-pod-carousel-wrap{position:relative !important;width:100% !important;max-width:1160px !important;min-width:0 !important;margin:0 auto 60px !important}
.aj-pod-rails .aj-pod-carousel-wrap:last-child{margin-bottom:0 !important}
.aj-pod-rails .aj-pod-carousel{display:flex !important;align-items:stretch !important;justify-content:flex-start !important;width:100% !important;min-width:0 !important;gap:24px !important;padding:10px 40px 18px !important;overflow-x:auto !important;overflow-y:hidden !important;scroll-snap-type:x mandatory !important;-webkit-overflow-scrolling:touch !important;scrollbar-width:none !important}
.aj-pod-rails .aj-pod-carousel::-webkit-scrollbar{display:none !important}
.aj-pod-rails .aj-pod-arrow{position:absolute !important;top:40% !important;transform:translateY(-50%) !important;width:28px !important;height:50px !important;background:rgba(0,0,0,.08) !important;border:none !important;border-radius:6px !important;display:flex !important;align-items:center !important;justify-content:center !important;cursor:pointer !important;z-index:5 !important;padding:0 !important;transition:background .25s ease !important}
.aj-pod-rails .aj-pod-arrow:hover{background:rgba(0,0,0,.15) !important}
.aj-pod-rails .aj-pod-arrow.prev{left:5px !important}
.aj-pod-rails .aj-pod-arrow.next{right:5px !important}
.aj-pod-rails .aj-pod-arrow svg{width:14px !important;height:14px !important;fill:#333 !important}
.aj-pod-rails .aj-pod-card{position:relative !important;width:340px !important;min-width:340px !important;background:#fff !important;border-radius:24px !important;display:flex !important;flex-direction:column !important;box-shadow:0 10px 30px rgba(0,0,0,.03) !important;flex-shrink:0 !important;overflow:hidden !important;scroll-snap-align:center !important;transition:transform .3s ease,box-shadow .3s ease !important}
.aj-pod-rails .aj-pod-card:hover{transform:translateY(-5px) !important;box-shadow:0 15px 40px rgba(0,0,0,.06) !important}
.aj-pod-rails .aj-theme-teal{border:1px solid #00B4C9 !important}
.aj-pod-rails .aj-theme-purple{border:1px solid #8A58FC !important}
.aj-pod-rails .aj-pod-img{width:100% !important;height:180px !important;object-fit:cover !important;border-bottom:1px solid #f0f0f0 !important}
.aj-pod-rails .aj-pod-content{padding:24px !important;display:flex !important;flex-direction:column !important;flex-grow:1 !important;min-width:0 !important}
.aj-pod-rails .aj-pod-tags-text{font-size:.8rem !important;font-weight:600 !important;color:#8A58FC !important;margin-bottom:12px !important;line-height:1.4 !important}
.aj-pod-rails .aj-pod-tags-pills{display:flex !important;flex-wrap:wrap !important;gap:8px !important;margin-bottom:16px !important}
.aj-pod-rails .aj-pod-pill{font-size:.8rem !important;font-weight:600 !important;color:#00B4C9 !important;border:1px solid #00B4C9 !important;padding:4px 12px !important;border-radius:20px !important}
.aj-pod-rails .aj-pod-card-title{font-size:1.15rem !important;font-weight:800 !important;color:#000 !important;line-height:1.3 !important;margin:0 0 12px !important}
.aj-pod-rails .aj-pod-desc{font-size:.95rem !important;color:#555 !important;line-height:1.5 !important;margin:0 0 20px !important;flex-grow:1 !important}
.aj-pod-rails .aj-pod-duration{display:flex !important;align-items:center !important;gap:8px !important;font-size:.85rem !important;font-weight:500 !important;color:#333 !important;margin-bottom:24px !important}
.aj-pod-rails .aj-pod-duration svg{width:18px !important;height:18px !important;stroke:#8A58FC !important;flex-shrink:0 !important}
.aj-pod-rails .aj-pod-btn{display:flex !important;align-items:center !important;justify-content:center !important;gap:8px !important;width:100% !important;min-height:48px !important;padding:12px !important;border-radius:30px !important;color:#fff !important;font-size:1rem !important;font-weight:700 !important;text-decoration:none !important;transition:opacity .2s ease !important}
.aj-pod-rails .aj-pod-btn:hover{opacity:.9 !important}
.aj-pod-rails .aj-pod-btn svg{width:18px !important;height:18px !important}
.aj-pod-rails .aj-theme-teal .aj-pod-btn{background:#00B4C9 !important}
.aj-pod-rails .aj-theme-purple .aj-pod-btn{background:#8A58FC !important}
.aj-pod-rails .aj-pod-dots{display:flex !important;justify-content:center !important;align-items:center !important;gap:0 !important;margin-top:8px !important}
.aj-pod-rails .aj-pod-dot{position:relative !important;width:44px !important;height:44px !important;border-radius:50% !important;background:transparent !important;border:none !important;cursor:pointer !important;padding:0 !important}
.aj-pod-rails .aj-pod-dot::before{content:"" !important;position:absolute !important;left:50% !important;top:50% !important;width:8px !important;height:8px !important;border-radius:50% !important;background:#d4d4d4 !important;transform:translate(-50%,-50%) !important}
.aj-pod-rails .aj-pod-dot.active::before{background:#00B4C9 !important}
.aj-pod-rails .aj-theme-purple-dots .aj-pod-dot.active::before{background:#8A58FC !important}
@media (max-width:768px){
  .aj-pod-rails .aj-pod-arrow{display:none !important}
  .aj-pod-rails{padding:48px 0 !important}
  .aj-pod-rails .aj-pod-header{padding:0 20px !important}
  .aj-pod-rails .aj-pod-card{width:min(84vw,340px) !important;min-width:min(84vw,340px) !important}
  .aj-pod-rails .aj-pod-carousel{justify-content:flex-start !important;padding:8px calc((100% - min(84vw,340px)) / 2) 12px !important;scroll-padding-inline:calc((100% - min(84vw,340px)) / 2) !important}
}
`;

function Clock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function Play() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}

function PodcastRail({
  episodes,
  theme,
  buttonLabel,
}: {
  episodes: PodcastEpisode[];
  theme: "teal" | "purple";
  buttonLabel: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  function read() {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".aj-pod-card");
    const step = (card?.offsetWidth ?? 340) + 24;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const nextPages = max <= 8 ? 1 : Math.max(1, Math.round(max / step) + 1);
    setPages(nextPages);
    setPage(nextPages === 1 ? 0 : Math.min(nextPages - 1, Math.round(el.scrollLeft / step)));
  }

  useEffect(() => {
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, [episodes.length]);

  function go(next: number) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".aj-pod-card");
    const step = (card?.offsetWidth ?? 340) + 24;
    el.scrollTo({ left: next * step, behavior: "smooth" });
  }

  return (
    <div className="aj-pod-carousel-wrap">
      {pages > 1 ? (
        <button className="aj-pod-arrow prev" type="button" aria-label="Previous" onClick={() => go(Math.max(0, page - 1))}>
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
        </button>
      ) : null}
      <div className="aj-pod-carousel" ref={scroller} onScroll={read}>
        {episodes.map((episode) => (
          <article className={`aj-pod-card aj-theme-${theme}`} key={`${episode.title}-${episode.href}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="aj-pod-img" src={episode.image} alt={episode.alt} width="680" height="360" loading="lazy" decoding="async" />
            <div className="aj-pod-content">
              {theme === "teal" ? <div className="aj-pod-tags-text">{episode.tags.join(" | ")}</div> : (
                <div className="aj-pod-tags-pills">
                  {episode.tags.map((tag) => (
                    <span className="aj-pod-pill" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              <h3 className="aj-pod-card-title">{episode.title}</h3>
              <p className="aj-pod-desc">{episode.description}</p>
              <div className="aj-pod-duration">
                <Clock />
                {episode.duration}
              </div>
              <a className="aj-pod-btn" href={episode.href} target="_blank" rel="noopener noreferrer">
                <Play />
                {buttonLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
      {pages > 1 ? (
        <button className="aj-pod-arrow next" type="button" aria-label="Next" onClick={() => go(Math.min(pages - 1, page + 1))}>
          <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
        </button>
      ) : null}
      {pages > 1 ? (
        <div className={`aj-pod-dots${theme === "purple" ? " aj-theme-purple-dots" : ""}`}>
          {Array.from({ length: pages }, (_, index) => (
            <button key={index} type="button" className={`aj-pod-dot${page === index ? " active" : ""}`} aria-label={`Page ${index + 1}`} onClick={() => go(index)} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function PodcastGossip({ hero }: { hero: PodcastHero }) {
  const episodes = hero.gossip ?? [];
  const title = hero.gossipTitle || "The Leadership Gossip";
  return (
    <section data-edit="podcasts-upcoming" id="aj-pod-gossip" className={`aj-pod-rails ${poppins.className}`}>
      <style>{railsCss}</style>
      <div className="aj-pod-header">
        <h2 className="aj-pod-title">{title}</h2>
        {hero.gossipSubtitle ? <p className="aj-pod-subtitle">{hero.gossipSubtitle}</p> : null}
      </div>
      {episodes.length > 0 ? <PodcastRail episodes={episodes} theme="teal" buttonLabel={hero.gossipButton || "Listen Now"} /> : null}
    </section>
  );
}

export function PodcastRails({ hero }: { hero: PodcastHero }) {
  return (
    <section data-edit="podcasts-cards" id="aj-pod-rails" className={`aj-pod-rails ${poppins.className}`}>
      <style>{railsCss}</style>
      <div className="aj-pod-header">
        <h2 className="aj-pod-title">
          {hero.featuringLead} <span>{hero.featuringAccent}</span>
        </h2>
        <p className="aj-pod-subtitle">{hero.featuringSubtitle}</p>
      </div>
      <PodcastRail episodes={hero.featuring} theme="teal" buttonLabel={hero.featuringButton} />
      <div className="aj-pod-header">
        <h2 className="aj-pod-title">{hero.recommendedTitle}</h2>
        <p className="aj-pod-subtitle">{hero.recommendedSubtitle}</p>
      </div>
      <PodcastRail episodes={hero.recommended} theme="purple" buttonLabel={hero.recommendedButton} />
    </section>
  );
}
