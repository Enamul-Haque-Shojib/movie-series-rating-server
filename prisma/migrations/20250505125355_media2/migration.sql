/*
  Warnings:

  - Added the required column `buy_price` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent_price` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "buy_price" TEXT NOT NULL,
ADD COLUMN     "rent_price" TEXT NOT NULL;
