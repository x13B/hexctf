import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
    try {
         const team = await prisma.assignedQuestions.findMany({
            where: {
                teamId: Number(id)
            },
            select: {
                question: {
                  include: {
                    categories: true
                  }
                }
            }
         });
         
         const json_response = {
          status: 'success',
          team
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