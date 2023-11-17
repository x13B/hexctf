import prisma from "$lib/prisma";
import { error } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {

    const categoriesQuestions = await prisma.categories.findMany({
		include: {
			questions: true
		}
	})

    return {categoriesQuestions};
};

export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        //console.log(data);
        let propose = data.getAll("select");
        //console.log(propose);

        const teams = await prisma.teams.findMany();
        //console.log("teams: " + teams.length)
        if (teams.length === 0) {
            throw error(500, "Teams have not been created")
        }
        for (let team of teams){
            console.log("Team " + team.teamName)
            for (let ques of propose) {
                console.log("assigning question " + ques)
                await prisma.assignedQuestions.create({
                    data: {
                        questionId: Number(ques),
                        teamId: team.teamId,
                    },
                })
            }
        }
    }
} satisfies Actions;