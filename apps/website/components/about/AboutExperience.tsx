"use client";

import { Poppins } from "next/font/google";
import type { PageHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const experienceCss = `
.aj-exp-section,.aj-exp-section *{box-sizing:border-box !important;font-family:inherit !important}
.aj-exp-section{width:100% !important;max-width:100% !important;margin:0 !important;padding:60px 24px 70px !important;text-align:center !important;background:#fff !important;position:relative !important;overflow-x:auto !important}
.aj-exp-title{font-size:2.5rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 10px !important;letter-spacing:-.5px !important;line-height:1.2 !important}
.aj-exp-subtitle{font-size:1.15rem !important;font-weight:700 !important;color:#111 !important;margin:0 0 65px !important;line-height:1.4 !important}
.aj-timeline-wrapper{position:relative !important;width:100% !important;max-width:1600px !important;margin:0 auto !important;padding:130px 0 !important;display:flex !important;justify-content:space-between !important;align-items:center !important}
.aj-timeline-line{position:absolute !important;top:50% !important;left:0 !important;right:0 !important;height:3.5px !important;background:linear-gradient(90deg,#7c51fe 0%,#38bdf8 50%,#7c51fe 100%) !important;transform:translateY(-50%) !important;z-index:1 !important}
.aj-timeline-step{position:relative !important;z-index:2 !important;display:flex !important;flex-direction:column !important;align-items:center !important;flex:1 !important;min-width:0 !important}
.aj-logo-circle{width:90px !important;height:90px !important;border-radius:50% !important;background:#fff !important;border:3px solid #38bdf8 !important;display:flex !important;align-items:center !important;justify-content:center !important;padding:12px !important;box-shadow:0 8px 20px rgba(0,0,0,.08) !important;transition:all .35s ease !important;position:relative !important;z-index:3 !important;flex-shrink:0 !important}
.aj-logo-circle:hover{transform:scale(1.1) !important;border-color:#7c51fe !important;box-shadow:0 12px 25px rgba(124,81,254,.25) !important}
.aj-logo-circle img{width:100% !important;height:100% !important;object-fit:contain !important}
.aj-info-bubble{position:absolute !important;width:min(188px,92%) !important;min-height:148px !important;left:50% !important;transform:translateX(-50%) !important;background:#fff !important;border-radius:20px !important;padding:0 !important;box-shadow:0 10px 25px rgba(0,0,0,.07) !important;border:1.5px solid #38bdf8 !important;overflow:hidden !important;text-align:left !important;transition:box-shadow .35s ease,transform .35s ease !important}
.aj-info-bubble:hover{transform:translateX(-50%) translateY(-4px) !important;box-shadow:0 14px 28px rgba(0,0,0,.12) !important}
.aj-pos-top{bottom:118px !important}
.aj-pos-top::after{content:'' !important;position:absolute !important;bottom:-10px !important;left:50% !important;transform:translateX(-50%) !important;width:0 !important;height:0 !important;border-left:10px solid transparent !important;border-right:10px solid transparent !important;border-top:10px solid #38bdf8 !important}
.aj-pos-bottom{top:118px !important}
.aj-pos-bottom::before{content:'' !important;position:absolute !important;top:-10px !important;left:50% !important;transform:translateX(-50%) !important;width:0 !important;height:0 !important;border-left:10px solid transparent !important;border-right:10px solid transparent !important;border-bottom:10px solid #7c51fe !important}
.aj-date-header,.aj-date-footer{background:linear-gradient(90deg,#7c51fe 0%,#38bdf8 100%) !important;color:#fff !important;font-size:.78rem !important;font-weight:700 !important;padding:8px 14px !important;text-align:center !important;letter-spacing:.3px !important}
.aj-bubble-body{padding:14px 14px 16px !important}
.aj-bubble-role{font-size:.85rem !important;font-weight:800 !important;color:#111 !important;line-height:1.3 !important;margin:0 0 6px !important}
.aj-bubble-company{font-size:.73rem !important;font-weight:500 !important;color:#444 !important;line-height:1.35 !important;margin:0 !important}
@media (max-width:1024px){
  .aj-exp-section{overflow-x:hidden !important}
  .aj-timeline-wrapper{flex-direction:column !important;padding:0 !important;gap:36px !important;align-items:stretch !important}
  .aj-timeline-line{width:3.5px !important;height:100% !important;left:45px !important;right:auto !important;top:0 !important;transform:none !important}
  .aj-timeline-step{flex-direction:row !important;width:100% !important;align-items:center !important;gap:24px !important}
  .aj-info-bubble{position:static !important;left:auto !important;width:calc(100% - 114px) !important;min-height:0 !important;transform:none !important}
  .aj-info-bubble:hover{transform:none !important}
  .aj-pos-top::after,.aj-pos-bottom::before{display:none !important}
}
@media (max-width:600px){
  .aj-exp-section{padding:40px 16px 48px !important}
  .aj-exp-title{font-size:1.85rem !important}
  .aj-exp-subtitle{font-size:1rem !important;margin-bottom:36px !important}
}
`;

function Bubble({ dates, role, company, above }: { dates: string; role: string; company: string; above: boolean }) {
  return (
    <div className={`aj-info-bubble ${above ? "aj-pos-top" : "aj-pos-bottom"}`}>
      <div className="aj-date-header">{dates}</div>
      <div className="aj-bubble-body">
        <h3 className="aj-bubble-role">{role}</h3>
        <p className="aj-bubble-company">{company}</p>
      </div>
    </div>
  );
}

export function AboutExperience({ hero }: { hero: PageHero }) {
  return (
    <section data-edit="about-experience" className={`aj-exp-section ${poppins.className}`}>
      <style>{experienceCss}</style>
      <h2 className="aj-exp-title">{hero.experienceTitle}</h2>
      <p className="aj-exp-subtitle">{hero.experienceSubtitle}</p>
      <div className="aj-timeline-wrapper">
        <div className="aj-timeline-line" />
        {hero.experience.map((job, index) => {
          const above = index % 2 === 0;
          return (
            <div className="aj-timeline-step" key={`${job.alt}-${job.dates}`}>
              <div className="aj-logo-circle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={job.logo} alt={job.alt} />
              </div>
              <Bubble dates={job.dates} role={job.role} company={job.company} above={above} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
