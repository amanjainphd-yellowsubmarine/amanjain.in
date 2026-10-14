import { Poppins } from "next/font/google";
import type { PodcastHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const upcomingCss = `
#aj-upcoming-podcast,#aj-upcoming-podcast *{box-sizing:border-box !important;font-family:inherit !important}
#aj-upcoming-podcast{width:100% !important;background:#fff !important;padding:36px 24px 8px !important}
#aj-upcoming-podcast .aj-up-card{width:100% !important;max-width:1100px !important;margin:0 auto !important;display:grid !important;grid-template-columns:160px 1fr !important;gap:24px !important;align-items:center !important;padding:28px !important;border-radius:24px !important;border:1.5px solid #E5D58E !important;background:linear-gradient(180deg,#fff 0%,#FBFBED 100%) !important}
#aj-upcoming-podcast .aj-up-when{display:grid !important;place-items:center !important;min-height:120px !important;border-radius:18px !important;background:linear-gradient(135deg,#7C51FE 0%,#38BDF8 100%) !important;color:#fff !important;font-size:1.35rem !important;font-weight:800 !important;text-align:center !important;padding:12px !important}
#aj-upcoming-podcast h2{margin:0 0 8px !important;font-size:clamp(1.6rem,3vw,2.1rem) !important;font-weight:800 !important;color:#111 !important}
#aj-upcoming-podcast p{margin:0 !important;font-size:1rem !important;font-weight:600 !important;line-height:1.5 !important;color:#222 !important}
@media (max-width:700px){
  #aj-upcoming-podcast{padding:24px 16px 0 !important}
  #aj-upcoming-podcast .aj-up-card{grid-template-columns:1fr !important}
}
`;

export function PodcastUpcoming({ hero }: { hero: PodcastHero }) {
  if (!hero.upcomingTitle) return null;
  return (
    <section data-edit="podcasts-upcoming" id="aj-upcoming-podcast" className={poppins.className}>
      <style>{upcomingCss}</style>
      <div className="aj-up-card">
        <div className="aj-up-when">{hero.upcomingWhen}</div>
        <div>
          <h2>{hero.upcomingTitle}</h2>
          <p>{hero.upcomingText}</p>
        </div>
      </div>
    </section>
  );
}
