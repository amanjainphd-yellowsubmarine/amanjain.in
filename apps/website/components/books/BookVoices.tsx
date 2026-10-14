"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import type { BookPage } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const voicesCss = `
#aj-testimonial-wrapper,#aj-testimonial-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
#aj-testimonial-wrapper{width:100% !important;background-color:#FBFBED !important;padding:80px 5% !important;display:flex !important;flex-direction:column !important;align-items:center !important;color:#000 !important;overflow:hidden !important}
#aj-testimonial-wrapper .aj-tw-inner{width:100% !important;max-width:1200px !important;min-width:0 !important;margin:0 auto !important}
#aj-testimonial-wrapper .aj-tw-header{text-align:center !important;margin-bottom:50px !important}
#aj-testimonial-wrapper .aj-tw-main-title{font-size:clamp(2.2rem,4vw,3rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 15px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#aj-testimonial-wrapper .aj-tw-subtitle{font-size:clamp(1.1rem,1.8vw,1.35rem) !important;font-weight:700 !important;color:#000 !important;margin:0 0 8px !important}
#aj-testimonial-wrapper .aj-tw-desc{font-size:1.1rem !important;font-weight:500 !important;color:#111 !important;margin:0 !important}
#aj-testimonial-wrapper .aj-tw-featured{display:flex !important;align-items:center !important;gap:40px !important;margin-bottom:50px !important}
#aj-testimonial-wrapper .aj-tw-feat-img-box{flex:0 0 320px !important;height:320px !important;border-radius:30px !important;border:1.5px solid #E5D58E !important;background:#fff !important;overflow:hidden !important;display:flex !important;align-items:center !important;justify-content:center !important}
#aj-testimonial-wrapper .aj-tw-feat-img-box img{width:100% !important;height:100% !important;object-fit:cover !important}
#aj-testimonial-wrapper .aj-tw-feat-content{flex:1 !important;min-width:0 !important;position:relative !important;padding-right:40px !important}
#aj-testimonial-wrapper .aj-tw-feat-quote{font-size:1.05rem !important;line-height:1.65 !important;color:#333 !important;margin:0 0 25px !important;position:relative !important;z-index:2 !important}
#aj-testimonial-wrapper .aj-tw-feat-name{font-size:1.4rem !important;font-weight:700 !important;color:#000 !important;margin:0 0 5px !important}
#aj-testimonial-wrapper .aj-tw-feat-logo{height:35px !important;width:auto !important;max-width:150px !important;object-fit:contain !important;display:block !important}
#aj-testimonial-wrapper .aj-tw-quote-mark{position:absolute !important;bottom:-20px !important;right:0 !important;width:140px !important;height:140px !important;stroke:#E5D58E !important;fill:none !important;z-index:1 !important;pointer-events:none !important}
#aj-testimonial-wrapper .aj-tw-divider{width:100% !important;height:2px !important;background:#E5D58E !important;margin:0 0 30px !important}
#aj-testimonial-wrapper .aj-tw-carousel-wrapper{position:relative !important;width:100% !important;padding:0 50px !important}
#aj-testimonial-wrapper .aj-tw-carousel-viewport{overflow:hidden !important;width:100% !important;padding:60px 0 30px !important;margin-top:-20px !important}
#aj-testimonial-wrapper .aj-tw-carousel-track{display:flex !important;align-items:flex-start !important;transition:transform .5s cubic-bezier(.4,0,.2,1) !important;width:100% !important}
#aj-testimonial-wrapper .aj-tw-slide{flex:0 0 50% !important;padding:0 15px !important;min-width:0 !important}
#aj-testimonial-wrapper .aj-tw-slide-inner{position:relative !important;background:#fff !important;border-radius:20px !important;border:1.5px solid transparent !important;padding:65px 30px 30px !important;display:flex !important;flex-direction:column !important;align-items:center !important;text-align:center !important;box-shadow:0 8px 24px rgba(0,0,0,.04) !important;transition:all .4s ease !important;cursor:pointer !important;min-height:100% !important}
#aj-testimonial-wrapper .aj-tw-slide-inner:hover{box-shadow:0 15px 40px rgba(0,0,0,.08) !important;border-color:#E5D58E !important;transform:translateY(-5px) !important}
#aj-testimonial-wrapper .aj-tw-slide-avatar{position:absolute !important;top:-45px !important;left:50% !important;transform:translateX(-50%) !important;width:90px !important;height:90px !important;border-radius:50% !important;border:6px solid #FBFBED !important;object-fit:cover !important;background:#fff !important;transition:transform .4s ease !important}
#aj-testimonial-wrapper .aj-tw-slide-inner:hover .aj-tw-slide-avatar{transform:translateX(-50%) scale(1.08) !important}
#aj-testimonial-wrapper .aj-tw-slide-name{font-size:1.15rem !important;font-weight:700 !important;color:#000 !important;margin:0 0 4px !important}
#aj-testimonial-wrapper .aj-tw-slide-title{font-size:.8rem !important;font-style:italic !important;font-weight:600 !important;color:#555 !important;margin:0 0 15px !important;line-height:1.3 !important}
#aj-testimonial-wrapper .aj-tw-slide-quote{font-size:.9rem !important;line-height:1.6 !important;color:#333 !important;margin:0 0 20px !important;position:relative !important;overflow:hidden !important;max-height:72px !important;transition:max-height .6s cubic-bezier(.4,0,.2,1) !important}
#aj-testimonial-wrapper .aj-tw-slide-quote::after{content:'' !important;position:absolute !important;bottom:0 !important;left:0 !important;width:100% !important;height:35px !important;background:linear-gradient(to bottom,transparent,#fff) !important;transition:opacity .4s ease !important;pointer-events:none !important}
#aj-testimonial-wrapper .aj-tw-slide-inner:hover .aj-tw-slide-quote{max-height:800px !important}
#aj-testimonial-wrapper .aj-tw-slide-inner:hover .aj-tw-slide-quote::after{opacity:0 !important}
#aj-testimonial-wrapper .aj-tw-slide-logo{height:25px !important;width:auto !important;max-width:120px !important;object-fit:contain !important;margin-top:auto !important;background:transparent !important}
#aj-testimonial-wrapper .aj-tw-feat-logo{background:transparent !important}
#aj-testimonial-wrapper .aj-tw-nav-btn{position:absolute !important;top:50% !important;transform:translateY(-50%) !important;width:32px !important;height:54px !important;background:#D6D6D6 !important;border:none !important;border-radius:4px !important;display:flex !important;align-items:center !important;justify-content:center !important;cursor:pointer !important;z-index:10 !important;transition:background-color .2s ease !important;padding:0 !important}
#aj-testimonial-wrapper .aj-tw-nav-btn:hover{background:#B0B0B0 !important}
#aj-testimonial-wrapper .aj-tw-nav-btn svg{width:24px !important;height:24px !important;fill:#fff !important}
#aj-testimonial-wrapper .aj-tw-prev{left:5px !important}
#aj-testimonial-wrapper .aj-tw-next{right:5px !important}
#aj-testimonial-wrapper .aj-tw-dots{display:flex !important;justify-content:center !important;gap:8px !important;margin-top:10px !important}
#aj-testimonial-wrapper .aj-tw-dot{width:10px !important;height:10px !important;border-radius:50% !important;background:#D1D5DB !important;border:none !important;cursor:pointer !important;transition:background-color .3s ease !important;padding:0 !important}
#aj-testimonial-wrapper .aj-tw-dot.active{background:#60A5FA !important}
@media (max-width:992px){
  #aj-testimonial-wrapper .aj-tw-featured{flex-direction:column !important;text-align:center !important;gap:30px !important}
  #aj-testimonial-wrapper .aj-tw-feat-content{padding-right:0 !important}
  #aj-testimonial-wrapper .aj-tw-feat-logo{margin:0 auto !important}
  #aj-testimonial-wrapper .aj-tw-quote-mark{right:50% !important;transform:translateX(50%) !important;opacity:.15 !important}
}
@media (max-width:768px){
  #aj-testimonial-wrapper .aj-tw-slide{flex:0 0 100% !important}
  #aj-testimonial-wrapper .aj-tw-carousel-wrapper{padding:0 35px !important}
}
@media (max-width:600px){
  #aj-testimonial-wrapper{padding:60px 15px !important}
  #aj-testimonial-wrapper .aj-tw-feat-img-box{flex:0 0 250px !important;width:250px !important;height:250px !important}
  #aj-testimonial-wrapper .aj-tw-main-title{font-size:2rem !important}
}
`;

export function BookVoices({ book }: { book: BookPage }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(2);
  const maxIndex = Math.max(0, book.voices.length - visible);
  const page = Math.min(index, maxIndex);

  useEffect(() => {
    const update = () => setVisible(window.innerWidth <= 768 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (book.voices.length <= visible) return;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        const limit = Math.max(0, book.voices.length - visible);
        return current >= limit ? 0 : current + 1;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [book.voices.length, visible]);

  return (
    <section data-edit="fomo-voices" id="aj-testimonial-wrapper" className={poppins.className}>
      <style>{voicesCss}</style>
      <div className="aj-tw-inner">
        <div className="aj-tw-header">
          <h2 className="aj-tw-main-title">{book.voicesTitle}</h2>
          <h3 className="aj-tw-subtitle">{book.voicesSubtitle}</h3>
          <p className="aj-tw-desc">{book.voicesDesc}</p>
        </div>
        <div className="aj-tw-featured">
          <div className="aj-tw-feat-img-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={book.featured.photo} alt={book.featured.photoAlt} />
          </div>
          <div className="aj-tw-feat-content">
            <svg className="aj-tw-quote-mark" viewBox="0 0 24 24" strokeWidth="0.8" aria-hidden="true">
              <path d="M10 11h-4a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v6c0 2.21-1.79 4-4 4" />
              <path d="M21 11h-4a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v6c0 2.21-1.79 4-4 4" />
            </svg>
            <p className="aj-tw-feat-quote">{book.featured.quote}</p>
            <h4 className="aj-tw-feat-name">{book.featured.name}</h4>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="aj-tw-feat-logo" src={book.featured.logo} alt={book.featured.logoAlt} />
          </div>
        </div>
        <div className="aj-tw-divider" />
        <div className="aj-tw-carousel-wrapper">
          {maxIndex > 0 ? (
            <button type="button" className="aj-tw-nav-btn aj-tw-prev" aria-label="Previous" onClick={() => setIndex((current) => Math.max(0, Math.min(current, maxIndex) - 1))}>
              <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" /></svg>
            </button>
          ) : null}
          <div className="aj-tw-carousel-viewport">
            <div className="aj-tw-carousel-track" style={{ transform: `translateX(-${page * (100 / visible)}%)` }}>
              {book.voices.map((voice) => (
                <div className="aj-tw-slide" key={voice.name}>
                  <article className="aj-tw-slide-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="aj-tw-slide-avatar" src={voice.photo} alt={voice.photoAlt} />
                    <h5 className="aj-tw-slide-name">{voice.name}</h5>
                    {voice.role ? <p className="aj-tw-slide-title">{voice.role}</p> : null}
                    <div className="aj-tw-slide-quote">{voice.quote}</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="aj-tw-slide-logo" src={voice.logo} alt={voice.logoAlt} />
                  </article>
                </div>
              ))}
            </div>
          </div>
          {maxIndex > 0 ? (
            <button type="button" className="aj-tw-nav-btn aj-tw-next" aria-label="Next" onClick={() => setIndex((current) => Math.min(maxIndex, Math.min(current, maxIndex) + 1))}>
              <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
            </button>
          ) : null}
        </div>
        {maxIndex > 0 ? (
          <div className="aj-tw-dots">
            {Array.from({ length: maxIndex + 1 }, (_, dot) => (
              <button key={dot} type="button" className={`aj-tw-dot${page === dot ? " active" : ""}`} aria-label={`Reviews ${dot + 1}`} onClick={() => setIndex(dot)} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
