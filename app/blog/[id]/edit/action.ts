"use server";

import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { validateId } from "@/app/lib/validate";

export async function updatePostAction(id: number, formData: FormData) {
  const postId = validateId(id);
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

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) {
    throw new Error("タイトルと内容の入力は必須です。");
  }

  await prisma.post.update({
    where: { id: postId },
    data: { title, content },
  });

  revalidatePath(`/blog/${postId}`);
  revalidatePath("/blog");
  redirect(`/blog/${postId}`);
}
