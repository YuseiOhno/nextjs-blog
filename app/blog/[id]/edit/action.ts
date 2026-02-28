"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateId } from "@/app/lib/validate";
import { requirePostOwner } from "@/app/lib/auth/guards";

export async function updatePostAction(id: number, formData: FormData) {
  const postId = validateId(id);
  if (!postId) throw new Error("不正なIDです");

  await requirePostOwner(postId);

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
