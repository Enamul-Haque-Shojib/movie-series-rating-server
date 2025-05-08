/*
  Warnings:

  - You are about to drop the column `reviewId` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `unlike` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "unlike" DROP CONSTRAINT "unlike_reviewId_fkey";

-- AlterTable
ALTER TABLE "like" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "unlike" DROP COLUMN "reviewId";

-- CreateTable
CREATE TABLE "review_like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "review_like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "review_like_userId_reviewId_key" ON "review_like"("userId", "reviewId");

-- AddForeignKey
ALTER TABLE "review_like" ADD CONSTRAINT "review_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_like" ADD CONSTRAINT "review_like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
