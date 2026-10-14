import { Poppins } from "next/font/google";
import type { ArticlesHero as ArticlesHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const articlesCss = `
#aj-articles-hero,#aj-articles-hero *{box-sizing:border-box !important;font-family:inherit !important}
#aj-articles-hero{position:relative !important;width:100% !important;max-width:100% !important;min-height:480px !important;margin:0 !important;background:linear-gradient(98.51deg,#048FA6 1.92%,#D8BD50 98.52%) !important;display:flex !important;align-items:center !important;justify-content:center !important;overflow:hidden !important;padding:60px 40px !important}
#aj-articles-hero .aj-articles-inner{position:relative !important;width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;z-index:2 !important}
#aj-articles-hero .aj-articles-text{flex:1 !important;max-width:600px !important;min-width:0 !important;color:#fff !important}
#aj-articles-hero .aj-articles-title{font-weight:700 !important;font-size:clamp(2.8rem,4vw,4rem) !important;line-height:1.15 !important;margin:0 0 24px !important;color:#fff !important;letter-spacing:-.5px !important}
#aj-articles-hero .aj-articles-desc{font-weight:600 !important;font-size:clamp(1rem,1.5vw,1.25rem) !important;line-height:1.5 !important;margin:0 !important;color:#fff !important;opacity:.95 !important}
#aj-articles-hero .aj-articles-visuals{flex:1 !important;min-width:0 !important;display:flex !important;justify-content:center !important;align-items:center !important;position:relative !important;min-height:400px !important}
#aj-articles-hero .aj-articles-rings{position:absolute !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important;pointer-events:none !important}
#aj-articles-hero .aj-articles-ring{position:absolute !important;border-radius:50% !important;background:radial-gradient(50% 50% at 50% 50%,rgba(245,242,197,0) 63.46%,#fff 100%) !important}
#aj-articles-hero .aj-aring-1{width:480px !important;height:480px !important;opacity:.2 !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important}
#aj-articles-hero .aj-aring-2{width:380px !important;height:380px !important;opacity:.15 !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) rotate(-45deg) !important}
#aj-articles-hero .aj-aring-3{width:280px !important;height:280px !important;opacity:.3 !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) rotate(-47deg) !important}
#aj-articles-hero .aj-articles-icon-img{position:relative !important;z-index:5 !important;width:100% !important;max-width:480px !important;height:auto !important;object-fit:contain !important;filter:drop-shadow(0 15px 30px rgba(0,0,0,.15)) !important}
@media (max-width:900px){
  #aj-articles-hero{padding:60px 20px !important}
  #aj-articles-hero .aj-articles-inner{flex-direction:column !important;text-align:center !important;gap:50px !important}
  #aj-articles-hero .aj-articles-text{max-width:100% !important}
  #aj-articles-hero .aj-articles-visuals{min-height:300px !important;width:100% !important}
  #aj-articles-hero .aj-aring-1{width:320px !important;height:320px !important}
  #aj-articles-hero .aj-aring-2{width:260px !important;height:260px !important}
  #aj-articles-hero .aj-aring-3{width:200px !important;height:200px !important}
  #aj-articles-hero .aj-articles-icon-img{max-width:320px !important}
}
@media (max-width:600px){
  #aj-articles-hero{min-height:0 !important;padding:48px 16px !important}
  #aj-articles-hero .aj-articles-title{font-size:2.15rem !important}
  #aj-articles-hero .aj-articles-visuals{min-height:340px !important}
  #aj-articles-hero .aj-aring-1{width:min(320px,78vw) !important;height:min(320px,78vw) !important}
  #aj-articles-hero .aj-aring-2{width:min(260px,64vw) !important;height:min(260px,64vw) !important}
  #aj-articles-hero .aj-aring-3{width:min(200px,50vw) !important;height:min(200px,50vw) !important}
  #aj-articles-hero .aj-articles-icon-img{max-width:min(280px,72vw) !important}
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

export function ArticlesHero({ hero }: { hero: ArticlesHeroContent }) {
  return (
    <section data-lcp-hero data-edit="articles-hero" id="aj-articles-hero" className={poppins.className}>
      <style>{articlesCss}</style>
      <div className="aj-articles-inner">
        <div className="aj-articles-text">
          <h1 className="aj-articles-title">
            <Lines value={hero.title} />
          </h1>
          <p className="aj-articles-desc">{hero.description}</p>
        </div>
        <div className="aj-articles-visuals">
          <div className="aj-articles-rings" aria-hidden="true">
            <div className="aj-articles-ring aj-aring-1" />
            <div className="aj-articles-ring aj-aring-2" />
            <div className="aj-articles-ring aj-aring-3" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-articles-icon-img" src={hero.image} alt={hero.alt} />
        </div>
      </div>
    </section>
  );
}
