import type { PageServerLoad } from "./$types";
import prisma from "$lib/prisma";


export const load = (async ({ fetch }) => {
    const response = await fetch("../api/getTeams");
    const teams = await response.json();
    const idCounts = {}
    let i = 0;
    for (let team of teams) {
        
        const count = await prisma.answerQuestions.count({
            where: {
                teamId: team.teamId
            }
        
        })
        teams[i]["count"] = count;
        i++;
    }

    const qAnswer = await prisma.answerQuestions.findMany();
    //console.log(teams)
    return { teams, qAnswer }
}) satisfies PageServerLoad;