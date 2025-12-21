-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN "carouselOrder" INTEGER;

-- Update existing vehicles with carousel order
-- This is optional and can be run manually after migration
-- UPDATE "vehicles" SET "carouselOrder" = 1 WHERE "model" = 'ALPHARD';
-- UPDATE "vehicles" SET "carouselOrder" = 2 WHERE "model" = 'NOAH';
-- UPDATE "vehicles" SET "carouselOrder" = 3 WHERE "model" = 'HIACE';

