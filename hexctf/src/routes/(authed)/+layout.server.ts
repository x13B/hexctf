import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export async function load({ locals, url }) {
    const session = await locals.auth.validate();
    if (session) {
                const user = await prisma.user.findUnique({
                    where: { 
                        id: session.user.userId,
                        username: session.user.username,
                    }
                });
                const isAdmin = user?.isAdmin;
                if (!isAdmin) {
                    throw redirect(302, "/");
                }
            } else {
                throw redirect(302, `/login?redirectTo=${url.pathname}`);
            }
}