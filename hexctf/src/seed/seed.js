import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function seed() {
  try {
    // THIS IS FOR THE ADMIN USER ============================================
    const createAdmin = await prisma.user.create({
      data: {
        id: '1',
        username: 'admin',
        isAdmin: true
      }
    });
    // ========================================================================

    // THIS IS FOR ADDING NEW USERS ==========================================
    const createUser1 = await prisma.user.create({
      data: {
        id: '2',
        username: 'Student 1'
      }
    });
    const createUser2 = await prisma.user.create({
      data: {
        id: '3',
        username: 'Student 2'
      }
    });
    const createUser3 = await prisma.user.create({
      data: {
        id: '4',
        username: 'Student 3'
      }
    });
    const createUser4 = await prisma.user.create({
      data: {
        id: '5',
        username: 'Student 4'
      }
    });
    const createUser5 = await prisma.user.create({
      data: {
        id: '6',
        username: 'Student 5'
      }
    });
    const createUser6 = await prisma.user.create({
      data: {
        id: '7',
        username: 'Student 6'
      }
    });
    const createUser7 = await prisma.user.create({
      data: {
        id: '8',
        username: 'Student 7'
      }
    });
    const createUser8 = await prisma.user.create({
      data: {
        id: '9',
        username: 'Student 8'
      }
    });
    const createUser9 = await prisma.user.create({
      data: {
        id: '10',
        username: 'Student 9'
      }
    });
    // =====================================================================

    // THIS IS FOR CATEGORIES ================================================    
    const createcategory = await prisma.categories.create({
      data: {
        categoryId: 1,
        categoryName: "Math"
      }
    });
    const createcategory2 = await prisma.categories.create({
      data: {
        categoryId: 2,
        categoryName: "Physics"
      }
    });
    const createcategory3 = await prisma.categories.create({
      data: {
        categoryId: 3,
        categoryName: "Networks"
      }
    });
    const createcategory4 = await prisma.categories.create({
      data: {
        categoryId: 4,
        categoryName: "Alorithms"
      }
    });
    // =================================================================

    // THIS IS FOR QUIZ ================================================
    const createQuiz = await prisma.quiz.create({
      data: {
        quizId: 1,
        quizName: "My First Quiz"
      }
    });
    // =================================================================

    // THIS IS FOR QUIZ QUESTIONS ======================================
    const createQuizQuestion1 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 1,
        questionBody: "What is 2 + 2?",
        questionAnswer: "4",
        hint: "You don't need a hint for this one.",
        category: "Math"
      }
    });
    const createQuizQuestion2 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 2,
        questionBody: "What is 3 * 1?",
        questionAnswer: "3",
        hint: "You really don't need a hint for this one.",
        category: "Math"
      }
    });
    const createQuizQuestion3 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 3,
        questionBody: "What is the force that pulls objects towards Earth's center?",
        questionAnswer: "gravity",
        hint: "It's gravity",
        category: "Physics"
      }
    });
    const createQuizQuestion4 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 4,
        questionBody: "What is the measure of the amount of matter in an object?",
        questionAnswer: "mass",
        hint: "You multiply it by gravitational force to get its weight!",
        category: "Physics"
      }
    });
    const createQuizQuestion5 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 5,
        questionBody: "What does LAN stand for?",
        questionAnswer: "local area network",
        hint: "It's in your immediate vicinity.",
        category: "Networks"
      }
    });
    const createQuizQuestion6 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 6,
        questionBody: "What is the device to connect multiple computers in a network?",
        questionAnswer: "router",
        hint: "You could say it provides routes for the network.",
        category: "Networks"
      }
    });
    const createQuizQuestion7 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 7,
        questionBody: "What do you call a data structure that stores elements in a linear order?",
        questionAnswer: "array",
        hint: "It can have rows and columns.",
        category: "Algorithms"
      }
    });
    const createQuizQuestion8 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 8,
        questionBody: "What data structure organizes elements in a hierarchical way?",
        questionAnswer: "tree",
        hint: "It shares a name with a large plant that consists of a trunk and various branches and leaves.",
        category: "Algorithms"
      }
    });
    // =================================================================
    
    // FOR QUIZ RESULTS ONLY ============================================
    const createResult = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '2',
        score: 4
      }
    });
    const createResult2 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '3',
        score: 1
      }
    });
    const createResult3 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '4',
        score: 7
      }
    });
    const createResult4 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '5',
        score: 10
      }
    });
    const createResult5 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '6',
        score: 8
      }
    });
    const createResult6 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '7',
        score: 2
      }
    });
    const createResult7 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '8',
        score: 0
      }
    });
    const createResult8 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '9',
        score: 11
      }
    });
    const createResult9 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '10',
        score: 5
      }
    });
    // ===========================================================
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
seed();
