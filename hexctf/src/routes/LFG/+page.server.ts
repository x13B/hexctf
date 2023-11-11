import { fail, redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
  
	const user = await prisma.user.findUnique({
	  where: {
		id: session.user.userId,
	  }
	});
  
	if (!user) {
	  // Handle the case where the user is not found
	  // Perhaps set a default value for isAdmin or handle the error accordingly
	  throw new Error("User not found");
	}
  
	const isAdmin = user.isAdmin || false;
  
	return {
	  userId: session.user.userId,
	  username: session.user.username,
	  isAdmin: isAdmin,
	};
  };
  
  