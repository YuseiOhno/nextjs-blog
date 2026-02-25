import prisma from "@/app/lib/prisma";
import BlogPostDetail from "@/app/ui/BlogPostDetails";
import { notFound } from "next/navigation";

const validatedId = (id: string): number | null => {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) return null;
  return num;
};

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = validatedId(id);
  if (!postId) notFound();

  let post;
  try {
    post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
  } catch (e) {
    console.error("Database Error", e);
    throw new Error("投稿の取得に失敗しました。");
  }

  if (!post) notFound();
  return <BlogPostDetail post={post} />;
}
