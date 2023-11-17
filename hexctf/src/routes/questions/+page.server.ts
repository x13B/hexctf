import { error, redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
	const teamOfUser = await prisma.teamMembers.findUnique({
        where: { userId: session.user.userId }
    });
    if (teamOfUser === null) throw error(404, "User is not in a team");
	const assignedQuestions = await prisma.assignedQuestions.findMany({
		where: {
			teamId: teamOfUser.teamId,
		},
		select: {
			questionId: true,
		}
	});
	let asnQuesArr: number[] = [];
	for (let obj of assignedQuestions) {
		asnQuesArr.push(obj.questionId);
	}
	const assignedCategoriesQuestions = await prisma.categories.findMany({
		include: {
			questions: {
				where: {
					questionId: {in: asnQuesArr}
			}
		}
	}
	})
	return {assignedCategoriesQuestions};
};

