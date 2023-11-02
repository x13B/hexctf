import prisma from "$lib/prisma";
import type { PageServerLoad } from './$types';


export const load = (async () => {
    const categories = await prisma.categories.findMany();
    return { categories }
}) satisfies PageServerLoad;