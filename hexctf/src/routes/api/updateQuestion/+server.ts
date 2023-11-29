import prisma from "$lib/prisma";

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
    try {
        const {id, title, description, hint, hint2, hint3, answer, difficulty, points} = await request.json();

        const res = await prisma.questions.update({
            where: {
                questionId: id,
            },
            data: {
                title: title,
                description: description,
                hint: hint,
                hint2: hint2,
                hint3: hint3,
                answer: answer,
                difficulty: difficulty,
                points: points
            }
        });
    
        return new Response(JSON.stringify({ message: "Question was updated!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
        
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error updating question!" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
    }
}