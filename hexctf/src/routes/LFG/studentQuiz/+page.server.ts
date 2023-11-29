import { fail, redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";

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
		}
	});

	const isAdmin = user.isAdmin || false;

	const users = await prisma.user.findMany();
	const quiz_questions = await prisma.quizQuestions.findMany();

	return {
	  userId: session.user.userId,
	  username: session.user.username,
	  isAdmin: isAdmin,
	  users: users,
	  quizQuestions: quiz_questions,
      quiz_results: user_res
	};
  };
  