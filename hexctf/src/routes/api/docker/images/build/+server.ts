import { json } from '@sveltejs/kit';
import docker from '$lib/docker';
import prisma from '$lib/prisma';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// function that takes a path and returns an array with the relative path to each file in the directory
function getFiles(dir, subdir = '') {
    const dirents = fs.readdirSync(path.join(dir, subdir), { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = path.resolve(dir, subdir, dirent.name);
        const relativePath = path.relative(dir, res);
        return dirent.isDirectory() ? getFiles(dir, path.join(subdir, dirent.name)) : relativePath;
    });
    return Array.prototype.concat(...files);
}


export async function GET() {
    // Grab all the teams from the database and build an image for each team, then update the necessary DockerState fields
    try {
        // get all the teams from db
        const teams = await prisma.teams.findMany();

        // get all the base images from dockerstate
        const baseImages = await prisma.dockerState.findMany({
            where: {
                imageIsBaseContainer: true
            }
        });

        for (const team of teams) {
            for (const baseImage of baseImages) {
                const password = crypto.randomBytes(12).toString('hex').slice(0, 12)
                const stream = await docker.buildImage({
                    context: baseImage.imagePath,
                    src: getFiles(baseImage.imagePath)
                }, {
                    t: `${baseImage.imageName}-team-${team.teamId}:latest`,
                    buildargs: {
                        TEAM_ID: team.teamId.toString(),
                        PASS: password
                    }
                });
        
                try {
                    const result = await new Promise((resolve, reject) => {
                        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
                    });
                
                    console.log('Docker image built successfully:', result);
                } catch (err) {
                    console.error('Error building Docker image:', err);
                }
        
                await prisma.dockerState.create({
                    data: {
                        imageName: `${baseImage.imageName}-team-${team.teamId}`,
                        imagePath: baseImage.imagePath,
                        imageSHA: baseImage.imageSHA,
                        imageIsBaseContainer: false,
                        imageIsBuilt: true,
                        team: {
                            connect: {
                                teamId: team.teamId
                            },
                        },
                        containerInfo: `Login to ssh with these credentials: ${team.teamId}:${password}`
                    },
                });
            }
            console.log(`Successfully built Docker images for team ${team.teamId}.`)
        }

        return json({ message: 'Successfully built Docker containers.' }, { status: 200 });
    } catch (err) {
        console.log(err);
        return json({ error: 'An error occurred while building Docker containers.' }, { status: 500 });
    }
}