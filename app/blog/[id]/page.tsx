import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import BlogPostDetail from "@/app/ui/BlogPostDetails";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { deletePostAction } from "./action";
import { validateId } from "@/app/lib/validate";

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = validateId(id);
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

  const deleteAction = deletePostAction.bind(null, postId);
  const session = await auth.api.getSession({ headers: await headers() });
  const canManagePost = !!session?.user && session.user.id === post.userId;

  return <BlogPostDetail post={post} canManagePost={canManagePost} deleteAction={deleteAction} />;
}
