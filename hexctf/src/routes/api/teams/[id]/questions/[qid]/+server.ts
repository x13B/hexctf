import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id, qid } }) => {
    try {
        const assignedQuestion = await prisma.assignedQuestions.findUnique({
            where: {
              teamId_questionId: {
                teamId: Number(id),
                questionId: Number(qid)
              }
            },
          });
         
          var status;
          if (assignedQuestion){
            status = "success"
          } else {
            status = "failure"
          }

          const json_response = {
            status: status,
            assignedQuestion
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