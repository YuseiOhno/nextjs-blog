import { Post } from "@/app/lib/types/Post";
import BlogPostDetail from "@/app/ui/BlogPostDetails";

const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`${siteUrl}/api/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch post");
  }
  const data = await res.json();
  return data.post;
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>投稿が見つかりません</div>;
  }

  return <BlogPostDetail post={post} />;
}
