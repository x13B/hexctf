-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "questionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "hint2" TEXT NOT NULL DEFAULT '',
    "hint3" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "isDocker" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("answer", "categoryId", "description", "difficulty", "hint", "hint2", "hint3", "points", "questionId", "title") SELECT "answer", "categoryId", "description", "difficulty", "hint", "hint2", "hint3", "points", "questionId", "title" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
