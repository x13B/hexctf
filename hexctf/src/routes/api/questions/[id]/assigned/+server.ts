import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id } }) => {
    try {
         const question = await prisma.questions.findUnique({
            where: {
                questionId: Number(id)
            },
            select: {
              assigned: {
                select: {
                  teamId: true
                }
              }
            }
         });
         
         const json_response = {
          status: 'success',
          question
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