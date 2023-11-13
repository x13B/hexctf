import prisma from '$lib/prisma';
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const {title, question, answer, points, difficulty, cat, hint } = await request.json();
        
        const res = await prisma.questions.create({
            data: {
                title: title,
                description: question,
                hint: hint,
                answer: answer,
                points: points,
                difficulty: difficulty,
                categoryId: cat,
            }
        })

        return new Response(JSON.stringify({ message: "Question was added!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
        
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error adding question!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
    }
}