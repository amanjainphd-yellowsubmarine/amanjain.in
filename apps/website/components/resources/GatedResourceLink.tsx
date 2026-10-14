"use client";

import { useState } from "react";

type Pending = {
  title: string;
  href: string;
  page: string;
  action: "download" | "read";
};

export function GatedResourceLink({
  page,
  title,
  href,
  action,
  className,
  children,
  disabled,
}: {
  page: string;
  title: string;
  href: string;
  action: "download" | "read";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const [pending, setPending] = useState<Pending | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function openGate(event: React.MouseEvent) {
    if (disabled || !href || href === "#") {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    setName("");
    setEmail("");
    setError("");
    setPending({ title, href, page, action });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!pending) return;
    const safeName = name.trim();
    const safeEmail = email.trim();
    if (!safeName || !safeEmail.includes("@")) {
      setError("Enter your name and a valid email.");
      return;
    }
    setSaving(true);
    setError("");
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "resource",
        name: safeName,
        email: safeEmail,
        resourceTitle: pending.title,
        resourcePage: pending.page,
        resourceAction: pending.action,
        resourceHref: pending.href,
      }),
    });
    const saved = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      setError(typeof saved.error === "string" ? saved.error : "Could not save. Try again.");
      return;
    }
    const target = pending.href;
    setPending(null);
    window.open(target, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <a className={className} href={href} onClick={openGate} aria-disabled={disabled || !href || href === "#"}>
        {children}
      </a>
      {pending ? (
        <div className="aj-gate-backdrop" role="presentation" onClick={() => !saving && setPending(null)}>
          <form
            className="aj-gate-panel"
            onClick={(event) => event.stopPropagation()}
            onSubmit={submit}
            aria-labelledby="aj-gate-title"
          >
            <style>{`
              .aj-gate-backdrop{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,23,42,.45);backdrop-filter:blur(4px)}
              .aj-gate-panel{width:min(100%,420px);border-radius:20px;background:#fff;padding:24px;box-shadow:0 24px 60px rgba(15,23,42,.18)}
              .aj-gate-panel h2{margin:0 0 8px;font:800 1.35rem/1.2 Poppins,sans-serif;color:#111}
              .aj-gate-panel p{margin:0 0 18px;font:500 .95rem/1.5 Poppins,sans-serif;color:#4b5563}
              .aj-gate-panel label{display:grid;gap:6px;margin-bottom:12px;font:600 .85rem Poppins,sans-serif;color:#374151}
              .aj-gate-panel input{width:100%;box-sizing:border-box;border:1px solid #e5e7eb;border-radius:12px;padding:12px 14px;font:500 1rem Poppins,sans-serif}
              .aj-gate-panel input:focus{outline:2px solid #2562f1;outline-offset:2px}
              .aj-gate-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
              .aj-gate-primary,.aj-gate-secondary{min-height:44px;border-radius:999px;padding:0 22px;font:700 .95rem Poppins,sans-serif;cursor:pointer}
              .aj-gate-primary{border:none;background:#5b3df5;color:#fff}
              .aj-gate-secondary{border:1px solid #d1d5db;background:#fff;color:#374151}
              .aj-gate-error{margin:0 0 10px;font:600 .85rem Poppins,sans-serif;color:#b91c1c}
            `}</style>
            <h2 id="aj-gate-title">{pending.action === "download" ? "Download this file" : "Open this article"}</h2>
            <p>
              Share your name and email to continue. We will open <strong>{pending.title}</strong>.
            </p>
            {error ? <p className="aj-gate-error">{error}</p> : null}
            <label>
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
            </label>
            <div className="aj-gate-actions">
              <button className="aj-gate-primary" type="submit" disabled={saving}>
                {saving ? "Please wait…" : pending.action === "download" ? "Download" : "Continue"}
              </button>
              <button className="aj-gate-secondary" type="button" disabled={saving} onClick={() => setPending(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
