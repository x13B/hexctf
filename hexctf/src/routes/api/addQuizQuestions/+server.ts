import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { body, answer, cat } = await request.json();
        console.log(body);
        console.log(answer);
        console.log(cat);
        
        const res = await prisma.quizQuestions.create({
            data: {
                questionBody: body,
                questionAnswer: answer,
                category: cat,
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