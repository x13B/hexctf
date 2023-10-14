import prisma from "$lib";

async function seed() {
    try {
        // THIS IS FOR THE ADMIN USER ============================================
        const createAdmin = await prisma.user.create({
            data: {
                id: '1',
                username: 'admin',
                isAdmin: true,
            }
        })
        // ========================================================================

        // THIS IS FOR CATEGORIES ================================================    
        const createCategory = await prisma.categories.create({
            data: {
                CategoryId: 1,
                CategoryName: "Math",
            }
        });
        const createCategory2 = await prisma.categories.create({
            data: {
                CategoryId: 2,
                CategoryName: "Physics",
            }
        });
        const createCategory3 = await prisma.categories.create({
            data: {
                CategoryId: 3,
                CategoryName: "Networks",
            }
        });
        const createCategory4 = await prisma.categories.create({
            data: {
                CategoryId: 4,
                CategoryName: "Alorithms",
            }
        });
        // =================================================================

        // THIS IS FOR QUIZ ================================================
        const createQuiz = await prisma.quiz.create({
            data: {
                quizId: 1,
                quizName: "My First Quiz",
            }
        });
        // =================================================================
        
        // THIS IS FOR QUIZ QUESTIONS ======================================
        const createQuizQuestion1 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 1,
                questionBody: "What is 2 + 2?",
                questionAnswer: "4",
                Category: "Math",
            }
        });
        
        const createQuizQuestion2 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 2,
                questionBody: "What is 3 * 1?",
                questionAnswer: "3",
                Category: "Math",
            }
        });
        
        const createQuizQuestion3 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 3,
                questionBody: "What is the force that pulls objects towards Earth's center?",
                questionAnswer: "gravity",
                Category: "Physics",
            }
        });
        
        const createQuizQuestion4 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 4,
                questionBody: "What is the measure of the amount of matter in an object?",
                questionAnswer: "mass",
                Category: "Physics",
            }
        });
        
        const createQuizQuestion5 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 5,
                questionBody: "What does LAN stand for?",
                questionAnswer: "local area network",
                Category: "Networks",
            }
        });
        
        const createQuizQuestion6 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 6,
                questionBody: "What is the device to connect multiple computers in a network?",
                questionAnswer: "router",
                Category: "Networks",
            }
        });
        
        const createQuizQuestion7 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 7,
                questionBody: "What do you call a data structure that stores elements in a linear order?",
                questionAnswer: "array",
                Category: "Algorithms",
            }
        });
        
        const createQuizQuestion8 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 8,
                questionBody: "What data structure organizes elements in a hierarchical way?",
                questionAnswer: "tree",
                Category: "Algorithms",
            }
        });
        // =================================================================
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();