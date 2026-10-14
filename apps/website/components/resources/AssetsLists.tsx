"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import type { AssetsHero } from "@/lib/content";
import { GatedResourceLink } from "@/components/resources/GatedResourceLink";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageSize = 4;

const listsCss = `
#aj-asset-lists,#aj-asset-lists *{box-sizing:border-box !important;font-family:inherit !important}
#aj-asset-lists{position:relative !important;width:100% !important;max-width:100% !important;background:#eefbf7 !important;padding:60px 40px 80px !important;display:flex !important;flex-direction:column !important;align-items:center !important;overflow-x:clip !important}
#aj-asset-lists .aj-asset-lists-inner{width:100% !important;max-width:1300px !important;min-width:0 !important;margin:0 auto !important;display:flex !important;flex-direction:column !important;gap:60px !important}
#aj-asset-lists .aj-cat-section{width:100% !important;min-width:0 !important}
#aj-asset-lists .aj-cat-title{font-size:2.2rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 24px !important;letter-spacing:-.5px !important;line-height:1.2 !important}
#aj-asset-lists .aj-cat-slider-row{display:flex !important;align-items:center !important;gap:20px !important;min-width:0 !important}
#aj-asset-lists .aj-cat-arrow{display:flex !important;align-items:center !important;justify-content:center !important;width:24px !important;height:40px !important;background:#d4d4d4 !important;border:none !important;border-radius:4px !important;cursor:pointer !important;flex-shrink:0 !important;padding:0 !important;transition:background .2s ease !important}
#aj-asset-lists .aj-cat-arrow.next{background:#c2c2c2 !important}
#aj-asset-lists .aj-cat-arrow:hover:not(:disabled){background:#b0b0b0 !important}
#aj-asset-lists .aj-cat-arrow:disabled{cursor:not-allowed !important}
#aj-asset-lists .aj-cat-arrow svg{width:14px !important;height:14px !important;fill:#fff !important}
#aj-asset-lists .aj-cat-grid{display:grid !important;grid-template-columns:repeat(4,minmax(0,1fr)) !important;gap:20px !important;flex-grow:1 !important;min-width:0 !important}
#aj-asset-lists .aj-asset-card{background:#fff !important;border:1px solid #56B9C7 !important;border-radius:20px !important;padding:24px !important;display:flex !important;flex-direction:column !important;min-width:0 !important;transition:box-shadow .2s ease,transform .2s ease !important}
#aj-asset-lists .aj-asset-card:hover{transform:translateY(-4px) !important;box-shadow:0 15px 30px rgba(0,0,0,.05) !important}
#aj-asset-lists .aj-asset-icon{width:44px !important;height:44px !important;margin-bottom:20px !important;stroke:#56B9C7 !important;fill:none !important;stroke-width:1.5 !important;stroke-linecap:round !important;stroke-linejoin:round !important}
#aj-asset-lists .aj-asset-title{font-size:1.1rem !important;font-weight:800 !important;color:#000 !important;line-height:1.3 !important;margin:0 0 12px !important}
#aj-asset-lists .aj-asset-desc{font-size:.85rem !important;color:#444 !important;line-height:1.5 !important;margin:0 0 24px !important;flex-grow:1 !important}
#aj-asset-lists .aj-asset-btn{display:block !important;width:100% !important;text-align:center !important;background:#8A58FC !important;color:#fff !important;font-size:.9rem !important;font-weight:600 !important;text-decoration:none !important;padding:10px !important;border-radius:20px !important;transition:background .2s ease !important;margin-top:auto !important}
#aj-asset-lists .aj-asset-btn:hover{background:#7142df !important}
#aj-assets-close,#aj-assets-close *{box-sizing:border-box !important;font-family:inherit !important}
#aj-assets-close{width:100% !important;max-width:100% !important;height:320px !important;min-height:320px !important;max-height:320px !important;background:linear-gradient(180deg,#eefbf7 0%,#fff 100%) !important;display:flex !important;flex-direction:column !important;justify-content:center !important;align-items:center !important;text-align:center !important;padding:20px !important;overflow:hidden !important}
#aj-assets-close .aj-cta-mint-fade-heading{font-size:clamp(2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-assets-close .aj-cta-mint-fade-subheading{font-size:clamp(1rem,2vw,1.25rem) !important;font-weight:600 !important;color:#111 !important;margin:0 0 35px !important;line-height:1.4 !important;max-width:720px !important}
#aj-assets-close .aj-cta-mint-fade-button{display:inline-flex !important;align-items:center !important;justify-content:center !important;background:linear-gradient(90deg,#895AFB 0%,#56B9C7 100%) !important;color:#fff !important;font-size:1.15rem !important;font-weight:700 !important;text-decoration:none !important;padding:14px 45px !important;border-radius:50px !important;box-shadow:0 8px 20px rgba(137,90,251,.2) !important;transition:transform .2s ease,box-shadow .2s ease !important}
#aj-assets-close .aj-cta-mint-fade-button:hover{transform:translateY(-2px) !important;box-shadow:0 10px 25px rgba(137,90,251,.3) !important}
@media (max-width:1024px){
  #aj-asset-lists .aj-cat-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}
}
@media (max-width:768px){
  #aj-asset-lists{padding:50px 20px !important}
  #aj-asset-lists .aj-cat-arrow{display:none !important}
  #aj-asset-lists .aj-cat-grid{grid-template-columns:1fr !important}
  #aj-asset-lists .aj-cat-title{text-align:center !important}
  #aj-assets-close{height:auto !important;min-height:280px !important;max-height:none !important;padding:40px 20px !important}
}
@media (max-width:600px){
  #aj-asset-lists{padding:40px 16px !important}
  #aj-asset-lists .aj-cat-title{font-size:1.8rem !important}
  #aj-assets-close .aj-cta-mint-fade-heading{font-size:2rem !important}
}
`;

function FileIcon() {
  return (
    <svg className="aj-asset-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2h10v12H7z" />
      <path d="M9 6h6" />
      <path d="M9 10h6" />
      <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
      <path d="M4 14h16" />
    </svg>
  );
}

export function AssetsLists({ hero }: { hero: AssetsHero }) {
  const [pages, setPages] = useState<number[]>(() => hero.categories.map(() => 0));
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const apply = () => setMobile(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <section data-edit="assets-lists" id="aj-asset-lists" className={poppins.className}>
        <style>{listsCss}</style>
        <div className="aj-asset-lists-inner">
          {hero.categories.map((category, categoryIndex) => {
            const pageCount = Math.max(1, Math.ceil(category.cards.length / pageSize));
            const page = Math.min(pages[categoryIndex] ?? 0, pageCount - 1);
            const visible = mobile ? category.cards : category.cards.slice(page * pageSize, page * pageSize + pageSize);
            return (
              <div className="aj-cat-section" key={`${category.title}-${categoryIndex}`}>
                <h2 className="aj-cat-title">{category.title}</h2>
                <div className="aj-cat-slider-row">
                  <button className="aj-cat-arrow" type="button" aria-label="Previous" disabled={page === 0} onClick={() => setPages((current) => current.map((value, index) => (index === categoryIndex ? page - 1 : value)))}>
                    <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
                  </button>
                  <div className="aj-cat-grid">
                    {visible.map((card, cardIndex) => (
                      <article className="aj-asset-card" key={`${categoryIndex}-${page}-${cardIndex}`}>
                        <FileIcon />
                        <h3 className="aj-asset-title">{card.title}</h3>
                        <p className="aj-asset-desc">{card.description}</p>
                        <GatedResourceLink
                          page="Assets"
                          title={card.title}
                          href={card.href}
                          disabled={!card.href || card.href === "#"}
                          action={/download/i.test(card.buttonLabel) ? "download" : "read"}
                          className="aj-asset-btn"
                        >
                          {card.buttonLabel}
                        </GatedResourceLink>
                      </article>
                    ))}
                  </div>
                  <button className="aj-cat-arrow next" type="button" aria-label="Next" disabled={page === pageCount - 1} onClick={() => setPages((current) => current.map((value, index) => (index === categoryIndex ? page + 1 : value)))}>
                    <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section data-edit="assets-lists" id="aj-assets-close" className={poppins.className}>
        <h2 className="aj-cta-mint-fade-heading">{hero.closeTitle}</h2>
        <p className="aj-cta-mint-fade-subheading">{hero.closeSubtitle}</p>
        <a className="aj-cta-mint-fade-button" href={hero.closeHref}>
          {hero.closeLabel}
        </a>
      </section>
    </>
  );
}
