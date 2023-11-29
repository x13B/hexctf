import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { name, start, end } = await request.json();

        console.log(name, start, end);

        const res = await prisma.competition.upsert({
            where: {competitionId: 1},
            update: {
                competitionName: name,
                startDate: start,
                endDate: end,
            },
            create: {
                competitionName: name,
                startDate: start,
                endDate: end,
            }
        });
    
        return new Response(JSON.stringify({ message: "Competition was created!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
        
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error creating comp!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
    }
}