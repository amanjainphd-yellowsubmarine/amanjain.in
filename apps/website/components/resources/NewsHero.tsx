import { Poppins } from "next/font/google";
import type { NewsHero as NewsHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const newsCss = `
#aj-news-hero,#aj-news-hero *{box-sizing:border-box !important;font-family:inherit !important}
#aj-news-hero{position:relative !important;width:100% !important;max-width:100% !important;min-height:480px !important;margin:0 !important;background:linear-gradient(110deg,#ec2e43 0%,#e76c37 50%,#d1ae3e 100%) !important;overflow:hidden !important;display:flex !important;align-items:center !important;justify-content:center !important}
#aj-news-hero .aj-news-inner{position:relative !important;width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:60px 40px !important;z-index:2 !important}
#aj-news-hero .aj-news-text{position:relative !important;flex:1 !important;max-width:550px !important;min-width:0 !important;z-index:5 !important;text-align:left !important}
#aj-news-hero .aj-news-title{font-size:clamp(2.8rem,4vw,3.8rem) !important;font-weight:800 !important;color:#fff !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-news-hero .aj-news-desc{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#fff !important;line-height:1.6 !important;opacity:.95 !important;margin:0 !important}
#aj-news-hero .aj-news-visuals{position:relative !important;flex:1 !important;min-width:0 !important;min-height:360px !important;display:flex !important;align-items:center !important;justify-content:center !important;z-index:3 !important}
#aj-news-hero .aj-news-rings{position:absolute !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important;pointer-events:none !important;z-index:1 !important}
#aj-news-hero .aj-news-ring-fill{position:absolute !important;background:rgba(255,255,255,.06) !important;border-radius:50% !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important}
#aj-news-hero .nw-ring-1{width:600px !important;height:600px !important}
#aj-news-hero .nw-ring-2{width:450px !important;height:450px !important}
#aj-news-hero .nw-ring-3{width:300px !important;height:300px !important}
#aj-news-hero .aj-news-pic{position:relative !important;width:100% !important;max-width:350px !important;height:auto !important;object-fit:contain !important;z-index:4 !important;pointer-events:none !important;filter:drop-shadow(0 15px 30px rgba(0,0,0,.15)) !important}
@media (max-width:900px){
  #aj-news-hero .aj-news-inner{flex-direction:column !important;text-align:center !important;padding:60px 20px !important;gap:50px !important}
  #aj-news-hero .aj-news-text{max-width:100% !important;text-align:center !important}
  #aj-news-hero .aj-news-visuals{width:100% !important;min-height:450px !important}
  #aj-news-hero .nw-ring-1{width:450px !important;height:450px !important}
  #aj-news-hero .nw-ring-2{width:320px !important;height:320px !important}
  #aj-news-hero .nw-ring-3{width:190px !important;height:190px !important}
  #aj-news-hero .aj-news-pic{max-width:250px !important}
}
@media (max-width:600px){
  #aj-news-hero{min-height:0 !important}
  #aj-news-hero .aj-news-inner{padding:48px 16px !important}
  #aj-news-hero .aj-news-title{font-size:2.4rem !important}
  #aj-news-hero .aj-news-visuals{min-height:340px !important}
  #aj-news-hero .nw-ring-1{width:min(340px,86vw) !important;height:min(340px,86vw) !important}
  #aj-news-hero .nw-ring-2{width:min(250px,64vw) !important;height:min(250px,64vw) !important}
  #aj-news-hero .nw-ring-3{width:min(160px,42vw) !important;height:min(160px,42vw) !important}
  #aj-news-hero .aj-news-pic{max-width:min(220px,62vw) !important}
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

export function NewsHero({ hero }: { hero: NewsHeroContent }) {
  return (
    <section data-lcp-hero data-edit="news-hero" id="aj-news-hero" className={poppins.className}>
      <style>{newsCss}</style>
      <div className="aj-news-inner">
        <div className="aj-news-text">
          <h1 className="aj-news-title">
            <Lines value={hero.title} />
          </h1>
          <p className="aj-news-desc">{hero.description}</p>
        </div>
        <div className="aj-news-visuals">
          <div className="aj-news-rings" aria-hidden="true">
            <div className="aj-news-ring-fill nw-ring-1" />
            <div className="aj-news-ring-fill nw-ring-2" />
            <div className="aj-news-ring-fill nw-ring-3" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-news-pic" src={hero.image} alt={hero.alt} />
        </div>
      </div>
    </section>
  );
}
