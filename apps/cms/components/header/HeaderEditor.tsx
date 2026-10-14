"use client";

import { useState } from "react";
import type { HeaderContent, MenuItem, MenuLink } from "@/lib/content";
import { Customizer } from "@/components/editor/Customizer";
import { ImageButton } from "@/components/editor/ui";

function move<T>(list: T[], index: number, direction: -1 | 1) {
  const next = index + direction;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

function newId() {
  return crypto.randomUUID();
}

const fieldClass = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm";

export function HeaderEditor({ initialHeader }: { initialHeader: HeaderContent }) {
  const [header, setHeader] = useState(initialHeader);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function updateItem(index: number, patch: Partial<MenuItem>) {
    setHeader((current) => ({
      ...current,
      menu: current.menu.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    }));
  }

  function updateChild(itemIndex: number, childIndex: number, patch: Partial<MenuLink>) {
    setHeader((current) => ({
      ...current,
      menu: current.menu.map((item, index) => {
        if (index !== itemIndex) return item;
        return {
          ...item,
          children: item.children.map((child, currentIndex) =>
            currentIndex === childIndex ? { ...child, ...patch } : child,
          ),
        };
      }),
    }));
  }

  async function save() {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/header", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(header),
    });
    const saved = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(saved.error ?? "Save failed.");
      return;
    }
    setHeader(saved);
    setStatus("Saved. The header is updated.");
  }

  async function uploadLogo(file: File) {
    setStatus("");
    const body = new FormData();
    body.set("logo", file);
    const response = await fetch("/api/header/logo", { method: "POST", body });
    const saved = await response.json();
    if (!response.ok) {
      setStatus(saved.error ?? "Logo upload failed.");
      return;
    }
    setHeader(saved);
    setStatus("Logo updated.");
  }

  const sections = [{ id: "header", label: "Logo, menu, and Let's talk" }];
  const [open, setOpen] = useState<string | null>("header");

  return (
    <Customizer
      backHref="/editor"
      title="Header"
      sections={sections}
      open={open}
      onOpen={setOpen}
      previewPath="/"
      status={status}
      saving={saving}
      onSubmit={(event) => {
        event.preventDefault();
        void save();
      }}
    >
      <div data-panel="header" className="grid gap-6">
      <section className="rounded-xl border border-line bg-white p-5">
        <h2 className="text-base font-semibold">Website logo</h2>
        <p className="mt-1 text-sm text-muted">The logo at the top left. Choose a new photo, then press Save.</p>
        <div className="mt-4 flex flex-wrap items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={header.logo.src} alt={header.logo.alt} className="h-12 w-auto" />
          <ImageButton
            label="Change logo"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            onPick={uploadLogo}
          />
        </div>
        <label className="mt-4 grid gap-2 text-sm">
          Logo name
          <span className="text-xs font-normal text-muted">This is not a large heading on the website. It is the name shown if the photo does not load.</span>
          <input
            className={fieldClass}
            value={header.logo.alt}
            onChange={(event) =>
              setHeader((current) => ({
                ...current,
                logo: { ...current.logo, alt: event.target.value },
              }))
            }
          />
        </label>
      </section>

      <section className="rounded-xl border border-line bg-white p-5">
        <h2 className="text-base font-semibold">Let's talk button</h2>
        <p className="mt-1 text-sm text-muted">The blue button at the top right. Keep the link as /connect so it opens the Connect page.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Button text
            <input
              className={fieldClass}
              value={header.cta.label}
              onChange={(event) =>
                setHeader((current) => ({
                  ...current,
                  cta: { ...current.cta, label: event.target.value },
                }))
              }
            />
          </label>
          <label className="grid gap-2 text-sm">
            Button link
            <input
              className={fieldClass}
              value={header.cta.href}
              onChange={(event) =>
                setHeader((current) => ({
                  ...current,
                  cta: { ...current.cta, href: event.target.value },
                }))
              }
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Top menu</h2>
            <p className="mt-1 text-sm text-muted">Names such as Home, About, and Books. Press Save after you add or rename an item.</p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold"
            onClick={() =>
              setHeader((current) => ({
                ...current,
                menu: [
                  ...current.menu,
                  { id: newId(), label: "New item", href: "/", children: [] },
                ],
              }))
            }
          >
            New item
          </button>
        </div>

        {header.menu.map((item, index) => (
          <article key={item.id} className="rounded-xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium">Item {index + 1}</p>
              <div className="flex gap-2">
                <button type="button" className="rounded-lg border border-line px-2 py-1 text-xs" onClick={() => setHeader((current) => ({ ...current, menu: move(current.menu, index, -1) }))}>Up</button>
                <button type="button" className="rounded-lg border border-line px-2 py-1 text-xs" onClick={() => setHeader((current) => ({ ...current, menu: move(current.menu, index, 1) }))}>Down</button>
                <button
                  type="button"
                  className="rounded-lg border border-line px-2 py-1 text-xs text-red-600"
                  onClick={() =>
                    setHeader((current) => ({
                      ...current,
                      menu: current.menu.filter((menuItem) => menuItem.id !== item.id),
                    }))
                  }
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                Label
                <input className={fieldClass} value={item.label} onChange={(event) => updateItem(index, { label: event.target.value })} />
              </label>
              <label className="grid gap-2 text-sm">
                Link
                <input className={fieldClass} value={item.href} onChange={(event) => updateItem(index, { href: event.target.value })} />
              </label>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Dropdown</p>
                <button
                  type="button"
                  className="text-sm text-accent"
                  onClick={() =>
                    updateItem(index, {
                      children: [...item.children, { id: newId(), label: "New link", href: "/" }],
                    })
                  }
                >
                  Add dropdown item
                </button>
              </div>
              {item.children.length === 0 ? (
                <p className="mt-3 text-sm text-muted">No dropdown. Add items to show a menu under this link.</p>
              ) : (
                <div className="mt-3 grid gap-3">
                  {item.children.map((child, childIndex) => (
                    <div key={child.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                      <label className="grid gap-2 text-sm">
                        Label
                        <input className={fieldClass} value={child.label} onChange={(event) => updateChild(index, childIndex, { label: event.target.value })} />
                      </label>
                      <label className="grid gap-2 text-sm">
                        Link
                        <input className={fieldClass} value={child.href} onChange={(event) => updateChild(index, childIndex, { href: event.target.value })} />
                      </label>
                      <div className="flex gap-2">
                        <button type="button" className="rounded-lg border border-line px-2 py-2 text-xs" onClick={() => updateItem(index, { children: move(item.children, childIndex, -1) })}>Up</button>
                        <button type="button" className="rounded-lg border border-line px-2 py-2 text-xs" onClick={() => updateItem(index, { children: move(item.children, childIndex, 1) })}>Down</button>
                        <button
                          type="button"
                          className="rounded-lg border border-line px-2 py-2 text-xs text-red-600"
                          onClick={() =>
                            updateItem(index, {
                              children: item.children.filter((entry) => entry.id !== child.id),
                            })
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      </div>
    </Customizer>
  );
}
