-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "balanceDue" DECIMAL(10,2),
ADD COLUMN     "balancePaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPreOrder" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPreOrder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preOrderShipDate" TIMESTAMP(3);
