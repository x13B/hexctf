<script lang="ts">
    import { enhance } from "$app/forms";
    import { linear } from "svelte/easing";
    export let form;
</script>

<main>
<div class="container">
<h1>Register</h1>
<form method="post" use:enhance>
{#if form?.message}
    <p>{form.message}</p>
{/if}
    <div class="mb-3">
    <label class="form-label" for="username">Username:</label>
    <input class="form-control" name="username" id="username" />
    </div>
    <div class="mb-3">
    <label class="form-label" for="password">Password:</label>
    <input class="form-control" type="password" name="password" id="password" />
    </div>
    <div id="passwordHelpBlock" class="form-text">
    <ul><li>Username must be longer than 4 characters and less than 31.</li>
    <li>Passsword must be longer than 6 characters and less than 255.</li></ul>
    </div>
    <button class="btn btn-outline-secondary" type="submit">Register</button>
    <p>Already have an account? <a href="/login" class="btn btn-outline-secondary" >Login</a></p>
</form>
</div>
</main>