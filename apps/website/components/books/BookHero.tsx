"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import { Poppins } from "next/font/google";
import type { BookChapter, BookPage, HeroSlide } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bookCss = `
.aj-book-page,.aj-book-page *{box-sizing:border-box !important;font-family:inherit !important}
.aj-book-page{width:100% !important;margin:0 !important;padding:0 !important;background:#fbfbed !important;color:#000 !important;overflow:hidden !important}
.aj-book-slider{position:relative !important;width:100% !important;overflow:hidden !important}
.aj-book-track{display:flex !important;flex-wrap:nowrap !important;align-items:stretch !important;width:100% !important;transition:transform .6s cubic-bezier(.25,1,.5,1) !important}
.aj-book-slide{flex:0 0 100% !important;width:100% !important;min-width:0 !important;display:flex !important}
.aj-book-slide:not(.aj-book-slide-active){pointer-events:none !important}
.aj-book-slide-active{cursor:pointer !important}
.aj-book-slide-active a,.aj-book-slide-active button,.aj-book-slide-active input{pointer-events:auto !important;cursor:pointer !important}
.aj-book-dots{display:flex !important;justify-content:center !important;gap:8px !important;padding:8px 0 18px !important;background:#fbfbed !important}
.aj-book-dot{width:9px !important;height:9px !important;border-radius:50% !important;border:none !important;padding:0 !important;background:#d9d9d9 !important;cursor:pointer !important}
.aj-book-dot-active{background:#111 !important;transform:scale(1.25) !important}
.aj-book-extra{flex:1 1 auto !important;width:100% !important;min-height:650px !important;display:flex !important;align-items:center !important;justify-content:space-between !important;gap:28px !important;padding:64px 6% 72px !important;background:#fbfbed !important}
.aj-book-extra-text{width:48% !important;max-width:540px !important;min-width:0 !important}
.aj-book-extra-kicker{display:inline-block !important;margin:0 0 14px !important;padding:5px 12px !important;border-radius:999px !important;background:#efe9ff !important;color:#6d4aff !important;font-size:12px !important;font-weight:800 !important;letter-spacing:.08em !important}
.aj-book-extra-title{margin:0 0 16px !important;font-size:clamp(36px,4vw,56px) !important;line-height:1.05 !important;font-weight:800 !important;letter-spacing:-1px !important;color:#000 !important}
.aj-book-extra-quote{margin:0 0 12px !important;font-size:18px !important;line-height:1.45 !important;font-weight:700 !important;color:#111 !important}
.aj-book-extra-by{margin:0 0 22px !important;font-size:16px !important;font-weight:600 !important;color:#111 !important}
.aj-book-extra-rows{margin:8px 0 22px !important}
.aj-book-extra-row{display:grid !important;grid-template-columns:120px 1fr !important;gap:12px !important;padding:8px 0 !important;border-bottom:1px solid #e6e0c8 !important;font-size:16px !important;line-height:1.35 !important}
.aj-book-extra-actions{display:flex !important;flex-wrap:wrap !important;gap:12px !important}
.aj-book-extra-btn{display:inline-flex !important;align-items:center !important;justify-content:center !important;padding:12px 22px !important;border-radius:28px !important;background:#111 !important;color:#fff !important;font-weight:700 !important;text-decoration:none !important}
.aj-book-extra-btn-line{background:transparent !important;color:#111 !important;border:2px solid #111 !important}
.aj-book-extra-visual{width:46% !important;min-width:0 !important;display:flex !important;align-items:center !important;justify-content:center !important;position:relative !important}
.aj-book-extra-photo{position:relative !important;z-index:2 !important;max-width:100% !important;max-height:480px !important;object-fit:contain !important;display:block !important}
.aj-book-extra-ring{position:absolute !important;border-radius:50% !important;left:50% !important;top:50% !important;transform:translate(-50%,-50%) !important}
.aj-book-extra-ring-1{width:min(420px,78%) !important;height:min(420px,78%) !important}
.aj-book-extra-ring-2{width:min(340px,64%) !important;height:min(340px,64%) !important}
.aj-book-extra-ring-3{width:min(260px,50%) !important;height:min(260px,50%) !important}
.aj-book-hero{position:relative !important;flex:1 1 auto !important;width:100% !important;min-height:650px !important;background:#fbfbed !important;overflow:hidden !important}
.aj-book-hero-inner{position:relative !important;width:100% !important;max-width:1200px !important;min-height:650px !important;margin:0 auto !important;padding:75px 40px 0 !important}
.aj-book-gold-bg{position:absolute !important;top:0 !important;right:0 !important;width:29% !important;height:100% !important;background:#e5d58e !important}
.aj-book-content{position:relative !important;width:55% !important;z-index:3 !important}
.aj-book-heading{margin:0 0 25px !important;font-size:clamp(48px,5vw,68px) !important;line-height:1.05 !important;font-weight:800 !important;letter-spacing:-2px !important;color:#000 !important}
.aj-book-subheading{max-width:500px !important;margin:0 0 28px !important;font-size:21px !important;line-height:1.45 !important;font-weight:600 !important;color:#111 !important}
.aj-book-form{display:flex !important;flex-wrap:wrap !important;gap:16px !important;max-width:500px !important}
.aj-book-input{width:185px !important;height:42px !important;padding:0 14px !important;border:2px solid #e5e5e5 !important;border-radius:14px !important;background:#fff !important;color:#111 !important;font-size:13px !important;outline:none !important;box-shadow:0 2px 5px rgba(0,0,0,.08) !important}
.aj-book-input::placeholder{color:#999 !important}
.aj-book-input:focus{border-color:#c5c5c5 !important}
.aj-book-button{height:48px !important;padding:0 20px !important;margin-top:4px !important;border:2px solid #000 !important;border-radius:28px !important;background:transparent !important;color:#000 !important;font-size:17px !important;font-weight:700 !important;cursor:pointer !important;transition:all .3s ease !important}
.aj-book-button:hover{background:#000 !important;color:#fff !important}
.aj-book-button:disabled{opacity:.6 !important;cursor:default !important}
.aj-book-note{flex:1 0 100% !important;margin:0 !important;font-size:14px !important;font-weight:600 !important;color:#111 !important}
.aj-book-logo{width:190px !important;height:auto !important;margin-top:10px !important;margin-bottom:10px !important;margin-left:390px !important;display:block !important;object-fit:contain !important}
.aj-book-cover-area{position:absolute !important;top:25px !important;right:30px !important;width:440px !important;height:520px !important;z-index:6 !important;display:flex !important;align-items:flex-start !important;justify-content:center !important;perspective:1400px !important}
.aj-book-cover-link{display:block !important;width:100% !important;height:100% !important;text-decoration:none !important}
.aj-book-3d{position:relative !important;width:78% !important;height:88% !important;transform-style:preserve-3d !important;animation:ajBookTurn 7s ease-in-out infinite !important}
.aj-book-cover{width:100% !important;height:100% !important;object-fit:contain !important;object-position:center !important;display:block !important;filter:drop-shadow(18px 22px 16px rgba(0,0,0,.28)) !important;background:transparent !important}
@keyframes ajBookTurn{0%,100%{transform:rotateY(-24deg) rotateX(7deg) translateY(0)}50%{transform:rotateY(18deg) rotateX(2deg) translateY(-16px)}}
.aj-book-testimonial{position:absolute !important;left:0 !important;bottom:0 !important;width:100% !important;min-height:175px !important;padding:28px 40px 22px !important;background:#e5d58e !important;border-radius:38px 38px 0 0 !important;z-index:5 !important}
.aj-book-testimonial-inner{max-width:1200px !important;margin:0 auto !important;display:flex !important;flex-direction:column !important;gap:16px !important}
.aj-book-quote{margin:0 !important;max-width:760px !important;font-size:15px !important;line-height:1.45 !important;font-weight:600 !important;font-style:italic !important;color:#111 !important}
.aj-book-author{display:flex !important;align-items:center !important;gap:14px !important;margin-left:auto !important;width:min(420px,100%) !important;text-align:left !important}
.aj-book-author-photo{width:74px !important;height:74px !important;border-radius:50% !important;object-fit:cover !important;border:3px solid #fff !important;background:#fff !important;flex-shrink:0 !important}
.aj-book-author-name{margin:0 !important;font-size:19px !important;font-weight:700 !important;text-align:left !important}
.aj-book-author-info{margin:6px 0 0 !important;font-size:12px !important;line-height:1.35 !important;font-weight:500 !important;font-style:italic !important;text-align:left !important}
.aj-whats-inside{position:relative !important;width:100% !important;max-width:100% !important;padding:92px 0 76px !important;background:#fbfbed !important;overflow:hidden !important}
.aj-whats-inside-container{width:100% !important;max-width:none !important;margin:0 !important}
.aj-whats-inside-title{margin:0 0 42px !important;padding:0 32px !important;text-align:center !important;font-size:clamp(40px,4.2vw,58px) !important;line-height:1.05 !important;font-weight:800 !important;letter-spacing:-1.4px !important;color:#111 !important}
.aj-whats-inside-title::after{content:'' !important;display:block !important;width:64px !important;height:2px !important;margin:18px auto 0 !important;background:#c4b56a !important}
.aj-chapters{display:block !important;width:100% !important;max-width:100% !important;overflow:hidden !important;padding:8px 28px 36px !important;border:none !important;box-shadow:none !important;cursor:default !important}
.aj-chapter-set{display:grid !important;grid-template-columns:repeat(var(--aj-cols,5),minmax(0,1fr)) !important;align-items:stretch !important;gap:0 !important;width:100% !important}
.aj-chapter-set+.aj-chapter-set{display:none !important}
.aj-chapter-item{position:relative !important;display:flex !important;flex-direction:column !important;min-width:0 !important;width:auto !important;min-height:0 !important;padding:8px 22px 0 !important;background:transparent !important;text-align:center !important;border:none !important;border-right:1px solid rgba(196,181,106,.55) !important;border-radius:0 !important;overflow:hidden !important;box-shadow:none !important}
.aj-chapter-set .aj-chapter-item:last-child{border-right:none !important}
.aj-chapter-item::before{content:none !important}
.aj-chapter-item:hover{transform:none !important;box-shadow:none !important}
.aj-chapter-summary{display:flex !important;flex-direction:column !important;align-items:center !important;gap:8px !important;padding:12px 6px 0 !important;text-align:center !important;list-style:none !important}
.aj-chapter-number{margin:0 !important;font-size:clamp(52px,4.6vw,78px) !important;line-height:.9 !important;font-weight:500 !important;letter-spacing:-1px !important;color:transparent !important;-webkit-text-stroke:1.4px #c4b56a !important;text-align:center !important}
.aj-chapter-title{margin:6px 0 0 !important;font-size:clamp(18px,1.45vw,24px) !important;line-height:1.2 !important;font-weight:800 !important;letter-spacing:-.3px !important;color:#141414 !important;text-align:center !important}
.aj-chapter-panel{display:flex !important;flex-direction:column !important;flex:1 1 auto !important;gap:0 !important;padding:14px 4px 18px !important}
.aj-chapter-description{margin:0 0 22px !important;font-size:14px !important;line-height:1.45 !important;font-weight:500 !important;font-style:italic !important;color:#2c271c !important;text-align:center !important}
.aj-chapter-points{width:100% !important;text-align:left !important;margin-top:4px !important}
.aj-point{display:flex !important;align-items:flex-start !important;gap:10px !important;margin-bottom:14px !important}
.aj-point-number{min-width:28px !important;padding-top:1px !important;font-size:16px !important;line-height:1.2 !important;font-weight:500 !important;color:transparent !important;-webkit-text-stroke:1px #c4b56a !important}
.aj-point-text{font-size:15px !important;line-height:1.35 !important;font-weight:600 !important;color:#1a1a1a !important}
.aj-chapter-image{width:100% !important;height:auto !important;aspect-ratio:1.05 !important;margin-top:auto !important;object-fit:contain !important;object-position:center !important;border-radius:18px !important;display:block !important;background:transparent !important;padding:0 !important}
.aj-fomo-slide{flex:1 1 auto !important;width:100% !important;min-height:640px !important;display:flex !important;align-items:center !important;position:relative !important;overflow:hidden !important;background:#fbfcee !important;color:#111 !important}
.aj-fomo-panel{display:grid !important;grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important;gap:40px !important;align-items:center !important;padding:72px 6% !important}
.aj-fomo-copy{position:relative !important;z-index:2 !important;max-width:540px !important;min-width:0 !important}
.aj-fomo-pill{display:inline-flex !important;margin:0 0 22px !important;padding:7px 14px !important;border:1.5px solid #b7a45a !important;border-radius:999px !important;background:transparent !important;color:#111 !important;font-size:11px !important;font-weight:700 !important;letter-spacing:.16em !important;text-transform:uppercase !important}
.aj-fomo-heading{margin:0 0 18px !important;font-size:clamp(52px,5.4vw,84px) !important;line-height:.92 !important;font-weight:800 !important;letter-spacing:-2.4px !important;color:#111 !important}
.aj-fomo-sub{margin:0 0 28px !important;max-width:460px !important;font-size:20px !important;line-height:1.35 !important;font-weight:600 !important;color:#111 !important}
.aj-fomo-btn{display:inline-flex !important;align-items:center !important;justify-content:center !important;padding:13px 22px !important;border-radius:999px !important;background:#111 !important;color:#fff !important;font-size:15px !important;font-weight:700 !important;text-decoration:none !important}
.aj-fomo-btn:hover{background:#2a2a2a !important;color:#fff !important}
.aj-fomo-art{position:relative !important;width:100% !important;max-width:520px !important;justify-self:end !important}
.aj-fomo-art img{width:100% !important;height:auto !important;display:block !important;border-radius:28px !important}
.aj-fomo-card{position:absolute !important;left:5% !important;bottom:7% !important;width:min(380px,88%) !important;margin:0 !important;padding:16px 18px 14px !important;border-radius:16px !important;background:#fff !important;box-shadow:0 18px 40px rgba(70,60,20,.16) !important}
.aj-fomo-card p{margin:0 !important;font-size:14px !important;line-height:1.45 !important;font-weight:600 !important;font-style:italic !important;color:#111 !important}
.aj-fomo-card-by{margin-top:10px !important;font-style:normal !important;font-size:12px !important;font-weight:500 !important}
.aj-fomo-card-by strong{font-weight:800 !important}
.aj-fomo-arch{flex-direction:column !important;align-items:stretch !important;padding:0 !important}
.aj-fomo-arch-body{flex:1 1 auto !important;display:grid !important;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr) !important;gap:28px !important;align-items:center !important;padding:64px 6% 28px !important}
.aj-fomo-stage{position:relative !important;display:flex !important;justify-content:center !important;min-height:460px !important}
.aj-fomo-arch-shape{width:min(380px,100%) !important;height:440px !important;display:flex !important;align-items:flex-end !important;justify-content:center !important;background:#e4dc9e !important;border-radius:220px 220px 36px 36px !important}
.aj-fomo-book{width:68% !important;height:auto !important;margin-bottom:10px !important;object-fit:contain !important;filter:drop-shadow(0 22px 24px rgba(0,0,0,.22)) !important}
.aj-fomo-chip{position:absolute !important;left:6% !important;bottom:48px !important;z-index:3 !important;margin:0 !important;padding:10px 16px !important;border-radius:999px !important;background:#111 !important;color:#f6f3df !important;font-size:13px !important;font-weight:700 !important;transform:rotate(-8deg) !important}
.aj-fomo-ticker{width:100% !important;overflow:hidden !important;background:#111 !important;color:#e6d98a !important;padding:14px 0 !important}
.aj-fomo-ticker-track{display:flex !important;width:max-content !important;animation:ajFomoMarquee 22s linear infinite !important}
.aj-fomo-ticker span{padding:0 10px !important;font-size:13px !important;font-weight:700 !important;letter-spacing:.16em !important;white-space:nowrap !important}
@keyframes ajFomoMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.aj-fomo-word{justify-content:space-between !important;gap:36px !important;background:#dacf97 !important;padding:72px 7% 88px !important}
.aj-fomo-word-art{position:relative !important;z-index:1 !important;width:min(340px,36%) !important;flex:none !important;margin-right:3% !important}
.aj-fomo-word-art img{width:100% !important;height:auto !important;max-height:520px !important;display:block !important;object-fit:contain !important;border-radius:2px !important;filter:drop-shadow(16px 24px 18px rgba(60,50,10,.22)) !important;transform:rotate(7deg) !important}
.aj-fomo-word-art .aj-fomo-seal{right:-8% !important;bottom:4% !important;width:132px !important;height:132px !important}
.aj-fomo-word .aj-fomo-pill{border-color:#111 !important}
.aj-fomo-giant{position:absolute !important;right:-2% !important;top:46% !important;z-index:0 !important;margin:0 !important;transform:translateY(-50%) !important;font-size:clamp(150px,26vw,320px) !important;line-height:.8 !important;font-weight:800 !important;letter-spacing:-10px !important;color:#c9bc74 !important;pointer-events:none !important;user-select:none !important}
.aj-fomo-seal{position:absolute !important;right:7% !important;bottom:11% !important;z-index:2 !important;width:148px !important;height:148px !important}
.aj-fomo-seal svg{width:100% !important;height:100% !important;display:block !important}
@media (max-width:1000px) and (min-width:768px){
  .aj-book-extra{flex-direction:column !important;align-items:stretch !important;min-height:0 !important;padding:48px 24px 56px !important}
  .aj-book-extra-text,.aj-book-extra-visual{width:100% !important;max-width:none !important}
  .aj-book-hero,.aj-book-hero-inner{min-height:1240px !important}
  .aj-book-hero-inner{padding:55px 25px 0 !important}
  .aj-book-content{width:100% !important;text-align:center !important}
  .aj-book-subheading{margin-left:auto !important;margin-right:auto !important}
  .aj-book-form{justify-content:center !important;margin:0 auto !important}
  .aj-book-logo{margin:30px auto 0 !important}
  .aj-book-gold-bg{width:100% !important;height:560px !important;top:450px !important}
  .aj-book-cover-area{top:470px !important;right:50% !important;transform:translateX(50%) !important;width:390px !important;height:450px !important}
  .aj-book-testimonial{position:absolute !important;bottom:0 !important;min-height:230px !important;padding:25px !important}
  .aj-book-testimonial-inner{padding-right:0 !important}
  .aj-book-author{width:100% !important;margin-left:0 !important}
  .aj-fomo-panel,.aj-fomo-arch-body{grid-template-columns:1fr !important;padding:48px 24px 28px !important}
  .aj-fomo-art{justify-self:center !important;max-width:460px !important}
  .aj-fomo-heading{font-size:48px !important}
  .aj-fomo-sub{font-size:17px !important}
  .aj-fomo-word{flex-direction:column !important;align-items:stretch !important;padding:52px 24px 130px !important}
  .aj-fomo-word-art{width:100% !important;max-width:420px !important}
  .aj-fomo-giant{top:auto !important;right:-6% !important;bottom:18px !important;transform:none !important;font-size:120px !important}
  .aj-fomo-seal{width:108px !important;height:108px !important;right:16px !important;bottom:18px !important}
  .aj-fomo-stage{min-height:360px !important}
  .aj-fomo-arch-shape{height:340px !important}
}
@media (max-width:1000px){
  .aj-chapters{display:flex !important;overflow-x:auto !important;overflow-y:hidden !important;cursor:grab !important;padding:8px 16px 20px !important;scrollbar-width:thin !important;scrollbar-color:#e5d58e transparent !important}
  .aj-chapter-set,.aj-chapter-set+.aj-chapter-set{display:flex !important;flex:none !important;gap:0 !important;width:max-content !important}
  .aj-chapter-item{flex:0 0 min(300px,82vw) !important;width:min(300px,82vw) !important;min-width:min(300px,82vw) !important}
}
@media (max-width:600px){
  .aj-book-extra{padding:36px 18px 48px !important}
  .aj-book-extra-title{font-size:36px !important}
  .aj-book-extra-row{grid-template-columns:1fr !important}
  .aj-whats-inside{padding:64px 0 48px !important}
  .aj-whats-inside-title{font-size:34px !important;letter-spacing:-.8px !important}
  .aj-chapter-summary{padding:8px 4px 0 !important}
  .aj-chapter-panel{padding:12px 2px 16px !important}
  .aj-chapter-image{height:auto !important}
}
@media (max-width:767px){
  .aj-book-slider{background:linear-gradient(180deg,#fbfbed 0%,#f7f2e4 48%,#efe6c8 100%) !important}
  .aj-book-dots{padding:10px 0 20px !important;gap:2px !important;background:transparent !important}
  .aj-book-dot{width:44px !important;height:44px !important;border-radius:50% !important;background:transparent !important;position:relative !important}
  .aj-book-dot::before{content:"" !important;position:absolute !important;left:50% !important;top:50% !important;width:9px !important;height:9px !important;border-radius:50% !important;background:#c8c0a8 !important;transform:translate(-50%,-50%) !important;transition:transform .25s ease,background .25s ease !important}
  .aj-book-dot-active::before{background:#111 !important;transform:translate(-50%,-50%) scale(1.3) !important}
  .aj-book-dot-active{background:transparent !important;transform:none !important}
  .aj-book-hero{min-height:0 !important;background:transparent !important;overflow:visible !important}
  .aj-book-hero-inner{min-height:0 !important;padding:24px 22px 0 !important;display:flex !important;flex-direction:column !important;align-items:center !important}
  .aj-book-gold-bg{display:none !important}
  .aj-book-content{width:100% !important;max-width:22rem !important;text-align:center !important;order:1 !important}
  .aj-book-heading{margin:0 0 12px !important;font-size:clamp(2rem,9vw,2.75rem) !important;line-height:1.08 !important;letter-spacing:-1.2px !important;text-wrap:balance !important}
  .aj-book-subheading{margin:0 auto 16px !important;max-width:18.5rem !important;font-size:1rem !important;line-height:1.5 !important;font-weight:600 !important}
  .aj-book-logo{margin:4px auto 0 !important;width:min(156px,48vw) !important;margin-left:auto !important}
  .aj-book-cover-area{position:relative !important;top:auto !important;right:auto !important;transform:none !important;width:min(76vw,290px) !important;height:auto !important;margin:18px auto 0 !important;order:2 !important;perspective:1200px !important}
  .aj-book-3d{width:100% !important;height:auto !important}
  .aj-book-cover{max-height:min(44vh,360px) !important;width:auto !important;margin:0 auto !important;filter:drop-shadow(0 20px 28px rgba(0,0,0,.22)) !important}
  .aj-book-testimonial{position:relative !important;order:3 !important;width:calc(100% - 32px) !important;max-width:22rem !important;margin:22px auto 18px !important;min-height:0 !important;padding:20px 18px 18px !important;border-radius:22px !important;background:rgba(255,252,240,.92) !important;backdrop-filter:blur(8px) !important;box-shadow:0 14px 36px rgba(72,58,18,.14) !important;border:1px solid rgba(255,255,255,.65) !important}
  .aj-book-testimonial-inner{gap:14px !important}
  .aj-book-quote{max-width:none !important;font-size:13.5px !important;line-height:1.5 !important;text-align:left !important}
  .aj-book-author{width:100% !important;margin:0 !important;gap:12px !important}
  .aj-book-author-photo{width:56px !important;height:56px !important;border-width:2px !important}
  .aj-book-author-name{font-size:16px !important}
  .aj-book-author-info{font-size:11px !important}
  .aj-fomo-slide{min-height:calc(100svh - 64px) !important;justify-content:center !important;background:linear-gradient(180deg,#fbfcee 0%,#f4f0e2 100%) !important}
  .aj-fomo-panel{display:flex !important;flex-direction:column !important;justify-content:center !important;align-items:center !important;gap:20px !important;width:100% !important;padding:28px 22px 32px !important;text-align:center !important}
  .aj-fomo-copy{max-width:22rem !important;margin:0 auto !important;display:flex !important;flex-direction:column !important;align-items:center !important}
  .aj-fomo-pill{margin-bottom:16px !important;font-size:10px !important;padding:6px 12px !important}
  .aj-fomo-heading{font-size:clamp(2.35rem,10vw,2.85rem) !important;line-height:1 !important;letter-spacing:-1.6px !important;text-wrap:balance !important}
  .aj-fomo-sub{max-width:18.5rem !important;margin:0 auto 20px !important;font-size:1rem !important;line-height:1.45 !important}
  .aj-fomo-btn{min-height:48px !important;padding:0 28px !important;box-shadow:0 10px 24px rgba(0,0,0,.12) !important}
  .aj-fomo-art{max-width:min(88vw,320px) !important;margin:0 auto !important}
  .aj-fomo-art img{border-radius:22px !important;box-shadow:0 16px 32px rgba(40,35,15,.12) !important}
  .aj-fomo-card{left:50% !important;right:auto !important;transform:translateX(-50%) !important;width:min(94%,300px) !important;bottom:6% !important;padding:14px 16px !important;border-radius:18px !important}
  .aj-fomo-arch-body{display:flex !important;flex-direction:column !important;align-items:center !important;padding:28px 20px 16px !important;text-align:center !important}
  .aj-fomo-arch .aj-fomo-copy{align-items:center !important}
  .aj-fomo-stage{min-height:0 !important;width:100% !important;margin-top:4px !important}
  .aj-fomo-arch-shape{width:min(70vw,270px) !important;height:min(78vw,310px) !important;border-radius:200px 200px 28px 28px !important}
  .aj-fomo-chip{left:50% !important;right:auto !important;transform:translateX(-50%) rotate(-6deg) !important;bottom:10px !important;font-size:12px !important}
  .aj-fomo-word{flex-direction:column !important;align-items:center !important;padding:32px 20px 96px !important;text-align:center !important;background:linear-gradient(165deg,#e8df9e 0%,#dacf97 55%,#c9bc74 100%) !important}
  .aj-fomo-word .aj-fomo-copy{align-items:center !important;z-index:2 !important}
  .aj-fomo-word-art{width:min(72vw,260px) !important;max-width:none !important;margin:18px auto 0 !important}
  .aj-fomo-word-art img{transform:rotate(5deg) !important}
  .aj-fomo-giant{right:0 !important;left:0 !important;top:auto !important;bottom:8px !important;transform:none !important;text-align:center !important;font-size:clamp(88px,26vw,132px) !important;letter-spacing:-6px !important;opacity:.55 !important}
  .aj-fomo-word-art .aj-fomo-seal,.aj-fomo-seal{width:96px !important;height:96px !important;right:8% !important;bottom:6% !important}
}
@media (prefers-reduced-motion:reduce){
  .aj-book-3d{animation:none !important;transform:rotateY(-18deg) rotateX(4deg) !important}
  .aj-fomo-ticker-track{animation:none !important}
}
`;

function Lines({ value }: { value: string }) {
  const lines = value.split("\n");
  return lines.map((line, index) => (
    <span key={`${index}-${line}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function ChapterCard({ chapter, copy }: { chapter: BookChapter; copy: number }) {
  return (
    <article className="aj-chapter-item" aria-hidden={copy === 1 ? true : undefined}>
      <div className="aj-chapter-summary">
        <span className="aj-chapter-number">{chapter.number}</span>
        <span className="aj-chapter-title">
          <Lines value={chapter.title} />
        </span>
      </div>
      <div className="aj-chapter-panel">
        <div>
          <p className="aj-chapter-description">{chapter.description}</p>
          <div className="aj-chapter-points">
            {chapter.points.map((point) => (
              <div className="aj-point" key={`${copy}-${chapter.number}-${point.number}`}>
                <span className="aj-point-number">{point.number}</span>
                <span className="aj-point-text">
                  <Lines value={point.text} />
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="aj-chapter-image" src={chapter.image} alt={copy === 1 ? "" : chapter.alt} />
      </div>
    </article>
  );
}

function ChapterRow({ chapters }: { chapters: BookChapter[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let drag = false;
    let startX = 0;
    let startLeft = 0;
    let last = 0;
    let frame = 0;
    const speed = 0.04;

    const loopWidth = () => {
      const set = row.firstElementChild;
      if (!(set instanceof HTMLElement)) return 0;
      const gap = Number.parseFloat(window.getComputedStyle(row).columnGap || "0") || 0;
      return set.offsetWidth + gap;
    };

    let wrapping = false;
    const wrap = () => {
      if (wrapping) return;
      const distance = loopWidth();
      if (distance <= row.clientWidth) return;
      wrapping = true;
      if (row.scrollLeft >= distance) row.scrollLeft -= distance;
      if (row.scrollLeft < 0) row.scrollLeft += distance;
      wrapping = false;
    };

    const step = (now: number) => {
      if (!last) last = now;
      const delta = Math.min(now - last, 40);
      last = now;
      const distance = loopWidth();
      if (!paused && !drag && distance > row.clientWidth + 8) {
        row.scrollLeft += delta * speed;
        wrap();
      }
      frame = window.requestAnimationFrame(step);
    };
    frame = window.requestAnimationFrame(step);

    const hold = () => {
      paused = true;
    };
    const release = () => {
      if (!drag) paused = false;
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if (event.offsetY > row.clientHeight) return;
      drag = true;
      paused = true;
      startX = event.clientX;
      startLeft = row.scrollLeft;
      row.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!drag) return;
      row.scrollLeft = startLeft - (event.clientX - startX);
      wrap();
    };
    const up = () => {
      drag = false;
      if (!row.matches(":hover")) paused = false;
    };
    let touchTimer = 0;
    const touchHold = () => {
      window.clearTimeout(touchTimer);
      paused = true;
    };
    const touchRelease = () => {
      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(() => {
        if (!row.matches(":hover") && !drag) paused = false;
      }, 1200);
    };

    row.addEventListener("mouseenter", hold);
    row.addEventListener("mouseleave", release);
    row.addEventListener("pointerdown", down);
    row.addEventListener("pointermove", move);
    row.addEventListener("pointerup", up);
    row.addEventListener("pointercancel", up);
    row.addEventListener("scroll", wrap, { passive: true });
    row.addEventListener("touchstart", touchHold, { passive: true });
    row.addEventListener("touchend", touchRelease);
    row.addEventListener("touchcancel", touchRelease);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(touchTimer);
      row.removeEventListener("mouseenter", hold);
      row.removeEventListener("mouseleave", release);
      row.removeEventListener("pointerdown", down);
      row.removeEventListener("pointermove", move);
      row.removeEventListener("pointerup", up);
      row.removeEventListener("pointercancel", up);
      row.removeEventListener("scroll", wrap);
      row.removeEventListener("touchstart", touchHold);
      row.removeEventListener("touchend", touchRelease);
      row.removeEventListener("touchcancel", touchRelease);
    };
  }, [chapters.length]);

  return (
    <div className="aj-chapters" ref={rowRef}>
      {[0, 1].map((copy) => (
        <div className="aj-chapter-set" key={copy} style={{ "--aj-cols": chapters.length } as CSSProperties} aria-hidden={copy === 1 ? true : undefined}>
          {chapters.map((chapter) => (
            <ChapterCard chapter={chapter} copy={copy} key={`${copy}-${chapter.number}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

function FomoButton({ slide }: { slide: HeroSlide }) {
  if (!slide.buttonLabel) return null;
  const href = slide.href || "#";
  return (
    <a className="aj-fomo-btn" href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {slide.buttonLabel}
    </a>
  );
}

function FomoCopy({ slide }: { slide: HeroSlide }) {
  return (
    <div className="aj-fomo-copy">
      {slide.eyebrow ? <p className="aj-fomo-pill">{slide.eyebrow}</p> : null}
      <h2 className="aj-fomo-heading">
        <Lines value={slide.title} />
      </h2>
      {slide.subtitle ? <p className="aj-fomo-sub">{slide.subtitle}</p> : null}
      <FomoButton slide={slide} />
    </div>
  );
}

function FomoDesign({ slide }: { slide: HeroSlide }) {
  if (slide.template === "arch") {
    const ticker = slide.ticker || "";
    const loop = ticker ? Array.from({ length: 8 }, () => ticker) : [];
    return (
      <article className="aj-fomo-slide aj-fomo-arch">
        <div className="aj-fomo-arch-body">
          <FomoCopy slide={slide} />
          <div className="aj-fomo-stage">
            <div className="aj-fomo-arch-shape">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="aj-fomo-book" src={slide.image} alt={slide.alt} />
            </div>
            {slide.badge ? <p className="aj-fomo-chip">{slide.badge}</p> : null}
          </div>
        </div>
        {ticker ? (
          <div className="aj-fomo-ticker" aria-hidden="true">
            <div className="aj-fomo-ticker-track">
              {[0, 1].map((copy) => (
                <span key={copy}>
                  {loop.map((item, index) => (
                    <span key={`${copy}-${index}`}>{item} ◆ </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    );
  }

  if (slide.template === "word") {
    const ring = `${slide.ticker || "RELEASING NOVEMBER 2026"} • `;
    const ringText = `${ring}${ring}${ring}`;
    return (
      <article className="aj-fomo-slide aj-fomo-word">
        <p className="aj-fomo-giant" aria-hidden="true">{slide.bigWord || "JOMO"}</p>
        <FomoCopy slide={slide} />
        {slide.image ? (
          <div className="aj-fomo-word-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt={slide.alt} />
            <div className="aj-fomo-seal">
              <svg viewBox="0 0 120 120" role="img" aria-label={slide.badge || "NOV"}>
                <circle cx="60" cy="60" r="58" fill="#111" />
                <defs>
                  <path id={`${slide.id}-ring`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text fill="#e6d98a" fontSize="7.5" fontWeight="700" letterSpacing="1.6">
                  <textPath href={`#${slide.id}-ring`}>{ringText}</textPath>
                </text>
                <text x="60" y="66" textAnchor="middle" fill="#e6d98a" fontSize="22" fontWeight="800">
                  {slide.badge || "NOV"}
                </text>
              </svg>
            </div>
          </div>
        ) : (
        <div className="aj-fomo-seal">
          <svg viewBox="0 0 120 120" role="img" aria-label={slide.badge || "NOV"}>
            <circle cx="60" cy="60" r="58" fill="#111" />
            <defs>
              <path id={`${slide.id}-ring`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text fill="#e6d98a" fontSize="7.5" fontWeight="700" letterSpacing="1.6">
              <textPath href={`#${slide.id}-ring`}>{ringText}</textPath>
            </text>
            <text x="60" y="66" textAnchor="middle" fill="#e6d98a" fontSize="22" fontWeight="800">
              {slide.badge || "NOV"}
            </text>
          </svg>
        </div>
        )}
      </article>
    );
  }

  return (
    <article className="aj-fomo-slide aj-fomo-panel">
      <FomoCopy slide={slide} />
      <div className="aj-fomo-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slide.image} alt={slide.alt} />
        {slide.quote || slide.quoteName ? (
          <div className="aj-fomo-card">
            {slide.quote ? <p>{slide.quote}</p> : null}
            {slide.quoteName || slide.quoteRole ? (
              <p className="aj-fomo-card-by">
                {slide.quoteName ? <strong>{slide.quoteName}</strong> : null}
                {slide.quoteName && slide.quoteRole ? " · " : null}
                {slide.quoteRole}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function BookHero({ book }: { book: BookPage }) {
  const bannerOn = book.bannerHidden !== true;
  const designSlides = (book.slides ?? []).filter((slide) => slide.template === "panel" || slide.template === "arch" || slide.template === "word");
  const total = (bannerOn ? 1 : 0) + designSlides.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = total > 0 ? current % total : 0;

  useEffect(() => {
    if (total < 2 || paused) return;
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % total);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const goToNext = () => {
    if (total < 2) return;
    setCurrent((value) => (value + 1) % total);
  };

  const onSlideTap = (event: MouseEvent | KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, textarea, select")) return;
    goToNext();
  };

  const slideClass = (index: number) =>
    `aj-book-slide${active === index ? " aj-book-slide-active" : ""}`;

  return (
    <section data-lcp-hero data-edit="fomo-hero" className={`aj-book-page ${poppins.className}`}>
      <style>{bookCss}</style>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
      {total > 0 ? <div className="aj-book-slider">
        <div className="aj-book-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {bannerOn ? <div className={slideClass(0)} role="presentation" onClick={onSlideTap}>
            <div className="aj-book-hero">
              <div className="aj-book-gold-bg" />
              <div className="aj-book-hero-inner">
                <div className="aj-book-content">
                  <h1 className="aj-book-heading">{book.heading}</h1>
                  <p className="aj-book-subheading">
                    <Lines value={book.subheading} />
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="aj-book-logo" src={book.logo} alt={book.logoAlt} />
                </div>
                <div className="aj-book-cover-area">
                  <a className="aj-book-cover-link" href={book.coverHref} target="_blank" rel="noopener noreferrer">
                    <span className="aj-book-3d">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="aj-book-cover" src={book.cover} alt={book.coverAlt} />
                    </span>
                  </a>
                </div>
                <div className="aj-book-testimonial">
                  <div className="aj-book-testimonial-inner">
                    <p className="aj-book-quote">{book.quote}</p>
                    <div className="aj-book-author">
                      {book.authorPhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="aj-book-author-photo" src={book.authorPhoto} alt={book.authorPhotoAlt || book.authorName} />
                      ) : null}
                      <div>
                        <p className="aj-book-author-name">{book.authorName}</p>
                        <p className="aj-book-author-info">
                          <Lines value={book.authorInfo} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : null}
          {designSlides.map((slide, index) => {
            const slideIndex = bannerOn ? index + 1 : index;
            return (
            <div className={slideClass(slideIndex)} key={slide.id} role="presentation" onClick={onSlideTap}>
              <FomoDesign slide={slide} />
            </div>
            );
          })}
        </div>
      </div> : null}
      {total > 1 ? (
        <div className="aj-book-dots">
          {bannerOn ? <button type="button" className={`aj-book-dot${active === 0 ? " aj-book-dot-active" : ""}`} aria-label="Go to slide 1" onClick={() => setCurrent(0)} /> : null}
          {designSlides.map((slide, index) => {
            const dot = bannerOn ? index + 1 : index;
            return (
              <button
                key={slide.id}
                type="button"
                className={`aj-book-dot${active === dot ? " aj-book-dot-active" : ""}`}
                aria-label={`Go to slide ${dot + 1}`}
                onClick={() => setCurrent(dot)}
              />
            );
          })}
        </div>
      ) : null}
      </div>
      <div className="aj-whats-inside">
        <div className="aj-whats-inside-container">
          <h2 className="aj-whats-inside-title">{book.insideTitle}</h2>
          <ChapterRow chapters={book.chapters} />
        </div>
      </div>
    </section>
  );
}
