"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import type { HomeSubscribe } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const subscribeCss = `
#aj-subscribe,#aj-subscribe *{box-sizing:border-box !important;font-family:inherit !important}
#aj-subscribe{width:100% !important;background:linear-gradient(105deg,#7A40F2 0%,#54D8C4 100%) !important;padding:64px 24px !important;color:#fff !important}
#aj-subscribe .aj-sub-inner{width:100% !important;max-width:860px !important;margin:0 auto !important;text-align:center !important}
#aj-subscribe h2{margin:0 0 10px !important;font-size:clamp(2rem,4vw,2.8rem) !important;font-weight:800 !important;letter-spacing:-.4px !important}
#aj-subscribe p{margin:0 auto 22px !important;max-width:640px !important;font-size:1.05rem !important;font-weight:600 !important;line-height:1.5 !important}
#aj-subscribe form{display:flex !important;flex-wrap:wrap !important;justify-content:center !important;gap:12px !important}
#aj-subscribe input{height:48px !important;width:min(240px,100%) !important;border:0 !important;border-radius:999px !important;padding:0 16px !important;color:#111 !important;font-size:16px !important}
#aj-subscribe button,#aj-subscribe .aj-sub-link{height:48px !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;padding:0 22px !important;border-radius:999px !important;font-weight:800 !important;text-decoration:none !important}
#aj-subscribe button{border:0 !important;background:#111 !important;color:#fff !important;cursor:pointer !important}
#aj-subscribe .aj-sub-link{background:#fff !important;color:#111 !important}
#aj-subscribe .aj-sub-note{margin-top:14px !important;font-size:.9rem !important;font-weight:600 !important}
@media (max-width:600px){
  #aj-subscribe{padding:48px 16px !important}
  #aj-subscribe input,#aj-subscribe button,#aj-subscribe .aj-sub-link{width:100% !important}
}
`;

export function SubscribeBand({ subscribe }: { subscribe: HomeSubscribe }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.includes("@")) {
      setNote("Please add your name and email.");
      return;
    }
    setSending(true);
    setNote("");
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: "Subscribe — home page list",
      }),
    });
    setSending(false);
    if (!response.ok) {
      setNote("Please add your name and email.");
      return;
    }
    setName("");
    setEmail("");
    setNote(subscribe.note);
  }

  return (
    <section data-edit="home-subscribe" id="aj-subscribe" className={poppins.className}>
      <style>{subscribeCss}</style>
      <div className="aj-sub-inner">
        <h2>{subscribe.title}</h2>
        <p>{subscribe.subtitle}</p>
        <form onSubmit={submit}>
          <input type="text" placeholder={subscribe.namePlaceholder} value={name} required onChange={(event) => setName(event.target.value)} />
          <input type="email" placeholder={subscribe.emailPlaceholder} value={email} required onChange={(event) => setEmail(event.target.value)} />
          <button type="submit" disabled={sending}>{sending ? "Sending" : subscribe.buttonLabel}</button>
          <a className="aj-sub-link" href={subscribe.linkedinHref} target="_blank" rel="noopener noreferrer">{subscribe.linkedinLabel}</a>
        </form>
        {note ? <p className="aj-sub-note">{note}</p> : null}
      </div>
    </section>
  );
}
