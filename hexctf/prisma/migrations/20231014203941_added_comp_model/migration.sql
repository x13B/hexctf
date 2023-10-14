/*
  Warnings:

  - Added the required column `points` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TeamMembers" (
    "teamId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TeamMembers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Competition" (
    "competitionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "competitionName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teams" (
    "teamId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL,
    "points" INTEGER NOT NULL
);
INSERT INTO "new_Teams" ("teamId", "teamName") SELECT "teamId", "teamName" FROM "Teams";
DROP TABLE "Teams";
ALTER TABLE "new_Teams" RENAME TO "Teams";
CREATE UNIQUE INDEX "Teams_teamName_key" ON "Teams"("teamName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "TeamMembers_userId_key" ON "TeamMembers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMembers_teamId_userId_key" ON "TeamMembers"("teamId", "userId");
