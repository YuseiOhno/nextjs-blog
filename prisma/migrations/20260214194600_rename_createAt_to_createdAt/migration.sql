-- Rename column createAt -> createdAt without dropping existing data
ALTER TABLE "Post"
RENAME COLUMN "createAt" TO "createdAt";
