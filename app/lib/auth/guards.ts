import { headers } from "next/headers";
import { auth } from "./server";
import { notFound, redirect } from "next/navigation";
import prisma from "../prisma";

/** ログインチェック*/
export const requireSession = async (callback: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect(callback);
  }
  return session;
};

/** ログイン＆投稿ユーザーチェック*/
export const requirePostOwner = async (postId: number) => {
  const session = await requireSession(`/login?callback=/blog/${postId}/edit`);
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) notFound();
  if (session.user.id !== post.userId) {
    redirect("/blog");
  }
  return post;
};
