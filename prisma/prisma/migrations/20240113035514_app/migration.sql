/*
  Warnings:

  - You are about to alter the column `Card` on the `Persons` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "Card" INTEGER NOT NULL,
    "Setor" TEXT NOT NULL
);
INSERT INTO "new_Persons" ("Card", "Setor", "id", "name") SELECT "Card", "Setor", "id", "name" FROM "Persons";
DROP TABLE "Persons";
ALTER TABLE "new_Persons" RENAME TO "Persons";
CREATE UNIQUE INDEX "Persons_Card_key" ON "Persons"("Card");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
