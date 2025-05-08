/*
  Warnings:

  - You are about to drop the column `Synopsis` on the `media` table. All the data in the column will be lost.
  - Added the required column `synopsis` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "Synopsis",
ADD COLUMN     "synopsis" TEXT NOT NULL;
