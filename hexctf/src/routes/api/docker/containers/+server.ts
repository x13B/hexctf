import { json } from '@sveltejs/kit';
import docker from '$lib/docker';
import prisma from '$lib/prisma';

export async function GET() {
    try {
        const containers = await docker.listContainers();
        return json(containers);
    } catch (err) {
        console.log(err);
        return json({ error: 'An error occurred while fetching Docker containers.' }, { status: 500 });
    }
}