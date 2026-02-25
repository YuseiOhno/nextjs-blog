import { Post } from "../lib/types/Post";

type Props = {
  post: Post;
};

export default function BlogPostDetail({ post }: Props) {
  return (
    <article className="max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl pb-4 mb-2 text-gray-800 border-b border-gray-900/10">
          {post.title}
        </h1>
        <div className="mb-2"> {post.user.name}</div>
        <div className="text-gray-600 mb-4 flex items-center gap-3 text-sm">
          {post.updatedAt > post.createdAt && (
            <time dateTime={post.updatedAt.toISOString()}>
              最終更新日 {post.updatedAt.toLocaleDateString("ja-JP")}
            </time>
          )}
          <time dateTime={post.createdAt.toISOString()}>
            投稿日 {post.createdAt.toLocaleDateString("ja-JP")}
          </time>
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
