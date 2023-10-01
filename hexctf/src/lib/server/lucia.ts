import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
    adapter: prisma(client),
    env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
    getUserAttributes: (data) => {
        return {
            username: data.username,
        };
    }
});

export type Auth = typeof auth;