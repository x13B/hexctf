-- CreateTable
CREATE TABLE "AssignedQuestions" (
    "questionId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "AssignedQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("questionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssignedQuestions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("teamId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignedQuestions_questionId_key" ON "AssignedQuestions"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignedQuestions_teamId_key" ON "AssignedQuestions"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignedQuestions_teamId_questionId_key" ON "AssignedQuestions"("teamId", "questionId");
