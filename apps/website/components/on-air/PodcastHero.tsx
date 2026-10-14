"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import type { PodcastHero as PodcastHeroContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const podcastCss = `
#aj-podcast-hero,#aj-podcast-hero *{box-sizing:border-box !important;font-family:inherit !important}
#aj-podcast-hero{position:relative !important;width:100% !important;max-width:100% !important;min-width:0 !important;height:648px !important;min-height:648px !important;max-height:648px !important;margin:0 !important;background:linear-gradient(108.4deg,#F4387D 1.92%,#C89E5A 98.52%) !important;overflow:hidden !important;border-radius:0 !important;display:flex !important;align-items:center !important;justify-content:center !important}
#aj-podcast-hero .aj-media-inner{position:relative !important;width:100% !important;max-width:1440px !important;height:100% !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:space-between !important;padding:0 clamp(24px,9.86vw,142px) !important;gap:clamp(16px,3vw,48px) !important;z-index:2 !important}
#aj-podcast-hero .aj-media-text{position:relative !important;width:44% !important;max-width:630px !important;min-width:0 !important;z-index:5 !important;text-align:left !important;flex-shrink:0 !important}
#aj-podcast-hero .aj-media-title{font-size:clamp(1.85rem,4.38vw,3.9375rem) !important;font-weight:700 !important;color:#fff !important;margin:0 0 clamp(16px,2.5vw,28px) !important;letter-spacing:0 !important;line-height:1.143 !important}
#aj-podcast-hero .aj-media-desc{font-size:clamp(1rem,1.67vw,1.5rem) !important;font-weight:600 !important;color:#fff !important;line-height:1.35 !important;margin:0 !important;max-width:630px !important}
#aj-podcast-hero .aj-media-cta-wrap{margin-top:clamp(20px,3vw,32px) !important}
#aj-podcast-hero .aj-media-cta{display:inline-flex !important;align-items:center !important;justify-content:center !important;background:#fff !important;color:#000 !important;font-size:clamp(1rem,1.67vw,1.5rem) !important;font-weight:700 !important;text-decoration:none !important;min-width:163px !important;min-height:54px !important;padding:10px 28px !important;border-radius:72px !important;transition:transform .25s ease,box-shadow .25s ease !important;box-shadow:0 8px 24px rgba(0,0,0,.12) !important}
#aj-podcast-hero .aj-media-cta:hover{transform:translateY(-2px) !important;box-shadow:0 12px 28px rgba(0,0,0,.18) !important;color:#000 !important}
#aj-podcast-hero .aj-media-visuals{position:relative !important;width:56% !important;max-width:820px !important;height:100% !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:center !important;z-index:3 !important;flex:1 1 auto !important;margin:0 auto !important}
#aj-podcast-hero .aj-media-photo-stage{position:relative !important;display:flex !important;align-items:flex-end !important;justify-content:center !important;width:100% !important;max-width:720px !important;height:auto !important;min-height:min(58vh,520px) !important;margin:0 auto !important;z-index:2 !important;overflow:visible !important}
#aj-podcast-hero .aj-media-main-pic-wrap{position:relative !important;z-index:4 !important;display:flex !important;align-items:flex-end !important;justify-content:center !important;width:100% !important;max-width:100% !important;height:auto !important;margin:0 auto !important}
#aj-podcast-hero .aj-media-rings-img{position:absolute !important;top:0 !important;left:50% !important;transform:translate(-50%,0) !important;width:min(112%,640px) !important;height:auto !important;pointer-events:none !important;z-index:1 !important}
#aj-podcast-hero .aj-media-main-pic{position:relative !important;width:auto !important;max-width:100% !important;min-width:0 !important;height:auto !important;max-height:min(58vh,580px) !important;margin:0 auto !important;object-fit:contain !important;object-position:bottom center !important;pointer-events:none !important;filter:drop-shadow(0 15px 25px rgba(0,0,0,.2)) !important;display:block !important}
#aj-podcast-hero .aj-media-cam{position:absolute !important;left:-8% !important;bottom:2% !important;width:min(58%,220px) !important;height:auto !important;object-fit:contain !important;object-position:left bottom !important;z-index:6 !important;pointer-events:none !important}
#aj-podcast-hero .aj-media-mic{position:absolute !important;right:-10% !important;top:4% !important;width:min(48%,180px) !important;height:auto !important;object-fit:contain !important;object-position:right top !important;z-index:6 !important;pointer-events:none !important}
@media (max-width:1100px) and (min-width:768px){
  #aj-podcast-hero{height:auto !important;min-height:min(92vh,620px) !important;max-height:none !important;padding:0 !important}
  #aj-podcast-hero .aj-media-inner{flex-direction:row !important;align-items:center !important;height:auto !important;min-height:min(92vh,620px) !important;padding:44px clamp(20px,4vw,56px) 36px !important;gap:clamp(16px,3vw,32px) !important;text-align:left !important}
  #aj-podcast-hero .aj-media-text{width:46% !important;max-width:none !important;text-align:left !important;margin:0 !important}
  #aj-podcast-hero .aj-media-title{font-size:clamp(1.65rem,3.1vw,2.35rem) !important;line-height:1.12 !important;margin-bottom:16px !important}
  #aj-podcast-hero .aj-media-desc{font-size:clamp(.95rem,1.35vw,1.125rem) !important;line-height:1.45 !important;max-width:none !important}
  #aj-podcast-hero .aj-media-cta-wrap{margin-top:20px !important;display:block !important}
  #aj-podcast-hero .aj-media-cta{font-size:1rem !important;min-height:48px !important;min-width:148px !important;padding:10px 24px !important}
  #aj-podcast-hero .aj-media-visuals{width:54% !important;max-width:none !important;height:auto !important;min-height:0 !important;margin:0 !important;padding:0 !important}
  #aj-podcast-hero .aj-media-photo-stage{width:100% !important;min-height:min(52vh,440px) !important;height:auto !important}
  #aj-podcast-hero .aj-media-rings-img{width:min(112%,560px) !important;top:0 !important}
  #aj-podcast-hero .aj-media-main-pic{max-height:min(52vh,440px) !important;height:auto !important}
  #aj-podcast-hero .aj-media-cam{left:-8% !important;bottom:2% !important;width:min(58%,200px) !important}
  #aj-podcast-hero .aj-media-mic{right:-10% !important;top:4% !important;width:min(48%,160px) !important}
}
@media (max-width:767px){
  #aj-podcast-hero{height:auto !important;min-height:calc(100svh - 64px) !important;max-height:none !important;display:flex !important;align-items:stretch !important;justify-content:center !important}
  #aj-podcast-hero .aj-media-inner{flex-direction:column !important;justify-content:center !important;align-items:center !important;height:auto !important;min-height:calc(100svh - 64px) !important;padding:24px 22px 28px !important;gap:0 !important;text-align:center !important}
  #aj-podcast-hero .aj-media-text{width:100% !important;max-width:22rem !important;text-align:center !important;margin:0 auto !important;order:1 !important}
  #aj-podcast-hero .aj-media-title{font-size:clamp(1.75rem,8.2vw,2.35rem) !important;line-height:1.08 !important;margin:0 0 12px !important;text-wrap:balance !important}
  #aj-podcast-hero .aj-media-desc{max-width:19rem !important;margin:0 auto !important;font-size:1rem !important;line-height:1.5 !important;font-weight:600 !important}
  #aj-podcast-hero .aj-media-cta-wrap{order:2 !important;display:flex !important;justify-content:center !important;width:100% !important;margin:18px auto 6px !important}
  #aj-podcast-hero .aj-media-cta{min-height:48px !important;min-width:152px !important;font-size:1.0625rem !important;padding:12px 32px !important;box-shadow:0 10px 28px rgba(0,0,0,.16) !important}
  #aj-podcast-hero .aj-media-visuals{order:3 !important;width:min(92vw,380px) !important;max-width:100% !important;height:auto !important;min-height:0 !important;margin:14px auto 0 !important;padding:0 !important}
  #aj-podcast-hero .aj-media-photo-stage{width:100% !important;min-height:min(46vh,360px) !important;height:auto !important}
  #aj-podcast-hero .aj-media-rings-img{width:min(118%,340px) !important;top:-4% !important;opacity:.95 !important}
  #aj-podcast-hero .aj-media-main-pic-wrap{height:auto !important;width:100% !important}
  #aj-podcast-hero .aj-media-main-pic{max-height:min(46vh,360px) !important;width:auto !important;height:auto !important;margin:0 auto !important}
  #aj-podcast-hero .aj-media-cam{left:-12% !important;bottom:0 !important;width:min(56%,132px) !important}
  #aj-podcast-hero .aj-media-mic{right:-14% !important;top:-4% !important;width:min(52%,118px) !important}
}
@media (max-width:380px){
  #aj-podcast-hero .aj-media-inner{padding:20px 18px 24px !important}
  #aj-podcast-hero .aj-media-visuals{width:min(94vw,340px) !important}
  #aj-podcast-hero .aj-media-cam{left:-10% !important;width:min(54%,120px) !important}
  #aj-podcast-hero .aj-media-mic{right:-12% !important;width:min(50%,108px) !important}
}
`;

function Lines({ value }: { value: string }) {
  const lines = value.split("\n");
  return lines.map((line, index) => (
    <span key={`${index}-${line}`}>
      {line}
      {index < lines.length - 1 ? <span className="aj-title-gap"> </span> : null}
      {index < lines.length - 1 ? <br className="aj-title-br" /> : null}
    </span>
  ));
}

export function PodcastHero({ hero }: { hero: PodcastHeroContent }) {
  const ctaLabel = hero.heroButtonLabel?.trim() || "Let's Talk";
  const ctaHref = hero.heroButtonHref?.trim() || "/connect";

  return (
    <section data-lcp-hero data-edit="podcasts-hero" id="aj-podcast-hero" className={poppins.className}>
      <style>{podcastCss}</style>
      <div className="aj-media-inner">
        <div className="aj-media-text">
          <h1 className="aj-media-title">
            <Lines value={hero.title} />
          </h1>
          <p className="aj-media-desc">{hero.description}</p>
          <div className="aj-media-cta-wrap">
            <Link className="aj-media-cta" href={ctaHref}>{ctaLabel}</Link>
          </div>
        </div>
        <div className="aj-media-visuals">
          <div className="aj-media-photo-stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="aj-media-rings-img" src="/images/on-air/podcast-rings.svg" alt="" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="aj-media-cam" src={hero.camera} alt={hero.cameraAlt} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="aj-media-mic" src={hero.mic} alt={hero.micAlt} />
            <picture className="aj-media-main-pic-wrap">
              {hero.mobileImage ? <source media="(max-width: 767px)" srcSet={hero.mobileImage} /> : null}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aj-media-main-pic"
                src={hero.image}
                alt={hero.imageAlt}
                width="800"
                height="648"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
