"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateId } from "@/app/lib/validate";
import { requirePostOwner } from "@/app/lib/auth/guards";
import { postFormValidate } from "@/app/lib/validate";
import type { PostState } from "@/app/lib/types/Post";

export async function updatePostAction(
  id: number,
  _prevState: PostState,
  formData: FormData,
): Promise<PostState> {
  const postId = validateId(id);
  if (!postId) throw new Error("不正なIDです");

  await requirePostOwner(postId);

  const result = postFormValidate(formData);
  if (!result.ok) {
    return result;
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? "").trim(),
    },
  });

  revalidatePath(`/blog/${postId}`);
  revalidatePath("/blog");
  redirect(`/blog/${postId}`);
}
