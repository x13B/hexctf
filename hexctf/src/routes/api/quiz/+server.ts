import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id } }) => {
    try {
         const quiz = await prisma.quiz.findMany();
         
         const json_response = {
          status: 'success',
          quiz
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

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestData = await request.json();
        
        const quiz = await prisma.quiz.create({
          data: requestData
        });
  
        const json_response = {
          status: 'success',
          quiz
        };
        return json(json_response, { status: 201 });
  
      } catch (error: any) {
        if (error.code === 'P2002') {
          const error_response = {
            status: 'fail',
            message: 'quiz with title already exists'
          };
          return json(error_response, { status: 409 });
        }
    
        const error_response = {
          status: 'error',
          message: error.message
        };
        return json(error_response, { status: 500 });
      }
}