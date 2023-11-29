import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
  
	const user = await prisma.user.findUnique({
	  where: {
		id: session.user.userId,
	  }
	});
  
	if (!user) {
	  throw new Error("User not found");
	}

	const user_res = await prisma.quizResults.findFirst({
		where: {
			userId: session.user.userId,
			score: {
				gte: 0,
			}
		}
	});

	let res: boolean = (user_res) ? true : false;
	console.log("res = ", res);

	const isAdmin = user.isAdmin || false;
	if (!user_res && !isAdmin) {
		throw redirect(302, "/studentQuiz")
	} else if (user_res && !isAdmin) {
		throw redirect(302, "../questions")
	}

	const users = await prisma.user.findMany();
	const quiz_questions = await prisma.quizQuestions.findMany();
	const quiz_results = await prisma.quizResults.findMany();

	return {
	  userId: session.user.userId,
	  username: session.user.username,
	  isAdmin: isAdmin,
	  users: users,
	  quizQuestions: quiz_questions,
	  quizRes: quiz_results,
	  taken: res,
	};
  };
  
  