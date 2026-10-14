import { NextResponse } from "next/server";
import { getPosts, savePosts } from "@/lib/content";
import { cleanPost } from "@/lib/sanitize";

export async function PUT(request: Request) {
  const body = await request.json();
  const post = cleanPost(body);
  if (!post) {
    return NextResponse.json({ error: "Post data is incomplete." }, { status: 400 });
  }
  const originalSlug = String(body?.originalSlug ?? post.slug);
  const posts = getPosts().filter((item) => item.slug !== originalSlug && item.slug !== post.slug);
  posts.unshift(post);
  savePosts(posts);
  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  const posts = getPosts();
  const next = posts.filter((item) => item.slug !== slug);
  if (next.length === posts.length) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  savePosts(next);
  return NextResponse.json({ ok: true });
}
