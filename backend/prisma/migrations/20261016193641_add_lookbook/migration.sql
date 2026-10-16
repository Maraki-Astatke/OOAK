-- CreateTable
CREATE TABLE "Lookbook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lookbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LookbookHotspot" (
    "id" TEXT NOT NULL,
    "lookbookId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LookbookHotspot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LookbookHotspot_lookbookId_idx" ON "LookbookHotspot"("lookbookId");

-- AddForeignKey
ALTER TABLE "LookbookHotspot" ADD CONSTRAINT "LookbookHotspot_lookbookId_fkey" FOREIGN KEY ("lookbookId") REFERENCES "Lookbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LookbookHotspot" ADD CONSTRAINT "LookbookHotspot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
