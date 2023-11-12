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

    if(!user.isAdmin) throw redirect(302, "/LFG");
  
	const isAdmin = user.isAdmin || false;

	const users = await prisma.user.findMany();
	const quiz_results = await prisma.quizResults.findMany();

	return {
	  userId: session.user.userId,
	  username: session.user.username,
	  isAdmin: isAdmin,
	  users: users,
	  quizRes: quiz_results
	};
};
