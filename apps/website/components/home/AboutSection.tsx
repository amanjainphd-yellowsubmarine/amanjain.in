"use client";

import { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
import type { HomeAbout } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const aboutCss = `
.aj-about,.aj-about *{box-sizing:border-box !important;font-family:inherit !important}
.aj-about{position:relative !important;width:100% !important;max-width:100% !important;margin:0 !important;border-radius:36px !important;overflow:hidden !important;background:linear-gradient(135deg,#14A79C 0%,#3DBB8C 100%) !important;min-height:620px !important}
.aj-about-blob{position:absolute !important;top:50% !important;right:35% !important;width:520px !important;height:520px !important;background:rgba(255,255,255,.08) !important;border-radius:50% !important;transform:translate(20%,-50%) !important;pointer-events:none !important}
.aj-about-ring{position:absolute !important;top:180px !important;left:40px !important;width:140px !important;height:140px !important;border-radius:50% !important;background:rgba(255,255,255,.12) !important;pointer-events:none !important}
.aj-about-frame{position:absolute !important;top:240px !important;left:110px !important;width:450px !important;height:130px !important;border-left:1.5px solid rgba(255,255,255,.4) !important;border-top:1.5px solid rgba(255,255,255,.4) !important;pointer-events:none !important}
.aj-about-gear{position:absolute !important;bottom:-30px !important;left:-30px !important;width:170px !important;height:170px !important;opacity:.45 !important;pointer-events:none !important}
.aj-about-stats{position:relative !important;z-index:2 !important;display:flex !important;justify-content:space-around !important;align-items:center !important;padding:48px 40px 0 !important;width:100% !important}
.aj-stat{text-align:center !important;flex:1 !important}
.aj-stat-num{font-size:46px !important;font-weight:800 !important;color:#fff !important;line-height:1 !important;margin:0 0 8px !important;text-align:center !important}
.aj-stat-label{font-size:15px !important;font-weight:600 !important;color:#fff !important;opacity:.95 !important;text-align:center !important}
.aj-about-body{display:flex !important;justify-content:space-between !important;align-items:flex-end !important;position:relative !important;margin-top:10px !important;width:100% !important}
.aj-about-photo-wrap{position:relative !important;z-index:5 !important;padding-left:40px !important;display:flex !important;align-items:flex-end !important;height:480px !important;flex:0 0 42% !important;margin-right:-50px !important}
.aj-about-photo{height:480px !important;width:100% !important;max-width:100% !important;display:block !important;object-fit:contain !important;object-position:bottom center !important}
.aj-about-panel{position:relative !important;z-index:3 !important;flex:0 0 60% !important;background:linear-gradient(135deg,#5C7FE4 0%,#6E6FD6 100%) !important;border-radius:60px 0 0 60px !important;padding:48px 60px 48px 80px !important;margin-right:0 !important;display:flex !important;flex-direction:column !important;justify-content:center !important}
.aj-about-name{font-size:36px !important;font-weight:800 !important;color:#fff !important;margin:0 0 10px !important}
.aj-about-tagline{font-size:1.15rem !important;font-weight:700 !important;color:#E4F27A !important;line-height:1.35 !important;margin:0 0 10px !important}
.aj-about-role{font-size:1.05rem !important;font-weight:700 !important;color:#E4F27A !important;margin:0 0 18px !important}
.aj-about-desc{font-size:14px !important;font-weight:400 !important;color:#fff !important;opacity:.95 !important;line-height:1.6 !important;margin:0 0 14px !important}
.aj-about-desc:last-child{margin-bottom:0 !important}
@media (max-width:992px){
  .aj-about{border-radius:24px !important}
  .aj-about-stats{flex-wrap:wrap !important;gap:20px !important;padding:36px 20px 0 !important}
  .aj-stat{flex:0 0 45% !important}
  .aj-stat-num{font-size:34px !important}
  .aj-about-body{flex-direction:column !important;align-items:center !important}
  .aj-about-photo-wrap{padding-left:0 !important;margin-right:0 !important;height:380px !important;justify-content:center !important;flex:0 0 100% !important;margin-bottom:-20px !important}
  .aj-about-photo{height:380px !important}
  .aj-about-panel{flex:0 0 100% !important;width:100% !important;border-radius:30px !important;padding:42px 24px 32px !important}
  .aj-about-blob,.aj-about-ring,.aj-about-frame,.aj-about-gear{display:none !important}
}
@media (max-width:600px){
  .aj-about{width:auto !important;margin:0 12px 8px !important;border-radius:24px !important}
  .aj-about-name{font-size:28px !important}
  .aj-about-tagline,.aj-about-role{font-size:1rem !important}
  .aj-about-photo-wrap,.aj-about-photo{height:320px !important}
}
`;

export function AboutSection({ about }: { about: HomeAbout }) {
  const sectionRef = useRef<HTMLElement>(null);
  const played = useRef(false);
  const [counts, setCounts] = useState(() => about.stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const stats = about.stats;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || played.current) return;
        played.current = true;
        const duration = 1400;
        let start: number | null = null;
        const step = (timestamp: number) => {
          if (start === null) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCounts(stats.map((stat) => Math.floor(eased * stat.target)));
          if (progress < 1) requestAnimationFrame(step);
          else setCounts(stats.map((stat) => stat.target));
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [about.stats]);

  return (
    <section data-edit="home-about" ref={sectionRef} className={`aj-about ${poppins.className}`} id="ajAbout">
      <style>{aboutCss}</style>
      <div className="aj-about-blob" />
      <div className="aj-about-ring" />
      <div className="aj-about-frame" />
      <svg className="aj-about-gear" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="34" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="1 11"
          transform="rotate(0 50 50)"
        />
      </svg>
      <div className="aj-about-stats">
        {about.stats.map((stat, index) => (
          <div className="aj-stat" key={stat.label}>
            <div className="aj-stat-num">
              {counts[index] ?? 0}
              {stat.suffix}
            </div>
            <div className="aj-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="aj-about-body">
        <div className="aj-about-photo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="aj-about-photo" src={about.image} alt={about.alt} />
        </div>
        <div className="aj-about-panel">
          <h2 className="aj-about-name">{about.name}</h2>
          <p className="aj-about-tagline">{about.tagline}</p>
          <p className="aj-about-role">{about.role}</p>
          {about.paragraphs.map((paragraph) => (
            <p className="aj-about-desc" key={paragraph.slice(0, 24)}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
