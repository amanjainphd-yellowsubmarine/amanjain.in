"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post } from "@/lib/content";
import { EditorStatus, fieldClass } from "@/components/editor/ui";

export function PostEditor({ initialPost, originalSlug }: { initialPost: Post; originalSlug?: string }) {
  const router = useRouter();
  const [post, setPost] = useState(initialPost);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, originalSlug: originalSlug ?? post.slug }),
    });
    const saved = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(saved.error ?? "Save failed.");
      return;
    }
    setPost(saved);
    setStatus("Saved. The post is updated.");
    if (!originalSlug || originalSlug !== saved.slug) {
      router.replace(`/posts/${saved.slug}`);
    }
  }

  async function remove() {
    if (!originalSlug) return;
    const response = await fetch(`/api/posts?slug=${encodeURIComponent(originalSlug)}`, { method: "DELETE" });
    if (!response.ok) {
      const saved = await response.json();
      setStatus(saved.error ?? "Delete failed.");
      return;
    }
    router.push("/posts");
    router.refresh();
  }

  return (
    <form className="grid max-w-3xl gap-4 p-6" onSubmit={save}>
      <label className="grid gap-2 text-sm">
        Title
        <input className={fieldClass} value={post.title} onChange={(event) => setPost({ ...post, title: event.target.value })} />
      </label>
      <label className="grid gap-2 text-sm">
        Slug
        <input className={fieldClass} value={post.slug} onChange={(event) => setPost({ ...post, slug: event.target.value })} />
      </label>
      <label className="grid gap-2 text-sm">
        Excerpt
        <textarea className={fieldClass} rows={3} value={post.excerpt} onChange={(event) => setPost({ ...post, excerpt: event.target.value })} />
      </label>
      <label className="grid gap-2 text-sm">
        Body
        <textarea className={fieldClass} rows={10} value={post.body} onChange={(event) => setPost({ ...post, body: event.target.value })} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Date
          <input className={fieldClass} value={post.publishedAt} onChange={(event) => setPost({ ...post, publishedAt: event.target.value })} />
        </label>
        <label className="grid gap-2 text-sm">
          Status
          <select className={fieldClass} value={post.status} onChange={(event) => setPost({ ...post, status: event.target.value as Post["status"] })}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <EditorStatus status={status} saving={saving} />
        {originalSlug ? (
          <button type="button" className="rounded-lg border border-line px-4 py-2 text-sm" onClick={remove}>
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
