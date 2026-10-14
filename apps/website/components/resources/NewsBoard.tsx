"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import type { NewsHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageSize = 9;

const newsCss = `
#aj-news-strict-wrapper,#aj-news-strict-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
#aj-news-strict-wrapper{position:relative !important;width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#fff 0%,#fae6c6 100%) !important;padding:80px 5% !important;display:flex !important;flex-direction:column !important;align-items:center !important;overflow-x:clip !important}
#aj-news-strict-wrapper .aj-news-inner{width:100% !important;max-width:1200px !important;min-width:0 !important;margin:0 auto !important;display:block !important}
#aj-news-strict-wrapper .aj-news-grid{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:30px !important;margin-bottom:50px !important;width:100% !important}
#aj-news-strict-wrapper .aj-news-card{background:#fff !important;border:1px solid #D5E1F2 !important;border-radius:24px !important;padding:18px !important;display:flex !important;flex-direction:column !important;min-width:0 !important;transition:transform .3s ease,box-shadow .3s ease !important}
#aj-news-strict-wrapper .aj-news-card:hover{transform:translateY(-5px) !important;box-shadow:0 15px 30px rgba(0,0,0,.08) !important}
#aj-news-strict-wrapper .aj-news-img{width:100% !important;max-width:none !important;height:180px !important;border-radius:16px !important;object-fit:cover !important;background:#F3F4F6 !important;margin-bottom:20px !important;display:block !important}
#aj-news-strict-wrapper .aj-news-meta{display:flex !important;align-items:center !important;flex-wrap:wrap !important;gap:12px !important;margin-bottom:12px !important}
#aj-news-strict-wrapper .aj-news-year{border:1px solid #8B5CF6 !important;color:#8B5CF6 !important;font-size:.75rem !important;font-weight:600 !important;padding:4px 14px !important;border-radius:20px !important}
#aj-news-strict-wrapper .aj-news-category{font-size:.85rem !important;font-weight:700 !important;color:#8B5CF6 !important;line-height:1.3 !important}
#aj-news-strict-wrapper .aj-news-title{font-size:1.15rem !important;font-weight:800 !important;color:#000 !important;line-height:1.35 !important;margin:0 0 10px !important;display:-webkit-box !important;-webkit-line-clamp:3 !important;-webkit-box-orient:vertical !important;overflow:hidden !important}
#aj-news-strict-wrapper .aj-news-desc{font-size:.9rem !important;color:#555 !important;line-height:1.6 !important;margin:0 0 24px !important;flex-grow:1 !important;display:-webkit-box !important;-webkit-line-clamp:3 !important;-webkit-box-orient:vertical !important;overflow:hidden !important}
#aj-news-strict-wrapper .aj-news-btn{display:block !important;width:100% !important;text-align:center !important;background:#8B5CF6 !important;color:#fff !important;font-size:.95rem !important;font-weight:700 !important;text-decoration:none !important;padding:12px !important;border-radius:30px !important;transition:background .2s ease !important;margin-top:auto !important}
#aj-news-strict-wrapper .aj-news-btn:hover{background:#7C3AED !important}
#aj-news-strict-wrapper .aj-news-pagination{display:flex !important;align-items:center !important;justify-content:center !important;flex-wrap:wrap !important;gap:12px !important}
#aj-news-strict-wrapper .aj-news-page-num{display:inline-flex !important;align-items:center !important;justify-content:center !important;width:34px !important;height:34px !important;border-radius:6px !important;font-size:.95rem !important;font-weight:600 !important;cursor:pointer !important;border:1px solid #D1D5DB !important;background:#fff !important;color:#374151 !important;padding:0 !important;transition:all .2s ease !important}
#aj-news-strict-wrapper .aj-news-page-num.active{background:#8B5CF6 !important;color:#fff !important;border-color:#8B5CF6 !important}
#aj-news-strict-wrapper .aj-news-page-num:hover:not(.active){border-color:#8B5CF6 !important;color:#8B5CF6 !important}
@media (max-width:992px){
  #aj-news-strict-wrapper .aj-news-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}
}
@media (max-width:600px){
  #aj-news-strict-wrapper{padding:50px 16px !important}
  #aj-news-strict-wrapper .aj-news-grid{grid-template-columns:1fr !important}
}
`;

export function NewsBoard({ hero }: { hero: NewsHero }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(hero.cards.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = hero.cards.slice(safePage * pageSize, safePage * pageSize + pageSize);

  return (
    <section data-edit="news-cards" id="aj-news-strict-wrapper" className={poppins.className}>
      <style>{newsCss}</style>
      <div className="aj-news-inner">
        <div className="aj-news-grid">
          {visible.map((card, index) => (
            <article className="aj-news-card" key={`${card.href}-${index}`}>
              {card.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img className="aj-news-img" src={card.image} alt={card.alt} />
              ) : (
                <div className="aj-news-img" role="img" aria-label={card.alt} />
              )}
              <div className="aj-news-meta">
                <span className="aj-news-year">{card.year}</span>
                <span className="aj-news-category">{card.category}</span>
              </div>
              <h3 className="aj-news-title">{card.title}</h3>
              <p className="aj-news-desc">{card.description}</p>
              <a className="aj-news-btn" href={card.href} target="_blank" rel="noopener noreferrer">
                {card.buttonLabel}
              </a>
            </article>
          ))}
        </div>
        <div className="aj-news-pagination">
          {Array.from({ length: pageCount }, (_, index) => (
            <button key={index} type="button" className={`aj-news-page-num${safePage === index ? " active" : ""}`} onClick={() => setPage(index)}>
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
