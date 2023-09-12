-- CreateTable
CREATE TABLE "User" (
    "userID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "headAdmin" BOOLEAN NOT NULL,
    CONSTRAINT "Admin_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teams" (
    "teamID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL,
    "competitionID" INTEGER
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "teamID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "boardPosition" INTEGER NOT NULL,
    CONSTRAINT "Leaderboard_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Teams" ("teamID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompetitionSettings" (
    "competitionName" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "numTeams" INTEGER NOT NULL DEFAULT 1,
    "teamSize" INTEGER
);

-- CreateTable
CREATE TABLE "Categories" (
    "categoryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Question" (
    "questionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryID" INTEGER NOT NULL,
    "questionDescription" TEXT NOT NULL,
    "questionAnswer" TEXT NOT NULL,
    "pointValue" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Question_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Categories" ("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "questionsAnswered" (
    "questionID" INTEGER NOT NULL,
    "teamID" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,
    "pointsValue" INTEGER,
    CONSTRAINT "questionsAnswered_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Teams" ("teamID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hints" (
    "hintID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionID" INTEGER NOT NULL,
    "pointPenalty" INTEGER NOT NULL,
    CONSTRAINT "Hints_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question" ("questionID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HintSeen" (
    "hintID" INTEGER NOT NULL,
    "teamID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LookingForGroupTable" (
    "postID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "LookingForGroupTable_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LookingForGroupHistory" (
    "postHistoryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "LookingForGroupHistory_postHistoryID_fkey" FOREIGN KEY ("postHistoryID") REFERENCES "LookingForGroupTable" ("postID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chats" (
    "chatID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adminID" INTEGER NOT NULL,
    "teamID" INTEGER NOT NULL,
    CONSTRAINT "Chats_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Admin" ("adminID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Chats_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Teams" ("teamID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatHistory" (
    "chatHistoryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "chatResponse" TEXT NOT NULL,
    CONSTRAINT "ChatHistory_chatID_fkey" FOREIGN KEY ("chatID") REFERENCES "Chats" ("chatID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatHistory_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_teamName_key" ON "Teams"("teamName");

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_boardPosition_key" ON "Leaderboard"("boardPosition");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionSettings_competitionName_key" ON "CompetitionSettings"("competitionName");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_categoryName_key" ON "Categories"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "questionsAnswered_questionID_teamID_key" ON "questionsAnswered"("questionID", "teamID");

-- CreateIndex
CREATE UNIQUE INDEX "HintSeen_hintID_teamID_key" ON "HintSeen"("hintID", "teamID");
