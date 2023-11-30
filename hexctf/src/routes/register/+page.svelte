<script lang="ts">
    import { enhance } from "$app/forms";
    import { linear } from "svelte/easing";
    export let form;
</script>

<h1>Register</h1>
<form method="post" use:enhance>
{#if form?.message}
    <p>{form.message}</p>
{/if}
    <label for="username">Username:</label>
    <input name="username" id="username" /><br />
    <br />
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" /><br />
    <ul><li>Username must be longer than 4 characters and less than 31.</li>
    <li>Passsword must be longer than 6 characters and less than 255.</li></ul>
    <button type="submit">Register</button>
    <p>Already have an account? <a href="/login">Login</a></p>
</form>