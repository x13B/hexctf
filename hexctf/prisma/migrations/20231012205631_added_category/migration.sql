/*
  Warnings:

  - Added the required column `Category` to the `QuizQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuizQuestions" (
    "quizQuestionsId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "questionBody" TEXT NOT NULL,
    "questionAnswer" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    CONSTRAINT "QuizQuestions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("quizId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuizQuestions" ("questionAnswer", "questionBody", "quizId", "quizQuestionsId") SELECT "questionAnswer", "questionBody", "quizId", "quizQuestionsId" FROM "QuizQuestions";
DROP TABLE "QuizQuestions";
ALTER TABLE "new_QuizQuestions" RENAME TO "QuizQuestions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
