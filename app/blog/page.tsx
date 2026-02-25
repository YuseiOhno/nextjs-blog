import BlogPostCard from "../ui/BlogPostCard";
import prisma from "../lib/prisma";

export default async function BlogList() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
  } catch (e) {
    console.error("Database Error", e);
    throw new Error("読み込みに失敗しました。");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <p>投稿がありません。</p>
        ) : (
          posts.map((post) => <BlogPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
