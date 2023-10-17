import prisma from "$lib";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { id, name } = await request.json();

        const res = await prisma.quiz.create({
            data: {
                quizId: id,
                quizName: name,
            }
        });
    
        return new Response(JSON.stringify({ message: "Quiz was created!" }), {
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