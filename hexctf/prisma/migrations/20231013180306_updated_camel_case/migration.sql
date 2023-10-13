/*
  Warnings:

  - The primary key for the `Categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CategoryId` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `CategoryName` on the `Categories` table. All the data in the column will be lost.
  - The primary key for the `AnswerQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AnswerId` on the `AnswerQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `QuestionId` on the `AnswerQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `TeamId` on the `AnswerQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `Category` on the `QuizQuestions` table. All the data in the column will be lost.
  - The primary key for the `Questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Answer` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `Difficuly` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `QuestionId` on the `Questions` table. All the data in the column will be lost.
  - The primary key for the `Leaderboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TeamId` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `QuizResults` table. All the data in the column will be lost.
  - The primary key for the `Teams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TeamId` on the `Teams` table. All the data in the column will be lost.
  - You are about to drop the column `TeamName` on the `Teams` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answerId` to the `AnswerQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `AnswerQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `AnswerQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `QuizQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficuly` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `QuizResults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categories" (
    "categoryId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryName" TEXT NOT NULL
);
DROP TABLE "Categories";
ALTER TABLE "new_Categories" RENAME TO "Categories";
CREATE UNIQUE INDEX "Categories_categoryName_key" ON "Categories"("categoryName");
CREATE TABLE "new_AnswerQuestions" (
    "answerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "AnswerQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("questionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnswerQuestions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "AnswerQuestions";
ALTER TABLE "new_AnswerQuestions" RENAME TO "AnswerQuestions";
CREATE TABLE "new_QuizQuestions" (
    "quizQuestionsId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionBody" TEXT NOT NULL,
    "questionAnswer" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_QuizQuestions" ("questionAnswer", "questionBody", "quizQuestionsId") SELECT "questionAnswer", "questionBody", "quizQuestionsId" FROM "QuizQuestions";
DROP TABLE "QuizQuestions";
ALTER TABLE "new_QuizQuestions" RENAME TO "QuizQuestions";
CREATE TABLE "new_Questions" (
    "questionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "difficuly" TEXT NOT NULL,
    CONSTRAINT "Questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("categoryId", "points") SELECT "categoryId", "points" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
CREATE TABLE "new_Leaderboard" (
    "teamId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Leaderboard_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Leaderboard";
ALTER TABLE "new_Leaderboard" RENAME TO "Leaderboard";
CREATE TABLE "new_QuizResults" (
    "quizId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "QuizResults_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("quizId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuizResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuizResults" ("quizId", "score") SELECT "quizId", "score" FROM "QuizResults";
DROP TABLE "QuizResults";
ALTER TABLE "new_QuizResults" RENAME TO "QuizResults";
CREATE UNIQUE INDEX "QuizResults_quizId_userId_key" ON "QuizResults"("quizId", "userId");
CREATE TABLE "new_Teams" (
    "teamId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL
);
DROP TABLE "Teams";
ALTER TABLE "new_Teams" RENAME TO "Teams";
CREATE UNIQUE INDEX "Teams_teamName_key" ON "Teams"("teamName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
