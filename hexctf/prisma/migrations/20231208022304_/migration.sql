/*
  Warnings:

  - A unique constraint covering the columns `[teamId,questionId]` on the table `DockerState` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DockerState_questionId_key";

-- DropIndex
DROP INDEX "DockerState_teamId_key";

-- CreateIndex
CREATE UNIQUE INDEX "DockerState_teamId_questionId_key" ON "DockerState"("teamId", "questionId");
