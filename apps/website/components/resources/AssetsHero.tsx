import { Poppins } from "next/font/google";
import type { AssetsHero as AssetsHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const assetsCss = `
#aj-assets-hero,#aj-assets-hero *{box-sizing:border-box !important;font-family:inherit !important}
#aj-assets-hero{position:relative !important;width:100% !important;max-width:100% !important;min-height:480px !important;margin:0 !important;background:linear-gradient(110deg,#116b7a 0%,#708468 50%,#df8553 100%) !important;overflow:hidden !important;display:flex !important;align-items:center !important;justify-content:center !important}
#aj-assets-hero .aj-assets-inner{position:relative !important;width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:60px 40px !important;z-index:2 !important}
#aj-assets-hero .aj-assets-text{position:relative !important;flex:1 !important;max-width:550px !important;min-width:0 !important;z-index:5 !important;text-align:left !important}
#aj-assets-hero .aj-assets-title{font-size:clamp(2.8rem,4vw,3.8rem) !important;font-weight:800 !important;color:#fff !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-assets-hero .aj-assets-desc{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#fff !important;line-height:1.6 !important;opacity:.95 !important;margin:0 !important}
#aj-assets-hero .aj-assets-visuals{position:relative !important;flex:1 !important;min-width:0 !important;min-height:380px !important;display:flex !important;align-items:center !important;justify-content:center !important;z-index:3 !important}
#aj-assets-hero .aj-assets-rings{position:absolute !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important;pointer-events:none !important;z-index:1 !important}
#aj-assets-hero .aj-assets-ring-fill{position:absolute !important;background:rgba(255,255,255,.08) !important;border-radius:50% !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important}
#aj-assets-hero .as-ring-1{width:550px !important;height:550px !important}
#aj-assets-hero .as-ring-2{width:400px !important;height:400px !important}
#aj-assets-hero .as-ring-3{width:250px !important;height:250px !important}
#aj-assets-hero .aj-assets-pic{position:relative !important;width:100% !important;max-width:330px !important;height:auto !important;object-fit:contain !important;z-index:4 !important;pointer-events:none !important;filter:drop-shadow(0 15px 30px rgba(0,0,0,.15)) !important}
@media (max-width:900px){
  #aj-assets-hero .aj-assets-inner{flex-direction:column !important;text-align:center !important;padding:60px 20px !important;gap:50px !important}
  #aj-assets-hero .aj-assets-text{max-width:100% !important;text-align:center !important}
  #aj-assets-hero .aj-assets-visuals{width:100% !important;min-height:400px !important}
  #aj-assets-hero .as-ring-1{width:400px !important;height:400px !important}
  #aj-assets-hero .as-ring-2{width:280px !important;height:280px !important}
  #aj-assets-hero .as-ring-3{width:160px !important;height:160px !important}
  #aj-assets-hero .aj-assets-pic{max-width:250px !important}
}
@media (max-width:600px){
  #aj-assets-hero{min-height:0 !important}
  #aj-assets-hero .aj-assets-inner{padding:48px 16px !important}
  #aj-assets-hero .aj-assets-title{font-size:2.6rem !important}
  #aj-assets-hero .aj-assets-visuals{min-height:340px !important}
  #aj-assets-hero .as-ring-1{width:min(340px,86vw) !important;height:min(340px,86vw) !important}
  #aj-assets-hero .as-ring-2{width:min(240px,62vw) !important;height:min(240px,62vw) !important}
  #aj-assets-hero .as-ring-3{width:min(150px,40vw) !important;height:min(150px,40vw) !important}
  #aj-assets-hero .aj-assets-pic{max-width:min(220px,58vw) !important}
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

export function AssetsHero({ hero }: { hero: AssetsHeroContent }) {
  return (
    <section data-lcp-hero data-edit="assets-hero" id="aj-assets-hero" className={poppins.className}>
      <style>{assetsCss}</style>
      <div className="aj-assets-inner">
        <div className="aj-assets-text">
          <h1 className="aj-assets-title">
            <Lines value={hero.title} />
          </h1>
          <p className="aj-assets-desc">{hero.description}</p>
        </div>
        <div className="aj-assets-visuals">
          <div className="aj-assets-rings" aria-hidden="true">
            <div className="aj-assets-ring-fill as-ring-1" />
            <div className="aj-assets-ring-fill as-ring-2" />
            <div className="aj-assets-ring-fill as-ring-3" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-assets-pic" src={hero.image} alt={hero.alt} />
        </div>
      </div>
    </section>
  );
}
