/*
  Warnings:

  - The primary key for the `Key` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Key" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Key" ("hashed_password", "id", "user_id") SELECT "hashed_password", "id", "user_id" FROM "Key";
DROP TABLE "Key";
ALTER TABLE "new_Key" RENAME TO "Key";
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");
CREATE INDEX "Key_user_id_idx" ON "Key"("user_id");
CREATE TABLE "new_QuizResults" (
    "quizId" INTEGER NOT NULL,
    "UserId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "QuizResults_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("quizId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuizResults_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuizResults" ("UserId", "quizId", "score") SELECT "UserId", "quizId", "score" FROM "QuizResults";
DROP TABLE "QuizResults";
ALTER TABLE "new_QuizResults" RENAME TO "QuizResults";
CREATE UNIQUE INDEX "QuizResults_quizId_UserId_key" ON "QuizResults"("quizId", "UserId");
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,
    CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("active_expires", "id", "idle_expires", "user_id") SELECT "active_expires", "id", "idle_expires", "user_id" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("id", "isAdmin", "username") SELECT "id", "isAdmin", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
