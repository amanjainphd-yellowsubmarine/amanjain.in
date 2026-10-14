"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import type { CaseletsHero } from "@/lib/content";
import { GatedResourceLink } from "@/components/resources/GatedResourceLink";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageSize = 6;

const boardCss = `
#aj-caselets-board,#aj-caselets-board *{box-sizing:border-box !important;font-family:inherit !important}
#aj-caselets-board{width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#fff 0%,#fae6c6 100%) !important;padding:60px 40px 0 !important;display:flex !important;flex-direction:column !important;align-items:center !important;overflow-x:clip !important}
#aj-caselets-board .aj-saas-inner{width:100% !important;max-width:1300px !important;min-width:0 !important;margin:0 auto !important}
#aj-caselets-board .aj-saas-grid{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:24px !important;margin-bottom:50px !important}
#aj-caselets-board .aj-saas-card{background:#fff !important;border:1px solid #b6bdf5 !important;border-radius:24px !important;padding:24px !important;display:flex !important;flex-direction:column !important;min-width:0 !important;transition:box-shadow .2s ease,transform .2s ease !important}
#aj-caselets-board .aj-saas-card:hover{transform:translateY(-4px) !important;box-shadow:0 15px 30px rgba(0,0,0,.05) !important}
#aj-caselets-board .aj-saas-tag{display:flex !important;align-items:center !important;gap:8px !important;font-size:.75rem !important;font-weight:600 !important;color:#111 !important;text-transform:uppercase !important;letter-spacing:.5px !important;margin-bottom:16px !important;line-height:1.3 !important}
#aj-caselets-board .aj-saas-tag svg{width:16px !important;height:16px !important;stroke:#56B9C7 !important;fill:none !important;stroke-width:2 !important;flex-shrink:0 !important}
#aj-caselets-board .aj-saas-title{font-size:1.1rem !important;font-weight:800 !important;color:#000 !important;line-height:1.3 !important;margin:0 0 12px !important}
#aj-caselets-board .aj-saas-desc{font-size:.85rem !important;color:#444 !important;line-height:1.5 !important;margin:0 0 20px !important}
#aj-caselets-board .aj-saas-outcome{background:#fdf6d2 !important;padding:16px !important;border-radius:12px !important;margin-bottom:24px !important;flex-grow:1 !important}
#aj-caselets-board .aj-saas-outcome p{font-size:.8rem !important;color:#333 !important;line-height:1.6 !important;margin:0 !important}
#aj-caselets-board .aj-saas-outcome-bold{font-weight:700 !important;color:#111 !important}
#aj-caselets-board .aj-saas-btn{display:block !important;width:100% !important;text-align:center !important;background:#8A58FC !important;color:#fff !important;font-size:.9rem !important;font-weight:600 !important;text-decoration:none !important;padding:12px !important;border-radius:30px !important;transition:background .2s ease !important;margin-top:auto !important}
#aj-caselets-board .aj-saas-btn:hover{background:#7142df !important}
#aj-caselets-board .aj-saas-pagination{display:flex !important;align-items:center !important;justify-content:center !important;flex-wrap:wrap !important;gap:12px !important;margin-bottom:40px !important}
#aj-caselets-board .aj-saas-page-arrow,#aj-caselets-board .aj-saas-page-num{display:inline-flex !important;align-items:center !important;justify-content:center !important;border:none !important;cursor:pointer !important;padding:0 !important}
#aj-caselets-board .aj-saas-page-arrow{width:24px !important;height:24px !important;background:#d4d4d4 !important;border-radius:4px !important}
#aj-caselets-board .aj-saas-page-arrow:disabled{opacity:.45 !important;cursor:not-allowed !important}
#aj-caselets-board .aj-saas-page-arrow svg{width:14px !important;height:14px !important;fill:#fff !important}
#aj-caselets-board .aj-saas-page-num{width:32px !important;height:32px !important;border-radius:50% !important;font-size:.85rem !important;font-weight:700 !important;background:transparent !important;border:1px solid #8A58FC !important;color:#8A58FC !important}
#aj-caselets-board .aj-saas-page-num.active{background:#8A58FC !important;border-color:#8A58FC !important;color:#fff !important}
#aj-caselets-close{width:100% !important;max-width:100% !important;height:320px !important;min-height:320px !important;max-height:320px !important;background:linear-gradient(180deg,#fae6c6 0%,#fff 100%) !important;display:flex !important;flex-direction:column !important;justify-content:center !important;align-items:center !important;text-align:center !important;padding:20px !important;overflow:hidden !important}
#aj-caselets-close .aj-cta-warm-heading{font-size:clamp(2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-caselets-close .aj-cta-warm-subheading{font-size:clamp(1rem,2vw,1.25rem) !important;font-weight:600 !important;color:#111 !important;margin:0 0 35px !important;line-height:1.4 !important;max-width:720px !important}
#aj-caselets-close .aj-cta-warm-button{display:inline-flex !important;align-items:center !important;justify-content:center !important;background:linear-gradient(90deg,#895AFB 0%,#56B9C7 100%) !important;color:#fff !important;font-size:1.15rem !important;font-weight:700 !important;text-decoration:none !important;padding:14px 45px !important;border-radius:50px !important;box-shadow:0 8px 20px rgba(137,90,251,.2) !important;transition:transform .2s ease,box-shadow .2s ease !important}
#aj-caselets-close .aj-cta-warm-button:hover{transform:translateY(-2px) !important;box-shadow:0 10px 25px rgba(137,90,251,.3) !important}
@media (max-width:1024px){
  #aj-caselets-board .aj-saas-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}
}
@media (max-width:768px){
  #aj-caselets-board{padding:50px 20px 0 !important}
  #aj-caselets-board .aj-saas-grid{grid-template-columns:1fr !important}
  #aj-caselets-close{height:auto !important;min-height:280px !important;max-height:none !important;padding:40px 20px !important}
}
@media (max-width:600px){
  #aj-caselets-board{padding:40px 15px 0 !important}
  #aj-caselets-close .aj-cta-warm-heading{font-size:2rem !important}
}
`;

function Target() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function CaseletsBoard({ hero }: { hero: CaseletsHero }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(hero.cards.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = hero.cards.slice(safePage * pageSize, safePage * pageSize + pageSize);

  return (
    <>
      <section data-edit="caselets-cards" id="aj-caselets-board" className={poppins.className}>
        <style>{boardCss}</style>
        <div className="aj-saas-inner">
          <div className="aj-saas-grid">
            {visible.map((card) => (
              <article className="aj-saas-card" key={`${card.title}-${card.href}`}>
                <div className="aj-saas-tag">
                  <Target />
                  {card.tag}
                </div>
                <h3 className="aj-saas-title">{card.title}</h3>
                <p className="aj-saas-desc">{card.description}</p>
                <div className="aj-saas-outcome">
                  <p>
                    <span className="aj-saas-outcome-bold">Outcome:</span> {card.outcome}
                  </p>
                </div>
                <GatedResourceLink
                  page="Practice Caselets"
                  title={card.title}
                  href={card.href}
                  action={/download/i.test(card.buttonLabel) ? "download" : "read"}
                  className="aj-saas-btn"
                >
                  {card.buttonLabel}
                </GatedResourceLink>
              </article>
            ))}
          </div>
          <div className="aj-saas-pagination">
            <button className="aj-saas-page-arrow" type="button" aria-label="Previous page" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
              <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button key={index} type="button" className={`aj-saas-page-num${safePage === index ? " active" : ""}`} onClick={() => setPage(index)}>
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
            <button className="aj-saas-page-arrow" type="button" aria-label="Next page" disabled={safePage === pageCount - 1} onClick={() => setPage(safePage + 1)}>
              <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
            </button>
          </div>
        </div>
      </section>
      <section data-edit="caselets-cards" id="aj-caselets-close" className={poppins.className}>
        <h2 className="aj-cta-warm-heading">{hero.ctaTitle}</h2>
        <p className="aj-cta-warm-subheading">{hero.ctaSubtitle}</p>
        <a className="aj-cta-warm-button" href={hero.ctaHref}>
          {hero.ctaLabel}
        </a>
      </section>
    </>
  );
}
