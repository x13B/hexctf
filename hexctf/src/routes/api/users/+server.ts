import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
  try {
        const users = await prisma.user.findMany();
       
        const json_response = {
          status: 'success',
          users
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