<script lang="ts">   

    let username: number;
    let password: string;
  
    const handleSubmit = (event: Event) => {
      event.preventDefault();
  
      console.log(username, password);
    }
  </script>

<h1>This is the login page</h1>

<main>
    <h1>Login</h1>
    <form on:submit={handleSubmit}>
        <label>
            Username
            <input bind:value={username} type="text">
        </label>
        <label>
            Password
            <input bind:value={password} type="password">
        </label>
        <button type="submit">Log in</button>
    </form>
</main>