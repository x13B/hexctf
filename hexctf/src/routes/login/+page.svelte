<script lang="ts">   
    import { enhance } from "$app/forms";
    export let form;
</script>

<main>
    
    <div class="container">
    <h1>Login</h1>
    <form method="POST" use:enhance>
    {#if form?.message}
        <p>{form.message}</p>
    {/if}
        <div class="mb-3">
        <label class="form-label" for="username">Username:</label>
        <input class="form-control" type="text" name="username" id="username" />
        </div>
       
        <div class="mb-3">
        <label class="form-label" for="password">Password:</label>
        <input class="form-control" type="password" name="password" id="password" />
        </div>
        <button class="btn btn-outline-secondary" type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="/register" class="btn btn-outline-secondary">Register</a></p>
    </div>
</main>