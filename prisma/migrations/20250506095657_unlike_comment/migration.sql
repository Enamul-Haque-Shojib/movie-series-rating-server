/*
  Warnings:

  - A unique constraint covering the columns `[userId,mediaId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,mediaId]` on the table `Unlike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_userId_mediaId_key" ON "Comment"("userId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Unlike_userId_mediaId_key" ON "Unlike"("userId", "mediaId");

-- AddForeignKey
ALTER TABLE "Unlike" ADD CONSTRAINT "Unlike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
