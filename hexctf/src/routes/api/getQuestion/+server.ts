import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

// This function gets data from the database
// and can be used to display data for all users
export async function GET({ request }) {
  const prisma = new PrismaClient();

  try {
    const { id } = await request.json();
    const data = await prisma.questions.findUnique({
      where: {
        QuestionId: id,
      },
    });
     // Return a 200 OK response with the data
    return json(data);
} catch (error) {
     // Return a 500 Internal Server Error response
      return json({ error: 'Error fetching data from the database' });
  } finally {
    await prisma.$disconnect();
  }
}