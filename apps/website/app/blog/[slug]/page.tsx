import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Container } from "@/components/layout/Container";
import { getPost, getPublishedPosts } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post?.title ?? "Post" };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense fallback={<Container className="py-16">{null}</Container>}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  await connection();
  const { slug } = await params;
  const post = getPost(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <Container className="py-16">
      <p className="text-sm text-muted">{post.publishedAt}</p>
      <h1 className="mt-2 text-4xl font-semibold">{post.title}</h1>
      <p className="mt-6 max-w-2xl whitespace-pre-wrap text-lg text-muted">{post.body}</p>
    </Container>
  );
}
