import { Poppins } from "next/font/google";
import type { ArticlesHero } from "@/lib/content";
import { GatedResourceLink } from "@/components/resources/GatedResourceLink";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const researchCss = `
#aj-research,#aj-research *{box-sizing:border-box !important;font-family:inherit !important}
#aj-research{width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#FFF9E6 0%,#fff 40%) !important;padding:80px 5% !important;display:flex !important;justify-content:center !important;overflow-x:clip !important}
#aj-research .aj-research-container{width:100% !important;max-width:1280px !important;min-width:0 !important}
#aj-research .aj-research-header{text-align:center !important;margin-bottom:60px !important}
#aj-research .aj-research-title{font-size:clamp(2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 15px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-research .aj-research-subtitle{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#111 !important;max-width:950px !important;margin:0 auto !important;line-height:1.6 !important}
#aj-research .aj-research-list{display:flex !important;flex-direction:column !important}
#aj-research .aj-research-item{display:flex !important;align-items:stretch !important;gap:30px !important;padding:40px 0 !important;border-bottom:1px solid #E5E7EB !important;min-width:0 !important}
#aj-research .aj-research-item:last-child{border-bottom:none !important}
#aj-research .aj-rs-icon-box{flex:0 0 90px !important;width:90px !important;height:90px !important;border-radius:16px !important;display:flex !important;align-items:center !important;justify-content:center !important;margin-top:5px !important}
#aj-research .aj-rs-icon-box.teal-bg{background:#E6F5F3 !important}
#aj-research .aj-rs-icon-box.teal-bg svg{stroke:#0F766E !important}
#aj-research .aj-rs-icon-box.orange-bg{background:#FFEDD5 !important}
#aj-research .aj-rs-icon-box.orange-bg svg{stroke:#EA580C !important}
#aj-research .aj-rs-icon-box svg{width:40px !important;height:40px !important;fill:none !important}
#aj-research .aj-rs-content{flex:1 !important;min-width:0 !important;display:flex !important;flex-direction:column !important;justify-content:center !important}
#aj-research .aj-rs-label{font-size:.8rem !important;font-weight:700 !important;text-transform:uppercase !important;letter-spacing:.8px !important;margin-bottom:10px !important}
#aj-research .aj-rs-label.teal-text{color:#0D9488 !important}
#aj-research .aj-rs-label.orange-text{color:#EA580C !important}
#aj-research .aj-rs-title{font-size:1.25rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 10px !important;line-height:1.35 !important}
#aj-research .aj-rs-desc{font-size:.9rem !important;color:#4B5563 !important;margin:0 0 20px !important;line-height:1.6 !important;max-width:95% !important}
#aj-research .aj-rs-hl-title{font-size:.95rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 12px !important}
#aj-research .aj-rs-tags{display:flex !important;flex-wrap:wrap !important;gap:16px !important}
#aj-research .aj-rs-tag{display:inline-flex !important;align-items:center !important;gap:8px !important;font-size:.85rem !important;font-weight:600 !important;color:#374151 !important}
#aj-research .aj-rs-dot{width:8px !important;height:8px !important;border-radius:50% !important;background:#60A5FA !important;flex-shrink:0 !important}
#aj-research .aj-rs-action{flex:0 0 250px !important;border-left:1px solid #E5E7EB !important;display:flex !important;align-items:center !important;justify-content:center !important;padding-left:20px !important}
#aj-research .aj-rs-btn{display:inline-block !important;padding:12px 28px !important;background:#D8F8F1 !important;color:#000 !important;font-weight:800 !important;font-size:.95rem !important;border-radius:30px !important;text-decoration:none !important;transition:transform .2s ease,box-shadow .2s ease !important;white-space:nowrap !important}
#aj-research .aj-rs-btn:hover{transform:translateY(-2px) !important;box-shadow:0 6px 15px rgba(0,0,0,.05) !important}
@media (max-width:992px){
  #aj-research .aj-research-item{flex-direction:column !important;align-items:flex-start !important;gap:20px !important}
  #aj-research .aj-rs-icon-box{margin-top:0 !important}
  #aj-research .aj-rs-desc{max-width:100% !important}
  #aj-research .aj-rs-action{border-left:none !important;border-top:1px solid #E5E7EB !important;width:100% !important;flex:0 0 auto !important;padding-left:0 !important;padding-top:30px !important;justify-content:flex-start !important}
}
@media (max-width:600px){
  #aj-research{padding:48px 16px !important}
  #aj-research .aj-research-header{margin-bottom:36px !important}
  #aj-research .aj-rs-title{font-size:1.15rem !important}
}
`;

function PaperIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <circle cx="10" cy="9" r="2" />
    </svg>
  );
}

function CaseIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  );
}

export function ArticlesResearch({ hero }: { hero: ArticlesHero }) {
  return (
    <section data-edit="articles-research" id="aj-research" className={poppins.className}>
      <style>{researchCss}</style>
      <div className="aj-research-container">
        <div className="aj-research-header">
          <h2 className="aj-research-title">{hero.researchTitle}</h2>
          <p className="aj-research-subtitle">{hero.researchSubtitle}</p>
        </div>
        <div className="aj-research-list">
          {hero.papers.map((paper) => (
            <article className="aj-research-item" key={paper.href}>
              <div className={`aj-rs-icon-box ${paper.tone}-bg`}>{paper.tone === "orange" ? <CaseIcon /> : <PaperIcon />}</div>
              <div className="aj-rs-content">
                <div className={`aj-rs-label ${paper.tone}-text`}>{paper.label}</div>
                <h3 className="aj-rs-title">{paper.title}</h3>
                <p className="aj-rs-desc">{paper.description}</p>
                <div className="aj-rs-hl-title">Key Highlights</div>
                <div className="aj-rs-tags">
                  {paper.highlights.map((highlight) => (
                    <span className="aj-rs-tag" key={highlight}>
                      <span className="aj-rs-dot" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="aj-rs-action">
                <GatedResourceLink
                  page="Articles & Research Papers"
                  title={paper.title}
                  href={paper.href}
                  action={/download/i.test(paper.buttonLabel) ? "download" : "read"}
                  className="aj-rs-btn"
                >
                  {paper.buttonLabel}
                </GatedResourceLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
