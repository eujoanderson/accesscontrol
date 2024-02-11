-- CreateTable
CREATE TABLE "Persons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Card" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Setor" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Persons_Card_key" ON "Persons"("Card");
