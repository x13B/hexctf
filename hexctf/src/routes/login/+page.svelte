<script lang="ts">   
    import { enhance } from "$app/forms";
    export let form;
</script>

<main>
    <h1>Login</h1>
    <form method="POST" use:enhance>
    {#if form?.message}
        <p>{form.message}</p>
    {/if}
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" /><br />
        <br />
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" /><br />
        <button type="submit">Login</button>
    </form>
</main>