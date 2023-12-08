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

        // create the container
        let container = await docker.createContainer({
            Image: dockerImage.imageName,
            Hostname: dockerImage.imageName,
            name: dockerImage.imageName,
            Tty: false,
            AttachStdin: false,
            AttachStdout: false,
            AttachStderr: false,
            OpenStdin: false,
            StdinOnce: false,
        });

        // start the container
        container.start(async (err, data) => {
            if (err) {
                console.log(err);
                return json({ error: 'An error occurred while starting Docker container.' }, { status: 500 });
            }
        
            let containerInfo = await container.inspect();
            while (containerInfo.State.Running === false) {
                // wait for 500ms before checking the status again
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        
            console.log(`Docker ${dockerImage.imageName} container started successfully.`);
            const containerId = containerInfo.Id;
            const containerIp = containerInfo.NetworkSettings.IPAddress;
            const portString = Object.keys(containerInfo.NetworkSettings.Ports)[0];
            const containerPort = Number(portString.match(/\d+/)[0]);
        
            // update dockerState with status, ip, and port
            await prisma.dockerState.update({
                where: {
                    teamId_questionId: {
                        questionId,
                        teamId
                    }
                },
                data: {
                    containerStatus: 'running',
                    containerIp: containerIp,
                    containerPort: containerPort,
                    containerSHA: containerId
                }
            });
        });

        return json(dockerImage);
    } catch (err) {
        console.log(err);
        return json({ error: 'An error occurred while starting Docker container.' }, { status: 500 });
    }
}