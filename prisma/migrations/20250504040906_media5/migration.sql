/*
  Warnings:

  - Added the required column `image` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "image" TEXT NOT NULL;
