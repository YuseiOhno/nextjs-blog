import { z } from "zod";
import type { PostState } from "./types/Post";

/** idのバリデーション */
export const validateId = (id: string | number): number | null => {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) return null;
  return num;
};

// 投稿フォームのバリデーションスキーマ
const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  content: z
    .string()
    .trim()
    .min(1, "内容は必須です")
    .max(1000, "内容は1000文字以内で入力してください"),
});

/** 投稿フォームのバリデーション */
export const postFormValidate = (formData: FormData): PostState => {
  const values = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
  };
  const result = postFormSchema.safeParse(values);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.flatten().fieldErrors,
      values,
    };
  }
  return { ok: true, values };
};
