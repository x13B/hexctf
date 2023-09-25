-- CreateTable
CREATE TABLE "User" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Teams" (
    "TeamId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TeamName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "TeamId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Leaderboard_TeamId_fkey" FOREIGN KEY ("TeamId") REFERENCES "Teams" ("TeamId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "CategoryId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CategoryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Questions" (
    "QuestionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Description" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnswerQuestions" (
    "AnswerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "QuestionId" INTEGER NOT NULL,
    "TeamId" INTEGER NOT NULL,
    CONSTRAINT "AnswerQuestions_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Questions" ("QuestionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnswerQuestions_TeamId_fkey" FOREIGN KEY ("TeamId") REFERENCES "Teams" ("TeamId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quiz" (
    "quizId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "QuizResults" (
    "quizId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "QuizResults_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("quizId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuizResults_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_TeamName_key" ON "Teams"("TeamName");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_CategoryName_key" ON "Categories"("CategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_quizName_key" ON "Quiz"("quizName");

-- CreateIndex
CREATE UNIQUE INDEX "QuizResults_quizId_UserId_key" ON "QuizResults"("quizId", "UserId");
