/*
  Warnings:

  - A unique constraint covering the columns `[userId,mediaId,isDeleted]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "review_userId_mediaId_key";

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_mediaId_isDeleted_key" ON "review"("userId", "mediaId", "isDeleted");
