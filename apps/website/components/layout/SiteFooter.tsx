import { Poppins } from "next/font/google";
import type { SiteSettings } from "@/lib/content";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const footerCss = `
#aj-footer,#aj-footer *{box-sizing:border-box !important;font-family:inherit !important}
#aj-footer{width:100% !important;max-width:100% !important;background:#ffffff !important;border-top:1px solid #f0f0f0 !important;overflow-x:clip !important}
#aj-footer .aj-footer-inner{max-width:1440px !important;margin:0 auto !important;padding:36px 48px 32px !important;display:flex !important;justify-content:space-between !important;gap:24px !important;min-width:0 !important}
#aj-footer .aj-footer-col{display:flex !important;flex-direction:column !important;flex:0 0 auto !important}
#aj-footer .aj-footer-brand{max-width:320px !important;margin-right:24px !important}
#aj-footer .aj-footer-name{font-size:20px !important;font-weight:700 !important;color:#7B68EE !important;margin:0 0 10px !important;line-height:1.2 !important}
#aj-footer .aj-footer-tagline{font-size:13.5px !important;font-weight:400 !important;color:#333 !important;line-height:1.5 !important;margin:0 0 14px !important}
#aj-footer .aj-footer-socials{display:flex !important;flex-wrap:wrap !important;align-items:center !important;gap:10px !important;margin:0 !important}
#aj-footer .aj-footer-socials a{display:inline-flex !important;align-items:center !important;justify-content:center !important;width:30px !important;height:30px !important;border-radius:50% !important;background:#f5f4fd !important;color:#7B68EE !important;text-decoration:none !important;transition:background .25s ease,color .25s ease,transform .25s ease !important}
#aj-footer .aj-footer-socials a svg{width:15px !important;height:15px !important;fill:currentColor !important}
#aj-footer .aj-footer-socials a:hover{background:#7B68EE !important;color:#fff !important;transform:translateY(-2px) !important}
#aj-footer .aj-float-socials{position:fixed !important;right:18px !important;bottom:24px !important;z-index:40 !important;display:flex !important;flex-direction:column !important;gap:8px !important}
#aj-footer .aj-float-socials a{display:grid !important;place-items:center !important;width:42px !important;height:42px !important;border-radius:50% !important;background:#7B68EE !important;color:#fff !important;text-decoration:none !important;box-shadow:0 8px 18px rgba(123,104,238,.35) !important;transition:transform .2s ease,background .2s ease !important}
#aj-footer .aj-float-socials a svg{width:16px !important;height:16px !important;fill:currentColor !important}
#aj-footer .aj-float-socials a:hover{background:#5a46e0 !important;color:#fff !important;transform:translateY(-2px) !important}
#aj-footer .aj-footer-booking-btn{display:inline-flex !important;align-items:center !important;justify-content:center !important;margin-top:18px !important;padding:10px 20px !important;background:#4c3cc4 !important;color:#fff !important;font-size:13.5px !important;font-weight:500 !important;text-decoration:none !important;border-radius:30px !important;width:fit-content !important;max-width:100% !important;box-shadow:0 4px 12px rgba(76,60,196,.2) !important;transition:background .25s ease,transform .25s ease,box-shadow .25s ease !important}
#aj-footer .aj-footer-booking-btn svg{width:16px !important;height:16px !important;margin-right:8px !important;fill:currentColor !important;flex-shrink:0 !important}
#aj-footer .aj-footer-booking-btn:hover{background:#6a5acd !important;color:#fff !important;transform:translateY(-2px) !important;box-shadow:0 6px 16px rgba(123,104,238,.3) !important}
#aj-footer .aj-footer-heading{font-size:15px !important;font-weight:600 !important;color:#1a1a1a !important;margin:0 0 12px !important}
#aj-footer .aj-footer-links{list-style:none !important;margin:0 !important;padding:0 !important;display:flex !important;flex-direction:column !important;gap:8px !important}
#aj-footer .aj-footer-links a{position:relative !important;display:inline-block !important;width:fit-content !important;max-width:100% !important;font-size:13.5px !important;font-weight:400 !important;color:#444 !important;text-decoration:none !important;transition:color .25s ease !important}
#aj-footer .aj-footer-links a::after{content:'' !important;position:absolute !important;left:0 !important;bottom:-2px !important;width:0 !important;height:1.5px !important;background:#7B68EE !important;transition:width .25s ease !important}
#aj-footer .aj-footer-links a:hover{color:#7B68EE !important}
#aj-footer .aj-footer-links a:hover::after{width:100% !important}
#aj-footer .aj-footer-contact{display:flex !important;flex-direction:column !important;gap:8px !important}
#aj-footer .aj-footer-contact a,#aj-footer .aj-footer-contact span{font-size:13.5px !important;font-weight:400 !important;color:#444 !important;text-decoration:none !important;transition:color .25s ease !important;overflow-wrap:anywhere !important}
#aj-footer .aj-footer-contact a:hover{color:#7B68EE !important}
#aj-footer .aj-footer-credit{max-width:1440px !important;margin:0 auto !important;padding:0 48px 22px !important;display:flex !important;justify-content:flex-start !important}
#aj-footer .aj-footer-credit a{display:inline-flex !important;align-items:center !important;gap:6px !important;font-size:13px !important;font-weight:500 !important;color:#5c5670 !important;text-decoration:none !important}
#aj-footer .aj-footer-credit strong{font-weight:800 !important;background:linear-gradient(90deg,#7B68EE 0%,#5BBAB6 100%) !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important}
#aj-footer .aj-footer-credit a:hover strong{background:linear-gradient(90deg,#5a46e0 0%,#2f9d98 100%) !important;-webkit-background-clip:text !important;background-clip:text !important}
@media (max-width:900px){
  #aj-footer .aj-footer-inner{flex-wrap:wrap !important;padding:32px 24px 24px !important;gap:28px !important}
  #aj-footer .aj-footer-credit{padding:0 24px 20px !important}
  #aj-footer .aj-footer-brand{max-width:100% !important;flex:1 1 100% !important;margin-right:0 !important}
  #aj-footer .aj-footer-col{flex:1 1 40% !important}
}
@media (max-width:900px){
  #aj-footer .aj-footer-socials a{width:44px !important;height:44px !important}
  #aj-footer .aj-footer-links a{display:flex !important;align-items:center !important;min-height:44px !important;font-size:16px !important}
  #aj-footer .aj-footer-booking-btn{min-height:44px !important;font-size:16px !important}
  #aj-footer .aj-float-socials a{width:44px !important;height:44px !important}
  #aj-footer .aj-footer-contact a{display:flex !important;align-items:center !important;min-height:44px !important;font-size:16px !important}
}
@media (max-width:700px){
  #aj-footer .aj-float-socials{display:none !important}
}
@media (max-width:600px){
  #aj-footer .aj-footer-inner{padding:28px 16px 20px !important}
  #aj-footer .aj-footer-credit{padding:0 16px 18px !important}
  #aj-footer .aj-float-socials{right:10px !important;bottom:16px !important}
  #aj-footer .aj-footer-col{flex:1 1 100% !important}
}
`;

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-1 0-1.5.2-1.9.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.4-.3.9-.3 1.9-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c0 1 .2 1.5.3 1.9.2.5.4.8.7 1.1.3.3.6.5 1.1.7.4.1.9.3 1.9.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1 0 1.5-.2 1.9-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.4.3-.9.3-1.9.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-1-.2-1.5-.3-1.9-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.4-.1-.9-.3-1.9-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm6.2-2a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 2.9h3.1l-6.8 7.8L23.3 21h-6.4l-5-6.5-5.7 6.5H3l7.3-8.3L2.7 2.9h6.5l4.5 6 5.2-6zm-1.1 16.2h1.7L7.3 4.7H5.5l12.3 14.4z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.5V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.1 2.3 4.1 5.3v6.3zM5.7 7.4A2 2 0 1 1 5.7 3.4a2 2 0 0 1 0 4zM7.5 20.4H4V9h3.5v11.4z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.5-.6-2.5-1.4-3.5-2.9-.2-.3 0-.4.2-.6.2-.2.4-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.8 2.8 4.4 3.8 2.1.8 2.5.6 3-.1.4-.5.8-1.3.9-1.8.1-.5-.1-.9-.4-1zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.6-8.4 8.6z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("facebook")) return <FacebookIcon />;
  if (key.includes("instagram")) return <InstagramIcon />;
  if (key.includes("twitter") || key === "x" || key.includes("x (")) return <XIcon />;
  if (key.includes("linkedin")) return <LinkedInIcon />;
  if (key.includes("whatsapp")) return <WhatsAppIcon />;
  return <span aria-hidden="true">{label.slice(0, 1)}</span>;
}

function outbound(href: string) {
  return href.startsWith("http") ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

export function SiteFooter({ site }: { site: SiteSettings }) {
  const footer = site.footer;
  const mail = site.email.includes("@") ? `mailto:${site.email}` : site.email;

  return (
    <footer id="aj-footer" className={poppins.className}>
      <style>{footerCss}</style>
      <div className="aj-float-socials">
        {footer.socials.map((social, index) => (
          <a key={`float-${social.label}-${index}`} href={social.href} aria-label={social.label} {...outbound(social.href)}>
            <SocialIcon label={social.label} />
          </a>
        ))}
      </div>
      <div className="aj-footer-inner" data-edit="footer">
        <div className="aj-footer-col aj-footer-brand">
          <h3 className="aj-footer-name">{site.name}</h3>
          <p className="aj-footer-tagline">{site.tagline}</p>
          <div className="aj-footer-socials">
            {footer.socials.map((social, index) => (
              <a key={`${social.label}-${index}`} href={social.href} aria-label={social.label} {...outbound(social.href)}>
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
          <a className="aj-footer-booking-btn" href={footer.bookingHref} {...outbound(footer.bookingHref)}>
            <CalendarIcon />
            {footer.bookingLabel}
          </a>
        </div>

        <div className="aj-footer-col">
          <h4 className="aj-footer-heading">{footer.quickTitle}</h4>
          <ul className="aj-footer-links">
            {footer.quickLinks.filter((link) => link.href && link.href !== "#").map((link, index) => (
              <li key={`${link.label}-${index}`}>
                <a href={link.href} {...outbound(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="aj-footer-col">
          <h4 className="aj-footer-heading">{footer.resourcesTitle}</h4>
          <ul className="aj-footer-links">
            {footer.resourceLinks.filter((link) => link.href && link.href !== "#").map((link, index) => (
              <li key={`${link.label}-${index}`}>
                <a href={link.href} {...outbound(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="aj-footer-col">
          <h4 className="aj-footer-heading">{footer.contactTitle}</h4>
          <div className="aj-footer-contact">
            <span>{site.address}</span>
            <a href={mail}>{site.email}</a>
          </div>
        </div>
      </div>
      <div className="aj-footer-credit">
        <a href="https://www.freelancer.in/hireme/GobindSawarn" target="_blank" rel="noopener noreferrer">
          Designed by <strong>Govind Sawarn</strong>
        </a>
      </div>
    </footer>
  );
}
