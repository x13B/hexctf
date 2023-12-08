-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DockerState" (
    "imageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageName" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "imageSHA" TEXT,
    "imageIsUnique" BOOLEAN NOT NULL DEFAULT false,
    "imageIsBuilt" BOOLEAN NOT NULL DEFAULT false,
    "containerSHA" TEXT,
    "containerStatus" TEXT,
    "containerPort" INTEGER,
    "containerIp" TEXT,
    "teamId" INTEGER,
    CONSTRAINT "DockerState_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DockerState" ("containerIp", "containerPort", "containerSHA", "containerStatus", "imageId", "imageIsBuilt", "imageIsUnique", "imageName", "imagePath", "imageSHA", "teamId") SELECT "containerIp", "containerPort", "containerSHA", "containerStatus", "imageId", "imageIsBuilt", "imageIsUnique", "imageName", "imagePath", "imageSHA", "teamId" FROM "DockerState";
DROP TABLE "DockerState";
ALTER TABLE "new_DockerState" RENAME TO "DockerState";
CREATE UNIQUE INDEX "DockerState_imageName_key" ON "DockerState"("imageName");
CREATE UNIQUE INDEX "DockerState_teamId_key" ON "DockerState"("teamId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
