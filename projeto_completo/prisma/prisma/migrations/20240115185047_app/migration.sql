/*
  Warnings:

  - Added the required column `card` to the `Persons` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "card" TEXT NOT NULL,
    "setor" TEXT NOT NULL
);
INSERT INTO "new_Persons" ("id", "name", "setor") SELECT "id", "name", "setor" FROM "Persons";
DROP TABLE "Persons";
ALTER TABLE "new_Persons" RENAME TO "Persons";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
