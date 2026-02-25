"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login?callback=/blog/new");
  }

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) {
    throw new Error("タイトルと内容の入力は必須です。");
  }

  await prisma.post.create({
    data: { title, content, userId: session.user.id },
  });

  revalidatePath("/blog");
  redirect("/blog");
}
