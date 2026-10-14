"use client";

import { useRef, useState } from "react";
import type { HeroSlide, HomeContent } from "@/lib/content";
import { Customizer } from "@/components/editor/Customizer";
import { ImageButton, MobilePhotoField, fieldClass } from "@/components/editor/ui";

function move<T>(list: T[], index: number, direction: -1 | 1) {
  const next = index + direction;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

const templateNotes = {
  portrait: "Words on the left. A person photo and three circles on the right.",
  story: "Words, one quote, and one button on the left. The right side is one picture you upload of the quote cards only. Leave the left-side words out of that picture.",
  buy: "A heading and a list on the left, then shop buttons. Add Amazon, Flipkart, or any other name and paste its link. The right side is one picture of the book.",
};

const emptyRings = [
  { background: "#DFF7EF", opacity: 0.35 },
  { background: "#CDEFF0", opacity: 0.45 },
  { background: "#C9D8F5", opacity: 0.55 },
];

export function HomeEditor({ initialHome }: { initialHome: HomeContent }) {
  const [home, setHome] = useState(initialHome);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function updateSlide(index: number, patch: Partial<HeroSlide>) {
    setHome((current) => ({
      ...current,
      slides: current.slides.map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, ...patch } : slide,
      ),
    }));
  }

  async function upload(index: number, file: File, field: "image" | "mobileImage" = "image") {
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    updateSlide(index, { [field]: saved.url });
    setStatus(field === "mobileImage" ? "Phone photo uploaded. Press Save to publish it." : "Image uploaded. Press Save to publish it.");
  }

  function imageIsPlaceholder(src: string, kind: "photo" | "logo") {
    if (!src) return true;
    return kind === "photo" ? src.endsWith("story-avatar.svg") : src.endsWith("logo-company.svg");
  }

  async function storiesWithImages(cards: HomeContent["stories"]["cards"]) {
    const next = [];
    let missingPhoto = false;
    let missingLogo = false;
    for (const card of cards) {
      const link = (card.profileUrl ?? "").trim();
      const photoBlank = imageIsPlaceholder(card.photo, "photo");
      const logoBlank = imageIsPlaceholder(card.logo, "logo");
      if (!link.startsWith("https://") || (!photoBlank && !logoBlank)) {
        next.push(card);
        continue;
      }
      try {
        const response = await fetch("/api/profile-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: link }),
        });
        const saved = await response.json();
        if (!response.ok) {
          if (photoBlank) missingPhoto = true;
          if (logoBlank) missingLogo = true;
          next.push(card);
          continue;
        }
        const photo = photoBlank && saved.photo ? saved.photo : card.photo;
        const logo = logoBlank && saved.logo ? saved.logo : card.logo;
        if (imageIsPlaceholder(photo, "photo")) missingPhoto = true;
        if (imageIsPlaceholder(logo, "logo")) missingLogo = true;
        const blankName = card.name.trim() === "" || card.name === "Name";
        const blankRole = card.role.trim() === "" || card.role === "Role, Company";
        next.push({
          ...card,
          profileUrl: link,
          photo,
          logo,
          logoAlt: logoBlank && saved.company ? saved.company : card.logoAlt,
          name: blankName && saved.name ? saved.name : card.name,
          role: blankRole && saved.company ? saved.company : card.role,
        });
      } catch {
        if (photoBlank) missingPhoto = true;
        if (logoBlank) missingLogo = true;
        next.push(card);
      }
    }
    return { cards: next, missingPhoto, missingLogo };
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("Saving. Profile photos and company logos are downloading…");
    const stories = await storiesWithImages(home.stories.cards);
    const nextHome = { ...home, stories: { ...home.stories, cards: stories.cards } };
    setHome(nextHome);
    const response = await fetch("/api/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextHome),
    });
    const saved = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(saved.error ?? "Save failed.");
      return;
    }
    setHome(saved);
    if (stories.missingPhoto) {
      setStatus("Saved. A profile photo could not be downloaded. Use Change person photo on that story.");
    } else if (stories.missingLogo) {
      setStatus("Saved. A company logo was not on that profile. Use Change company logo on that story.");
    } else {
      setStatus("Saved. The home page is updated.");
    }
  }

  async function uploadStoryImage(index: number, field: "photo" | "logo", file: File) {
    setStatus("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Image upload failed.");
      return;
    }
    setHome((current) => ({
      ...current,
      stories: {
        ...current.stories,
        cards: current.stories.cards.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: saved.url } : item,
        ),
      },
    }));
    setStatus("Image uploaded. Press Save to publish it.");
  }

  const pulledProfile = useRef<Record<number, string>>({});

  async function pullProfile(index: number, url: string) {
    const link = url.trim();
    if (!link.startsWith("https://")) {
      setStatus("Paste a full profile link, starting with https://");
      return;
    }
    if (pulledProfile.current[index] === link) return;
    pulledProfile.current[index] = link;
    setStatus("Downloading the photo and company logo...");
    const response = await fetch("/api/profile-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: link }),
    });
    const saved = await response.json();
    if (!response.ok) {
      pulledProfile.current[index] = "";
      setStatus(saved.error ?? "Could not read that profile link.");
      return;
    }
    setHome((current) => ({
      ...current,
      stories: {
        ...current.stories,
        cards: current.stories.cards.map((item, itemIndex) => {
          if (itemIndex !== index) return item;
          const blankName = item.name.trim() === "" || item.name === "Name";
          const blankRole = item.role.trim() === "" || item.role === "Role, Company";
          return {
            ...item,
            profileUrl: link,
            photo: saved.photo || item.photo,
            logo: saved.logo || item.logo,
            logoAlt: saved.company || item.logoAlt,
            name: blankName && saved.name ? saved.name : item.name,
            role: blankRole && saved.company ? saved.company : item.role,
          };
        }),
      },
    }));
    setStatus(saved.logo ? "Photo and company logo are ready. Press Save to publish them." : "Photo is ready. Company logo was not on that profile. Press Save to publish the photo.");
  }

  const sections = [
    { id: "home-hero", label: "Slider" },
    { id: "home-about", label: "About band" },
    { id: "home-expertise", label: "Expertise" },
    { id: "home-achievements", label: "Achievements & Milestones" },
    { id: "home-stories", label: "People stories" },
    { id: "home-subscribe", label: "Subscribe" },
    { id: "home-contact", label: "Get in touch" },
  ];
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Customizer
      backHref="/editor"
      title="Home page"
      sections={sections}
      open={open}
      onOpen={setOpen}
      previewPath="/"
      status={status}
      saving={saving}
      onSubmit={save}
    >
      <div id="home-hero" data-panel="home-hero" className="grid scroll-mt-24 gap-6">
        <div>
          <h2 className="text-lg font-semibold">Slider</h2>
          <p className="mt-1 text-sm text-muted">The slider at the top of the home page. Each slide has a template. Person photo is the current look. Quote cards and Where to buy put the words on the left and your uploaded picture on the right.</p>
        </div>
      {home.slides.map((slide, index) => (
        <section key={slide.id} className="rounded-xl border border-line bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Slide {index + 1} — {slide.title.split("\n")[0] || "Untitled"}</h2>
            <div className="flex gap-2 text-sm">
              <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setHome((current) => ({ ...current, slides: move(current.slides, index, -1) }))}>Up</button>
              <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setHome((current) => ({ ...current, slides: move(current.slides, index, 1) }))}>Down</button>
              <button
                type="button"
                className="rounded-lg border border-line px-3 py-1"
                onClick={() =>
                  setHome((current) => ({
                    ...current,
                    slides: current.slides.filter((_, slideIndex) => slideIndex !== index),
                  }))
                }
              >
                Remove
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-4">
            <label className="grid gap-2 text-sm">
              Template
              <select
                className={fieldClass}
                value={slide.template ?? "portrait"}
                onChange={(event) => {
                  const template = event.target.value === "story" || event.target.value === "buy" ? event.target.value : "portrait";
                  updateSlide(index, {
                    template,
                    ...(template === "story" && !slide.eyebrow ? { eyebrow: "ENDORSEMENTS" } : {}),
                    ...(template === "story" && !slide.quote ? { quote: "Paste the main quote here." } : {}),
                    ...(template === "buy" && !slide.eyebrow ? { eyebrow: "AVAILABLE NOW" } : {}),
                    ...(template === "buy" && !slide.lines?.length
                      ? {
                          lines: [
                            { label: "Hardback", text: "Where this edition is sold" },
                            { label: "Paperback", text: "Where this edition is sold" },
                            { label: "eBook", text: "Where this edition is sold" },
                            { label: "Worldwide", text: "Where this edition is sold" },
                          ],
                        }
                      : {}),
                    ...(template === "buy" && !slide.links?.length
                      ? {
                          links: [
                            { label: "Buy on Amazon", href: "https://www.amazon.in" },
                            { label: "Buy on Flipkart", href: "https://www.flipkart.com" },
                          ],
                        }
                      : {}),
                  });
                }}
              >
                <option value="portrait">Person photo</option>
                <option value="story">Quote cards</option>
                <option value="buy">Where to buy</option>
              </select>
              <span className="text-xs font-normal text-muted">{templateNotes[slide.template === "story" || slide.template === "buy" ? slide.template : "portrait"]}</span>
            </label>
            {slide.template === "story" || slide.template === "buy" ? (
              <label className="grid gap-2 text-sm">
                Small label above the heading
                <input className={fieldClass} value={slide.eyebrow ?? ""} onChange={(event) => updateSlide(index, { eyebrow: event.target.value })} />
              </label>
            ) : null}
            <label className="grid gap-2 text-sm">
              Heading — press Enter for a new line
              <textarea className={fieldClass} rows={2} value={slide.title} onChange={(event) => updateSlide(index, { title: event.target.value })} />
            </label>
            {slide.template === "story" ? (
              <label className="grid gap-2 text-sm">
                Quote on the left
                <textarea className={fieldClass} rows={4} value={slide.quote ?? ""} onChange={(event) => updateSlide(index, { quote: event.target.value })} />
              </label>
            ) : null}
            {slide.template === "buy" ? (
              <div className="grid gap-3">
                <p className="text-sm font-semibold">List on the left</p>
                {(slide.lines ?? []).map((line, lineIndex) => (
                  <div key={lineIndex} className="grid gap-2 rounded-lg border border-line p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">Row {lineIndex + 1}</p>
                      <button type="button" className="text-sm text-red-600" onClick={() => updateSlide(index, { lines: (slide.lines ?? []).filter((_, current) => current !== lineIndex) })}>Remove</button>
                    </div>
                    <label className="grid gap-2 text-sm">Name<input className={fieldClass} value={line.label} onChange={(event) => updateSlide(index, { lines: (slide.lines ?? []).map((item, current) => current === lineIndex ? { ...item, label: event.target.value } : item) })} /></label>
                    <label className="grid gap-2 text-sm">Detail<input className={fieldClass} value={line.text} onChange={(event) => updateSlide(index, { lines: (slide.lines ?? []).map((item, current) => current === lineIndex ? { ...item, text: event.target.value } : item) })} /></label>
                  </div>
                ))}
                {(slide.lines ?? []).length < 6 ? (
                  <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => updateSlide(index, { lines: [...(slide.lines ?? []), { label: "New row", text: "Where this is sold" }] })}>Add row</button>
                ) : null}
              </div>
            ) : (
              <label className="grid gap-2 text-sm">
                {slide.template === "story" ? "Name under the quote" : "Short line underneath"}
                <input className={fieldClass} value={slide.subtitle} onChange={(event) => updateSlide(index, { subtitle: event.target.value })} />
              </label>
            )}
            {slide.template === "buy" ? (
              <div className="grid gap-3">
                <p className="text-sm font-semibold">Shop buttons</p>
                <p className="text-xs text-muted">Add Amazon, Flipkart, or any other shop. Each button needs a name and a link.</p>
                {(slide.links ?? []).map((link, linkIndex) => (
                  <div key={linkIndex} className="grid gap-2 rounded-lg border border-line p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">Button {linkIndex + 1}</p>
                      {(slide.links ?? []).length > 1 ? (
                        <button type="button" className="text-sm text-red-600" onClick={() => updateSlide(index, { links: (slide.links ?? []).filter((_, current) => current !== linkIndex) })}>Remove</button>
                      ) : null}
                    </div>
                    <label className="grid gap-2 text-sm">Button name<input className={fieldClass} value={link.label} onChange={(event) => updateSlide(index, { links: (slide.links ?? []).map((item, current) => current === linkIndex ? { ...item, label: event.target.value } : item) })} /></label>
                    <label className="grid gap-2 text-sm">Link<input className={fieldClass} placeholder="https://" value={link.href} onChange={(event) => updateSlide(index, { links: (slide.links ?? []).map((item, current) => current === linkIndex ? { ...item, href: event.target.value } : item) })} /></label>
                  </div>
                ))}
                {(slide.links ?? []).length < 6 ? (
                  <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={() => updateSlide(index, { links: [...(slide.links ?? []), { label: "Buy here", href: "https://www.amazon.in" }] })}>Add shop button</button>
                ) : null}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  Button text
                  <input className={fieldClass} value={slide.buttonLabel} onChange={(event) => updateSlide(index, { buttonLabel: event.target.value })} />
                </label>
                <label className="grid gap-2 text-sm">
                  Button link
                  <input className={fieldClass} placeholder="https:// or /connect" value={slide.href} onChange={(event) => updateSlide(index, { href: event.target.value })} />
                </label>
              </div>
            )}
            <label className="grid gap-2 text-sm">
              Picture name
              <input className={fieldClass} value={slide.alt} onChange={(event) => updateSlide(index, { alt: event.target.value })} />
            </label>
            <div className="flex flex-wrap items-end gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
              <ImageButton
                label={slide.template === "portrait" ? "Change person photo" : "Upload the right-side picture"}
                accept="image/png,image/jpeg,image/webp,image/gif"
                onPick={(file) => upload(index, file)}
              />
            </div>
            <MobilePhotoField src={slide.mobileImage} onPick={(file) => upload(index, file, "mobileImage")} />
            {(slide.template ?? "portrait") === "portrait" ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {slide.rings.map((ring, ringIndex) => (
                  <label key={ringIndex} className="grid gap-2 text-sm">
                    Circle {ringIndex + 1} colour behind the photo
                    <input
                      className={fieldClass}
                      value={ring.background}
                      onChange={(event) => {
                        const rings = slide.rings.map((item, current) =>
                          current === ringIndex ? { ...item, background: event.target.value } : item,
                        );
                        updateSlide(index, { rings });
                      }}
                    />
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="w-fit rounded-lg border border-line bg-white px-4 py-2 text-sm"
          onClick={() =>
            setHome((current) => ({
              ...current,
              slides: [
                ...current.slides,
                {
                  id: crypto.randomUUID(),
                  template: "portrait",
                  title: "New title",
                  subtitle: "Short line",
                  buttonLabel: "Let's Talk",
                  href: "/connect",
                  image: current.slides[0]?.image ?? "/images/home/practice-bridge-builder.webp",
                  alt: "New slide",
                  rings: current.slides[0]?.rings ?? emptyRings,
                },
              ],
            }))
          }
        >
          Add person-photo slide
        </button>
        <button
          type="button"
          className="w-fit rounded-lg border border-line bg-white px-4 py-2 text-sm"
          onClick={() =>
            setHome((current) => ({
              ...current,
              slides: [
                ...current.slides,
                {
                  id: crypto.randomUUID(),
                  template: "story",
                  eyebrow: "ENDORSEMENTS",
                  title: "In the Words\nof Leaders",
                  quote: "Paste the main quote here.",
                  subtitle: "Name, role",
                  buttonLabel: "Read All Endorsements",
                  href: "/books/from-fomo-to-jomo",
                  image: "/images/books/book-front.webp",
                  alt: "Quote cards",
                  rings: emptyRings,
                },
              ],
            }))
          }
        >
          Add quote-cards slide
        </button>
        <button
          type="button"
          className="w-fit rounded-lg border border-line bg-white px-4 py-2 text-sm"
          onClick={() =>
            setHome((current) => ({
              ...current,
              slides: [
                ...current.slides,
                {
                  id: crypto.randomUUID(),
                  template: "buy",
                  eyebrow: "AVAILABLE NOW",
                  title: "Now on Shelves\nand Screens",
                  subtitle: "",
                  buttonLabel: "Buy on Amazon",
                  href: "https://www.amazon.in",
                  lines: [
                    { label: "Hardback", text: "Where this edition is sold" },
                    { label: "Paperback", text: "Where this edition is sold" },
                    { label: "eBook", text: "Where this edition is sold" },
                    { label: "Worldwide", text: "Where this edition is sold" },
                  ],
                  links: [
                    { label: "Buy on Amazon", href: "https://www.amazon.in" },
                    { label: "Buy on Flipkart", href: "https://www.flipkart.com" },
                  ],
                  image: "/images/books/book-front.webp",
                  alt: "Book",
                  rings: emptyRings,
                },
              ],
            }))
          }
        >
          Add where-to-buy slide
        </button>
      </div>
      </div>

      <section id="home-about" data-panel="home-about" className="scroll-mt-24 rounded-xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold">About band</h2>
        <p className="mt-1 text-sm text-muted">The green section under the slider. Photo, name, yellow lines, paragraphs, and counters.</p>
        <div className="mt-4 grid gap-4">
          <div className="flex flex-wrap items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={home.about.image} alt="" className="h-28 w-auto rounded-lg bg-slate-50 object-contain" />
            <ImageButton
              label="Change about photo"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onPick={async (file) => {
                setStatus("");
                const body = new FormData();
                body.set("file", file);
                const response = await fetch("/api/upload", { method: "POST", body });
                const saved = await response.json();
                if (!response.ok) {
                  setStatus(saved.error ?? "Image upload failed.");
                  return;
                }
                setHome((current) => ({ ...current, about: { ...current.about, image: saved.url } }));
                setStatus("Image uploaded. Press Save to publish it.");
              }}
            />
          </div>
          <label className="grid gap-2 text-sm">
            Large name (white)
            <input className={fieldClass} value={home.about.name} onChange={(event) => setHome((current) => ({ ...current, about: { ...current.about, name: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Peeli tagline
            <input className={fieldClass} value={home.about.tagline} onChange={(event) => setHome((current) => ({ ...current, about: { ...current.about, tagline: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Peeli role line
            <input className={fieldClass} value={home.about.role} onChange={(event) => setHome((current) => ({ ...current, about: { ...current.about, role: event.target.value } }))} />
          </label>
          {home.about.paragraphs.map((paragraph, index) => (
            <label key={index} className="grid gap-2 text-sm">
              Paragraph {index + 1} — text in the blue box
              <textarea
                className={fieldClass}
                rows={4}
                value={paragraph}
                onChange={(event) =>
                  setHome((current) => ({
                    ...current,
                    about: {
                      ...current.about,
                      paragraphs: current.about.paragraphs.map((item, itemIndex) =>
                        itemIndex === index ? event.target.value : item,
                      ),
                    },
                  }))
                }
              />
            </label>
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            {home.about.stats.map((stat, index) => (
              <div key={index} className="grid gap-2 rounded-lg border border-line p-3">
                <label className="grid gap-2 text-sm">
                  Counter {index + 1} number — currently “{stat.label}”
                  <input
                    className={fieldClass}
                    value={stat.target}
                    onChange={(event) =>
                      setHome((current) => ({
                        ...current,
                        about: {
                          ...current.about,
                          stats: current.about.stats.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, target: Number(event.target.value) || 0 } : item,
                          ),
                        },
                      }))
                    }
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  Text after the number (for example + or yrs)
                  <input
                    className={fieldClass}
                    value={stat.suffix}
                    onChange={(event) =>
                      setHome((current) => ({
                        ...current,
                        about: {
                          ...current.about,
                          stats: current.about.stats.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, suffix: event.target.value } : item,
                          ),
                        },
                      }))
                    }
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  Counter name
                  <input
                    className={fieldClass}
                    value={stat.label}
                    onChange={(event) =>
                      setHome((current) => ({
                        ...current,
                        about: {
                          ...current.about,
                          stats: current.about.stats.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, label: event.target.value } : item,
                          ),
                        },
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="home-expertise" data-panel="home-expertise" className="scroll-mt-24 rounded-xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold">Expertise</h2>
        <p className="mt-1 text-sm text-muted">Four cards. The icons stay as they are. You can change the heading, subtitle, and each card's text.</p>
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={home.expertise.title} onChange={(event) => setHome((current) => ({ ...current, expertise: { ...current.expertise, title: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={home.expertise.subtitle} onChange={(event) => setHome((current) => ({ ...current, expertise: { ...current.expertise, subtitle: event.target.value } }))} />
          </label>
          {home.expertise.cards.map((card, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <label className="grid gap-2 text-sm">
                Card {index + 1} heading — {card.title || "empty"}
                <input
                  className={fieldClass}
                  value={card.title}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      expertise: {
                        ...current.expertise,
                        cards: current.expertise.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Card {index + 1} description
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={card.description}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      expertise: {
                        ...current.expertise,
                        cards: current.expertise.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, description: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>
      <section id="home-achievements" data-panel="home-achievements" className="scroll-mt-24 rounded-xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold">Achievements & Milestones</h2>
        <p className="mt-1 text-sm text-muted">Award slider. Four cards on a page. Leave the year blank to hide it. Arrows and dots are automatic.</p>
        {home.achievements.cards.length < 16 ? (
          <button
            type="button"
            className="mt-4 rounded-lg bg-[#6d5ce7] px-4 py-2 text-sm font-semibold text-white"
            onClick={() =>
              setHome((current) => ({
                ...current,
                achievements: {
                  ...current.achievements,
                  cards: [
                    ...current.achievements.cards,
                    { year: "", title: "New achievement", description: "A short line about this milestone." },
                  ],
                },
              }))
            }
          >
            Add achievement
          </button>
        ) : null}
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={home.achievements.title} onChange={(event) => setHome((current) => ({ ...current, achievements: { ...current.achievements, title: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={home.achievements.subtitle} onChange={(event) => setHome((current) => ({ ...current, achievements: { ...current.achievements, subtitle: event.target.value } }))} />
          </label>
          {home.achievements.cards.map((card, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <label className="grid gap-2 text-sm">
                Year — optional. Leave it blank to hide it.
                <input
                  className={fieldClass}
                  value={card.year}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      achievements: {
                        ...current.achievements,
                        cards: current.achievements.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, year: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Award {index + 1} name
                <input
                  className={fieldClass}
                  value={card.title}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      achievements: {
                        ...current.achievements,
                        cards: current.achievements.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Line under the award
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={card.description}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      achievements: {
                        ...current.achievements,
                        cards: current.achievements.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, description: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
              {home.achievements.cards.length > 1 ? (
                <button
                  type="button"
                  className="justify-self-start text-sm text-red-600"
                  onClick={() =>
                    setHome((current) => ({
                      ...current,
                      achievements: {
                        ...current.achievements,
                        cards: current.achievements.cards.filter((_, cardIndex) => cardIndex !== index),
                      },
                    }))
                  }
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          {home.achievements.cards.length < 16 ? (
            <button
              type="button"
              className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
              onClick={() =>
                setHome((current) => ({
                  ...current,
                  achievements: {
                    ...current.achievements,
                    cards: [
                      ...current.achievements.cards,
                      { year: "", title: "New achievement", description: "A short line about this milestone." },
                    ],
                  },
                }))
              }
            >
              Add achievement
            </button>
          ) : null}
        </div>
      </section>
      <section id="home-stories" data-panel="home-stories" className="scroll-mt-24 rounded-xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold">People stories</h2>
        <p className="mt-1 text-sm text-muted">Testimonial slider. Two cards per slide, then the next slide after 5 seconds. Paste a LinkedIn profile link and press Save — the photo and company logo download then. You can still replace them with the buttons on each story.</p>
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm">
            Section heading
            <input className={fieldClass} value={home.stories.title} onChange={(event) => setHome((current) => ({ ...current, stories: { ...current.stories, title: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={home.stories.subtitle} onChange={(event) => setHome((current) => ({ ...current, stories: { ...current.stories, subtitle: event.target.value } }))} />
          </label>
          {home.stories.cards.map((card, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-line p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Story {index + 1} — {card.name || "no name"}</p>
                {home.stories.cards.length > 1 ? (
                  <button type="button" className="text-sm text-red-600" onClick={() => setHome((current) => ({ ...current, stories: { ...current.stories, cards: current.stories.cards.filter((_, cardIndex) => cardIndex !== index) } }))}>Remove</button>
                ) : null}
              </div>
              <label className="grid gap-2 text-sm">
                Profile link
                <span className="text-xs font-normal text-muted">Paste a LinkedIn profile link. The photo and company logo download on their own. You can still change them with the buttons below.</span>
                <input
                  className={fieldClass}
                  autoComplete="off"
                  placeholder="https://www.linkedin.com/in/..."
                  value={card.profileUrl ?? ""}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      stories: {
                        ...current.stories,
                        cards: current.stories.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, profileUrl: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                  onBlur={(event) => {
                    const next = event.target.value.trim();
                    if (next.startsWith("https://")) void pullProfile(index, next);
                  }}
                />
              </label>
              <div className="flex flex-wrap items-end gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.photo} alt="" className="h-14 w-14 rounded-full bg-slate-100 object-cover" />
                <ImageButton label="Change person photo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadStoryImage(index, "photo", file)} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.logo} alt="" className="h-10 w-auto bg-slate-50 object-contain" />
                <ImageButton label="Change company logo" accept="image/png,image/jpeg,image/webp,image/gif" onPick={(file) => uploadStoryImage(index, "logo", file)} />
              </div>
              <label className="grid gap-2 text-sm">
                Person's name
                <input
                  className={fieldClass}
                  value={card.name}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      stories: {
                        ...current.stories,
                        cards: current.stories.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, name: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Role or short bio
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={card.role}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      stories: {
                        ...current.stories,
                        cards: current.stories.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, role: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Unka quote
                <textarea
                  className={fieldClass}
                  rows={4}
                  value={card.quote}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      stories: {
                        ...current.stories,
                        cards: current.stories.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, quote: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-2 text-sm">
                Company name (next to the logo)
                <input
                  className={fieldClass}
                  value={card.logoAlt}
                  onChange={(event) =>
                    setHome((current) => ({
                      ...current,
                      stories: {
                        ...current.stories,
                        cards: current.stories.cards.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, logoAlt: event.target.value } : item,
                        ),
                      },
                    }))
                  }
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold"
            onClick={() =>
              setHome((current) => ({
                ...current,
                stories: {
                  ...current.stories,
                  cards: [
                    ...current.stories.cards,
                    {
                      quote: "Paste the LinkedIn recommendation here.",
                      name: "Name",
                      role: "Role, Company",
                      photo: "/images/home/story-avatar.svg",
                      logo: "/images/home/logo-company.svg",
                      logoAlt: "Company",
                    },
                  ],
                },
              }))
            }
          >
            Add story
          </button>
        </div>
      </section>
      <section id="home-subscribe" data-panel="home-subscribe" className="scroll-mt-24 rounded-xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold">Subscribe</h2>
        <p className="mt-1 text-sm text-muted">Names and emails are saved under Messages. The LinkedIn button opens the newsletter. Zoho is not used.</p>
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm">
            Heading
            <input className={fieldClass} value={home.subscribe.title} onChange={(event) => setHome((current) => ({ ...current, subscribe: { ...current.subscribe, title: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <textarea className={fieldClass} rows={3} value={home.subscribe.subtitle} onChange={(event) => setHome((current) => ({ ...current, subscribe: { ...current.subscribe, subtitle: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Message after someone subscribes
            <input className={fieldClass} value={home.subscribe.note} onChange={(event) => setHome((current) => ({ ...current, subscribe: { ...current.subscribe, note: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Subscribe button
            <input className={fieldClass} value={home.subscribe.buttonLabel} onChange={(event) => setHome((current) => ({ ...current, subscribe: { ...current.subscribe, buttonLabel: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            LinkedIn button
            <input className={fieldClass} value={home.subscribe.linkedinLabel} onChange={(event) => setHome((current) => ({ ...current, subscribe: { ...current.subscribe, linkedinLabel: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            LinkedIn newsletter link
            <input className={fieldClass} value={home.subscribe.linkedinHref} onChange={(event) => setHome((current) => ({ ...current, subscribe: { ...current.subscribe, linkedinHref: event.target.value } }))} />
          </label>
        </div>
      </section>
      <section id="home-contact" data-panel="home-contact" className="scroll-mt-24 rounded-xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold">Get in touch</h2>
        <p className="mt-1 text-sm text-muted">The pink form at the end of the home page. The email button opens a mail app. Form messages appear under Messages.</p>
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm">
            Bada heading
            <input className={fieldClass} value={home.contact.title} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, title: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Line under the heading
            <input className={fieldClass} value={home.contact.headline} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, headline: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Form paragraph
            <textarea className={fieldClass} rows={2} value={home.contact.intro} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, intro: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Small word in the middle (Or)
            <input className={fieldClass} value={home.contact.orLabel} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, orLabel: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Line above the email button
            <input className={fieldClass} value={home.contact.prompt} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, prompt: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Email button — this is the address the button emails
            <input className={fieldClass} value={home.contact.email} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, email: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Send button text
            <input className={fieldClass} value={home.contact.buttonLabel} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, buttonLabel: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Name box placeholder
            <input className={fieldClass} value={home.contact.namePlaceholder} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, namePlaceholder: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Email box placeholder
            <input className={fieldClass} value={home.contact.emailPlaceholder} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, emailPlaceholder: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Subject box placeholder
            <input className={fieldClass} value={home.contact.subjectPlaceholder} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, subjectPlaceholder: event.target.value } }))} />
          </label>
          <label className="grid gap-2 text-sm">
            Message box placeholder
            <input className={fieldClass} value={home.contact.messagePlaceholder} onChange={(event) => setHome((current) => ({ ...current, contact: { ...current.contact, messagePlaceholder: event.target.value } }))} />
          </label>
        </div>
      </section>
    </Customizer>
  );
}
