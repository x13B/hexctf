import { json } from '@sveltejs/kit';
import docker from '$lib/docker';
import prisma from '$lib/prisma';


export async function POST({request}) {
    try {
        const {questionId, teamId} = await request.json();

        // get docker image with questionId and teamId
        const dockerImage = await prisma.dockerState.findUnique({
            where: {
                teamId_questionId: {
                    questionId,
                    teamId
                }
            }
        });

        if (!dockerImage) {
            return json({ error: 'Docker image not found.' }, { status: 404 });
        }

        // get docker container with imageName
        const dockerContainer = await docker.getContainer(dockerImage.imageName);

        // stop the container
        await dockerContainer.stop();

        // remove the container
        await dockerContainer.remove();

        // update dockerState with status, ip, and port
        await prisma.dockerState.update({
            where: {
                teamId_questionId: {
                    questionId,
                    teamId
                }
            },
            data: {
                containerStatus: 'stopped',
                containerIp: null,
                containerPort: null
            }
        });

        return json({ success: 'Docker container stopped successfully.' });
    } catch (err) {
        console.log(err);
        return json({ error: 'An error occurred while starting Docker container.' }, { status: 500 });
    }
}