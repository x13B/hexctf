import prisma from "$lib/prisma";
import { auth } from "$lib/server/lucia";
async function seed() {
  try {
    // THIS IS FOR THE ADMIN USER ============================================
      let usernameAdmin = "admin";
      const createAdmin = await auth.createUser({
      key: {
        providerId: "username", // auth method
				providerUserId: usernameAdmin.toLowerCase(), // unique id when using "username" auth method
        password: "admin"
      },
      attributes: {
        username: usernameAdmin,
        isAdmin: true
      } // expects `Lucia.DatabaseUserAttributes`
    });
    // ========================================================================

    // THIS IS FOR ADDING NEW USERS ==========================================
    let userList = ["Student 1","Student 2","Student 3","Student 4","Student 5","Student 6","Student 7","Student 8","Student 9"];
    let num = 1;
    for (let nameuser of userList) {
      //console.log(nameuser)
      const createUser = await auth.createUser({
        userId: String(num),
        key: {
          providerId: "username",
          providerUserId: nameuser.toLowerCase(),
          password: nameuser.toLowerCase(),
        },
        attributes: {
          username: nameuser
        }
      });
      num += 1;
    }
    /*const createUser1 = await prisma.user.create({
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
    */

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
        categoryName: "Algorithms"
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
        category: "Math",
        questionValue: 3,
      }
    });
    const createQuizQuestion2 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 2,
        questionBody: "What is 3 * 1?",
        questionAnswer: "3",
        hint: "You really don't need a hint for this one.",
        category: "Math",
        questionValue: 3,
      }
    });
    const createQuizQuestion3 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 3,
        questionBody: "What is the force that pulls objects towards Earth's center?",
        questionAnswer: "gravity",
        hint: "It's gravity",
        category: "Physics",
        questionValue: 3,
      }
    });
    const createQuizQuestion4 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 4,
        questionBody: "What is the measure of the amount of matter in an object?",
        questionAnswer: "mass",
        hint: "You multiply it by gravitational force to get its weight!",
        category: "Physics",
        questionValue: 3,
      }
    });
    const createQuizQuestion5 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 5,
        questionBody: "What does LAN stand for?",
        questionAnswer: "local area network",
        hint: "It's in your immediate vicinity.",
        category: "Networks", 
        questionValue: 3,
      }
    });
    const createQuizQuestion6 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 6,
        questionBody: "What is the device to connect multiple computers in a network?",
        questionAnswer: "router",
        hint: "You could say it provides routes for the network.",
        category: "Networks",
        questionValue: 3,
      }
    });
    const createQuizQuestion7 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 7,
        questionBody: "What do you call a data structure that stores elements in a linear order?",
        questionAnswer: "array",
        hint: "It can have rows and columns.",
        category: "Algorithms",
        questionValue: 3,
      }
    });
    const createQuizQuestion8 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 8,
        questionBody: "What data structure organizes elements in a hierarchical way?",
        questionAnswer: "tree",
        hint: "It shares a name with a large plant that consists of a trunk and various branches and leaves.",
        category: "Algorithms",
        questionValue: 3,
      }
    });
    // =================================================================
    
    // FOR QUIZ RESULTS ONLY ============================================
    const createResult = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '1',
        score: 4
      }
    });
    const createResult2 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '2',
        score: 1
      }
    });
    const createResult3 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '3',
        score: 7
      }
    });
    const createResult4 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '4',
        score: 10
      }
    });
    const createResult5 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '5',
        score: 8
      }
    });
    const createResult6 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '6',
        score: 2
      }
    });
    const createResult7 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '7',
        score: 0
      }
    });
    const createResult8 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '8',
        score: 11
      }
    });
    const createResult9 = await prisma.quizResults.create({
      data: {
        quizId: 1,
        userId: '9',
        score: 5
      }
    });
    // ===========================================================

    // FOR QUESTIONS ONLY ========================================
    const createQuestion1 = await prisma.questions.create({
      data: {
        questionId: 1,
        title: 'Easy math',
        description: 'What is 2 + 2?',
        hint: "It's not 22.",
        hint2: "It's one less than 5.",
        hint3: "It's 4.",
        answer: '4',
        points: 10,
        categoryId: 1,
        difficulty: 'Easy'
      }
    });
    const createQuestion2 = await prisma.questions.create({
      data: {
        questionId: 2,
        title: "Earth's gravity",
        description: "What is the acceleration in m/s squared of the Earth's gravity?",
        hint: "It's close to 10.",
        hint2: "It is roughly one sixth of the Moon's gravitational acceleration.",
        answer: '9.8',
        points: 30,
        categoryId: 2,
        difficulty: 'Medium'
      }
    });
    const createQuestion3 = await prisma.questions.create({
      data: {
        questionId: 3,
        title: 'OSI Model Layer 2',
        description: 'What is the second layer of the OSI Model?',
        hint: "It's above the physical layer, but below the network layer.",
        hint2: "This layer is involved with the transfer of data between nodes.",
        answer: 'Data link layer',
        points: 50,
        categoryId: 3,
        difficulty: 'Medium'
      }
    });
    const createQuestion4 = await prisma.questions.create({
      data: {
        questionId: 4,
        title: 'OSI Model Layer 7',
        description: 'What is the seventh layer of the OSI Model?',
        hint: "It's above the presentation layer.",
        hint2: "This layer specifies the shared communication protocols and interface methods used by hosts.",
        answer: 'Application layer',
        points: 50,
        categoryId: 3,
        difficulty: 'Medium'
      }
    });
    // ===========================================================

    // FOR TEAMS ONLY ========================================
    // const createTeam1 = await prisma.teams.create({
    //   data: {
    //     teamName: 'The A Team',
    //   }
    // });
    // const createTeam2 = await prisma.teams.create({
    //   data: {
    //     teamName: 'The B Team',
    //   }
    // });
    // const createTeam3 = await prisma.teams.create({
    //   data: {
    //     teamName: 'l33t hax0rs',
    //     points: 99999,
    //   }
    // });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
seed();
