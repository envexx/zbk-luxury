-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('AIRPORT_TRANSFER', 'TRIP', 'RENTAL');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "serviceType" "ServiceType" NOT NULL DEFAULT 'RENTAL';

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "priceTrip" DOUBLE PRECISION;
