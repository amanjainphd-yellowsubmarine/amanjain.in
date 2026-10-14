import { Poppins } from "next/font/google";
import type { ArticlesHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const newsCss = `
#aj-linkedin-newsletter,#aj-linkedin-newsletter *{box-sizing:border-box !important;font-family:inherit !important}
#aj-linkedin-newsletter{width:100% !important;background:#fff !important;padding:28px 24px 8px !important}
#aj-linkedin-newsletter .aj-ln-card{width:100% !important;max-width:1100px !important;margin:0 auto !important;display:flex !important;align-items:center !important;justify-content:space-between !important;gap:28px !important;padding:22px 28px !important;border-radius:24px !important;background:#f3f2f2 !important;color:#111 !important}
#aj-linkedin-newsletter .aj-ln-logo{width:132px !important;height:132px !important;flex:0 0 auto !important;object-fit:cover !important;background:#f3f2f2 !important;display:block !important}
#aj-linkedin-newsletter .aj-ln-copy{min-width:0 !important;flex:1 1 auto !important}
#aj-linkedin-newsletter h2{margin:0 0 8px !important;font-size:clamp(1.6rem,3vw,2.2rem) !important;font-weight:800 !important;color:#111 !important}
#aj-linkedin-newsletter p{margin:0 !important;max-width:640px !important;font-size:1rem !important;font-weight:600 !important;line-height:1.5 !important;color:#222 !important}
#aj-linkedin-newsletter a{flex:0 0 auto !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;min-height:48px !important;padding:0 22px !important;border-radius:999px !important;background:#111 !important;color:#fff !important;font-weight:800 !important;text-decoration:none !important}
@media (max-width:700px){
  #aj-linkedin-newsletter{padding:20px 16px 0 !important}
  #aj-linkedin-newsletter .aj-ln-card{flex-direction:column !important;align-items:flex-start !important;padding:22px !important}
  #aj-linkedin-newsletter .aj-ln-logo{width:112px !important;height:112px !important}
  #aj-linkedin-newsletter a{width:100% !important}
}
`;

export function ArticlesNewsletter({ hero }: { hero: ArticlesHero }) {
  if (!hero.newsletterTitle || !hero.newsletterHref) return null;
  return (
    <section data-edit="articles-newsletter" id="aj-linkedin-newsletter" className={poppins.className}>
      <style>{newsCss}</style>
      <div className="aj-ln-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="aj-ln-logo" src="/images/resources/the-human-read.png" alt="The Human Read by Dr Aman Jain" />
        <div className="aj-ln-copy">
          <h2>{hero.newsletterTitle}</h2>
          <p>{hero.newsletterText}</p>
        </div>
        <a href={hero.newsletterHref} target="_blank" rel="noopener noreferrer">{hero.newsletterLabel || "Open LinkedIn"}</a>
      </div>
    </section>
  );
}
