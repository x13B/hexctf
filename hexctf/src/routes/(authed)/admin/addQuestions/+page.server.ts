import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad } from "../../../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
  
	const categories = await prisma.categories.findMany();
    const questions = await prisma.questions.findMany();
	
	// find docker containers that have no questions associated with them
	const dockers = await prisma.dockerState.findMany({
		where: {
			questionId: null,
			imageIsBaseContainer: true
		}
	});

	return {
	  userId: session.user.userId,
	  username: session.user.username,
      categories: categories,
      questions: questions,
	  dockers: dockers
	};
};