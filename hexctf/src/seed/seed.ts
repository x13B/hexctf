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
        const createcategory = await prisma.categories.create({
            data: {
                categoryId: 1,
                categoryName: "Math",
            }
        });
        const createcategory2 = await prisma.categories.create({
            data: {
                categoryId: 2,
                categoryName: "Physics",
            }
        });
        const createcategory3 = await prisma.categories.create({
            data: {
                categoryId: 3,
                categoryName: "Networks",
            }
        });
        const createcategory4 = await prisma.categories.create({
            data: {
                categoryId: 4,
                categoryName: "Alorithms",
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
                category: "Math",
            }
        });
        
        const createQuizQuestion2 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 2,
                questionBody: "What is 3 * 1?",
                questionAnswer: "3",
                category: "Math",
            }
        });
        
        const createQuizQuestion3 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 3,
                questionBody: "What is the force that pulls objects towards Earth's center?",
                questionAnswer: "gravity",
                category: "Physics",
            }
        });
        
        const createQuizQuestion4 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 4,
                questionBody: "What is the measure of the amount of matter in an object?",
                questionAnswer: "mass",
                category: "Physics",
            }
        });
        
        const createQuizQuestion5 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 5,
                questionBody: "What does LAN stand for?",
                questionAnswer: "local area network",
                category: "Networks",
            }
        });
        
        const createQuizQuestion6 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 6,
                questionBody: "What is the device to connect multiple computers in a network?",
                questionAnswer: "router",
                category: "Networks",
            }
        });
        
        const createQuizQuestion7 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 7,
                questionBody: "What do you call a data structure that stores elements in a linear order?",
                questionAnswer: "array",
                category: "Algorithms",
            }
        });
        
        const createQuizQuestion8 = await prisma.quizQuestions.create({
            data: {
                quizQuestionsId: 8,
                questionBody: "What data structure organizes elements in a hierarchical way?",
                questionAnswer: "tree",
                category: "Algorithms",
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