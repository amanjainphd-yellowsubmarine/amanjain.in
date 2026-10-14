"use client";

import { useState } from "react";
import { EditorStatus, fieldClass } from "@/components/editor/ui";

type Field = { key: string; label: string; multiline?: boolean };

function move<T>(list: T[], index: number, direction: -1 | 1) {
  const next = index + direction;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

export function CollectionEditor({
  endpoint,
  initialItems,
  fields,
  blank,
  savedMessage,
}: {
  endpoint: string;
  initialItems: Record<string, string>[];
  fields: Field[];
  blank: Record<string, string>;
  savedMessage: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function update(index: number, key: string, value: string) {
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)),
    );
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    const saved = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(saved.error ?? "Save failed.");
      return;
    }
    setItems(saved);
    setStatus(savedMessage);
  }

  return (
    <form className="grid max-w-3xl gap-4 p-6" onSubmit={save}>
      {items.map((item, index) => (
        <section key={`${item.slug}-${index}`} className="grid gap-3 rounded-xl border border-line bg-white p-5">
          <div className="flex justify-end gap-2 text-sm">
            <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setItems((current) => move(current, index, -1))}>Up</button>
            <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setItems((current) => move(current, index, 1))}>Down</button>
            <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
          </div>
          {fields.map((field) => (
            <label key={field.key} className="grid gap-2 text-sm">
              {field.label}
              {field.multiline ? (
                <textarea className={fieldClass} rows={3} value={item[field.key] ?? ""} onChange={(event) => update(index, field.key, event.target.value)} />
              ) : (
                <input className={fieldClass} value={item[field.key] ?? ""} onChange={(event) => update(index, field.key, event.target.value)} />
              )}
            </label>
          ))}
        </section>
      ))}
      <button type="button" className="w-fit rounded-lg border border-line bg-white px-4 py-2 text-sm" onClick={() => setItems((current) => [...current, { ...blank }])}>
        Add item
      </button>
      <EditorStatus status={status} saving={saving} />
    </form>
  );
}
