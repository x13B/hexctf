import { json } from '@sveltejs/kit';
import docker from '$lib/docker';
import prisma from '$lib/prisma';
import path from 'path';
import fs from 'fs';

function getFiles(dir, subdir = '') {
    const dirents = fs.readdirSync(path.join(dir, subdir), { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = path.resolve(dir, subdir, dirent.name);
        const relativePath = path.relative(dir, res);
        return dirent.isDirectory() ? getFiles(dir, path.join(subdir, dirent.name)) : relativePath;
    });
    return Array.prototype.concat(...files);
}

export async function POST({request}) {
    // Request: imageName, imagePath, imageSHA, imageIsBaseContainer, imageIsBuilt
    const { imageName, imagePath } = await request.json();

    console.log(imageName, imagePath)
    console.log(getFiles(imagePath))
    // build the docker base image
    const stream = await docker.buildImage({
        context: imagePath,
        src: getFiles(imagePath)
    }, {
        t: `${imageName}:latest`,
    });

    try {
        const result = await new Promise((resolve, reject) => {
            docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
        });
    
        console.log('Docker image built successfully:', result);

        const imageInfo = await docker.getImage(`${imageName}:latest`).inspect();
        const imageSHA = imageInfo.Id;

        try {
            // create a DockerState entry for the base image
            const image = await prisma.dockerState.create({
                data: {
                    imageName,
                    imagePath,
                    imageSHA,
                    imageIsBaseContainer: true,
                    imageIsBuilt: false
                }
            });
            return json(image);
        } catch (err) {
            console.log(err);
            return json({ error: 'An error occurred while creating a Docker base image.' }, { status: 500 });
        }
    } catch (err) {
        console.error('Error building Docker image:', err);
    }
}
