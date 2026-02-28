"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateId } from "@/app/lib/validate";
import { requirePostOwner } from "@/app/lib/auth/guards";

export async function deletePostAction(id: number): Promise<void> {
  const postId = validateId(id);
  if (!postId) throw new Error("不正なIDです");

  await requirePostOwner(postId);

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/blog");
  redirect(`/blog`);
}
