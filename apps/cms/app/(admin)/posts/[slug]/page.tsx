import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PostEditor } from "@/components/posts/PostEditor";
import { Topbar } from "@/components/layout/Topbar";
import { getPost } from "@/lib/content";

type EditPostProps = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: "Edit post" };

export default function EditPostPage({ params }: EditPostProps) {
  return (
    <Suspense fallback={null}>
      <EditPostContent params={params} />
    </Suspense>
  );
}

async function EditPostContent({ params }: EditPostProps) {
  await connection();
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Topbar title={post.title} />
      <PostEditor initialPost={post} originalSlug={post.slug} />
    </>
  );
}
