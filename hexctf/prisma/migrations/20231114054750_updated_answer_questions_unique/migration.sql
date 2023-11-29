/*
  Warnings:

  - The primary key for the `AnswerQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answerId` on the `AnswerQuestions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnswerQuestions" (
    "questionId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "AnswerQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("questionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnswerQuestions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AnswerQuestions" ("questionId", "teamId") SELECT "questionId", "teamId" FROM "AnswerQuestions";
DROP TABLE "AnswerQuestions";
ALTER TABLE "new_AnswerQuestions" RENAME TO "AnswerQuestions";
CREATE UNIQUE INDEX "AnswerQuestions_questionId_teamId_key" ON "AnswerQuestions"("questionId", "teamId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
