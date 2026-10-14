import type { Metadata } from "next";
import { PostEditor } from "@/components/posts/PostEditor";
import { Topbar } from "@/components/layout/Topbar";

export const metadata: Metadata = { title: "New post" };

export default function NewPostPage() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Topbar title="New post" />
      <PostEditor
        initialPost={{
          slug: "",
          title: "",
          excerpt: "",
          body: "",
          status: "draft",
          publishedAt: today,
        }}
      />
    </>
  );
}
