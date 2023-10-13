import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from './$types';


export const load = (async ({ params: { slug } }) => {
    const question = await prisma.questions.findUnique({
        where: { QuestionId: Number(slug) },
    });
    return { question };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({request, params: { slug }}) => {
        const data = await request.formData();
        let propose = data.get("answer")

        const question = await prisma.questions.findUnique({
            where: { QuestionId: Number(slug) },
        });

        if (propose === question?.Answer) {
            //console.log("Answer is correct!")
            return {success: true}
        }
        else {
            //console.log("Answer is incorrect.")
            return {success: false}
        }
    }
}satisfies Actions;