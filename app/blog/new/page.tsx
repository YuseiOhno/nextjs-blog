import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import BlogPostForm from "../../ui/BlogPostForm";
import { createPostAction } from "./action";

export default async function NewPostPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login?callback=/blog/new");
  }

  return <BlogPostForm action={createPostAction} formLabel={"新規投稿作成"} />;
}
