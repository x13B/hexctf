-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuizResults" (
    "quizId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "QuizResults_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("quizId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuizResults_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuizResults" ("UserId", "quizId", "score") SELECT "UserId", "quizId", "score" FROM "QuizResults";
DROP TABLE "QuizResults";
ALTER TABLE "new_QuizResults" RENAME TO "QuizResults";
CREATE UNIQUE INDEX "QuizResults_quizId_UserId_key" ON "QuizResults"("quizId", "UserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
