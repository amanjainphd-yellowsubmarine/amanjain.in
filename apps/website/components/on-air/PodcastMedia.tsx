import { Poppins } from "next/font/google";
import type { MediaAppearanceItem, PodcastHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mediaCss = `
#media-appearances,#media-appearances *{box-sizing:border-box !important;font-family:inherit !important}
#media-appearances{position:relative !important;width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#fdf7ef 0%,#e6e0ff 100%) !important;padding:80px 40px !important;display:flex !important;flex-direction:column !important;align-items:center !important;overflow:hidden !important}
#media-appearances .aj-media-app-header{text-align:center !important;margin-bottom:40px !important;max-width:800px !important;padding:0 8px !important}
#media-appearances .aj-media-app-title{font-size:clamp(2.2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 12px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#media-appearances .aj-media-app-subtitle{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#111 !important;margin:0 !important;line-height:1.5 !important}
#media-appearances .aj-media-stack{display:flex !important;flex-direction:column !important;align-items:center !important;gap:32px !important;width:100% !important;max-width:850px !important}
#media-appearances .aj-media-video-card{position:relative !important;width:100% !important;min-width:0 !important;background:#fff !important;border-radius:24px !important;border:1.5px solid #00B4C9 !important;overflow:hidden !important;box-shadow:0 20px 40px rgba(0,0,0,.06) !important}
#media-appearances .aj-media-thumb{width:100% !important;height:auto !important;max-height:280px !important;object-fit:cover !important;display:block !important}
#media-appearances .aj-video-container{position:relative !important;width:100% !important;padding-bottom:56.25% !important;background:#000 !important}
#media-appearances .aj-video-container iframe{position:absolute !important;top:0 !important;left:0 !important;width:100% !important;height:100% !important;border:none !important}
#media-appearances .aj-video-info{padding:24px 30px !important;text-align:center !important;background:#fff !important}
#media-appearances .aj-video-info-title{font-size:clamp(1rem,1.5vw,1.25rem) !important;font-weight:700 !important;color:#000 !important;margin:0 0 6px !important;line-height:1.4 !important}
#media-appearances .aj-video-info-caption{font-size:.95rem !important;font-weight:600 !important;color:#333 !important;margin:0 !important;line-height:1.45 !important}
@media (max-width:768px){
  #media-appearances{padding:50px 20px !important}
  #media-appearances .aj-video-info{padding:20px 16px !important}
}
@media (max-width:600px){
  #media-appearances{padding:40px 15px !important}
  #media-appearances .aj-media-app-title{font-size:2rem !important}
}
`;

function mediaList(hero: PodcastHero): MediaAppearanceItem[] {
  if (hero.mediaItems && hero.mediaItems.length > 0) return hero.mediaItems;
  return [{ title: hero.mediaCaption, caption: hero.mediaCaption, video: hero.mediaVideo }];
}

export function PodcastMedia({ hero }: { hero: PodcastHero }) {
  const items = mediaList(hero);
  return (
    <section data-edit="podcasts-media" id="media-appearances" className={poppins.className}>
      <style>{mediaCss}</style>
      <div className="aj-media-app-header">
        <h2 className="aj-media-app-title">{hero.mediaTitle}</h2>
        <p className="aj-media-app-subtitle">{hero.mediaSubtitle}</p>
      </div>
      <div className="aj-media-stack">
        {items.map((item, index) => (
          <article className="aj-media-video-card" key={`${item.video}-${index}`}>
            {item.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="aj-media-thumb" src={item.thumbnail} alt={item.thumbnailAlt || item.title} />
            ) : null}
            <div className="aj-video-container">
              <iframe
                src={item.video}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="aj-video-info">
              <h3 className="aj-video-info-title">{item.title}</h3>
              {item.caption !== item.title ? <p className="aj-video-info-caption">{item.caption}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
