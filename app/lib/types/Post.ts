/** 投稿 */
export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
  };
};

/** 投稿作成時の入力 */
export type PostCreateInput = {
  title: string;
  content: string;
};

/** 投稿編集時の入力 */
export type PostEditInput = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
