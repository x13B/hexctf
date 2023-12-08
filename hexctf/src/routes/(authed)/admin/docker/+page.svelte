<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let data: ActionData;
</script>


<main>
    <div class="container">
    <h1>Docker Management</h1>


    <form method="POST" enctype="multipart/form-data" use:enhance>
        <label for="file">Select a zip file:</label>
        <input type="file" name="file"
        accept=".zip"/>
        <br><br><label for="filename">Image name:
        <input name="filename"/> </label>
        <input type="checkbox" name="unique-image" value="true">
        <label for="unique-image">Unique Image</label>
        <br><br><button class="btn btn-outline-primary">Upload</button>
      </form> 

      {#if data?.success}
      <p>file successfully uploaded</p>
      {/if}
    </div>
</main>