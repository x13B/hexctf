<script lang="ts">   

  let username: string = '';
  let password: string = '';

  async function handleSubmit() {
    const res = await fetch('../api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    });

    if (res.ok) {
      console.log("Success");
    } else {
      console.log(res);
    }
  }
</script>

<h1>This is the create an account page.</h1>

<!-- This will display the form used to create an account -->
<main>
    <h1>Register</h1>
    <form on:submit={handleSubmit}>
        <label>
        Username:
        <input type="text" bind:value={username} />
        </label>
        <label>
        Password:
        <input type="password" bind:value={password} />
        </label>
        <button type="submit">Register</button>
    </form>
    </main>