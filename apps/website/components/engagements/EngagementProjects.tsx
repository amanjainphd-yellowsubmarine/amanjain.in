"use client";

import { Poppins } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import type { EngagementHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const projectsCss = `
.aj-projects-wrapper,.aj-projects-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
.aj-projects-wrapper{position:relative !important;width:100% !important;max-width:100% !important;height:650px !important;margin:0 auto !important;background-color:#eff6fb !important;display:flex !important;flex-direction:column !important;align-items:center !important;padding:50px 40px 30px !important;overflow:hidden !important}
.aj-projects-header{text-align:center !important;max-width:800px !important;margin-bottom:30px !important;flex-shrink:0 !important;padding:0 8px !important}
.aj-projects-title{font-size:2.5rem !important;font-weight:800 !important;color:#111 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
.aj-projects-subtitle{font-size:1.05rem !important;font-weight:400 !important;color:#555 !important;line-height:1.6 !important;margin:0 !important}
.aj-projects-container{display:flex !important;width:100% !important;max-width:1200px !important;min-width:0 !important;flex-grow:1 !important;height:0 !important;gap:30px !important}
.aj-sidebar-nav{width:32% !important;height:100% !important;min-width:0 !important;overflow-y:auto !important;padding-right:15px !important;display:flex !important;flex-direction:column !important;gap:8px !important;scroll-behavior:smooth !important}
.aj-sidebar-link{display:block !important;width:100% !important;padding:16px 20px !important;font-size:.95rem !important;font-weight:500 !important;color:#333 !important;background:transparent !important;border-radius:12px !important;cursor:pointer !important;transition:all .25s ease !important;text-align:left !important;border:none !important;outline:none !important}
.aj-sidebar-link:hover{color:#2d68ff !important;background:rgba(45,104,255,.05) !important}
.aj-sidebar-link.active{background:#2d68ff !important;color:#fff !important;box-shadow:0 8px 20px rgba(45,104,255,.25) !important}
.aj-sidebar-link.active:hover{color:#fff !important;background:#2d68ff !important}
.aj-content-area{width:68% !important;height:100% !important;min-width:0 !important;background:#fff !important;border-radius:16px !important;padding:25px 35px !important;overflow-y:auto !important;scroll-behavior:smooth !important;box-shadow:0 10px 30px rgba(0,0,0,.03) !important;position:relative !important}
.aj-category-section{margin-bottom:40px !important;padding-top:10px !important}
.aj-category-section:last-child{margin-bottom:20px !important}
.aj-category-header{font-size:1.3rem !important;font-weight:700 !important;color:#2d68ff !important;margin:0 0 20px !important;padding-left:14px !important;border-left:5px solid #2d68ff !important;line-height:1.2 !important}
.aj-project-row{display:flex !important;justify-content:space-between !important;align-items:center !important;padding:16px 20px !important;margin-bottom:12px !important;border:1px solid #f0f0f0 !important;border-radius:12px !important;background:#fff !important;transition:box-shadow .25s ease !important;gap:16px !important}
.aj-project-row:hover{box-shadow:0 6px 15px rgba(0,0,0,.04) !important;border-color:#e4e4e4 !important}
.aj-company-name{font-size:1.05rem !important;font-weight:700 !important;color:#222 !important;width:40% !important;min-width:0 !important}
.aj-project-type{font-size:.95rem !important;font-weight:400 !important;color:#666 !important;width:60% !important;min-width:0 !important;text-align:left !important}
.aj-sidebar-nav::-webkit-scrollbar,.aj-content-area::-webkit-scrollbar{width:6px !important}
.aj-sidebar-nav::-webkit-scrollbar-track,.aj-content-area::-webkit-scrollbar-track{background:transparent !important}
.aj-sidebar-nav::-webkit-scrollbar-thumb,.aj-content-area::-webkit-scrollbar-thumb{background:#c5c5c5 !important;border-radius:10px !important}
.aj-sidebar-nav::-webkit-scrollbar-thumb:hover,.aj-content-area::-webkit-scrollbar-thumb:hover{background:#a0a0a0 !important}
@media (max-width:992px){
  .aj-projects-wrapper{height:auto !important;padding:50px 20px !important}
  .aj-projects-container{flex-direction:column !important;height:auto !important}
  .aj-sidebar-nav{width:100% !important;max-height:250px !important;height:auto !important;margin-bottom:20px !important;padding-right:0 !important}
  .aj-content-area{width:100% !important;max-height:500px !important;height:auto !important;padding:20px !important}
  .aj-project-row{flex-direction:column !important;align-items:flex-start !important;gap:10px !important}
  .aj-company-name,.aj-project-type{width:100% !important}
}
@media (max-width:600px){
  .aj-projects-title{font-size:2rem !important}
  .aj-projects-subtitle{font-size:.95rem !important}
}
`;

export function EngagementProjects({ hero }: { hero: EngagementHero }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const clicking = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const area = contentRef.current;
    const sidebar = sidebarRef.current;
    if (!area) return;
    const sections = [...area.querySelectorAll<HTMLElement>("[data-cat]")];
    const observer = new IntersectionObserver(
      (entries) => {
        if (clicking.current) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-cat"));
          setActive(index);
          const button = sidebar?.querySelector<HTMLButtonElement>(`[data-cat="${index}"]`);
          if (!sidebar || !button) return;
          const box = sidebar.getBoundingClientRect();
          const buttonBox = button.getBoundingClientRect();
          if (buttonBox.top < box.top || buttonBox.bottom > box.bottom) {
            sidebar.scrollTo({ top: button.offsetTop - 8, behavior: "smooth" });
          }
        });
      },
      { root: area, rootMargin: "0px 0px -80% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hero.projectCategories]);

  function openCategory(index: number) {
    const area = contentRef.current;
    const section = area?.querySelector<HTMLElement>(`[data-cat="${index}"]`);
    if (!area || !section) return;
    clicking.current = true;
    setActive(index);
    const top = section.getBoundingClientRect().top - area.getBoundingClientRect().top + area.scrollTop;
    area.scrollTo({ top, behavior: "smooth" });
    window.setTimeout(() => {
      clicking.current = false;
    }, 800);
  }

  return (
    <section data-edit="engagements-projects" className={`aj-projects-wrapper ${poppins.className}`}>
      <style>{projectsCss}</style>
      <div className="aj-projects-header">
        <h2 className="aj-projects-title">{hero.projectsTitle}</h2>
        <p className="aj-projects-subtitle">{hero.projectsSubtitle}</p>
      </div>
      <div className="aj-projects-container">
        <nav className="aj-sidebar-nav" ref={sidebarRef} aria-label="Project categories">
          {hero.projectCategories.map((category, index) => (
            <button
              key={category.title}
              type="button"
              className={`aj-sidebar-link${active === index ? " active" : ""}`}
              data-cat={index}
              onClick={() => openCategory(index)}
            >
              {category.title}
            </button>
          ))}
        </nav>
        <div className="aj-content-area" ref={contentRef}>
          {hero.projectCategories.map((category, index) => (
            <div className="aj-category-section" data-cat={index} key={category.title}>
              <h3 className="aj-category-header">{category.title}</h3>
              {category.items.map((item) => (
                <div className="aj-project-row" key={`${category.title}-${item.company}`}>
                  <div className="aj-company-name">{item.company}</div>
                  {item.type ? <div className="aj-project-type">{item.type}</div> : <div className="aj-project-type" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
