/** idのバリデーション */
export const validateId = (id: string | number): number | null => {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) return null;
  return num;
};
