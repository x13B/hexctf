// src/routes/p/[id]/+page.server.ts
import prisma from "$lib/prisma";
import type { PageServerLoad } from './$types';

// 1.
export const load = (async ({ params: { slug } }) => {
    // 2.
    const question = await prisma.questions.findUnique({
        where: { QuestionId: Number(slug) },
    });

    // 3.
    return { question };
}) satisfies PageServerLoad;
