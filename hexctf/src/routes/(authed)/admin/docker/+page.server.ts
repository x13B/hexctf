import { writeFile } from 'node:fs/promises';
import { basename } from 'path';
import decompress from 'decompress';

export const actions: import('./$types').Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);
    const uploadedFile = formData?.get('file');
    //console.log(uploadedFile);
    const filepath = `uploads/files/${basename(uploadedFile?.name)}`;
    await writeFile(filepath, Buffer.from(await uploadedFile?.arrayBuffer()));

    const dirname = formData?.get('filename');
    decompress(filepath, ("uploads/containers/" + dirname))
    .then((files)=> {
        console.log(files)
    })
    .catch((error) => {
        console.log(error);
      });

    return { success: true };
}
};
