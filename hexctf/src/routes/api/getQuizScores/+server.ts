import prisma from "$lib";
import { json } from '@sveltejs/kit';

// This function gets all quiz scores
export async function GET() {

  try {
    const data = await prisma.quizResults.findMany();
     // Return a 200 OK response with the data
    return json(data);
} catch (error) {
     // Return a 500 Internal Server Error response
      return json({ error: 'Error fetching data from the database' });
  } finally {
    await prisma.$disconnect();
  }
}