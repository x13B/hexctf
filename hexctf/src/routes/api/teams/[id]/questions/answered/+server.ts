import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id } }) => {
    try {
         const questionsAnswered = await prisma.answerQuestions.findMany({
            where: {
                teamId: Number(id)
            },
            select: {
                questions: true
            }
         });
        //  const questionsAnsweredCount = await prisma.answerQuestions.count({
        //   where: {
        //       teamId: Number(id)
        //   }
      //  });
         
         const json_response = {
          status: 'success',
          // questionsAnsweredCount,
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