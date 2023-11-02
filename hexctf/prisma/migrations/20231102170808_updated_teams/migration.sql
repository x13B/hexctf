-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teams" (
    "teamId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Teams" ("points", "teamId", "teamName") SELECT "points", "teamId", "teamName" FROM "Teams";
DROP TABLE "Teams";
ALTER TABLE "new_Teams" RENAME TO "Teams";
CREATE UNIQUE INDEX "Teams_teamName_key" ON "Teams"("teamName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
