import type { GalleryImage } from "@/lib/content";

const galleryCss = `
.aj-gallery-wrapper{width:100%;overflow:hidden;background-color:#fff;padding:4px 0;box-sizing:border-box;position:relative}
.aj-gallery-wrapper::before,.aj-gallery-wrapper::after{content:"";position:absolute;top:0;width:100px;height:100%;z-index:2;pointer-events:none}
.aj-gallery-wrapper::before{left:0;background:linear-gradient(to right,#fff 0%,transparent 100%)}
.aj-gallery-wrapper::after{right:0;background:linear-gradient(to left,#fff 0%,transparent 100%)}
.aj-gallery-track{display:inline-flex;gap:20px;animation:aj-scroll-gallery 40s linear infinite}
.aj-gallery-track:hover{animation-play-state:paused}
.aj-gallery-track img{height:250px;width:auto;max-width:none;flex-shrink:0;border-radius:16px;object-fit:cover;box-shadow:0 10px 20px rgba(0,0,0,.08);transition:transform .3s ease;cursor:pointer}
.aj-gallery-track img:hover{transform:scale(1.03)}
@keyframes aj-scroll-gallery{0%{transform:translateX(0)}100%{transform:translateX(calc(-50% - 10px))}}
@media (max-width:900px){
  .aj-gallery-track img{height:250px}
  .aj-gallery-wrapper::before,.aj-gallery-wrapper::after{width:50px}
}
@media (max-width:600px){
  .aj-gallery-track img{height:180px}
  .aj-gallery-track{gap:12px}
  @keyframes aj-scroll-gallery{0%{transform:translateX(0)}100%{transform:translateX(calc(-50% - 6px))}}
}
@media (prefers-reduced-motion:reduce){
  .aj-gallery-track{animation:none}
}
`;

export function EngagementGallery({ images }: { images: GalleryImage[] }) {
  const loop = [...images, ...images];

  return (
    <section data-edit="engagements-gallery" className="aj-gallery-wrapper" aria-label="Engagement gallery">
      <style>{galleryCss}</style>
      <div className="aj-gallery-track">
        {loop.map((photo, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${photo.image}-${index}`} src={photo.image} alt={index < images.length ? photo.alt : ""} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
