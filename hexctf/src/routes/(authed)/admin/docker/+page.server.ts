import { writeFile } from 'node:fs/promises';
import { basename } from 'path';
import prisma from '$lib/prisma';
import decompress from 'decompress';

export const load = async ({ params}) => {
  // get team count from prisma
  const teamCount = await prisma.teams.count();
  
  // get all base images
  const baseImages = await prisma.dockerState.findMany({
    where: {
      imageIsBaseContainer: true
    }
  });

  // get rest of containers 
  const containers = await prisma.dockerState.findMany({
    where: {
      imageIsBaseContainer: false
    }
  });

  return {
      teamCount,
      baseImages,
      containers
  };
}

export const actions: import('./$types').Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const uploadedFile = formData?.get('file');
    //console.log(uploadedFile);
    const filepath = `uploads/files/${basename(uploadedFile?.name)}`;
    await writeFile(filepath, Buffer.from(await uploadedFile?.arrayBuffer()));

    const dirname = formData?.get('filename');
    await decompress(filepath, ("uploads/containers/" + dirname))
    .then((files)=> {
        //console.log(files)
    })
    .catch((error) => {
        console.log(error);
      });

      console.log("test", { imageName: dirname, imagePath: `./uploads/containers/${dirname}`})

      const response = await fetch('http://localhost:5173/api/docker/images/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageName: dirname, imagePath: `./uploads/containers/${dirname}` })
      });
    
      const result = await response.json();
      console.log(result);

    return { success: true };
}
};
