<script lang="ts">   
    import { enhance } from "$app/forms";
</script>

<h1>This is the login page</h1>

<main>
    <h1>Login</h1>
    <form method="POST">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" /><br />
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" /><br />
        <button type="submit">Login</button>
    </form>
</main>