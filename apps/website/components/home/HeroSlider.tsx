"use client";

import { useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import type { HeroSlide } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const ringClass = ["aj-hero-ring-1", "aj-hero-ring-2", "aj-hero-ring-3"];

const heroCss = `
.aj-hero{width:100%;max-width:min(1440px,100%);height:648px;margin:0 auto;overflow:hidden;background:#fff;position:relative}
.aj-hero,.aj-hero *{box-sizing:border-box;font-family:inherit}
.aj-hero-track{display:flex;flex-wrap:nowrap;height:100%;width:100%;min-width:0}
.aj-hero-track{transition:transform .6s cubic-bezier(.25,1,.5,1)}
.aj-hero-slide{flex:0 0 100%;width:100%;min-width:0;max-width:100%;height:100%;position:relative;display:flex;align-items:center;justify-content:space-between;padding:0 5% 0 6%;overflow:hidden}
.aj-hero-slide:not(.aj-hero-slide-active){pointer-events:none}
.aj-hero-visual-tap{cursor:pointer}
.aj-hero-text{width:45%;max-width:520px;min-width:0;z-index:5;text-align:left}
.aj-hero-title{font-size:clamp(2rem,3.8vw,3.25rem);font-weight:800;line-height:1.15;margin:0 0 16px;background:linear-gradient(90deg,#7c51fe 0%,#38bdf8 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.5px}
.aj-hero-subtitle{font-size:clamp(1rem,1.4vw,1.25rem);font-weight:700;color:#111;line-height:1.45;margin:0 0 28px;white-space:normal;overflow-wrap:normal;word-break:normal}
.aj-hero-btn{display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(90deg,#7c51fe 0%,#38bdf8 100%);color:#fff;font-size:1rem;font-weight:700;text-decoration:none;padding:12px 36px;border-radius:50px;transition:transform .25s ease,box-shadow .25s ease;box-shadow:0 8px 20px rgba(124,81,254,.3)}
.aj-hero-btn:hover{transform:translateY(-2px);box-shadow:0 12px 25px rgba(124,81,254,.4);color:#fff}
.aj-hero-visual{width:50%;max-width:624px;height:90%;max-height:564px;min-width:0;position:relative;display:flex;align-items:flex-end;justify-content:center;z-index:2;overflow:hidden}
.aj-hero-ring{position:absolute;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.aj-hero-ring-1{width:min(560px,90%);height:min(560px,90%)}
.aj-hero-ring-2{width:min(460px,74%);height:min(460px,74%)}
.aj-hero-ring-3{width:min(360px,58%);height:min(360px,58%)}
.aj-hero-photo{position:relative;z-index:3;width:auto;max-width:100%;height:100%;max-height:564px;object-fit:contain;object-position:bottom center;display:block}
.aj-hero-kicker{display:inline-block;margin:0 0 14px;padding:5px 12px;border-radius:999px;background:#efe9ff;color:#6d4aff;font-size:.72rem;font-weight:800;letter-spacing:.08em}
.aj-hero-quote{margin:0 0 12px;font-size:clamp(1rem,1.35vw,1.2rem);font-weight:700;line-height:1.45;color:#111}
.aj-hero-by{margin:0 0 22px;font-size:.98rem;font-weight:600;color:#222}
.aj-hero-rows{margin:4px 0 20px;display:grid}
.aj-hero-row{display:grid;grid-template-columns:minmax(96px,34%) 1fr;gap:14px;padding:8px 0;border-bottom:1px solid #ececec;font-size:.98rem;line-height:1.35}
.aj-hero-row strong{font-weight:800;color:#111}
.aj-hero-actions{display:flex;flex-wrap:wrap;gap:12px}
.aj-hero-btn-line{background:#fff;color:#5b3df5;border:2px solid #7c51fe;box-shadow:none}
.aj-hero-btn-line:hover{color:#5b3df5;background:#f6f3ff}
.aj-hero-plain .aj-hero-visual{align-items:center}
.aj-hero-plain .aj-hero-photo{object-position:center;width:100%;height:auto;max-height:520px}
.aj-hero-dots{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;gap:2px;z-index:10}
.aj-hero-dot{width:44px;height:44px;border-radius:50%;background:transparent;border:none;padding:0;cursor:pointer;position:relative}
.aj-hero-dot::before{content:"";position:absolute;left:50%;top:50%;width:9px;height:9px;border-radius:50%;background:#d9d9d9;transform:translate(-50%,-50%);transition:all .3s ease}
.aj-hero-dot-active::before{background:#38bdf8;transform:translate(-50%,-50%) scale(1.3)}
@media (max-width:1100px) and (min-width:768px){
  .aj-hero{height:auto;min-height:calc(100svh - 72px);display:flex;flex-direction:column;justify-content:center;padding-bottom:28px}
  .aj-hero-track{height:auto}
  .aj-hero-slide{flex-direction:row;align-items:center;justify-content:space-between;height:auto;min-height:0;padding:28px 40px 8px;overflow:visible}
  .aj-hero-text{width:48%;max-width:none;text-align:left}
  .aj-hero-title{font-size:clamp(1.85rem,3.6vw,2.7rem);margin-bottom:14px}
  .aj-hero-subtitle{font-size:1.05rem;margin-bottom:22px;text-wrap:balance}
  .aj-hero-visual{width:48%;height:auto;max-width:none;max-height:none;overflow:visible;align-items:center}
  .aj-hero-ring{height:auto;aspect-ratio:1}
  .aj-hero-ring-1{width:108%}
  .aj-hero-ring-2{width:88%}
  .aj-hero-ring-3{width:70%}
  .aj-hero-photo{width:100%;height:auto;max-height:min(68vh,560px)}
  .aj-hero-dots{position:relative;left:auto;bottom:auto;transform:none;margin:20px auto 0}
}
@media (max-width:767px){
  .aj-hero{height:auto;min-height:calc(100svh - 64px);display:flex;flex-direction:column;justify-content:center;padding-bottom:18px}
  .aj-hero-track{height:auto}
  .aj-hero-slide{flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:0;padding:20px 24px 0}
  .aj-hero-text{width:100%;max-width:22rem;text-align:center;margin:0 auto}
  .aj-hero-title{font-size:1.9rem;line-height:1.16;margin-bottom:12px;text-wrap:balance}
  .aj-hero-subtitle{font-size:1rem;font-weight:600;line-height:1.5;margin:0 auto 22px;max-width:18.5rem}
  .aj-hero-visual{width:min(78vw,300px);margin:0 auto}
  .aj-hero-photo{max-height:min(46vh,360px)}
  .aj-hero-row{grid-template-columns:1fr}
  .aj-hero-plain .aj-hero-text{text-align:left}
  .aj-hero-actions{justify-content:center;width:100%;margin:0 auto}
  .aj-hero-dots{margin-top:18px}
}
`;

export function HeroSlider({ slides, editId = "home-hero" }: { slides: HeroSlide[]; editId?: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = Math.max(slides.length, 1);

  useEffect(() => {
    if (slides.length === 0 || paused) return;
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const active = current % count;

  const goToNext = () => {
    if (slides.length < 2) return;
    setCurrent((value) => (value + 1) % slides.length);
  };

  const onSlideActivate = (event: MouseEvent | KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button")) return;
    goToNext();
  };

  return (
    <section
      data-lcp-hero
      data-edit={editId}
      className={`aj-hero ${poppins.className}`}
      aria-label="Home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
    >
      <style>{heroCss}</style>
      <div
        className="aj-hero-track"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const TitleTag = index === 0 ? "h1" : "h2";
          const template = slide.template ?? "portrait";
          const shopLinks = slide.links?.filter((item) => item.label && item.href) ?? [];
          const links = template === "buy" && shopLinks.length > 0 ? shopLinks : [{ label: slide.buttonLabel, href: slide.href }];
          return (
          <article
            key={slide.id}
            className={`aj-hero-slide${index === active ? " aj-hero-slide-active" : ""}${template === "portrait" ? "" : " aj-hero-plain"}`}
            aria-hidden={index !== active}
          >
            <div className="aj-hero-text">
              {template !== "portrait" && slide.eyebrow ? <p className="aj-hero-kicker">{slide.eyebrow}</p> : null}
              <TitleTag className="aj-hero-title">
                {slide.title.split("\n").map((line, lineIndex, lines) => (
                  <span key={`${slide.id}-${lineIndex}`}>
                    {line}
                    {lineIndex < lines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </TitleTag>
              {template === "story" ? <p className="aj-hero-quote">{slide.quote}</p> : null}
              {template === "buy" ? (
                <div className="aj-hero-rows">
                  {(slide.lines ?? []).map((line, index) => (
                    <p className="aj-hero-row" key={`${slide.id}-line-${index}`}>
                      <strong>{line.label}</strong>
                      <span>{line.text}</span>
                    </p>
                  ))}
                </div>
              ) : (
                <p className={template === "story" ? "aj-hero-by" : "aj-hero-subtitle"}>{slide.subtitle}</p>
              )}
              <div className="aj-hero-actions">
                {links.filter((item) => item.label).map((item, index) => (
                  <Link key={`${slide.id}-link-${index}`} href={item.href} className={`aj-hero-btn${template === "buy" && index > 0 ? " aj-hero-btn-line" : ""}`} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div
              className="aj-hero-visual aj-hero-visual-tap"
              role="presentation"
              onClick={onSlideActivate}
            >
              {template === "portrait"
                ? (slide.rings ?? []).map((ring, index) => (
                    <div
                      key={`${slide.alt}-${index}`}
                      className={`aj-hero-ring ${ringClass[index]}`}
                      style={{
                        background: ring.background,
                        opacity: ring.opacity,
                      }}
                    />
                  ))
                : null}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="aj-hero-photo" src={slide.image} alt={slide.alt} decoding="async" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "low"} />
            </div>
          </article>
          );
        })}
      </div>
      <div className="aj-hero-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`aj-hero-dot ${index === active ? "aj-hero-dot-active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
