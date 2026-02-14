import { Post } from "@/app/lib/types/Post";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        {post.author} - {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl">{post.content}</div>
    </div>
  );
}
