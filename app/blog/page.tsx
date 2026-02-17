import { Post } from "@/app/lib/types/Post";
import BlogPostCard from "../ui/BlogPostCard";

const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${siteUrl}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data.posts;
}

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
