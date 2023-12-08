import { json } from '@sveltejs/kit';
import docker from '$lib/docker';
import prisma from '$lib/prisma';

export async function POST({request}) {
    // Request: imageName, imagePath, imageSHA, imageIsBaseContainer, imageIsBuilt
    const {imageName, imagePath, imageSHA, imageIsBaseContainer, imageIsBuilt} = await request.json();
    try {
        // create a DockerState entry for the base image
        const image = await prisma.dockerState.create({
            data: {
                imageName,
                imagePath,
                imageSHA,
                imageIsBaseContainer,
                imageIsBuilt
            }
        });
        return json(image);
    } catch (err) {
        console.log(err);
        return json({ error: 'An error occurred while creating a Docker base image.' }, { status: 500 });
    }
}
