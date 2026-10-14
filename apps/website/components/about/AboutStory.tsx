"use client";

import { Poppins } from "next/font/google";
import { useEffect, useRef } from "react";
import type { PageHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const storyCss = `
.aj-bio-content-section,.aj-bio-content-section *,.aj-education-wrapper,.aj-education-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
.aj-bio-content-section{position:relative !important;width:100% !important;background:linear-gradient(180deg,#fdfaf6 0%,#f4f8ec 100%) !important;padding-bottom:80px !important;display:flex !important;flex-direction:column !important;align-items:center !important}
.aj-bio-border-wrapper{width:90% !important;max-width:1120px !important;background:linear-gradient(105deg,#7A40F2 0%,#54D8C4 100%) !important;padding:0 1px 1px !important;border-radius:0 0 24px 24px !important;box-shadow:0 20px 40px rgba(0,0,0,.04) !important}
.aj-bio-inner-box{background:#fff !important;border-radius:0 0 23px 23px !important;padding:20px 60px 50px !important}
.aj-bio-item{padding:30px 0 !important}
.aj-bio-item:not(:last-child){border-bottom:1px solid #eaeaea !important}
.aj-bio-item-header{display:flex !important;align-items:center !important;gap:12px !important;margin-bottom:16px !important}
.aj-bio-icon{width:24px !important;height:24px !important;fill:#8A58FC !important;flex-shrink:0 !important}
.aj-bio-item-title{font-size:1.35rem !important;font-weight:700 !important;margin:0 !important;background:linear-gradient(90deg,#8A58FC 0%,#56B9C7 100%) !important;-webkit-background-clip:text !important;background-clip:text !important;-webkit-text-fill-color:transparent !important}
.aj-bio-text{font-size:.95rem !important;font-weight:400 !important;color:#333 !important;line-height:1.7 !important;margin:0 0 12px !important;padding-left:36px !important}
.aj-bio-text:last-child{margin-bottom:0 !important}
.aj-bio-bold{font-weight:700 !important;color:#111 !important}
.aj-education-wrapper{position:relative !important;width:100% !important;background:linear-gradient(180deg,#f4f8ec 0%,#fff 100%) !important;padding:80px 40px !important;text-align:center !important}
.aj-education-title{font-size:clamp(2.5rem,4vw,3.2rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 60px !important;letter-spacing:-.5px !important}
.aj-education-container{display:flex !important;justify-content:space-between !important;align-items:flex-start !important;max-width:1200px !important;margin:0 auto !important;position:relative !important}
.aj-edu-line{position:absolute !important;top:60px !important;left:5% !important;right:5% !important;height:3.5px !important;background:linear-gradient(90deg,#8A58FC 0%,#56B9C7 50%,#8A58FC 100%) !important;z-index:1 !important}
.aj-edu-item{flex:1 !important;display:flex !important;flex-direction:column !important;align-items:center !important;position:relative !important;z-index:2 !important;padding:0 15px !important;transition:transform .35s ease !important;cursor:default !important}
.aj-edu-item:hover{transform:translateY(-8px) !important}
.aj-edu-item:hover .aj-edu-circle{transform:scale(1.1) !important;box-shadow:0 12px 25px rgba(138,88,252,.25) !important}
.aj-edu-item:hover .aj-edu-degree{color:#8A58FC !important}
.aj-edu-circle{width:120px !important;height:120px !important;border-radius:50% !important;background:linear-gradient(135deg,#8A58FC 0%,#56B9C7 100%) !important;padding:3px !important;margin-bottom:24px !important;box-shadow:0 8px 20px rgba(0,0,0,.08) !important;flex-shrink:0 !important;transition:all .35s ease !important}
.aj-edu-logo-wrapper{width:100% !important;height:100% !important;background:#fff !important;border-radius:50% !important;display:flex !important;align-items:center !important;justify-content:center !important;padding:18px !important}
.aj-edu-logo-wrapper img{width:100% !important;height:100% !important;object-fit:contain !important}
.aj-edu-text{display:flex !important;flex-direction:column !important;align-items:center !important;width:100% !important}
.aj-edu-degree{font-size:1.05rem !important;font-weight:800 !important;color:#000 !important;line-height:1.4 !important;margin:0 0 12px !important;display:block !important;transition:color .3s ease !important}
.aj-edu-inst{font-size:.9rem !important;font-weight:500 !important;color:#444 !important;line-height:1.5 !important;margin:0 0 16px !important}
.aj-edu-year{font-size:1rem !important;font-weight:800 !important;color:#000 !important;margin:0 !important}
.js-animating .aj-animate-zoom{opacity:0 !important;transform:scale(.6) translateY(20px) !important;transition:all .8s cubic-bezier(.34,1.56,.64,1) !important}
.js-animating .aj-animate-zoom.is-visible{opacity:1 !important;transform:scale(1) translateY(0) !important}
.js-animating .aj-edu-item.aj-animate-zoom.is-visible:hover{transform:translateY(-8px) !important}
.js-animating .aj-edu-item:nth-child(2){transition-delay:.1s !important}
.js-animating .aj-edu-item:nth-child(3){transition-delay:.3s !important}
.js-animating .aj-edu-item:nth-child(4){transition-delay:.5s !important}
.js-animating .aj-edu-item:nth-child(5){transition-delay:.7s !important}
@media (max-width:768px){
  .aj-bio-border-wrapper{width:95% !important}
  .aj-bio-inner-box{padding:10px 24px 40px !important}
  .aj-bio-text{padding-left:0 !important;margin-top:12px !important}
  .aj-bio-item-title{font-size:1.2rem !important}
}
@media (max-width:900px){
  .aj-education-wrapper{padding:48px 20px !important}
  .aj-education-title{margin-bottom:28px !important}
  .aj-education-container{flex-direction:column !important;align-items:stretch !important;gap:0 !important;max-width:520px !important}
  .aj-edu-line{width:3.5px !important;height:100% !important;left:48px !important;top:0 !important;right:auto !important;transform:none !important;background:linear-gradient(180deg,#8A58FC 0%,#56B9C7 50%,#8A58FC 100%) !important}
  .aj-edu-item{width:100% !important;max-width:none !important;flex-direction:row !important;align-items:center !important;gap:16px !important;padding:14px 0 !important;text-align:left !important}
  .aj-edu-item:hover{transform:none !important}
  .aj-edu-circle{width:96px !important;height:96px !important;margin-bottom:0 !important}
  .aj-edu-text{align-items:flex-start !important;text-align:left !important}
}
`;

function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span className="aj-bio-bold" key={index}>
        {part.slice(2, -2)}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function Badge() {
  return (
    <svg className="aj-bio-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.25 1.54L17 3l1 2.5 2.65.65-.65 2.65L21 11.5 19 14l1.54 2.25L18 19l-2.5-1L14.85 20.65 12 22l-2.85-1.35L6.5 21 5.5 18.5 2.85 17.85l.65-2.65L2 12.5 4 10l-1.54-2.25L5 5l2.5 1L8.15 3.35 11 2h1zm-1.5 13.5l6-6-1.4-1.4-4.6 4.6-2.6-2.6-1.4 1.4 4 4z" />
    </svg>
  );
}

export function AboutStory({ hero }: { hero: PageHero }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.classList.add("js-animating");
    const nodes = section.querySelectorAll(".aj-animate-zoom");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={poppins.className}>
      <style>{storyCss}</style>
      <section data-edit="about-bio" className="aj-bio-content-section">
        <div className="aj-bio-border-wrapper">
          <div className="aj-bio-inner-box">
            {hero.blocks.map((block) => (
              <div className="aj-bio-item" key={block.title}>
                <div className="aj-bio-item-header">
                  <Badge />
                  <h3 className="aj-bio-item-title">{block.title}</h3>
                </div>
                {block.paragraphs.map((paragraph) => (
                  <p className="aj-bio-text" key={paragraph}>
                    <RichLine text={paragraph} />
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-edit="about-education" className="aj-education-wrapper" id="aj-edu-section" ref={sectionRef}>
        <h2 className="aj-education-title aj-animate-zoom">{hero.educationTitle}</h2>
        <div className="aj-education-container">
          <div className="aj-edu-line" />
          {hero.education.map((item) => (
            <div className="aj-edu-item aj-animate-zoom" key={item.year + item.alt}>
              <div className="aj-edu-circle">
                <div className="aj-edu-logo-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.logo} alt={item.alt} />
                </div>
              </div>
              <div className="aj-edu-text">
                <h3 className="aj-edu-degree">
                  <Lines text={item.degree} />
                </h3>
                <p className="aj-edu-inst">
                  <Lines text={item.institution} />
                </p>
                <p className="aj-edu-year">{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
