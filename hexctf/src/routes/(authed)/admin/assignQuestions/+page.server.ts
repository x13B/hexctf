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
    default: async ({request, fetch}) => {
        //remove all assigned questions first
        const response = await fetch('/api/questions/assigned', { method: 'DELETE' });

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
                // send start request to docker container
                const response = await fetch('/api/docker/containers/start', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ questionId: Number(ques), teamId: team.teamId })
                });
                const result = await response.json();
                console.log(result);
            }
        }
    }
} satisfies Actions;