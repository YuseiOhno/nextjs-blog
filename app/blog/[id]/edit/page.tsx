import { notFound } from "next/navigation";
import BlogPostForm from "@/app/ui/BlogPostForm";
import { validateId } from "@/app/lib/validate";
import { requirePostOwner } from "@/app/lib/auth/guards";

type props = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: props) {
  const { id } = await params;
  const postId = validateId(id);
  if (!postId) notFound();

  const post = await requirePostOwner(postId);

  return (
    <div>
      <BlogPostForm mode={"edit"} post={post} />
    </div>
  );
}
