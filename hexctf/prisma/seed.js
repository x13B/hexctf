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
    // =====================================================================

    // THIS IS FOR CATEGORIES ================================================    
    const createcategory = await prisma.categories.create({
      data: {
        categoryId: 1,
        categoryName: "Neworks"
      }
    });
    const createcategory2 = await prisma.categories.create({
      data: {
        categoryId: 2,
        categoryName: "Algorithms"
      }
    });
    const createcategory3 = await prisma.categories.create({
      data: {
        categoryId: 3,
        categoryName: "Programming Fundamentals"
      }
    });
    const createcategory4 = await prisma.categories.create({
      data: {
        categoryId: 4,
        categoryName: "Dockers"
      }
    });
    // =================================================================

    // THIS IS FOR QUIZ ================================================
    const createQuiz = await prisma.quiz.create({
      data: {
        quizId: 1,
        quizName: "HexCTF Demo Quiz"
      }
    });
    // =================================================================

    // THIS IS FOR COMP DETAILS ========================================
    const createComp = await prisma.competition.create({
      data: {
        competitionId: 1,
        competitionName: 'HexCTF Demo',
        startDate: '2023-12-08T10:30',
        endDate: '2023-12-08T11:00',
        description: '!Welcome to the HexCTF Demo!',
      }
    });

    // THIS IS FOR QUIZ QUESTIONS ======================================
    const createQuizQuestion1 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 1,
        questionBody: "Which command is used to check the connectivity between two computers?",
        questionAnswer: "Ping",
        hint: "Think of a simple network diagnostic tool that sends packets to a specific IP address to test the connection",
        category: "Networks",
        questionValue: 1,
      }
    });
    const createQuizQuestion2 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 2,
        questionBody: "Which algorithm works by repeatedly dividing the array in half until it finds the target value or determines that it's not present?",
        questionAnswer: "Binary Search",
        hint: "Logarithmic time complexity; divides the search space in half.",
        category: "Algorithms",
        questionValue: 1,
      }
    });
    const createQuizQuestion3 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 3,
        questionBody: "Which graph traversal algorithm explores all the neighbors of a node before proceeding to its children?",
        questionAnswer: "BFS",
        hint: "It's not DFS.",
        category: "Algorithms",
        questionValue: 1,
      }
    });
    const createQuizQuestion4 = await prisma.quizQuestions.create({
      data: {
        quizQuestionsId: 4,
        questionBody: "What is the process of hiding the internal implementation details and showing only the necessary functionality to the user?",
        questionAnswer: "Encapsulation",
        hint: "Hiding the complexities and exposing only the necessary interfaces to interact with an object-oriented program often involves this principle.",
        category: "Programming Fundamentals",
        questionValue: 1,
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

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
seed();
