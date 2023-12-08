import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
    try {
      const competition = await prisma.competition.findFirst();
      var status;
      if (competition){
        status = "success"
      } else {
        status = "failure"
      }

          const json_response = {
            status: status,
            competition
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

// export const PUT: RequestHandler = async ({ request }) => {
//     try {
//         const requestData = await request.json();
        
//         const competition = await prisma.competition.update({
//             data: requestData,
//             where: undefined
//         });
  
//         const json_response = {
//           status: 'success',
//           competition
//         };
//         return json(json_response, { status: 201 });
  
//       } catch (error: any) {
//         const error_response = {
//           status: 'error',
//           message: error.message
//         };
//         return json(error_response, { status: 500 });
//       }
//   }