import { Poppins } from "next/font/google";
import type { ArticlesHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const mintCss = `
#aj-articles-mint,#aj-articles-mint *{box-sizing:border-box !important;font-family:inherit !important}
#aj-articles-mint{width:100% !important;max-width:100% !important;height:320px !important;min-height:320px !important;max-height:320px !important;background:linear-gradient(180deg,#fff 0%,#e4fdf7 100%) !important;display:flex !important;flex-direction:column !important;justify-content:center !important;align-items:center !important;text-align:center !important;padding:20px !important;overflow:hidden !important}
#aj-articles-mint .aj-cta-mint-heading{font-size:clamp(2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-articles-mint .aj-cta-mint-subheading{font-size:clamp(1rem,2vw,1.25rem) !important;font-weight:600 !important;color:#111 !important;margin:0 0 35px !important;line-height:1.4 !important;max-width:720px !important}
#aj-articles-mint .aj-cta-mint-button{display:inline-flex !important;align-items:center !important;justify-content:center !important;background:linear-gradient(90deg,#895AFB 0%,#56B9C7 100%) !important;color:#fff !important;font-size:1.15rem !important;font-weight:700 !important;text-decoration:none !important;padding:14px 45px !important;border-radius:50px !important;box-shadow:0 8px 20px rgba(137,90,251,.2) !important;transition:transform .2s ease,box-shadow .2s ease !important}
#aj-articles-mint .aj-cta-mint-button:hover{transform:translateY(-2px) !important;box-shadow:0 10px 25px rgba(137,90,251,.3) !important}
@media (max-width:768px){
  #aj-articles-mint{height:auto !important;min-height:280px !important;max-height:none !important;padding:40px 20px !important}
}
@media (max-width:600px){
  #aj-articles-mint .aj-cta-mint-heading{font-size:2rem !important}
}
`;

export function ArticlesMintCta({ hero }: { hero: ArticlesHero }) {
  return (
    <section data-edit="articles-research" id="aj-articles-mint" className={poppins.className}>
      <style>{mintCss}</style>
      <h2 className="aj-cta-mint-heading">{hero.closeTitle}</h2>
      <p className="aj-cta-mint-subheading">{hero.closeSubtitle}</p>
      <a className="aj-cta-mint-button" href={hero.closeHref}>
        {hero.closeLabel}
      </a>
    </section>
  );
}
