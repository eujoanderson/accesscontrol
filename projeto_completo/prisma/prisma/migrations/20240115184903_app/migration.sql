/*
  Warnings:

  - You are about to drop the column `card` on the `Persons` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "setor" TEXT NOT NULL
);
INSERT INTO "new_Persons" ("id", "name", "setor") SELECT "id", "name", "setor" FROM "Persons";
DROP TABLE "Persons";
ALTER TABLE "new_Persons" RENAME TO "Persons";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
