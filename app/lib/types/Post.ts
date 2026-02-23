/** 投稿 */
export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
  };
};

/** 投稿作成時の入力 */
export type PostCreateInput = {
  title: string;
  content: string;
};
