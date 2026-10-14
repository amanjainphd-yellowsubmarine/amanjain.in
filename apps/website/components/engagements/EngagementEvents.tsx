"use client";

import { Poppins } from "next/font/google";
import type { EngagementHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const eventsCss = `
.aj-events-wrapper,.aj-events-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
.aj-events-wrapper{position:relative !important;width:100% !important;margin:0 auto !important;background:linear-gradient(180deg,#fff 0%,#fff 40%,#e6f6f7 100%) !important;overflow:hidden !important;display:flex !important;flex-direction:column !important;align-items:center !important;padding:60px 0 !important}
.aj-events-header{text-align:center !important;z-index:5 !important;margin-bottom:50px !important;padding:0 20px !important;max-width:900px !important}
.aj-events-title{font-size:2.8rem !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
.aj-events-subtitle{font-size:1.15rem !important;font-weight:600 !important;color:#111 !important;line-height:1.5 !important;margin:0 !important}
.aj-events-carousel{position:relative !important;width:100% !important;z-index:5 !important;display:flex !important;align-items:stretch !important;justify-content:flex-start !important;gap:24px !important;padding:10px 40px 18px !important;flex-wrap:nowrap !important;overflow-x:auto !important;-webkit-overflow-scrolling:touch !important;scrollbar-width:none !important;-ms-overflow-style:none !important}
.aj-events-carousel::-webkit-scrollbar{display:none !important;width:0 !important;height:0 !important}
.aj-event-card{position:relative !important;width:280px !important;min-width:280px !important;min-height:380px !important;background:#fff !important;border-radius:24px !important;padding:35px 25px !important;text-align:left !important;display:flex !important;flex-direction:column !important;box-shadow:0 10px 30px rgba(0,0,0,.04) !important;z-index:2 !important;flex-shrink:0 !important}
.aj-event-card::before{content:"" !important;position:absolute !important;inset:0 !important;border-radius:24px !important;padding:1.5px !important;background:linear-gradient(135deg,#8A58FC 0%,#00B4C9 100%) !important;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0) !important;-webkit-mask-composite:xor !important;mask-composite:exclude !important;pointer-events:none !important}
.aj-card-tags{display:flex !important;flex-wrap:wrap !important;gap:12px !important;margin-bottom:24px !important}
.aj-tag{font-size:.75rem !important;font-weight:500 !important;color:#fff !important;padding:6px 16px !important;border-radius:20px !important}
.aj-tag.future{background:#8A58FC !important}
.aj-tag.past{background:#28C78D !important}
.aj-tag.keynote,.aj-tag.masterclass,.aj-tag.panel{background:#00B4C9 !important}
.aj-events-wrapper .aj-card-title{font-size:1.25rem !important;font-weight:700 !important;color:#000 !important;line-height:1.25 !important;margin:0 0 24px !important;letter-spacing:-.3px !important;min-height:60px !important}
.aj-card-details{list-style:none !important;margin:0 !important;padding:0 !important;display:flex !important;flex-direction:column !important;gap:16px !important}
.aj-card-details li{display:flex !important;align-items:flex-start !important;gap:12px !important;font-size:.85rem !important;font-weight:400 !important;color:#222 !important;line-height:1.4 !important}
.aj-card-details svg{width:20px !important;height:20px !important;flex-shrink:0 !important;margin-top:2px !important}
@media (max-width:600px){
  .aj-events-wrapper{padding:40px 0 !important}
  .aj-events-title{font-size:2.15rem !important}
  .aj-events-subtitle{font-size:1rem !important}
  .aj-events-header{margin-bottom:28px !important}
  .aj-events-carousel{padding:10px 20px 18px !important}
}
`;

const timingLabel = { future: "Future", past: "Past" };
const formatLabel = { keynote: "Keynote Session", masterclass: "Masterclass", panel: "Panel Discussion" };

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#ajEventGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#ajEventGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#ajEventGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

export function EngagementEvents({ hero }: { hero: EngagementHero }) {
  return (
    <section data-edit="engagements-events" className={`aj-events-wrapper ${poppins.className}`}>
      <style>{eventsCss}</style>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="ajEventGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A58FC" />
            <stop offset="100%" stopColor="#00B4C9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="aj-events-header">
        <h2 className="aj-events-title">{hero.eventsTitle}</h2>
        <p className="aj-events-subtitle">
          {hero.eventsSubtitle.split("\n").map((line, index, lines) => (
            <span key={`${index}-${line}`}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
      <div className="aj-events-carousel">
        {hero.events.map((event) => (
          <article className="aj-event-card" key={`${event.date}-${event.title}`}>
            <div className="aj-card-tags">
              <span className={`aj-tag ${event.timing}`}>{timingLabel[event.timing]}</span>
              {event.format ? <span className={`aj-tag ${event.format}`}>{formatLabel[event.format]}</span> : null}
            </div>
            <h3 className="aj-card-title">{event.title}</h3>
            <ul className="aj-card-details">
              <li>
                <PinIcon />
                {event.place}
              </li>
              <li>
                <CalendarIcon />
                {event.date}
              </li>
              <li>
                <MicIcon />
                {event.topic}
              </li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
