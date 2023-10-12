import prisma from "$lib";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { id, body, answer, category } = await request.json();
        
        const res = await prisma.quizQuestions.create({
            data: {
                quizId: id,
                questionBody: body,
                questionAnswer: answer,
                Category: category,
            }
        });
    
        return new Response(JSON.stringify({ message: "Category was added!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
        
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error adding category!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
    }
}