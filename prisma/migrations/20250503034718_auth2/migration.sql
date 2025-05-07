-- CreateEnum
CREATE TYPE "AuthStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "status" "AuthStatus" NOT NULL DEFAULT 'ACTIVE';
