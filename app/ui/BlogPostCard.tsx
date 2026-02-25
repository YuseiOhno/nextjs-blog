import Link from "next/link";
import { Post } from "@/app/lib/types/Post";

type Props = {
  post: Post;
};

export default function BlogPostCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.id}`} className="block hover:no-underline">
      <article className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
        <div className="p-6">
          <h2 className="text-lg pb-2 mb-2 text-gray-800 border-b border-gray-900/10">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{post.user.name}</span>
            <span>{post.createdAt.toLocaleDateString("ja-JP")}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
