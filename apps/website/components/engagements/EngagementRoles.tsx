"use client";

import { Poppins } from "next/font/google";
import type { EngagementHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const rolesCss = `
.aj-prof-wrapper,.aj-prof-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
.aj-prof-wrapper{position:relative !important;width:100% !important;background:linear-gradient(180deg,#EBF6FD 0%,#fff 100%) !important;padding:80px 40px !important;display:flex !important;flex-direction:column !important;align-items:center !important}
.aj-prof-inner{width:100% !important;max-width:1100px !important;min-width:0 !important;margin:0 auto !important}
.aj-prof-header{text-align:center !important;margin-bottom:50px !important}
.aj-prof-title{font-size:clamp(2.2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
.aj-prof-subtitle{font-size:clamp(1rem,1.5vw,1.15rem) !important;font-weight:600 !important;color:#111 !important;margin:0 !important;line-height:1.5 !important}
.aj-prof-grid{display:grid !important;grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:30px !important}
.aj-prof-card{background:#fff !important;border-radius:24px !important;padding:50px 40px !important;display:flex !important;flex-direction:column !important;align-items:center !important;text-align:center !important;position:relative !important;box-shadow:0 10px 30px rgba(0,0,0,.02) !important;transition:transform .3s ease,box-shadow .3s ease !important;min-width:0 !important}
.aj-prof-card:hover{transform:translateY(-5px) !important;box-shadow:0 15px 40px rgba(0,0,0,.05) !important}
.aj-prof-card::before{content:'' !important;position:absolute !important;inset:0 !important;border-radius:24px !important;padding:1.5px !important;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0) !important;-webkit-mask-composite:xor !important;mask-composite:exclude !important;pointer-events:none !important}
.aj-prof-card-1::before{background:linear-gradient(135deg,#8A58FC,#56B9C7) !important}
.aj-prof-card-2::before{background:linear-gradient(135deg,#37a3b3,#10b981) !important}
.aj-prof-icon{width:80px !important;height:80px !important;margin-bottom:24px !important}
.aj-prof-icon svg{width:100% !important;height:100% !important}
.aj-prof-card-title{font-size:1.4rem !important;font-weight:700 !important;line-height:1.4 !important;margin:0 0 20px !important;background-clip:text !important;-webkit-background-clip:text !important;-webkit-text-fill-color:transparent !important}
.aj-prof-card-1 .aj-prof-card-title{background-image:linear-gradient(135deg,#8A58FC,#56B9C7) !important}
.aj-prof-card-2 .aj-prof-card-title{background-image:linear-gradient(135deg,#37a3b3,#10b981) !important}
.aj-prof-card-desc{font-size:.95rem !important;color:#444 !important;line-height:1.6 !important;margin:0 !important;font-weight:400 !important}
@media (max-width:768px){
  .aj-prof-wrapper{padding:50px 20px !important}
  .aj-prof-grid{grid-template-columns:1fr !important}
  .aj-prof-card{padding:40px 24px !important}
  .aj-prof-header{margin-bottom:32px !important}
}
`;

const gradients = [
  { id: "profGrad1", from: "#8A58FC", to: "#56B9C7" },
  { id: "profGrad2", from: "#37a3b3", to: "#10b981" },
];

function StageIcon({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx="22" cy="20" r="3.5" />
      <path d="M22 23.5v9 M22 26h6 M22 26l-5 3 M22 32.5l-3 7 M22 32.5l3 7" />
      <rect x="32" y="16" width="22" height="14" rx="1.5" />
      <path d="M36 12h14 M36 16v-4 M50 16v-4 M43 30v7" />
      <path d="M36 26v-4 M41 26v-7 M46 26v-3" />
      <circle cx="51" cy="21" r="1.5" />
      <path d="M49 21h-2" />
      <circle cx="26" cy="48" r="3" />
      <path d="M20 56c0-3.5 2.5-6 6-6s6 2.5 6 6" />
      <circle cx="38" cy="48" r="3" />
      <path d="M32 56c0-3.5 2.5-6 6-6s6 2.5 6 6" />
      <circle cx="50" cy="48" r="3" />
      <path d="M44 56c0-3.5 2.5-6 6-6s6 2.5 6 6" />
    </svg>
  );
}

export function EngagementRoles({ hero }: { hero: EngagementHero }) {
  return (
    <section data-edit="engagements-roles" className={`aj-prof-wrapper ${poppins.className}`}>
      <style>{rolesCss}</style>
      <div className="aj-prof-inner">
        <div className="aj-prof-header">
          <h2 className="aj-prof-title">{hero.rolesTitle}</h2>
          <p className="aj-prof-subtitle">{hero.rolesSubtitle}</p>
        </div>
        <div className="aj-prof-grid">
          {hero.roles.map((role, index) => {
            const tone = gradients[index] ?? gradients[0];
            return (
              <article className={`aj-prof-card aj-prof-card-${index + 1}`} key={role.title}>
                <div className="aj-prof-icon">
                  <StageIcon id={tone.id} from={tone.from} to={tone.to} />
                </div>
                <h3 className="aj-prof-card-title">
                  {role.title.split("\n").map((line, lineIndex, lines) => (
                    <span key={`${lineIndex}-${line}`}>
                      {line}
                      {lineIndex < lines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h3>
                <p className="aj-prof-card-desc">{role.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
