import { Post } from "../lib/types/Post";

type Props = {
  post: Post;
};

export default function BlogPostDetail({ post }: Props) {
  const createdDate = new Date(post.createdAt);
  const updatedDate = new Date(post.updatedAt);

  return (
    <article className="max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl pb-4 mb-4 text-gray-800 border-b border-gray-900/10">
          {post.title}
        </h1>
        <div className="text-gray-600 mb-4">
          <time dateTime={post.createdAt}>{createdDate.toLocaleDateString()}</time>
          {post.updatedAt && updatedDate > createdDate && (
            <span>
              {" "}
              • Updated:
              <time dateTime={post.updatedAt}>{updatedDate.toLocaleDateString()}</time>
            </span>
          )}
          <span> ・ {post.user.name}</span>
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
