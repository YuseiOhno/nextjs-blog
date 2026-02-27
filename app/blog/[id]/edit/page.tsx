import prisma from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import BlogPostForm from "@/app/ui/BlogPostForm";
import { validateId } from "@/app/lib/validate";

type props = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: props) {
  const { id } = await params;
  const postId = validateId(id);
  if (!postId) notFound();

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

  return (
    <div>
      {/* <div>{JSON.stringify(post)}</div> */}
      <BlogPostForm mode={"edit"} post={post} />
    </div>
  );
}
