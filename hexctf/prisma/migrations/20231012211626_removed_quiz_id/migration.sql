/*
  Warnings:

  - You are about to drop the column `quizId` on the `QuizQuestions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuizQuestions" (
    "quizQuestionsId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionBody" TEXT NOT NULL,
    "questionAnswer" TEXT NOT NULL,
    "Category" TEXT NOT NULL
);
INSERT INTO "new_QuizQuestions" ("Category", "questionAnswer", "questionBody", "quizQuestionsId") SELECT "Category", "questionAnswer", "questionBody", "quizQuestionsId" FROM "QuizQuestions";
DROP TABLE "QuizQuestions";
ALTER TABLE "new_QuizQuestions" RENAME TO "QuizQuestions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
