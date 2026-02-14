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
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-4">
          <span>By {post.author}</span>・
          <time dateTime={post.createdAt}>{createdDate.toLocaleDateString()}</time>
          {post.updatedAt && updatedDate > createdDate && (
            <span>
              {" "}
              • Updated:
              <time dateTime={post.updatedAt}>{updatedDate.toLocaleDateString()}</time>
            </span>
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
