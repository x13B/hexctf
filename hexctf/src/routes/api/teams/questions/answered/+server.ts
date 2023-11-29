import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
    try {
         const questionsAnswered = await prisma.teams.findMany({
            include: {
              answers: {
                select: {
                  questions: true
                },
              }
              }
            },
         );
         
         const json_response = {
          status: 'success',
          questionsAnswered
        };
        return json(json_response);
     
     } catch (error: any) {
       const error_response = {
         status: 'error',
         message: error.message
       };
       return json(error_response, { status: 500 });
     }
  }