import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ctaCss = `
#recommended-books,#recommended-books *{box-sizing:border-box !important;font-family:inherit !important}
#recommended-books{width:100% !important;max-width:100% !important;height:320px !important;min-height:320px !important;max-height:320px !important;background:linear-gradient(180deg,#fef8eb 0%,#ffffff 100%) !important;display:flex !important;flex-direction:column !important;justify-content:center !important;align-items:center !important;text-align:center !important;padding:20px !important;margin:0 auto !important;overflow:hidden !important}
#recommended-books .aj-cta-warm-fade-heading{font-size:clamp(2rem,4vw,2.8rem) !important;font-weight:800 !important;color:#000 !important;margin:0 0 16px !important;letter-spacing:-.5px !important;line-height:1.15 !important}
#recommended-books .aj-cta-warm-fade-subheading{font-size:clamp(1rem,2vw,1.25rem) !important;font-weight:600 !important;color:#111 !important;margin:0 0 35px !important;line-height:1.4 !important;max-width:720px !important}
#recommended-books .aj-cta-warm-fade-button{display:inline-flex !important;align-items:center !important;justify-content:center !important;background:linear-gradient(90deg,#895AFB 0%,#56B9C7 100%) !important;color:#fff !important;font-size:1.15rem !important;font-weight:700 !important;text-decoration:none !important;padding:14px 45px !important;border-radius:50px !important;border:none !important;cursor:pointer !important;transition:transform .2s ease,box-shadow .2s ease !important;box-shadow:0 8px 20px rgba(137,90,251,.2) !important}
#recommended-books .aj-cta-warm-fade-button:hover{transform:translateY(-2px) !important;box-shadow:0 10px 25px rgba(137,90,251,.3) !important}
@media (max-width:768px){
  #recommended-books{padding:40px 20px !important;height:auto !important;min-height:280px !important;max-height:none !important}
}
`;

export function BookCloseCta({
  id = "recommended-books",
  editId,
  title,
  subtitle,
  label,
  href,
}: {
  id?: string;
  editId?: string;
  title: string;
  subtitle: string;
  label: string;
  href: string;
}) {
  const css = ctaCss.replaceAll("#recommended-books", `#${id}`);
  return (
    <section id={id} data-edit={editId} className={`aj-cta-warm-fade-wrapper ${poppins.className}`}>
      <style>{css}</style>
      <h2 className="aj-cta-warm-fade-heading">{title}</h2>
      <p className="aj-cta-warm-fade-subheading">{subtitle}</p>
      <a className="aj-cta-warm-fade-button" href={href}>
        {label}
      </a>
    </section>
  );
}
