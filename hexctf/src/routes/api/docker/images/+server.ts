import { json } from '@sveltejs/kit';
import docker from '$lib/docker';
import prisma from '$lib/prisma';

export async function GET() {
    try {
        const images = await docker.listImages();
        return json(images);
    } catch (err) {
        console.log(err);
        return json({ error: 'An error occurred while fetching Docker images.' }, { status: 500 });
    }
}