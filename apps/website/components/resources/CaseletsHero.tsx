import { Poppins } from "next/font/google";
import type { CaseletsHero as CaseletsHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caseletsCss = `
#aj-caselets-hero,#aj-caselets-hero *{box-sizing:border-box !important;font-family:inherit !important}
#aj-caselets-hero{position:relative !important;width:100% !important;max-width:100% !important;min-height:480px !important;margin:0 !important;background:linear-gradient(110deg,#f26052 0%,#e69d51 50%,#d4b043 100%) !important;overflow:hidden !important;display:flex !important;align-items:center !important;justify-content:center !important}
#aj-caselets-hero .aj-caselets-inner{position:relative !important;width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:60px 40px !important;z-index:2 !important}
#aj-caselets-hero .aj-caselets-text{position:relative !important;flex:1 !important;max-width:500px !important;min-width:0 !important;z-index:5 !important;text-align:left !important}
#aj-caselets-hero .aj-caselets-title{font-size:clamp(2.8rem,4vw,3.8rem) !important;font-weight:800 !important;color:#fff !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-caselets-hero .aj-caselets-desc{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#fff !important;line-height:1.6 !important;opacity:.95 !important;margin:0 !important}
#aj-caselets-hero .aj-caselets-visuals{position:relative !important;flex:1 !important;min-width:0 !important;min-height:320px !important;display:flex !important;align-items:center !important;justify-content:center !important;z-index:3 !important}
#aj-caselets-hero .aj-caselets-rings{position:absolute !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important;pointer-events:none !important;z-index:1 !important}
#aj-caselets-hero .aj-caselets-ring-fill{position:absolute !important;background:rgba(255,255,255,.06) !important;border-radius:50% !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important}
#aj-caselets-hero .cl-ring-1{width:600px !important;height:600px !important}
#aj-caselets-hero .cl-ring-2{width:450px !important;height:450px !important}
#aj-caselets-hero .cl-ring-3{width:300px !important;height:300px !important}
#aj-caselets-hero .aj-caselets-pic{position:relative !important;width:100% !important;max-width:300px !important;height:auto !important;object-fit:contain !important;z-index:4 !important;pointer-events:none !important;filter:drop-shadow(0 15px 30px rgba(0,0,0,.15)) !important}
@media (max-width:900px){
  #aj-caselets-hero .aj-caselets-inner{flex-direction:column !important;text-align:center !important;padding:60px 20px !important;gap:50px !important}
  #aj-caselets-hero .aj-caselets-text{max-width:100% !important;text-align:center !important}
  #aj-caselets-hero .aj-caselets-visuals{width:100% !important;min-height:260px !important}
  #aj-caselets-hero .cl-ring-1{width:450px !important;height:450px !important}
  #aj-caselets-hero .cl-ring-2{width:320px !important;height:320px !important}
  #aj-caselets-hero .cl-ring-3{width:190px !important;height:190px !important}
  #aj-caselets-hero .aj-caselets-pic{max-width:220px !important}
}
@media (max-width:600px){
  #aj-caselets-hero{min-height:0 !important}
  #aj-caselets-hero .aj-caselets-title{font-size:2.4rem !important}
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

export function CaseletsHero({ hero }: { hero: CaseletsHeroContent }) {
  return (
    <section data-lcp-hero data-edit="caselets-hero" id="aj-caselets-hero" className={poppins.className}>
      <style>{caseletsCss}</style>
      <div className="aj-caselets-inner">
        <div className="aj-caselets-text">
          <h1 className="aj-caselets-title">
            <Lines value={hero.title} />
          </h1>
          <p className="aj-caselets-desc">{hero.description}</p>
        </div>
        <div className="aj-caselets-visuals">
          <div className="aj-caselets-rings" aria-hidden="true">
            <div className="aj-caselets-ring-fill cl-ring-1" />
            <div className="aj-caselets-ring-fill cl-ring-2" />
            <div className="aj-caselets-ring-fill cl-ring-3" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-caselets-pic" src={hero.image} alt={hero.alt} />
        </div>
      </div>
    </section>
  );
}
