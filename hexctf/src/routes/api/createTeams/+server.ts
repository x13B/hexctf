import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const {teamsMadeBySort, num_teams, team_names } = await request.json();

        // Add team names before to DB before adding members
        for (let i = 0; i < num_teams; i++) {
            let res = await prisma.teams.create({
                data: {
                    teamId: (i+1),
                    teamName: team_names[i],
                }
            });
        }
        
        console.log("Team Names created!!!");
        
        // Add team members from each group
        for (let i = 0; i < num_teams; i++) {
            for (let j = 0; j < teamsMadeBySort[i].length; j++) {
                let res = await prisma.teamMembers.create({
                    data: {
                        teamId: (i+1),
                        userId: teamsMadeBySort[i][j].userId,
                    }
                });
            }
        }
        
        console.log("Team Members added!");

        return new Response(JSON.stringify({ message: "Teams were created!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
        
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error creating quiz!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
    }
}