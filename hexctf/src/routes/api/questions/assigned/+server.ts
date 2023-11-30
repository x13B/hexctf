import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
  try {
        const questions = await prisma.assignedQuestions.findMany();
       
        const json_response = {
          status: 'success',
          questions
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

export const DELETE: RequestHandler = async () => {
  try {
      await prisma.assignedQuestions.deleteMany();
      return new Response(null, { status: 204 });

  } catch (error: any) {
    return json({ message: error.message},{ status: 500 });
  }
}

// export const POST: RequestHandler = async ({ request }) => {
//   try {

//       const requestData = await request.json();
      
//       const question = await prisma.questions.create({
//         data: requestData
//       });

//       const json_response = {
//         status: 'success',
//         data: {
//           question
//         }
//       };
//       return json(json_response, { status: 201 });

//     } catch (error: any) {
//       if (error.code === 'P2002') {
//         const error_response = {
//           status: 'fail',
//           message: 'Question with title already exists'
//         };
//         return json(error_response, { status: 409 });
//       }
  
//       const error_response = {
//         status: 'error',
//         message: error.message
//       };
//       return json(error_response, { status: 500 });
//     }
// }

