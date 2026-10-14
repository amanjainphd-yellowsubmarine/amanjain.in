"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      className="grid gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.get("name"),
            email: form.get("email"),
            message: form.get("message"),
          }),
        });
        if (!response.ok) {
          setError("Message could not be sent. Please try again.");
          return;
        }
        setSent(true);
        event.currentTarget.reset();
      }}
    >
      <label className="grid gap-2 text-base">
        Name
        <input
          name="name"
          required
          className="rounded-lg border border-line bg-white px-3 py-2"
        />
      </label>
      <label className="grid gap-2 text-base">
        Email
        <input
          type="email"
          name="email"
          required
          className="rounded-lg border border-line bg-white px-3 py-2"
        />
      </label>
      <label className="grid gap-2 text-base">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-lg border border-line bg-white px-3 py-2"
        />
      </label>
      <button
        type="submit"
        className="inline-flex min-h-11 w-fit items-center rounded-full bg-accent px-5 py-3 text-base font-medium text-white"
      >
        Send
      </button>
      {sent ? <p className="text-sm text-muted">Message received. We will reply soon.</p> : null}
      {error ? <p className="text-sm text-muted">{error}</p> : null}
    </form>
  );
}
