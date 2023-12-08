import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id } }) => {
    try {
        const dockerState = await prisma.dockerState.findUnique({
            where: {
                questionId: Number(id)
            },
        });
         
        var status;
        if (dockerState){
          status = "success"
        } else {
          status = "failure"
        }

        const json_response = {
          status: status,
          dockerState
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