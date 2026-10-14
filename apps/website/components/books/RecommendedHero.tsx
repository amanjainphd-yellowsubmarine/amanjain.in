import { Poppins } from "next/font/google";
import type { RecommendedHero as RecommendedHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const recoCss = `
#aj-reco-books-wrapper,#aj-reco-books-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
#aj-reco-books-wrapper{position:relative !important;width:100% !important;max-width:100% !important;min-height:480px !important;margin:0 !important;background:linear-gradient(110deg,#1E3A8A 0%,#6D28D9 50%,#D97706 100%) !important;overflow:hidden !important;display:flex !important;align-items:center !important;justify-content:center !important}
#aj-reco-books-wrapper .aj-rb-inner{position:relative !important;width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:60px 40px !important;z-index:2 !important}
#aj-reco-books-wrapper .aj-rb-text{position:relative !important;flex:1 !important;max-width:550px !important;min-width:0 !important;z-index:5 !important;text-align:left !important}
#aj-reco-books-wrapper .aj-rb-title{font-size:clamp(2.8rem,4vw,3.8rem) !important;font-weight:800 !important;color:#fff !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-reco-books-wrapper .aj-rb-desc{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#fff !important;line-height:1.6 !important;opacity:.95 !important;margin:0 !important}
#aj-reco-books-wrapper .aj-rb-visuals{position:relative !important;flex:1 !important;display:flex !important;align-items:center !important;justify-content:center !important;min-width:0 !important;min-height:330px !important;z-index:3 !important}
#aj-reco-books-wrapper .aj-rb-rings{position:absolute !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important;pointer-events:none !important;z-index:1 !important}
#aj-reco-books-wrapper .aj-rb-ring-fill{position:absolute !important;background:rgba(255,255,255,.08) !important;border-radius:50% !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important}
#aj-reco-books-wrapper .rb-ring-1{width:550px !important;height:550px !important}
#aj-reco-books-wrapper .rb-ring-2{width:400px !important;height:400px !important}
#aj-reco-books-wrapper .rb-ring-3{width:250px !important;height:250px !important}
#aj-reco-books-wrapper .aj-rb-pic{position:relative !important;width:100% !important;max-width:330px !important;height:auto !important;object-fit:contain !important;z-index:4 !important;pointer-events:none !important;filter:drop-shadow(0 15px 30px rgba(0,0,0,.15)) !important}
@media (max-width:900px){
  #aj-reco-books-wrapper .aj-rb-inner{flex-direction:column !important;text-align:center !important;padding:60px 20px !important;gap:50px !important}
  #aj-reco-books-wrapper .aj-rb-text{max-width:100% !important;text-align:center !important}
  #aj-reco-books-wrapper .aj-rb-visuals{width:100% !important;min-height:280px !important}
  #aj-reco-books-wrapper .rb-ring-1{width:400px !important;height:400px !important}
  #aj-reco-books-wrapper .rb-ring-2{width:280px !important;height:280px !important}
  #aj-reco-books-wrapper .rb-ring-3{width:160px !important;height:160px !important}
  #aj-reco-books-wrapper .aj-rb-pic{max-width:250px !important}
}
@media (max-width:600px){
  #aj-reco-books-wrapper{min-height:0 !important}
  #aj-reco-books-wrapper .aj-rb-title{font-size:2.4rem !important}
}
`;

export function RecommendedHero({ hero }: { hero: RecommendedHeroContent }) {
  return (
    <section data-lcp-hero data-edit="reco-hero" id="aj-reco-books-wrapper" className={poppins.className}>
      <style>{recoCss}</style>
      <div className="aj-rb-inner">
        <div className="aj-rb-text">
          <h1 className="aj-rb-title">{hero.title}</h1>
          <p className="aj-rb-desc">{hero.description}</p>
        </div>
        <div className="aj-rb-visuals">
          <div className="aj-rb-rings" aria-hidden="true">
            <div className="aj-rb-ring-fill rb-ring-1" />
            <div className="aj-rb-ring-fill rb-ring-2" />
            <div className="aj-rb-ring-fill rb-ring-3" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-rb-pic" src={hero.image} alt={hero.alt} />
        </div>
      </div>
    </section>
  );
}
