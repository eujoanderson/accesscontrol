/*
  Warnings:

  - You are about to drop the column `password` on the `Persons` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Card" TEXT NOT NULL,
    "Setor" TEXT NOT NULL
);
INSERT INTO "new_Persons" ("Card", "Setor", "id") SELECT "Card", "Setor", "id" FROM "Persons";
DROP TABLE "Persons";
ALTER TABLE "new_Persons" RENAME TO "Persons";
CREATE UNIQUE INDEX "Persons_Card_key" ON "Persons"("Card");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
