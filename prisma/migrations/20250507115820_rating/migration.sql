/*
  Warnings:

  - The `rating` column on the `media` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `rating` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "rating" INTEGER NOT NULL;
