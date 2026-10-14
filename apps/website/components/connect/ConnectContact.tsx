"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import type { ConnectHero } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const contactCss = `
#contact,#contact *{box-sizing:border-box !important;font-family:inherit !important}
#contact{width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#fff 30%,#FFEBE0 100%) !important;padding:80px 5% !important;display:flex !important;justify-content:center !important;align-items:center !important;overflow-x:clip !important}
#contact .aj-contact-inner{width:100% !important;max-width:1200px !important;min-width:0 !important;display:flex !important;justify-content:space-between !important;align-items:center !important;gap:60px !important}
#contact .aj-contact-left{flex:1 !important;max-width:450px !important;min-width:0 !important}
#contact .aj-contact-title{font-size:clamp(2.5rem,4vw,3.5rem) !important;font-weight:800 !important;color:#000 !important;line-height:1.15 !important;margin:0 0 30px !important;letter-spacing:-1px !important}
#contact .aj-contact-email{display:inline-flex !important;align-items:center !important;gap:15px !important;max-width:100% !important;padding:12px 28px !important;border-radius:50px !important;font-size:1.1rem !important;font-weight:700 !important;color:#000 !important;text-decoration:none !important;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(90deg,#F355B8,#FCA676) border-box !important;border:2px solid transparent !important;transition:transform .3s ease,box-shadow .3s ease !important}
#contact .aj-contact-email:hover{transform:translateY(-3px) !important;box-shadow:0 10px 20px rgba(243,85,184,.15) !important}
#contact .aj-contact-email svg{width:20px !important;height:20px !important;fill:none !important;stroke:#000 !important;stroke-width:1.5 !important;stroke-linecap:round !important;stroke-linejoin:round !important;flex-shrink:0 !important}
#contact .aj-contact-right{flex:1.2 !important;min-width:0 !important;display:flex !important;justify-content:flex-end !important}
#contact .aj-contact-form-box{width:100% !important;max-width:550px !important;background:linear-gradient(135deg,#FDECF6 0%,#FFF0EB 100%) !important;border-radius:36px !important;padding:45px 50px !important;box-shadow:0 20px 40px rgba(0,0,0,.04) !important}
#contact form{display:flex !important;flex-direction:column !important;gap:18px !important}
#contact .aj-contact-input,#contact .aj-contact-select,#contact .aj-contact-textarea{width:100% !important;background:#fff !important;border:1px solid rgba(0,0,0,.03) !important;border-radius:12px !important;padding:16px 20px !important;font-size:16px !important;font-weight:500 !important;color:#333 !important;outline:none !important;box-shadow:inset 0 2px 6px rgba(0,0,0,.02) !important;font-family:inherit !important}
#contact .aj-contact-input::placeholder,#contact .aj-contact-textarea::placeholder{color:#999 !important;font-weight:400 !important}
#contact .aj-contact-input:focus,#contact .aj-contact-select:focus,#contact .aj-contact-textarea:focus{border-color:#FCA676 !important;box-shadow:0 0 0 3px rgba(252,166,118,.15) !important}
#contact .aj-contact-textarea{resize:none !important;height:130px !important}
#contact .aj-contact-select{appearance:none !important;-webkit-appearance:none !important;color:#333 !important;background-color:#fff !important;background-image:url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E") !important;background-repeat:no-repeat !important;background-position:right 15px center !important;background-size:16px !important;cursor:pointer !important}
#contact .aj-contact-select:invalid{color:#999 !important;font-weight:400 !important}
#contact .aj-contact-btn{align-self:flex-start !important;margin-top:10px !important;background:linear-gradient(90deg,#945BEE 0%,#5BBAB6 100%) !important;color:#fff !important;border:none !important;border-radius:30px !important;padding:16px 36px !important;font-size:1.1rem !important;font-weight:700 !important;cursor:pointer !important;font-family:inherit !important;box-shadow:0 8px 20px rgba(148,91,238,.3) !important;transition:transform .3s ease,box-shadow .3s ease !important}
#contact .aj-contact-btn:hover{transform:translateY(-2px) !important;box-shadow:0 12px 25px rgba(148,91,238,.4) !important}
#contact .aj-contact-note{margin:0 !important;font-size:.95rem !important;font-weight:600 !important;color:#333 !important}
#aj-connect-close,#aj-connect-close *{box-sizing:border-box !important;font-family:inherit !important}
#aj-connect-close{width:100% !important;max-width:100% !important;background:linear-gradient(180deg,#FFEBE0 0%,#fff 100%) !important;padding:80px 20px 100px !important;display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important;text-align:center !important;overflow-x:clip !important}
#aj-connect-close .aj-cta-title{font-size:clamp(2rem,4vw,3rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 15px !important;letter-spacing:-.5px !important;line-height:1.2 !important}
#aj-connect-close .aj-cta-subtitle{font-size:clamp(1rem,1.5vw,1.2rem) !important;font-weight:600 !important;color:#111 !important;margin:0 0 35px !important;line-height:1.4 !important;max-width:720px !important}
#aj-connect-close .aj-cta-btn{display:inline-block !important;background:linear-gradient(90deg,#945BEE 0%,#5BBAB6 100%) !important;color:#fff !important;text-decoration:none !important;padding:14px 42px !important;border-radius:30px !important;font-size:1.1rem !important;font-weight:700 !important;box-shadow:0 8px 20px rgba(148,91,238,.3) !important;transition:transform .3s ease,box-shadow .3s ease !important}
#aj-connect-close .aj-cta-btn:hover{transform:translateY(-3px) !important;box-shadow:0 12px 25px rgba(148,91,238,.4) !important;color:#fff !important}
@media (max-width:900px){
  #contact .aj-contact-inner{flex-direction:column !important;text-align:center !important;gap:40px !important}
  #contact .aj-contact-left{max-width:100% !important}
  #contact .aj-contact-title{margin-bottom:20px !important}
  #contact .aj-contact-right{width:100% !important;justify-content:center !important}
  #contact .aj-contact-form-box{padding:35px 25px !important;border-radius:24px !important}
  #contact .aj-contact-btn{width:100% !important;text-align:center !important}
}
@media (max-width:600px){
  #contact{padding:48px 16px !important}
  #contact .aj-contact-title{font-size:2.2rem !important}
  #contact .aj-contact-email{font-size:1rem !important;padding:12px 18px !important}
  #aj-connect-close{padding:48px 16px 64px !important}
  #aj-connect-close .aj-cta-title{font-size:2rem !important}
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

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function ConnectContact({ hero }: { hero: ConnectHero }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <>
      <section data-edit="connect-form" id="contact" className={poppins.className}>
        <style>{contactCss}</style>
        <div className="aj-contact-inner">
          <div className="aj-contact-left">
            <h2 className="aj-contact-title">
              <Lines value={hero.contactTitle} />
            </h2>
            <a className="aj-contact-email" href={`mailto:${hero.email}`}>
              {hero.email}
              <SendIcon />
            </a>
          </div>
          <div className="aj-contact-right">
            <div className="aj-contact-form-box">
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setError("");
                  setSent(false);
                  const form = new FormData(event.currentTarget);
                  const name = String(form.get("name") ?? "").trim();
                  const email = String(form.get("email") ?? "").trim();
                  const agenda = String(form.get("agenda") ?? "").trim();
                  const subject = String(form.get("subject") ?? "").trim();
                  const note = String(form.get("message") ?? "").trim();
                  if (!name || !email.includes("@") || !agenda || !subject || note.length < 2) {
                    setError("Please add your name, email, agenda, and message.");
                    return;
                  }
                  setPending(true);
                  const response = await fetch("/api/enquiries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name,
                      email,
                      message: `Agenda: ${agenda}\nSubject: ${subject}\n\n${note}`,
                    }),
                  });
                  setPending(false);
                  if (!response.ok) {
                    setError("Message could not be sent. Please try again.");
                    return;
                  }
                  setSent(true);
                  event.currentTarget.reset();
                }}
              >
                <input className="aj-contact-input" name="name" type="text" placeholder={hero.namePlaceholder} required />
                <input className="aj-contact-input" name="email" type="email" placeholder={hero.emailPlaceholder} required />
                <select className="aj-contact-select" name="agenda" required defaultValue="">
                  <option value="" disabled>
                    {hero.agendaPlaceholder}
                  </option>
                  {hero.agendas.map((agenda) => (
                    <option key={agenda} value={agenda}>
                      {agenda}
                    </option>
                  ))}
                </select>
                <input className="aj-contact-input" name="subject" type="text" placeholder={hero.subjectPlaceholder} required />
                <textarea className="aj-contact-textarea" name="message" placeholder={hero.messagePlaceholder} required />
                <button className="aj-contact-btn" type="submit" disabled={pending}>
                  {hero.buttonLabel}
                </button>
                {sent ? <p className="aj-contact-note">Message sent. We'll be in touch.</p> : null}
                {error ? <p className="aj-contact-note">{error}</p> : null}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section data-edit="connect-form" id="aj-connect-close" className={poppins.className}>
        <h2 className="aj-cta-title">{hero.closeTitle}</h2>
        <p className="aj-cta-subtitle">{hero.closeSubtitle}</p>
        <a className="aj-cta-btn" href={hero.closeHref}>
          {hero.closeLabel}
        </a>
      </section>
    </>
  );
}
