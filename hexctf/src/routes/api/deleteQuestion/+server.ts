import prisma from '$lib/prisma';
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
    try {
        const { id } = await request.json();
        
        const res = await prisma.questions.delete({
            where: {
                questionId: id,
            }
        });
    
        return new Response(JSON.stringify({ message: "Question was deleted!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error deleting question!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        }); 
    }
}