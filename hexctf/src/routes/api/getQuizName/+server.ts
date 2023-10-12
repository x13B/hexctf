import prisma from '$lib';
import { json } from '@sveltejs/kit';

export async function GET() {

  try {
    const data = await prisma.quiz.findMany();
    
     // Return a 200 OK response with the data
    return json(data);
} catch (error) {
     // Return a 500 Internal Server Error response
      return json({ error: 'Error fetching data from the database' });
  } finally {
    await prisma.$disconnect();
  }
}