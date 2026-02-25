import { Post } from "../lib/types/Post";
import Link from "next/link";

type Props = {
  post: Post;
  canManagePost: boolean;
  deleteAction: () => Promise<void>;
};

export default function BlogPostDetail({ post, canManagePost, deleteAction }: Props) {
  return (
    <article className="max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl pb-4 mb-2 text-gray-800 border-b border-gray-900/10">
          {post.title}
        </h1>
        <div className="mb-2"> {post.user.name}</div>
        <div className="flex justify-between items-center mb-5">
          <div className="text-gray-600 flex gap-3 text-sm">
            {post.updatedAt > post.createdAt && (
              <time dateTime={post.updatedAt.toISOString()}>
                最終更新日 {post.updatedAt.toLocaleDateString("ja-JP")}
              </time>
            )}
            <time dateTime={post.createdAt.toISOString()}>
              投稿日 {post.createdAt.toLocaleDateString("ja-JP")}
            </time>
          </div>
          {canManagePost && (
            <div className=" flex gap-3 text-sm">
              <Link
                href={`/blog/${post.id}/edit`}
                className="hover:bg-gray-200 border px-5 py-1 rounded-3xl"
              >
                編集
              </Link>
              <form action={deleteAction}>
                <button className="bg-red-500 hover:bg-red-600 border border-red-500 text-white px-5 py-1 rounded-3xl">
                  削除
                </button>
              </form>
            </div>
          )}
        </div>
      </header>
      <div className="prose lg:prose-xl">
        {post.content.split("\n").map(
          (paragraph, index) =>
            paragraph.trim() && (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ),
        )}
      </div>
    </article>
  );
}
