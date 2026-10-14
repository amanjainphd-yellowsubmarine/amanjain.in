"use client";

import { Poppins } from "next/font/google";
import type { EngagementHero as EngagementHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const engagementHeroCss = `
.aj-eng-wrapper,.aj-eng-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
.aj-eng-wrapper{position:relative !important;width:100% !important;max-width:100% !important;min-height:480px !important;margin:0 !important;background:linear-gradient(110deg,#8A58FC 0%,#E87A5D 100%) !important;overflow:hidden !important;display:flex !important;align-items:center !important;justify-content:center !important}
.aj-eng-inner{position:relative !important;width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:60px 40px 0 !important;z-index:2 !important}
.aj-eng-text{position:relative !important;flex:1 !important;max-width:550px !important;min-width:0 !important;z-index:5 !important;text-align:left !important;padding-bottom:60px !important}
.aj-eng-title{font-size:clamp(2.8rem,4.5vw,4rem) !important;font-weight:800 !important;color:#fff !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
.aj-eng-desc{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:500 !important;color:#fff !important;line-height:1.6 !important;opacity:.95 !important;margin:0 !important;max-width:480px !important}
.aj-eng-visuals{position:relative !important;flex:1 !important;min-width:0 !important;display:flex !important;align-items:flex-end !important;justify-content:center !important;min-height:480px !important;z-index:3 !important}
.aj-eng-pic{position:relative !important;width:min(640px,100%) !important;max-width:100% !important;height:auto !important;max-height:none !important;object-fit:contain !important;object-position:center !important;z-index:4 !important;pointer-events:none !important}
@media (max-width:900px){
  .aj-eng-inner{flex-direction:column !important;text-align:center !important;padding:60px 20px 0 !important}
  .aj-eng-text{max-width:100% !important;text-align:center !important;padding-bottom:40px !important}
  .aj-eng-desc{margin:0 auto !important}
  .aj-eng-visuals{width:100% !important;min-height:350px !important}
  .aj-eng-pic{max-height:400px !important}
}
@media (max-width:600px){
  .aj-eng-title{font-size:2.35rem !important}
  .aj-eng-desc{font-size:1rem !important}
  .aj-eng-pic{max-height:min(46vh,340px) !important}
  .aj-eng-visuals{min-height:0 !important}
}
`;

export function EngagementHero({ hero }: { hero: EngagementHeroContent }) {
  return (
    <section data-lcp-hero data-edit="engagements-hero" className={`aj-eng-wrapper ${poppins.className}`}>
      <style>{engagementHeroCss}</style>
      <div className="aj-eng-inner">
        <div className="aj-eng-text">
          <h1 className="aj-eng-title">
            {hero.title.split("\n").map((line, index, lines) => (
              <span key={`${index}-${line}`}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="aj-eng-desc">{hero.description}</p>
        </div>
        <div className="aj-eng-visuals">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-eng-pic" src={hero.image} alt={hero.alt} />
        </div>
      </div>
    </section>
  );
}
