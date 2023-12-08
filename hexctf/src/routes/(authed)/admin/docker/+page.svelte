<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";import type { PageData } from './$types';
	
    export let data: ActionData;

    console.log(data.containers)
    
    // create a function to call docker/images/build
    const buildAllContainers = async () => {
        const res = await fetch("/api/docker/images/build");
        const json = await res.json();
        console.log(json);
    }
</script>


<main>
    <div class="container">
        <h1>Docker Management</h1>
        <hr>
        <h2>Base images</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Image ID</th>
                    <th scope="col">Image Name</th>
                    <th scope="col">Image Path</th>
                    <th scope="col">Image SHA</th>
                    <th scope="col">Is Base Container</th>
                    <th scope="col">Is Built</th>
                    <th scope="col">Container SHA</th>
                    <th scope="col">Container Status</th>
                    <th scope="col">Container Port</th>
                    <th scope="col">Container IP</th>
                    <th scope="col">Container Info</th>
                    <th scope="col">Team ID</th>
                    <th scope="col">Question ID</th>
                </tr>
            </thead>
            <tbody>
                {#each data.baseImages as image (image.imageId)}
                    <tr>
                        <td>{image.imageId}</td>
                        <td>{image.imageName}</td>
                        <td>{image.imagePath}</td>
                        <td>{image.imageSHA}</td>
                        <td>{image.imageIsBaseContainer ? 'Yes' : 'No'}</td>
                        <td>{image.imageIsBuilt ? 'Yes' : 'No'}</td>
                        <td>{image.containerSHA}</td>
                        <td>{image.containerStatus}</td>
                        <td>{image.containerPort}</td>
                        <td>{image.containerIp}</td>
                        <td>{image.containerInfo}</td>
                        <td>{image.teamId}</td>
                        <td>{image.questionId}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <hr>
        <h2>Group containers</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Image ID</th>
                    <th scope="col">Image Name</th>
                    <th scope="col">Image Path</th>
                    <th scope="col">Image SHA</th>
                    <th scope="col">Is Base Container</th>
                    <th scope="col">Is Built</th>
                    <th scope="col">Container SHA</th>
                    <th scope="col">Container Status</th>
                    <th scope="col">Container Port</th>
                    <th scope="col">Container IP</th>
                    <th scope="col">Container Info</th>
                    <th scope="col">Team ID</th>
                    <th scope="col">Question ID</th>
                </tr>
            </thead>
            <tbody>
                {#each data.containers as container (container.imageId)}
                    <tr>
                        <td>{container.imageId}</td>
                        <td>{container.imageName}</td>
                        <td>{container.imagePath}</td>
                        <td>{container.imageSHA}</td>
                        <td>{container.imageIsBaseContainer ? 'Yes' : 'No'}</td>
                        <td>{container.imageIsBuilt ? 'Yes' : 'No'}</td>
                        <td>{container.containerSHA}</td>
                        <td>{container.containerStatus}</td>
                        <td>{container.containerPort}</td>
                        <td>{container.containerIp}</td>
                        <td>{container.containerInfo}</td>
                        <td>{container.teamId}</td>
                        <td>{container.questionId}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <hr>
        <h2>Build all containers</h2>
        <p>*teams must be locked in ({data.teamCount || 0} teams)</p>
        <button class="btn btn-outline-primary" on:click={buildAllContainers}>Start</button>
        <hr>
        <h2>Upload a container</h2>
        <form method="POST" enctype="multipart/form-data" use:enhance>
            <label for="file">Select a zip file:</label>
            <input type="file" name="file"
            accept=".zip"/>
            <br><br><label for="filename">Image name:
            <input name="filename"/> </label>
            <br><br><button class="btn btn-outline-primary">Upload</button>
        </form> 

        {#if data?.success}
        <p>file successfully uploaded</p>
        {/if}
        <hr>
    
    </div>
    

</main>