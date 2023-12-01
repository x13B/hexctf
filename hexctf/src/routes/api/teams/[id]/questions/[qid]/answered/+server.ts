import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id, qid } }) => {
    try {
         const questionAnswered = await prisma.answerQuestions.findUnique({
            where: {
              questionId_teamId: {
                teamId: Number(id),
                questionId: Number(qid),
              }
            },
         });

         
         var status;
          if (questionAnswered){
            status = "success"
          } else {
            status = "failure"
          }

          const json_response = {
            status: status,
            questionAnswered
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