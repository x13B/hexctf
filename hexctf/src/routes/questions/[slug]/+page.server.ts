import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from './$types';


export const load = (async ({ params: { slug } }) => {
    const question = await prisma.questions.findUnique({
        where: { questionId: Number(slug) },
    });
    return { question };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({request, params: { slug }}) => {
        const data = await request.formData();
        let propose = data.get("answer")

        const question = await prisma.questions.findUnique({
            where: { questionId: Number(slug) },
        });

        if (propose === question?.answer) {
            //console.log("Answer is correct!")
            return {response: true}
        }
        else {
            //console.log("Answer is incorrect.")
            return {response: false}
        }
    }
}satisfies Actions;