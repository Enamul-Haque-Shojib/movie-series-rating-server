/*
  Warnings:

  - Added the required column `password` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "password" TEXT NOT NULL;
