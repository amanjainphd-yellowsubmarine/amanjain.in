import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { EditablePage } from "@/components/content/EditablePage";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogContent />
    </Suspense>
  );
}

async function BlogContent() {
  await connection();
  const posts = getPublishedPosts();

  return (
    <EditablePage slug="blog">
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl border border-line bg-white p-6">
            <p className="text-xs text-muted">{post.publishedAt}</p>
            <h2 className="mt-2 text-xl font-medium">{post.title}</h2>
            <p className="mt-2 text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </EditablePage>
  );
}
