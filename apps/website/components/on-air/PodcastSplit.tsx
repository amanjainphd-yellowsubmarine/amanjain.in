import { Poppins } from "next/font/google";
import type { PodcastHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const splitCss = `
#aj-podcast-close,#aj-podcast-close *{box-sizing:border-box !important;font-family:inherit !important}
#aj-podcast-close{width:100% !important;max-width:100% !important;background:#fff !important;display:flex !important;justify-content:center !important}
#aj-podcast-close .aj-cta-split-wrapper{width:100% !important;max-width:1200px !important;min-width:0 !important;margin:0 auto !important;padding:80px 40px !important;display:flex !important;align-items:center !important;justify-content:space-between !important;gap:60px !important}
#aj-podcast-close .aj-cta-image-col{flex:1.2 !important;min-width:0 !important;display:flex !important;justify-content:flex-end !important}
#aj-podcast-close .aj-cta-image-col img{width:100% !important;max-width:472px !important;height:auto !important;border-radius:30px !important;object-fit:cover !important;box-shadow:0 15px 35px rgba(0,0,0,.05) !important}
#aj-podcast-close .aj-cta-text-col{flex:1 !important;min-width:0 !important;display:flex !important;flex-direction:column !important;align-items:flex-start !important;text-align:left !important}
#aj-podcast-close .aj-cta-heading{font-size:clamp(2.2rem,3.5vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;line-height:1.2 !important;margin:0 0 20px !important;letter-spacing:-.5px !important}
#aj-podcast-close .aj-cta-subheading{font-size:clamp(1rem,1.5vw,1.2rem) !important;font-weight:600 !important;color:#000 !important;line-height:1.5 !important;margin:0 0 35px !important;max-width:450px !important}
#aj-podcast-close .aj-cta-button{display:inline-flex !important;align-items:center !important;justify-content:center !important;background:linear-gradient(90deg,#8A58FC 0%,#56B9C7 100%) !important;color:#fff !important;font-size:1.1rem !important;font-weight:700 !important;text-decoration:none !important;padding:14px 40px !important;border-radius:50px !important;border:none !important;cursor:pointer !important;transition:transform .2s ease,box-shadow .2s ease !important;box-shadow:0 8px 20px rgba(137,90,251,.2) !important}
#aj-podcast-close .aj-cta-button:hover{transform:translateY(-2px) !important;box-shadow:0 10px 25px rgba(137,90,251,.3) !important}
@media (max-width:900px){
  #aj-podcast-close .aj-cta-split-wrapper{flex-direction:column !important;text-align:center !important;gap:40px !important;padding:60px 20px !important}
  #aj-podcast-close .aj-cta-image-col{justify-content:center !important;width:100% !important}
  #aj-podcast-close .aj-cta-text-col{align-items:center !important;text-align:center !important;width:100% !important}
}
@media (max-width:600px){
  #aj-podcast-close .aj-cta-split-wrapper{padding:48px 15px !important}
  #aj-podcast-close .aj-cta-heading{font-size:2rem !important}
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

export function PodcastSplit({ hero }: { hero: PodcastHero }) {
  return (
    <section data-edit="podcasts-close" id="aj-podcast-close" className={poppins.className}>
      <style>{splitCss}</style>
      <div className="aj-cta-split-wrapper">
        <div className="aj-cta-image-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.closeImage} alt={hero.closeAlt} />
        </div>
        <div className="aj-cta-text-col">
          <h2 className="aj-cta-heading">
            <Lines value={hero.closeTitle} />
          </h2>
          <p className="aj-cta-subheading">{hero.closeSubtitle}</p>
          <a className="aj-cta-button" href={hero.closeHref}>
            {hero.closeLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
