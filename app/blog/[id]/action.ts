"use server";

import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

const validatedId = (id: unknown): number | null => {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) return null;
  return num;
};

export async function deletePostAction(id: number): Promise<void> {
  const postId = validatedId(id);
  if (!postId) throw new Error("不正なIDです");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect(`/login?callback=/blog/${postId}/edit`);
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) notFound();

  if (session.user.id !== post.userId) {
    redirect("/blog");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/blog");
  redirect(`/blog`);
}
