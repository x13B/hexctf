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
                const name = user?.username;
                return {isAdmin, session, name};
        }
    }