"use client";

import { PostEditInput } from "../lib/types/Post";
import { updatePostAction } from "../blog/[id]/edit/action";
import { useActionState, useState } from "react";
import type { PostState } from "@/app/lib/types/Post";

type CreateProps = {
  mode: "create";
  action: (_prevState: PostState, formData: FormData) => Promise<PostState>;
  post?: never;
};

type EditProps = {
  mode: "edit";
  post: PostEditInput;
  action?: never;
};

type Props = CreateProps | EditProps;

export default function BlogPostForm(props: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const action = props.mode === "edit" ? updatePostAction.bind(null, props.post.id) : props.action;
  const [state, formAction] = useActionState(action, { ok: true });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl mb-6">{props.mode == "create" ? "新規投稿作成" : "編集"}</h1>
      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください(100字)"
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue={state.values?.title ?? (props.mode === "edit" ? props.post.title : "")}
          />
          <div className="flex item-center justify-between text-sm">
            <p className="text-red-600">{state.errors?.title?.[0] ?? ""}</p>
            <p>{100 - title.length}文字</p>
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="内容を入力してください(1000字)"
            maxLength={1000}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={5}
            defaultValue={
              state.values?.content ?? (props.mode === "edit" ? props.post.content : "")
            }
          ></textarea>
          <div className="flex item-center justify-between text-sm">
            <p className="text-red-600 ">{state.errors?.content?.[0] ?? ""}</p>
            <p>{1000 - content.length}文字</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50"
        >
          {props.mode == "create" ? "投稿する" : "更新する"}
        </button>
      </form>
    </div>
  );
}
