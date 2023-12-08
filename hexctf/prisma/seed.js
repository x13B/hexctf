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
    let userList = ["Student 1","Student 2","Student 3","Student 4","Student 5","Student 6","Student 7"];
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
        description: `!Welcome to the HexCTF Demo 2023!\n
        @#Join the Ultimate Cybersecurity Battle#@\n
        Are you ready to immerse yourself in the exhilarating world of cybersecurity? 
        HexCTF beckons you to join the most dynamic and thrilling Capture The Flag (CTF) competition yet. 
        Prepare to unleash your skills in cryptography, reverse engineering, web exploitation, forensics, and more.\n
        @#What to Expect#@\n
        Embark on a journey filled with:\n
        - Engaging Challenges: Encounter a diverse array of mind-bending puzzles and tasks, meticulously crafted to test your expertise.\n
        - Team Collaboration: Forge alliances with like-minded individuals, or showcase your solo skills as you compete against the best in the field.\n
        - Real-time Scenarios: Immerse yourself in simulated real-world cybersecurity scenarios that enhance your problem-solving abilities and strategic thinking.\n
        - Prizes and Recognition: Win prestigious awards and gain recognition within the cybersecurity community.\n
        @#The Power of Learning Through Playing#@\n
        At HexCTF, we believe that learning by doing is the ultimate way to master cybersecurity.\n
        Through our immersive CTF competitions, participants not only sharpen their technical skills but also cultivate critical thinking, teamwork, and adaptability in a dynamic and challenging environment.\n
        @#Why Participate?#@\n
        - Skill Enhancement: Hone your cybersecurity skills by tackling complex challenges that mirror real-world scenarios.\n
        - Networking Opportunities: Connect with industry professionals, mentors, and fellow enthusiasts, fostering collaborations and knowledge-sharing.\n
        - Career Advancement: Showcase your abilities to potential employers and gain recognition in the cybersecurity realm.\n
        @#Register Now#@\n
        Don\'t miss the chance to be part of HexCTF.\n
        Register today to secure your slot in this adrenaline-pumping event. Prepare to push your boundaries, solve intricate problems, and emerge victorious in the world of cybersecurity.\n
        #!Get Ready to Hack, Crack, and Solve!#
        `
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
    // ===========================================================

    // FOR QUESTIONS ONLY ========================================
    const createQuestion1 = await prisma.questions.create({
      data: {
        questionId: 1,
        title: "Data Structures",
        description: "Which data structure uses Last-In-First-Out (LIFO) principle?",
        hint: "It's not a queue.",
        hint2: "It's not a linked list.",
        hint3: "It's begin with s.",
        answer: 'stack',
        points: 50,
        categoryId: 2,
        difficulty: 'Easy'
      }
    });
    const createQuestion2 = await prisma.questions.create({
      data: {
        questionId: 2,
        title: "Graphs",
        description: "What does DFS stand for in graph traversal?",
        hint: "It's a searching algorithm.",
        hint2: "It checks the first neighbor.",
        hint3: "It goes DEEP.",
        answer: 'depth first search',
        points: 50,
        categoryId: 2,
        difficulty: 'Easy'
      }
    });
    const createQuestion3 = await prisma.questions.create({
      data: {
        questionId: 3,
        title: "Searching",
        description: "What is the time complexity of the Quicksort algorithm in the worst-case scenario?",
        hint: "It's not O(log n).",
        hint2: "It's not O(2^n).",
        hint3: "",
        answer: 'O(n^2)',
        points: 75,
        categoryId: 2,
        difficulty: 'Medium'
      }
    });
    const createQuestion4 = await prisma.questions.create({
      data: {
        questionId: 4,
        title: "Queues",
        description: "What data structure is used to implement a priority queue efficiently? ",
        hint: "This data structure is a specialized binary tree-based structure.",
        hint2: "It allows for efficient retrieval of the maximum or minimum element.",
        hint3: "",
        answer: 'heap',
        points: 75,
        categoryId: 2,
        difficulty: 'Medium'
      }
    });
    const createQuestion5 = await prisma.questions.create({
      data: {
        questionId: 5,
        title: "Dynamic Programming",
        description: "What is the term for an algorithm that divides a problem into smaller sub-problems and solves each sub-problem only once, storing its solutions to avoid redundant computations?",
        hint: "This technique is often used to optimize recursive algorithms.",
        hint2: "It involves storing the results of expensive function calls and reusing those results instead of re-computing them.",
        hint3: "Its primary objective is to improve the efficiency of algorithms by eliminating redundant computations through the use of a storage mechanism.",
        answer: 'memoization',
        points: 100,
        categoryId: 2,
        difficulty: 'Hard'
      }
    });
    const createQuestion6 = await prisma.questions.create({
      data: {
        questionId: 6,
        title: "Data Structures",
        description: "What is the term for a data structure that allows elements to be inserted or removed from both ends with time complexity O(1)?",
        hint: "This data structure allows insertion and deletion of elements at both ends in constant time.",
        hint2: "It can be implemented using arrays or linked lists.",
        hint3: "It supports operations such as push/pop at both ends and is versatile for various algorithms, including graph traversal and implementing stacks or queues.",
        answer: "deque",
        points: 100,
        categoryId: 2,
        difficulty: "Hard"
      }
    });
    const createQuestion7 = await prisma.questions.create({
      data: {
        questionId: 7,
        title: "Algorithms",
        description: "What is the process of arranging items in ascending order?",
        hint: "It's not searching.",
        hint2: "",
        hint3: "",
        answer: "sorting",
        points: 50,
        categoryId: 2,
        difficulty: "Easy"
      }
    });
    const createQuestion8 = await prisma.questions.create({
      data: {
        questionId: 8,
        title: "Sorting",
        description: "What is the process of exchanging the values of two variables?",
        hint: "It's not sorting.",
        hint2: "It's common in most sorting algorithms.",
        hint3: "",
        answer: "swap",
        points: 50,
        categoryId: 2,
        difficulty: 'Easy'
      }
    });
    const createQuestion9 = await prisma.questions.create({
      data: {
        questionId: 9,
        title: "Problem Solving",
        description: "What is the term for an algorithmic problem-solving strategy that exhaustively searches through all possible solutions?",
        hint: "",
        hint2: "",
        hint3: "",
        answer: "brute force",
        points: 75,
        categoryId: 2,
        difficulty: 'Medium'
      }
    });
    const createQuestion10 = await prisma.questions.create({
      data: {
        questionId: 10,
        title: "Algorithm Techniques",
        description: "What algorithmic technique involves breaking a problem into smaller subproblems, solving each independently, and combining their solutions?",
        hint: "",
        hint2: "",
        hint3: "",
        answer: "divide and conquer",
        points: 75,
        categoryId: 2,
        difficulty: 'Medium'
      }
    });
    const createQuestion11 = await prisma.questions.create({
      data: {
        questionId: 11,
        title: "Graph Traversal",
        description: "Whose algorithm efficiently solves the shortest path problem in a weighted graph from a single source to all other nodes?",
        hint: "His name is hard to spell.",
        hint2: "",
        hint3: "",
        answer: "djikstras",
        points: 100,
        categoryId: 2,
        difficulty: 'Hard'
      }
    });
    const createQuestion12 = await prisma.questions.create({
      data: {
        questionId: 12,
        title: "Minimum Spanning Tree",
        description: "Whose algorithm is used to efficiently construct a minimum spanning tree for a connected, undirected graph with weighted edges?",
        hint: "",
        hint2: "",
        hint3: "",
        answer: "Prims",
        points: 100,
        categoryId: 2,
        difficulty: 'Hard'
      }
    });
    const createQuestion13 = await prisma.questions.create({
      data: {
        questionId: 13,
        title: "Protocols I",
        description: "What protocol is used for sending emails?",
        hint: "",
        hint2: "",
        hint3: "",
        answer: "smtp",
        points: 50,
        categoryId: 1,
        difficulty: 'Easy'
      }
    });

    const createQuestion14 = await prisma.questions.create({
      data: {
        questionId: 14,
        title: "Network Hardware I",
        description: "What device forwards data packets between networks?",
        hint: "",
        hint2: "",
        hint3: "",
        answer: "router",
        points: 50,
        categoryId: 1,
        difficulty: 'Easy'
      }
    });
    const createQuestion15 = await prisma.questions.create({
      data: {
        questionId: 15,
        title: "90% of Coding",
        description: "What is the process of finding and fixing errors in a program called?",
        hint: "",
        hint2: "",
        hint3: "",
        answer: "debugging",
        points: 50,
        categoryId: 3,
        difficulty: 'Easy'
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
