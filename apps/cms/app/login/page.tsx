"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    setError("");
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setSending(false);
    if (!response.ok) {
      const saved = await response.json().catch(() => null);
      setError(saved?.error ?? "Email or password is wrong.");
      return;
    }
    window.location.href = "/editor";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#17151f] px-6">
      <form onSubmit={submit} className="grid w-full max-w-sm gap-4 rounded-3xl bg-white p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">Website editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Aman Jain</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Log in to edit the website. Closing the page keeps you logged in. Press Log out when you want to leave.</p>
        </div>
        <label className="grid gap-2 text-sm">
          Email
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Password
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-line px-3.5 py-2.5 pr-16 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-semibold text-accent"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" disabled={sending} className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {sending ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
