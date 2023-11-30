import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id } }) => {
    try {
         const team = await prisma.teamMembers.findUnique({
            where: {
                userId: id
            },
            select: {
                team: true
            }
         });
         
        var status;
        if (team) {
          status = "success"
        } else {
          status = "failure"
        }

         const json_response = {
          status,
          team: team?.team
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