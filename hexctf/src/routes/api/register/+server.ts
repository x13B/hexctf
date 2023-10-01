import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { username, password } = await request.json();
  const createdUser = await prisma.user.create({
    data: {
      username,
      password
    },
  });


  return json(createdUser);
};
