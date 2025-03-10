import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
    try {
        const session = await locals.auth.validate();
        var status;
        if (session) {
          status = "success"
        } else {
          status = "failure"
        }

        const json_response = {
          status: status,
          session: session?.user
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