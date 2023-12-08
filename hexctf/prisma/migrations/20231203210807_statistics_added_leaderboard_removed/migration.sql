/*
  Warnings:

  - You are about to drop the `Leaderboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Leaderboard";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnswerQuestions" (
    "questionId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnswerQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("questionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnswerQuestions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AnswerQuestions" ("questionId", "teamId") SELECT "questionId", "teamId" FROM "AnswerQuestions";
DROP TABLE "AnswerQuestions";
ALTER TABLE "new_AnswerQuestions" RENAME TO "AnswerQuestions";
CREATE UNIQUE INDEX "AnswerQuestions_questionId_teamId_key" ON "AnswerQuestions"("questionId", "teamId");
CREATE TABLE "new_AssignedQuestions" (
    "questionId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AssignedQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("questionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssignedQuestions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AssignedQuestions" ("questionId", "teamId") SELECT "questionId", "teamId" FROM "AssignedQuestions";
DROP TABLE "AssignedQuestions";
ALTER TABLE "new_AssignedQuestions" RENAME TO "AssignedQuestions";
CREATE UNIQUE INDEX "AssignedQuestions_teamId_questionId_key" ON "AssignedQuestions"("teamId", "questionId");
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
    "forfeits" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("answer", "categoryId", "description", "difficulty", "hint", "hint2", "hint3", "points", "questionId", "title") SELECT "answer", "categoryId", "description", "difficulty", "hint", "hint2", "hint3", "points", "questionId", "title" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
