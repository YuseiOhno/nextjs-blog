"use client";

type props = {
  action: (formData: FormData) => Promise<void>;
  formLabel: string;
};

export default function BlogPostForm({ action, formLabel }: props) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl mb-6">{formLabel}</h1>
      <form action={action} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50"
        >
          投稿
        </button>
      </form>
    </div>
  );
}
