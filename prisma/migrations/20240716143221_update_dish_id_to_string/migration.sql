-- CreateTable
CREATE TABLE "dishes" (
    "dishId" TEXT NOT NULL,
    "dishName" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isPublished" BOOLEAN DEFAULT false,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("dishId")
);

-- CreateIndex
CREATE UNIQUE INDEX "dishes_dishId_key" ON "dishes"("dishId");
