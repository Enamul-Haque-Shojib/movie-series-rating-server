/*
  Warnings:

  - The values [SUPER_ADMIN,DOCTOR,PATIENT] on the enum `AuthRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthRole_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "Auth" ALTER COLUMN "role" TYPE "AuthRole_new" USING ("role"::text::"AuthRole_new");
ALTER TYPE "AuthRole" RENAME TO "AuthRole_old";
ALTER TYPE "AuthRole_new" RENAME TO "AuthRole";
DROP TYPE "AuthRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "role" SET DEFAULT 'USER';
