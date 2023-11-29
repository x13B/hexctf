import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
    try {
        
         const teamQuesAnsCount = await prisma.teams.findMany({
            include: {
              _count: {
                select: {
                  answers: true
                    
                  }
                }
              },
              orderBy: {
                points: 'desc'
              }
            },
         );
         
         const json_response = {
          status: 'success',
          teamQuesAnsCount
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