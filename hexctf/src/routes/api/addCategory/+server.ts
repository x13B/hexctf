import prisma from '../../../lib/index';
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { id, name } = await request.json();
        
        const res = await prisma.categories.create({
            data: {
                categoryId: id,
                categoryName: name
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