/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UserID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,
    CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Key" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hashed_password" TEXT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("isAdmin", "username") SELECT "isAdmin", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_QuizResults" (
    "quizId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "QuizResults_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("quizId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuizResults_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuizResults" ("UserId", "quizId", "score") SELECT "UserId", "quizId", "score" FROM "QuizResults";
DROP TABLE "QuizResults";
ALTER TABLE "new_QuizResults" RENAME TO "QuizResults";
CREATE UNIQUE INDEX "QuizResults_quizId_UserId_key" ON "QuizResults"("quizId", "UserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");

-- CreateIndex
CREATE INDEX "Key_user_id_idx" ON "Key"("user_id");
