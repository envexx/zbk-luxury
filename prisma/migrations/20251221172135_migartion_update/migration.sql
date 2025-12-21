/*
  Warnings:

  - You are about to drop the column `image` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "category";

-- DropEnum
DROP TYPE "VehicleCategory";
