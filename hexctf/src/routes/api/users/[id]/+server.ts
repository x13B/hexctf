import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id } }) => {
    try {
         const user = await prisma.user.findUnique({
            where: {
                id: id
            },
         });
         
         const json_response = {
          status: 'success',
          user
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

export const PATCH: RequestHandler = async ({ request, params: { id } }) => {
    try {
      const requestData = await request.json();
        
        const updated_question = await prisma.user.update({
          where: {
            id: id
          },
            data: requestData
        });
  
        const json_response = {
			status: 'success',
			data: {
				question: updated_question
			}
		};
		return json(json_response);
  
    } catch (error: any) {
      if (error.code === 'P2025') {
              const message = 'No User with the Provided ID Found';
              return json({ message},{ status: 404 });
          }
  
          return json({ message: error.message},{ status: 500 });
    }
  }

  export const DELETE: RequestHandler = async ({ params: { id } }) => {
    try {
        
        await prisma.user.delete({
          where: {
            id: id
          },
        });
  
        return new Response(null, { status: 204 });
    } catch (error: any) {
      if (error.code === 'P2025') {
              const message = 'No User with the Provided ID Found';
              return json({ message},{ status: 404 });
          }
  
          return json({ message: error.message},{ status: 500 });
    }
  }