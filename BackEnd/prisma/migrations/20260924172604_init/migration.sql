/*
  Warnings:

  - You are about to drop the column `status` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `pointValueUsd` on the `Instrument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Broker" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Instrument" DROP COLUMN "pointValueUsd";

-- CreateIndex
CREATE INDEX "index_trader_broker" ON "Trader"("brokerId");
