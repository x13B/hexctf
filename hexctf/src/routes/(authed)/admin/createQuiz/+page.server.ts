import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad } from "../../../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
  
	const categories = await prisma.categories.findMany();
	const quiz_questions = await prisma.quizQuestions.findMany();
	const quiz_name = await prisma.quiz.findFirst();

	return {
	  userId: session.user.userId,
	  username: session.user.username,
      categories: categories,
	  quiz_questions: quiz_questions,
	  quiz_name: quiz_name,
	};
  };