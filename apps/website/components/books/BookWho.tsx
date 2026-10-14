"use client";

import { Poppins } from "next/font/google";
import type { BookPage } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const whoCss = `
#aj-who-wrapper,#aj-who-wrapper *{box-sizing:border-box !important;font-family:inherit !important}
#aj-who-wrapper{width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#ffffff 0%,#FCFAEF 100%) !important;padding:80px 5% !important;display:flex !important;flex-direction:column !important;align-items:center !important;color:#000 !important;overflow-x:clip !important}
#aj-who-wrapper .aj-who-title{font-size:clamp(2.2rem,4vw,2.8rem) !important;font-weight:800 !important;margin:0 0 50px !important;text-align:center !important;line-height:1.15 !important}
#aj-who-grid{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:30px !important;max-width:1100px !important;width:100% !important;margin:0 0 60px !important}
#aj-who-wrapper .aj-who-col{display:flex !important;flex-direction:column !important;align-items:center !important;min-width:0 !important}
#aj-who-wrapper .aj-who-col-title{font-size:1.5rem !important;font-weight:700 !important;margin:0 0 30px !important;text-align:center !important;color:#000 !important;line-height:1.25 !important}
#aj-who-wrapper .aj-who-card{background:#fff !important;border:1px solid #FCD34D !important;border-radius:16px !important;padding:30px 25px !important;text-align:center !important;position:relative !important;box-shadow:0 10px 25px rgba(0,0,0,.03) !important;height:100% !important;display:flex !important;align-items:center !important;justify-content:center !important;width:100% !important}
#aj-who-wrapper .aj-who-card::before{content:'' !important;position:absolute !important;top:-11px !important;left:50% !important;transform:translateX(-50%) rotate(45deg) !important;width:20px !important;height:20px !important;background:#fff !important;border-top:1px solid #FCD34D !important;border-left:1px solid #FCD34D !important}
#aj-who-wrapper .aj-who-card p{font-size:.95rem !important;font-weight:600 !important;line-height:1.6 !important;color:#000 !important;margin:0 !important;position:relative !important;z-index:2 !important}
#aj-who-wrapper .aj-who-bottom-text{font-size:clamp(1.4rem,3vw,1.8rem) !important;font-weight:700 !important;margin:0 0 40px !important;text-align:center !important;color:#000 !important;line-height:1.3 !important;max-width:720px !important}
#aj-who-wrapper .aj-who-form{display:flex !important;gap:15px !important;flex-wrap:wrap !important;justify-content:center !important;width:100% !important;max-width:800px !important}
#aj-who-wrapper .aj-who-input{padding:14px 24px !important;border:1px solid #E5E7EB !important;border-radius:30px !important;font-size:.95rem !important;outline:none !important;flex:1 !important;min-width:220px !important;background:#fff !important;color:#000 !important}
#aj-who-wrapper .aj-who-input::placeholder{color:#9CA3AF !important;font-weight:400 !important}
#aj-who-wrapper .aj-who-input:focus{border-color:#000 !important}
#aj-who-wrapper .aj-who-btn{padding:14px 36px !important;background:transparent !important;border:1.5px solid #000 !important;border-radius:30px !important;font-size:1.05rem !important;font-weight:700 !important;color:#000 !important;cursor:pointer !important;transition:all .2s ease !important}
#aj-who-wrapper .aj-who-btn:hover{background:#000 !important;color:#fff !important}
#aj-who-wrapper .aj-who-note{width:100% !important;margin:16px 0 0 !important;text-align:center !important;font-size:.95rem !important;font-weight:600 !important;color:#000 !important}
@media (max-width:900px){
  #aj-who-grid{grid-template-columns:1fr !important;gap:50px !important}
  #aj-who-wrapper .aj-who-form{flex-direction:column !important;align-items:center !important}
  #aj-who-wrapper .aj-who-input,#aj-who-wrapper .aj-who-btn{width:100% !important;max-width:400px !important;min-width:0 !important}
}
@media (max-width:600px){
  #aj-who-wrapper{padding:60px 15px !important}
  #aj-who-wrapper .aj-who-title{font-size:2rem !important}
}
`;

export function BookWho({ book }: { book: BookPage }) {
  return (
    <section data-edit="fomo-who" id="aj-who-wrapper" className={poppins.className}>
      <style>{whoCss}</style>
      <h2 className="aj-who-title">{book.whoTitle}</h2>
      <div id="aj-who-grid">
        {book.whoAudiences.map((audience) => (
          <div className="aj-who-col" key={audience.title}>
            <h3 className="aj-who-col-title">{audience.title}</h3>
            <div className="aj-who-card">
              <p>{audience.text}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="aj-who-bottom-text">{book.whoLine}</h3>
    </section>
  );
}
