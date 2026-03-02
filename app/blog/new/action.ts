"use server";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/app/lib/auth/guards";
import { postFormValidate } from "@/app/lib/validate";
import type { PostState } from "@/app/lib/types/Post";

export async function createPostAction(
  _prevState: PostState,
  formData: FormData,
): Promise<PostState> {
  const session = await requireSession("/login?callback=/blog/new");

  const result = postFormValidate(formData);
  if (!result.ok) {
    return result;
  }

  await prisma.post.create({
    data: {
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? "").trim(),
      userId: session.user.id,
    },
  });

  revalidatePath("/blog");
  redirect("/blog");
}
