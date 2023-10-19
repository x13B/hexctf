-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "competitionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "competitionName" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL
);
INSERT INTO "new_Competition" ("competitionId", "competitionName", "endDate", "startDate") SELECT "competitionId", "competitionName", "endDate", "startDate" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
