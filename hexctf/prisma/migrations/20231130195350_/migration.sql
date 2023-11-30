-- CreateTable
CREATE TABLE "DockerState" (
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
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "DockerState_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DockerState_imageName_key" ON "DockerState"("imageName");

-- CreateIndex
CREATE UNIQUE INDEX "DockerState_teamId_key" ON "DockerState"("teamId");
