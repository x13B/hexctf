import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, params: { id } }) => {
    try {
        const assignedQuestions = await prisma.assignedQuestions.findMany({
            where: {
              teamId: Number(id),
            },
            select: {
              questionId: true,
            }
          });
          let asnQuesArr: number[] = [];
          for (let obj of assignedQuestions) {
            asnQuesArr.push(obj.questionId);
          }
          const assignedCategoriesQuestions = await prisma.categories.findMany({
            include: {
              questions: {
                where: {
                  questionId: {in: asnQuesArr}
              },
              select: {
                questionId: true,
                title: true,
                points: true
              }
            }
          }
          })
         
         const json_response = {
          status: 'success',
          assignedCategoriesQuestions
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