/*
  Warnings:

  - You are about to drop the column `imageIsUnique` on the `DockerState` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DockerState" (
    "imageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageName" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "imageSHA" TEXT,
    "imageIsBaseContainer" BOOLEAN NOT NULL DEFAULT true,
    "imageIsBuilt" BOOLEAN NOT NULL DEFAULT false,
    "containerSHA" TEXT,
    "containerStatus" TEXT,
    "containerPort" INTEGER,
    "containerIp" TEXT,
    "teamId" INTEGER,
    "questionId" INTEGER,
    CONSTRAINT "DockerState_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DockerState_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("questionId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DockerState" ("containerIp", "containerPort", "containerSHA", "containerStatus", "imageId", "imageIsBuilt", "imageName", "imagePath", "imageSHA", "questionId", "teamId") SELECT "containerIp", "containerPort", "containerSHA", "containerStatus", "imageId", "imageIsBuilt", "imageName", "imagePath", "imageSHA", "questionId", "teamId" FROM "DockerState";
DROP TABLE "DockerState";
ALTER TABLE "new_DockerState" RENAME TO "DockerState";
CREATE UNIQUE INDEX "DockerState_imageName_key" ON "DockerState"("imageName");
CREATE UNIQUE INDEX "DockerState_teamId_key" ON "DockerState"("teamId");
CREATE UNIQUE INDEX "DockerState_questionId_key" ON "DockerState"("questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
