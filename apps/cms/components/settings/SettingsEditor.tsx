"use client";

import { useState } from "react";
import type { FooterLink, SiteSettings } from "@/lib/content";
import { Customizer } from "@/components/editor/Customizer";
import { fieldClass } from "@/components/editor/ui";

export function SettingsEditor({ initialSite }: { initialSite: SiteSettings }) {
  const [site, setSite] = useState(initialSite);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key: keyof SiteSettings, value: string) {
    setSite((current) => ({ ...current, [key]: value }));
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    });
    const saved = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(saved.error ?? "Save failed.");
      return;
    }
    setSite(saved);
    setStatus("Saved. The footer is updated.");
  }

  const sections = [{ id: "footer", label: "Footer" }];
  const [open, setOpen] = useState<string | null>("footer");

  return (
    <Customizer
      backHref="/editor"
      title="Footer"
      sections={sections}
      open={open}
      onOpen={setOpen}
      previewPath="/"
      status={status}
      saving={saving}
      onSubmit={save}
    >
      <div data-panel="footer" className="grid gap-4">
      <p className="text-sm text-muted">The footer at the bottom of the website. Change the name, tagline, address, email, button, and links here, then press Save.</p>
      {(
        [
          ["name", "Footer name"],
          ["tagline", "Tagline under the name"],
          ["email", "Get in Touch email"],
          ["phone", "Phone"],
          ["address", "Get in Touch address"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="grid gap-2 text-sm">
          {label}
          <input className={fieldClass} value={site[key]} onChange={(event) => update(key, event.target.value)} />
        </label>
      ))}
      <label className="grid gap-2 text-sm">
        Description
        <textarea className={fieldClass} rows={4} value={site.description} onChange={(event) => update("description", event.target.value)} />
      </label>
      <FooterFields site={site} setSite={setSite} />
      </div>
    </Customizer>
  );
}

function FooterFields({
  site,
  setSite,
}: {
  site: SiteSettings;
  setSite: (value: SiteSettings) => void;
}) {
  function patch(footer: SiteSettings["footer"]) {
    setSite({ ...site, footer });
  }

  function editLinks(key: "quickLinks" | "resourceLinks" | "socials", index: number, field: keyof FooterLink, value: string) {
    const next = site.footer[key].map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item));
    patch({ ...site.footer, [key]: next });
  }

  function removeLink(key: "quickLinks" | "resourceLinks" | "socials", index: number) {
    patch({ ...site.footer, [key]: site.footer[key].filter((_, itemIndex) => itemIndex !== index) });
  }

  function addLink(key: "quickLinks" | "resourceLinks" | "socials") {
    const blank = key === "socials" ? { label: "Facebook", href: "https://" } : { label: "New link", href: "/" };
    patch({ ...site.footer, [key]: [...site.footer[key], blank] });
  }

  return (
    <div className="grid gap-4 rounded-xl border border-line bg-white p-4">
      <div>
        <h2 className="text-lg font-semibold">Footer links</h2>
        <p className="mt-1 text-sm text-muted">Name, tagline, address, and email are above. This section is the button and the link columns. Campus Connect has no page yet, so its link is #.</p>
      </div>
      <label className="grid gap-2 text-sm">
        Book a Slot button text
        <input className={fieldClass} value={site.footer.bookingLabel} onChange={(event) => patch({ ...site.footer, bookingLabel: event.target.value })} />
      </label>
      <label className="grid gap-2 text-sm">
        Book a Slot link
        <input className={fieldClass} value={site.footer.bookingHref} onChange={(event) => patch({ ...site.footer, bookingHref: event.target.value })} />
      </label>
      <LinkList title="Quick Links heading" heading={site.footer.quickTitle} onHeading={(value) => patch({ ...site.footer, quickTitle: value })} links={site.footer.quickLinks} onEdit={(index, field, value) => editLinks("quickLinks", index, field, value)} onRemove={(index) => removeLink("quickLinks", index)} onAdd={() => addLink("quickLinks")} />
      <LinkList title="Resources heading" heading={site.footer.resourcesTitle} onHeading={(value) => patch({ ...site.footer, resourcesTitle: value })} links={site.footer.resourceLinks} onEdit={(index, field, value) => editLinks("resourceLinks", index, field, value)} onRemove={(index) => removeLink("resourceLinks", index)} onAdd={() => addLink("resourceLinks")} />
      <label className="grid gap-2 text-sm">
        Get in Touch heading
        <input className={fieldClass} value={site.footer.contactTitle} onChange={(event) => patch({ ...site.footer, contactTitle: event.target.value })} />
      </label>
      <LinkList title="Social icons. The name picks the icon: Facebook, Instagram, Twitter/X, LinkedIn, or WhatsApp." heading="" links={site.footer.socials} onEdit={(index, field, value) => editLinks("socials", index, field, value)} onRemove={(index) => removeLink("socials", index)} onAdd={() => addLink("socials")} />
    </div>
  );
}

function LinkList({
  title,
  heading,
  onHeading,
  links,
  onEdit,
  onRemove,
  onAdd,
}: {
  title: string;
  heading?: string;
  onHeading?: (value: string) => void;
  links: FooterLink[];
  onEdit: (index: number, field: keyof FooterLink, value: string) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-medium">{title}</p>
      {onHeading ? <input className={fieldClass} value={heading} onChange={(event) => onHeading(event.target.value)} /> : null}
      {links.map((link, index) => (
        <div key={`link-${index}`} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
          <input className={fieldClass} value={link.label} aria-label="Link name" onChange={(event) => onEdit(index, "label", event.target.value)} />
          <input className={fieldClass} value={link.href} aria-label="Link" onChange={(event) => onEdit(index, "href", event.target.value)} />
          <button type="button" className="rounded-lg border border-line px-3 py-2 text-sm" onClick={() => onRemove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="justify-self-start rounded-lg border border-line px-4 py-2 text-sm font-semibold" onClick={onAdd}>
        Add link
      </button>
    </div>
  );
}
