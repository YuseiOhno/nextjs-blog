import BlogPostForm from "../../ui/BlogPostForm";
import { createPostAction } from "./action";
import { requireSession } from "@/app/lib/auth/guards";

export default async function NewPostPage() {
  await requireSession("/login?callback=/blog/new");

  return <BlogPostForm mode={"create"} action={createPostAction} />;
}
