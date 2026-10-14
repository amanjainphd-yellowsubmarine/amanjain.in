import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Topbar } from "@/components/layout/Topbar";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Posts" };

export default function PostsAdminPage() {
  return (
    <Suspense fallback={null}>
      <PostsAdmin />
    </Suspense>
  );
}

async function PostsAdmin() {
  await connection();
  const posts = getPosts();

  return (
    <>
      <Topbar title="Posts" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Link href="/posts/new" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
            New post
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug} className="border-t border-line">
                  <td className="px-4 py-3">
                    <Link href={`/posts/${post.slug}`} className="font-medium text-accent">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{post.status}</td>
                  <td className="px-4 py-3">{post.publishedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
