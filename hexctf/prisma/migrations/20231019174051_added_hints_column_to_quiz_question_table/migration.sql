/*
  Warnings:

  - Added the required column `hint` to the `QuizQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuizQuestions" (
    "quizQuestionsId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionBody" TEXT NOT NULL,
    "questionAnswer" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "questionValue" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_QuizQuestions" ("category", "questionAnswer", "questionBody", "questionValue", "quizQuestionsId") SELECT "category", "questionAnswer", "questionBody", "questionValue", "quizQuestionsId" FROM "QuizQuestions";
DROP TABLE "QuizQuestions";
ALTER TABLE "new_QuizQuestions" RENAME TO "QuizQuestions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
