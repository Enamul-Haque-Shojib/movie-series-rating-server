-- CreateEnum
CREATE TYPE "PurchaseType" AS ENUM ('BUY', 'RENT');

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "type" "PurchaseType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
