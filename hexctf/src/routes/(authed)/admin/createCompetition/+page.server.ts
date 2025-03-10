import { redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad } from "../../../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");

	const comp = await prisma.competition.findFirst();

	return {
	  userId: session.user.userId,
	  username: session.user.username,
	  comp: comp,
	};
  };