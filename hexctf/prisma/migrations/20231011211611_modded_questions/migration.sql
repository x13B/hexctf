/*
  Warnings:

  - Added the required column `Difficuly` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "QuestionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Description" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "Difficuly" TEXT NOT NULL,
    CONSTRAINT "Questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("Answer", "Description", "QuestionId", "categoryId", "points") SELECT "Answer", "Description", "QuestionId", "categoryId", "points" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
