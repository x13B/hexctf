import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
  try {
      const ansQuestions = await prisma.answerQuestions.findMany({
        
      });
       
      var status;
      if (ansQuestions){
        status = "success"
      } else {
        status = "failure"
      }
      const json_response = {
        status: status,
        ansQuestions
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