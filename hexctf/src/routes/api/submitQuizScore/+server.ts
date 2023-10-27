import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { quizId, id, score } = await request.json();

        const res = await prisma.quizResults.create({
            data: {
                quizId: quizId,
                userId: id,
                score: score,
            }
        });
    
        return new Response(JSON.stringify({ message: "Competition was created!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
        
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error creating competition!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
    }
}