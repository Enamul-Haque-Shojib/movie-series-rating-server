/*
  Warnings:

  - You are about to drop the column `Cast` on the `media` table. All the data in the column will be lost.
  - You are about to drop the `StreamingLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `streamingLinks` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streamingPlatform` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StreamingLink" DROP CONSTRAINT "StreamingLink_mediaId_fkey";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "Cast",
ADD COLUMN     "streamingLinks" TEXT NOT NULL,
ADD COLUMN     "streamingPlatform" TEXT NOT NULL;

-- DropTable
DROP TABLE "StreamingLink";
