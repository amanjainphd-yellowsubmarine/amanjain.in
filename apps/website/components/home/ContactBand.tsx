"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import type { HomeContact } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const contactCss = `
.aj-contact-wrap{width:100%;padding:8px 20px 48px}
.aj-contact-section,.aj-contact-section *{box-sizing:border-box !important;font-family:inherit !important}
.aj-contact-section{width:100% !important;max-width:100% !important;margin:0 !important;border-radius:36px !important;padding:50px 60px !important;display:flex !important;align-items:center !important;justify-content:space-between !important;position:relative !important;overflow:hidden !important;background:linear-gradient(110deg,#ff53b4 0%,#ff6b8b 35%,#ff8c68 70%,#ff9e43 100%) !important;box-shadow:0 15px 35px rgba(255,90,138,.2) !important}
.aj-decor-envelope{position:absolute !important;bottom:25px !important;left:360px !important;width:140px !important;opacity:.22 !important;pointer-events:none !important}
.aj-decor-at{position:absolute !important;top:-20px !important;right:-20px !important;width:280px !important;opacity:.15 !important;pointer-events:none !important}
.aj-contact-left{flex:1 !important;max-width:460px !important;color:#fff !important;z-index:2 !important}
.aj-contact-left h2{font-size:2.4rem !important;font-weight:800 !important;color:#fff !important;margin:0 0 18px !important;letter-spacing:-.5px !important}
.aj-contact-left h3{font-size:1.25rem !important;font-weight:700 !important;color:#fff !important;line-height:1.35 !important;margin:0 0 20px !important}
.aj-contact-left p{font-size:.88rem !important;line-height:1.5 !important;color:#fff !important;opacity:.95 !important;margin:0 0 12px !important}
.aj-contact-left p.aj-sub-text{margin-bottom:8px !important}
.aj-contact-left p.aj-bottom-text{margin-bottom:24px !important}
.aj-email-btn{display:inline-flex !important;align-items:center !important;gap:12px !important;border:2px solid #fff !important;padding:10px 24px !important;border-radius:50px !important;color:#fff !important;text-decoration:none !important;font-size:1.05rem !important;font-weight:600 !important;transition:all .3s ease !important;background:rgba(255,255,255,.15) !important;backdrop-filter:blur(4px) !important}
.aj-email-btn:hover{background:rgba(255,255,255,.3) !important;transform:translateY(-2px) !important}
.aj-email-btn svg{width:18px !important;height:18px !important;fill:#fff !important}
.aj-form-container{width:440px !important;background:#fff8f6 !important;border-radius:32px !important;padding:35px 30px !important;box-shadow:0 10px 30px rgba(0,0,0,.1) !important;z-index:2 !important}
.aj-form-group{margin-bottom:16px !important}
.aj-form-input{width:100% !important;padding:14px 20px !important;border:1px solid #e2d0ca !important;border-radius:14px !important;background:#fff !important;font-size:16px !important;color:#222 !important;outline:none !important;box-shadow:inset 0 2px 4px rgba(0,0,0,.03) !important;transition:border-color .2s !important}
.aj-form-input::placeholder{color:#888 !important;opacity:1 !important}
.aj-form-input:focus{border-color:#ff6b8b !important}
textarea.aj-form-input{height:100px !important;resize:none !important}
.aj-submit-btn{background:linear-gradient(90deg,#7c51fe 0%,#5ba7d9 100%) !important;color:#fff !important;border:none !important;padding:12px 32px !important;border-radius:30px !important;font-size:1rem !important;font-weight:700 !important;cursor:pointer !important;transition:transform .2s ease,opacity .2s ease !important;box-shadow:0 4px 15px rgba(124,81,254,.3) !important;margin-top:6px !important}
.aj-submit-btn:hover{opacity:.95 !important;transform:translateY(-1px) !important}
.aj-submit-btn:disabled{opacity:.7 !important;cursor:wait !important}
.aj-form-note{margin:12px 0 0 !important;font-size:.82rem !important;color:#444 !important}
@media (max-width:1100px){
  .aj-contact-section{flex-direction:column !important;padding:40px 25px !important;border-radius:24px !important}
  .aj-contact-left{max-width:100% !important;margin-bottom:35px !important;text-align:center !important}
  .aj-form-container{width:100% !important}
  .aj-decor-envelope,.aj-decor-at{display:none !important}
}
`;

export function ContactBand({ contact }: { contact: HomeContact }) {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <div className={`aj-contact-wrap ${poppins.className}`}>
      <style>{contactCss}</style>
      <section data-edit="home-contact" className="aj-contact-section">
        <svg className="aj-decor-envelope" viewBox="0 0 100 80" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="15" width="90" height="60" rx="8" />
          <path d="M 5 20 L 50 50 L 95 20" />
          <line x1="0" y1="35" x2="25" y2="35" strokeWidth="4" />
          <line x1="0" y1="50" x2="35" y2="50" strokeWidth="4" />
          <line x1="0" y1="65" x2="20" y2="65" strokeWidth="4" />
        </svg>
        <svg className="aj-decor-at" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="6">
          <circle cx="50" cy="50" r="22" />
          <path d="M 72 50 C 72 65 60 62 58 52 C 58 35 72 30 82 40 C 92 55 85 80 50 85 C 25 85 10 68 10 48 C 10 25 28 10 52 10 C 75 10 88 24 88 24" strokeLinecap="round" />
        </svg>

        <div className="aj-contact-left">
          <h2>{contact.title}</h2>
          <h3>{contact.headline}</h3>
          <p>{contact.intro}</p>
          <p className="aj-sub-text">{contact.orLabel}</p>
          <p className="aj-bottom-text">{contact.prompt}</p>
          <a href={`mailto:${contact.email}`} className="aj-email-btn">
            <span>{contact.email}</span>
            <svg viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </a>
        </div>

        <div className="aj-form-container">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setStatus("");
              const form = new FormData(event.currentTarget);
              const subject = String(form.get("subject") ?? "").trim();
              const note = String(form.get("message") ?? "").trim();
              const message = [subject ? `Subject: ${subject}` : "", note].filter(Boolean).join("\n\n");
              if (message.length < 2) {
                setStatus("Please write a message.");
                return;
              }
              setSending(true);
              const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: form.get("name"),
                  email: form.get("email"),
                  message,
                }),
              });
              setSending(false);
              if (!response.ok) {
                setStatus("Message could not be sent. Please try again.");
                return;
              }
              event.currentTarget.reset();
              setStatus("Message sent. We'll reply soon.");
            }}
          >
            <div className="aj-form-group">
              <input name="name" type="text" className="aj-form-input" placeholder={contact.namePlaceholder} required />
            </div>
            <div className="aj-form-group">
              <input name="email" type="email" className="aj-form-input" placeholder={contact.emailPlaceholder} required />
            </div>
            <div className="aj-form-group">
              <input name="subject" type="text" className="aj-form-input" placeholder={contact.subjectPlaceholder} />
            </div>
            <div className="aj-form-group">
              <textarea name="message" className="aj-form-input" placeholder={contact.messagePlaceholder} />
            </div>
            <button type="submit" className="aj-submit-btn" disabled={sending}>
              {sending ? "Sending..." : contact.buttonLabel}
            </button>
            {status ? <p className="aj-form-note">{status}</p> : null}
          </form>
        </div>
      </section>
    </div>
  );
}
