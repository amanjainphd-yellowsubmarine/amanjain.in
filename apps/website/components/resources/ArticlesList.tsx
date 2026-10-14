"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import type { ArticlesHero } from "@/lib/content";
import { GatedResourceLink } from "@/components/resources/GatedResourceLink";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageSize = 9;

const listCss = `
#aj-articles-list,#aj-articles-list *{box-sizing:border-box !important;font-family:inherit !important}
#aj-articles-list{width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#fff 60%,#FFF9E6 100%) !important;padding:80px 5% !important;display:flex !important;justify-content:center !important;overflow-x:clip !important}
#aj-articles-list .aj-pub-container{width:100% !important;max-width:1280px !important;min-width:0 !important}
#aj-articles-list .aj-pub-header{text-align:center !important;margin-bottom:50px !important}
#aj-articles-list .aj-pub-title{font-size:clamp(2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 15px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-articles-list .aj-pub-subtitle{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#111 !important;max-width:850px !important;margin:0 auto !important;line-height:1.5 !important}
#aj-articles-list .aj-pub-featured{display:flex !important;flex-direction:column !important;gap:0 !important;margin-bottom:60px !important}
#aj-articles-list .aj-feat-item{display:flex !important;align-items:center !important;gap:30px !important;padding:35px 0 !important;border-bottom:1px solid #E5E7EB !important;min-width:0 !important}
#aj-articles-list .aj-feat-icon{flex:0 0 110px !important;width:110px !important;height:110px !important;background:#E6F5F3 !important;border-radius:16px !important;display:flex !important;align-items:center !important;justify-content:center !important}
#aj-articles-list .aj-feat-icon svg{width:45px !important;height:45px !important;stroke:#0F766E !important;fill:none !important}
#aj-articles-list .aj-feat-content{flex:1 !important;min-width:0 !important}
#aj-articles-list .aj-feat-mag{display:inline-flex !important;align-items:center !important;gap:6px !important;font-size:.75rem !important;font-weight:700 !important;color:#0D9488 !important;text-transform:uppercase !important;letter-spacing:.5px !important;margin-bottom:8px !important;line-height:1.3 !important}
#aj-articles-list .aj-feat-mag svg{width:14px !important;height:14px !important;stroke:currentColor !important;fill:none !important;flex-shrink:0 !important}
#aj-articles-list .aj-feat-title{font-size:1.3rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 10px !important;line-height:1.3 !important}
#aj-articles-list .aj-feat-desc{font-size:.9rem !important;color:#374151 !important;margin:0 0 15px !important;line-height:1.6 !important;max-width:90% !important}
#aj-articles-list .aj-feat-highlights-lbl{font-size:.95rem !important;font-weight:700 !important;color:#000 !important;margin:0 0 10px !important}
#aj-articles-list .aj-feat-tags{display:flex !important;flex-wrap:wrap !important;gap:16px !important}
#aj-articles-list .aj-feat-tag{display:inline-flex !important;align-items:center !important;gap:8px !important;font-size:.85rem !important;font-weight:600 !important;color:#374151 !important}
#aj-articles-list .aj-feat-dot{width:8px !important;height:8px !important;border-radius:50% !important;background:#60A5FA !important;flex-shrink:0 !important}
#aj-articles-list .aj-feat-action{flex:0 0 auto !important;padding-left:40px !important;border-left:2px solid #E5E7EB !important;display:flex !important;align-items:center !important;height:100px !important}
#aj-articles-list .aj-btn-download{display:inline-block !important;padding:12px 28px !important;background:linear-gradient(90deg,#CCFBF1 0%,#FEF9C3 100%) !important;color:#000 !important;font-weight:800 !important;font-size:.95rem !important;border-radius:30px !important;text-decoration:none !important;transition:transform .2s ease,box-shadow .2s ease !important;white-space:nowrap !important}
#aj-articles-list .aj-btn-download:hover{transform:translateY(-2px) !important;box-shadow:0 6px 15px rgba(0,0,0,.05) !important}
#aj-articles-list .aj-pub-grid{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:25px !important;margin-bottom:50px !important}
#aj-articles-list .aj-grid-card{background:#fff !important;border:1px solid #BFDBFE !important;border-radius:20px !important;overflow:hidden !important;display:flex !important;flex-direction:column !important;min-width:0 !important;transition:transform .3s ease,box-shadow .3s ease !important}
#aj-articles-list .aj-grid-card:hover{transform:translateY(-6px) !important;box-shadow:0 15px 35px rgba(0,0,0,.08) !important}
#aj-articles-list .aj-card-thumbnail{width:100% !important;max-width:none !important;height:200px !important;object-fit:cover !important;background:#D1D5DB !important;display:block !important}
#aj-articles-list .aj-grid-body{padding:24px !important;display:flex !important;flex-direction:column !important;flex:1 !important;min-width:0 !important}
#aj-articles-list .aj-grid-title{font-size:1.1rem !important;font-weight:800 !important;color:#000 !important;line-height:1.3 !important;margin:0 0 12px !important;display:-webkit-box !important;-webkit-line-clamp:3 !important;-webkit-box-orient:vertical !important;overflow:hidden !important}
#aj-articles-list .aj-grid-desc{font-size:.85rem !important;color:#4B5563 !important;margin:0 0 20px !important;line-height:1.5 !important;flex:1 !important}
#aj-articles-list .aj-grid-meta{display:flex !important;align-items:center !important;gap:8px !important;font-size:.85rem !important;font-weight:600 !important;color:#374151 !important;margin-bottom:20px !important}
#aj-articles-list .aj-grid-meta svg{width:20px !important;height:20px !important;stroke:#8B5CF6 !important;fill:none !important;flex-shrink:0 !important}
#aj-articles-list .aj-btn-read{display:block !important;width:100% !important;text-align:center !important;background:#8B5CF6 !important;color:#fff !important;padding:12px 0 !important;border-radius:30px !important;font-weight:600 !important;font-size:.95rem !important;text-decoration:none !important;transition:background .2s ease !important;margin-top:auto !important}
#aj-articles-list .aj-btn-read:hover{background:#7C3AED !important}
#aj-articles-list .aj-pagination{display:flex !important;justify-content:center !important;align-items:center !important;gap:12px !important;flex-wrap:wrap !important}
#aj-articles-list .aj-page-num{width:32px !important;height:32px !important;border-radius:6px !important;border:1px solid #D1D5DB !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;font-size:.9rem !important;font-weight:600 !important;color:#374151 !important;background:#fff !important;cursor:pointer !important;padding:0 !important;transition:all .2s ease !important}
#aj-articles-list .aj-page-num.active{background:#8B5CF6 !important;color:#fff !important;border-color:#8B5CF6 !important}
#aj-articles-list .aj-page-num:hover:not(.active){border-color:#8B5CF6 !important;color:#8B5CF6 !important}
@media (max-width:900px){
  #aj-articles-list .aj-feat-item{flex-direction:column !important;align-items:flex-start !important;gap:20px !important}
  #aj-articles-list .aj-feat-desc{max-width:100% !important}
  #aj-articles-list .aj-feat-action{border-left:none !important;border-top:1px solid #E5E7EB !important;padding-left:0 !important;padding-top:25px !important;height:auto !important;width:100% !important}
  #aj-articles-list .aj-pub-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}
}
@media (max-width:600px){
  #aj-articles-list{padding:48px 16px !important}
  #aj-articles-list .aj-pub-grid{grid-template-columns:1fr !important}
  #aj-articles-list .aj-feat-title{font-size:1.15rem !important}
}
`;

function Lines({ value }: { value: string }) {
  const lines = value.split("\n");
  return lines.map((line, index) => (
    <span key={`${index}-${line}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ArticlesList({ hero }: { hero: ArticlesHero }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(hero.cards.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = hero.cards.slice(safePage * pageSize, safePage * pageSize + pageSize);

  return (
    <section data-edit="articles-list" id="aj-articles-list" className={poppins.className}>
      <style>{listCss}</style>
      <div className="aj-pub-container">
        <div className="aj-pub-header">
          <h2 className="aj-pub-title">{hero.listTitle}</h2>
          <p className="aj-pub-subtitle">
            <Lines value={hero.listSubtitle} />
          </p>
        </div>
        <div className="aj-pub-featured">
          {hero.features.map((feature) => (
            <article className="aj-feat-item" key={feature.href}>
              <div className="aj-feat-icon">
                <DocIcon />
              </div>
              <div className="aj-feat-content">
                <span className="aj-feat-mag">
                  <TargetIcon />
                  {feature.magazine}
                </span>
                <h3 className="aj-feat-title">{feature.title}</h3>
                <p className="aj-feat-desc">{feature.description}</p>
                <div className="aj-feat-highlights-lbl">Key Highlights</div>
                <div className="aj-feat-tags">
                  {feature.highlights.map((highlight) => (
                    <span className="aj-feat-tag" key={highlight}>
                      <span className="aj-feat-dot" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="aj-feat-action">
                <GatedResourceLink
                  page="Articles & Research Papers"
                  title={feature.title}
                  href={feature.href}
                  action={/download/i.test(feature.buttonLabel) ? "download" : "read"}
                  className="aj-btn-download"
                >
                  {feature.buttonLabel}
                </GatedResourceLink>
              </div>
            </article>
          ))}
        </div>
        <div className="aj-pub-grid">
          {visible.map((card) => (
            <article className="aj-grid-card" key={card.href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="aj-card-thumbnail" src={card.image} alt={card.alt} />
              <div className="aj-grid-body">
                <h3 className="aj-grid-title">{card.title}</h3>
                <p className="aj-grid-desc">{card.description}</p>
                <div className="aj-grid-meta">
                  <ClockIcon />
                  {card.duration}
                </div>
                <GatedResourceLink
                  page="Articles & Research Papers"
                  title={card.title}
                  href={card.href}
                  action={/download/i.test(card.buttonLabel) ? "download" : "read"}
                  className="aj-btn-read"
                >
                  {card.buttonLabel}
                </GatedResourceLink>
              </div>
            </article>
          ))}
        </div>
        <div className="aj-pagination">
          {Array.from({ length: pageCount }, (_, index) => (
            <button key={index} type="button" className={`aj-page-num${safePage === index ? " active" : ""}`} onClick={() => setPage(index)}>
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
