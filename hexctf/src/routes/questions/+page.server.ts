import { fail, redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
	const teamOfUser = await prisma.teamMembers.findUnique({
        where: { userId: session.user.userId }
    });
	const assignedQuestions = await prisma.assignedQuestions.findMany({
        where: { teamId: teamOfUser?.teamId },
    });
	// return the entire questions entry of the assigned questions
	let questions: any = [];
	for (let q of assignedQuestions) {
		const ques = await prisma.questions.findUnique({
			where: { 
				questionId: q.questionId
			},
		});
		questions.push(ques);
	}
	//console.log(questions);
	return {questions};
};

