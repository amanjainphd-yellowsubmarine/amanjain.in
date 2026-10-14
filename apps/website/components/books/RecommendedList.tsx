"use client";

import { Poppins } from "next/font/google";
import { useRef, useState } from "react";
import type { RecommendedHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageSize = 4;

const listCss = `
#aj-reco-list,#aj-reco-list *{box-sizing:border-box !important;font-family:inherit !important}
#aj-reco-list{position:relative !important;width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#ffffff 0%,#fdf6ec 100%) !important;padding:80px 40px !important;display:flex !important;flex-direction:column !important;align-items:center !important;overflow-x:clip !important;scroll-margin-top:88px !important}
#aj-reco-list .aj-books-inner{width:100% !important;max-width:1100px !important;min-width:0 !important;margin:0 auto !important}
#aj-reco-list .aj-books-header{text-align:center !important;margin-bottom:50px !important}
#aj-reco-list .aj-books-title{font-size:clamp(2.5rem,4vw,3.2rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-reco-list .aj-books-subtitle{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#111 !important;margin:0 !important;line-height:1.5 !important}
#aj-reco-list .aj-books-list{display:flex !important;flex-direction:column !important;gap:30px !important}
#aj-reco-list .aj-book-card{background:#fff !important;border:1px solid #72bda3 !important;border-radius:24px !important;padding:35px 40px !important;display:flex !important;align-items:center !important;gap:40px !important;transition:box-shadow .2s ease,transform .2s ease !important;min-width:0 !important}
#aj-reco-list .aj-book-card:hover{transform:translateY(-4px) !important;box-shadow:0 15px 35px rgba(0,0,0,.04) !important}
#aj-reco-list .aj-book-cover-col{flex-shrink:0 !important;width:220px !important;display:flex !important;justify-content:center !important}
#aj-reco-list .aj-book-cover-col img{width:100% !important;height:auto !important;border-radius:4px !important;box-shadow:-15px 15px 30px rgba(0,0,0,.2) !important}
#aj-reco-list .aj-book-info-col{flex:1 !important;min-width:0 !important;display:flex !important;flex-direction:column !important}
#aj-reco-list .aj-book-title-row{display:flex !important;justify-content:space-between !important;align-items:flex-start !important;margin-bottom:12px !important;gap:20px !important}
#aj-reco-list .aj-book-card-title{font-size:1.4rem !important;font-weight:800 !important;color:#000 !important;margin:0 !important;line-height:1.2 !important}
#aj-reco-list .aj-book-rating{display:inline-flex !important;align-items:center !important;gap:6px !important;background:linear-gradient(90deg,#7191f5 0%,#68c7d6 100%) !important;padding:6px 14px !important;border-radius:20px !important;color:#fff !important;font-size:.8rem !important;font-weight:600 !important;flex-shrink:0 !important;white-space:nowrap !important}
#aj-reco-list .aj-book-rating svg{width:12px !important;height:12px !important;fill:#fff !important}
#aj-reco-list .aj-book-meta{font-size:.85rem !important;color:#333 !important;margin:0 0 6px !important}
#aj-reco-list .aj-book-meta-bold{font-weight:700 !important;color:#000 !important}
#aj-reco-list .aj-book-about-box{background:#ebe6f5 !important;padding:16px 20px !important;border-radius:12px !important;margin:20px 0 !important}
#aj-reco-list .aj-book-about-title,#aj-reco-list .aj-book-highlights-title{font-size:.95rem !important;font-weight:700 !important;color:#000 !important;margin:0 0 8px !important}
#aj-reco-list .aj-book-highlights-title{margin:0 0 10px !important}
#aj-reco-list .aj-book-about-desc{font-size:.85rem !important;color:#333 !important;line-height:1.6 !important;margin:0 !important}
#aj-reco-list .aj-book-highlights-list{list-style:none !important;padding:0 !important;margin:0 !important;display:flex !important;flex-direction:column !important;gap:8px !important}
#aj-reco-list .aj-book-highlights-list li{position:relative !important;padding-left:18px !important;font-size:.85rem !important;font-weight:500 !important;color:#222 !important;line-height:1.45 !important}
#aj-reco-list .aj-book-highlights-list li::before{content:"" !important;position:absolute !important;left:0 !important;top:6px !important;width:8px !important;height:8px !important;background:#68c7d6 !important;border-radius:50% !important}
#aj-reco-list .aj-books-pagination{display:flex !important;align-items:center !important;justify-content:center !important;flex-wrap:wrap !important;gap:10px !important;margin-top:45px !important}
#aj-reco-list .aj-page-arrow,#aj-reco-list .aj-page-num{width:40px !important;min-width:40px !important;height:40px !important;border-radius:10px !important;border:1px solid #d8d8d8 !important;background:#fff !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;cursor:pointer !important;color:#333 !important;font-size:.9rem !important;font-weight:600 !important;padding:0 !important;transition:background .15s ease,border-color .15s ease,color .15s ease !important}
#aj-reco-list .aj-page-arrow:hover:not(:disabled),#aj-reco-list .aj-page-num:hover{background:#f5f5f5 !important;border-color:#b8b8b8 !important}
#aj-reco-list .aj-page-num:hover{border-color:#7191f5 !important}
#aj-reco-list .aj-page-arrow:disabled{opacity:.35 !important;cursor:not-allowed !important}
#aj-reco-list .aj-page-arrow svg{width:16px !important;height:16px !important}
#aj-reco-list .aj-page-num.aj-active{background:linear-gradient(90deg,#7191f5 0%,#68c7d6 100%) !important;border-color:transparent !important;color:#fff !important}
@media (max-width:768px){
  #aj-reco-list{padding:50px 20px !important}
  #aj-reco-list .aj-book-card{flex-direction:column !important;padding:30px 20px !important;gap:24px !important}
  #aj-reco-list .aj-book-cover-col{width:160px !important}
  #aj-reco-list .aj-book-title-row{flex-direction:column !important;align-items:flex-start !important;gap:10px !important}
}
@media (max-width:600px){
  #aj-reco-list{padding:40px 15px !important}
  #aj-reco-list .aj-books-title{font-size:2rem !important}
  #aj-reco-list .aj-book-rating{white-space:normal !important}
}
`;

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function RecommendedList({ hero }: { hero: RecommendedHero }) {
  const [page, setPage] = useState(0);
  const root = useRef<HTMLElement>(null);
  const pageCount = Math.max(1, Math.ceil(hero.books.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = hero.books.slice(safePage * pageSize, safePage * pageSize + pageSize);

  function go(next: number) {
    const target = Math.min(Math.max(next, 0), pageCount - 1);
    setPage(target);
    root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section data-edit="reco-list" id="aj-reco-list" className={poppins.className} ref={root}>
      <style>{listCss}</style>
      <div className="aj-books-inner">
        <div className="aj-books-header">
          <h2 className="aj-books-title">{hero.listTitle}</h2>
          <p className="aj-books-subtitle">{hero.listSubtitle}</p>
        </div>
        <div className="aj-books-list">
          {visible.map((book) => (
            <article className="aj-book-card" key={`${book.title}-${book.author}`}>
              <div className="aj-book-cover-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={book.cover} alt={book.alt} />
              </div>
              <div className="aj-book-info-col">
                <div className="aj-book-title-row">
                  <h3 className="aj-book-card-title">{book.title}</h3>
                  <div className="aj-book-rating">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    {book.rating}
                  </div>
                </div>
                <p className="aj-book-meta">
                  <span className="aj-book-meta-bold">Author:</span> {book.author}
                </p>
                <p className="aj-book-meta">
                  <span className="aj-book-meta-bold">Year of Publication:</span> {book.year}
                </p>
                <p className="aj-book-meta">
                  <span className="aj-book-meta-bold">Publisher:</span> {book.publisher}
                </p>
                <div className="aj-book-about-box">
                  <h4 className="aj-book-about-title">About the Book</h4>
                  <p className="aj-book-about-desc">{book.about}</p>
                </div>
                <h4 className="aj-book-highlights-title">Key Highlights</h4>
                <ul className="aj-book-highlights-list">
                  {book.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        {pageCount > 1 ? (
          <div className="aj-books-pagination">
            <button className="aj-page-arrow" type="button" aria-label="Previous page" disabled={safePage === 0} onClick={() => go(safePage - 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button key={index} className={`aj-page-num${safePage === index ? " aj-active" : ""}`} type="button" onClick={() => go(index)}>
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
            <button className="aj-page-arrow" type="button" aria-label="Next page" disabled={safePage === pageCount - 1} onClick={() => go(safePage + 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
