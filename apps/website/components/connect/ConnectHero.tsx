import { Poppins } from "next/font/google";
import type { ConnectHero as ConnectHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const talkCss = `
#aj-talk,#aj-talk *{box-sizing:border-box !important;font-family:inherit !important}
#aj-talk{width:100% !important;max-width:100% !important;margin:0 !important;background:linear-gradient(135deg,#F355B8 0%,#FCA676 100%) !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:0 8% !important;position:relative !important;overflow:hidden !important;min-height:500px !important}
#aj-talk .aj-talk-content{flex:1 !important;max-width:500px !important;min-width:0 !important;position:relative !important;z-index:5 !important;padding:60px 0 !important}
#aj-talk .aj-talk-title{font-size:clamp(2.8rem,5vw,4rem) !important;font-weight:800 !important;color:#fff !important;margin:0 0 16px !important;line-height:1.1 !important;letter-spacing:-1px !important}
#aj-talk .aj-talk-subtitle{font-size:clamp(1.05rem,1.5vw,1.25rem) !important;font-weight:600 !important;color:#fff !important;margin:0 !important;line-height:1.5 !important;opacity:.95 !important}
#aj-talk .aj-talk-visual{flex:1.2 !important;min-width:0 !important;position:relative !important;display:flex !important;justify-content:center !important;align-items:flex-end !important;min-height:500px !important}
#aj-talk .aj-talk-ring{position:absolute !important;border-radius:50% !important;background:rgba(255,255,255,.12) !important;top:45% !important;left:50% !important;transform:translate(-50%,-50%) !important;pointer-events:none !important}
#aj-talk .aj-talk-ring.r1{width:480px !important;height:480px !important}
#aj-talk .aj-talk-ring.r2{width:340px !important;height:340px !important}
#aj-talk .aj-talk-ring.r3{width:200px !important;height:200px !important}
#aj-talk .aj-letstalk-pic{position:relative !important;z-index:5 !important;width:auto !important;max-width:min(650px,100%) !important;height:auto !important;max-height:500px !important;object-fit:contain !important;object-position:bottom center !important}
@media (max-width:992px){
  #aj-talk{flex-direction:column !important;text-align:center !important;padding:0 5% !important;min-height:0 !important}
  #aj-talk .aj-talk-content{padding:60px 0 20px !important;max-width:100% !important}
  #aj-talk .aj-talk-visual{min-height:400px !important;width:100% !important}
  #aj-talk .aj-talk-ring.r1{width:380px !important;height:380px !important}
  #aj-talk .aj-talk-ring.r2{width:260px !important;height:260px !important}
  #aj-talk .aj-talk-ring.r3{width:140px !important;height:140px !important}
  #aj-talk .aj-letstalk-pic{max-width:100% !important;max-height:400px !important}
}
@media (max-width:600px){
  #aj-talk{padding:0 16px !important}
  #aj-talk .aj-talk-content{padding:48px 0 12px !important}
  #aj-talk .aj-talk-title{font-size:2.6rem !important}
  #aj-talk .aj-talk-visual{min-height:360px !important}
  #aj-talk .aj-talk-ring.r1{width:min(340px,86vw) !important;height:min(340px,86vw) !important}
  #aj-talk .aj-talk-ring.r2{width:min(240px,62vw) !important;height:min(240px,62vw) !important}
  #aj-talk .aj-talk-ring.r3{width:min(140px,38vw) !important;height:min(140px,38vw) !important}
  #aj-talk .aj-letstalk-pic{max-height:340px !important}
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

export function ConnectHero({ hero }: { hero: ConnectHeroContent }) {
  return (
    <section data-lcp-hero data-edit="connect-hero" id="aj-talk" className={poppins.className}>
      <style>{talkCss}</style>
      <div className="aj-talk-content">
        <h1 className="aj-talk-title">
          <Lines value={hero.title} />
        </h1>
        <p className="aj-talk-subtitle">{hero.description}</p>
      </div>
      <div className="aj-talk-visual">
        <div className="aj-talk-ring r1" aria-hidden="true" />
        <div className="aj-talk-ring r2" aria-hidden="true" />
        <div className="aj-talk-ring r3" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="aj-letstalk-pic" src={hero.image} alt={hero.alt} />
      </div>
    </section>
  );
}
