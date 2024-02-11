/*
  Warnings:

  - You are about to drop the column `Card` on the `Persons` table. All the data in the column will be lost.
  - You are about to drop the column `Setor` on the `Persons` table. All the data in the column will be lost.
  - Added the required column `card` to the `Persons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setor` to the `Persons` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "card" TEXT NOT NULL,
    "setor" TEXT NOT NULL
);
INSERT INTO "new_Persons" ("id", "name") SELECT "id", "name" FROM "Persons";
DROP TABLE "Persons";
ALTER TABLE "new_Persons" RENAME TO "Persons";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
