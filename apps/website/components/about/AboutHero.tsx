"use client";

import { Poppins } from "next/font/google";
import type { PageHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const aboutHeroCss = `
.aj-hero-bio-wrapper,.aj-hero-bio-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
.aj-hero-bio-wrapper{position:relative !important;width:100% !important;min-height:650px !important;background:linear-gradient(105deg,#7A40F2 0%,#54D8C4 100%) !important;display:flex !important;flex-direction:column !important;align-items:center !important;overflow:hidden !important;padding-top:80px !important;padding-bottom:100px !important}
.aj-hero-bio-inner{width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:0 40px !important;z-index:2 !important}
.aj-hero-bio-wrapper .aj-hero-text{flex:1 !important;max-width:550px !important;min-width:0 !important;z-index:5 !important}
.aj-hero-bio-wrapper .aj-hero-title{font-size:clamp(3rem,4.5vw,4.5rem) !important;font-weight:800 !important;color:#fff !important;margin:0 0 16px !important;letter-spacing:-1px !important;line-height:1.1 !important}
.aj-hero-bio-wrapper .aj-hero-desc{font-size:clamp(1.1rem,1.5vw,1.25rem) !important;font-weight:600 !important;color:#fff !important;line-height:1.6 !important;opacity:.95 !important;margin:0 !important;max-width:480px !important}
.aj-hero-visuals{flex:1 !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:center !important;position:relative !important;min-height:450px !important;z-index:3 !important}
.aj-hero-bio-wrapper .aj-hero-pic{position:relative !important;width:min(640px,100%) !important;max-width:100% !important;height:auto !important;max-height:none !important;z-index:4 !important;object-fit:contain !important;object-position:center !important;filter:drop-shadow(0 20px 30px rgba(0,0,0,.15)) !important}
.aj-bio-card-overlap{position:absolute !important;bottom:0 !important;left:50% !important;transform:translateX(-50%) !important;width:90% !important;max-width:1120px !important;background:#fff !important;padding:30px 40px !important;border-radius:24px 24px 0 0 !important;z-index:10 !important}
.aj-bio-card-title{font-size:2rem !important;font-weight:800 !important;color:#000 !important;margin:0 !important;line-height:1.2 !important}
@media (max-width:1024px){
  .aj-hero-bio-wrapper{padding-bottom:120px !important;min-height:0 !important}
  .aj-hero-bio-inner{flex-direction:column !important;text-align:center !important;gap:28px !important}
  .aj-hero-bio-wrapper .aj-hero-desc{margin:0 auto !important}
  .aj-hero-visuals{min-height:0 !important;width:100% !important}
  .aj-hero-bio-wrapper .aj-hero-pic{max-height:420px !important}
}
@media (max-width:768px){
  .aj-hero-bio-wrapper{padding-top:48px !important;padding-bottom:108px !important}
  .aj-hero-bio-inner{padding:0 20px !important}
  .aj-bio-card-overlap{width:95% !important;padding:20px 24px !important}
  .aj-bio-card-title{font-size:1.5rem !important}
  .aj-hero-bio-wrapper .aj-hero-title{font-size:2.5rem !important}
  .aj-hero-bio-wrapper .aj-hero-desc{font-size:1.05rem !important}
  .aj-hero-bio-wrapper .aj-hero-pic{max-height:min(46vh,340px) !important}
}
`;

export function AboutHero({ hero }: { hero: PageHero }) {
  return (
    <section data-lcp-hero data-edit="about-hero" className={`aj-hero-bio-wrapper ${poppins.className}`}>
      <style>{aboutHeroCss}</style>
      <div className="aj-hero-bio-inner">
        <div className="aj-hero-text">
          <h1 className="aj-hero-title">{hero.title}</h1>
          <p className="aj-hero-desc">{hero.description}</p>
        </div>
        <div className="aj-hero-visuals">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-hero-pic" src={hero.image} alt={hero.alt} />
        </div>
      </div>
      <div className="aj-bio-card-overlap">
        <h2 className="aj-bio-card-title">{hero.cardTitle}</h2>
      </div>
    </section>
  );
}
