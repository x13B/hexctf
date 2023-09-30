<script lang="ts">
  let username: string;
  let password: string;

  async function handleSubmit() {
    console.log(JSON.stringify({username, password}));

    const res = await fetch('../api/register', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    }).then((response) => {
      if (response.status === 500) {
        console.log("INTERNAL SERVER ERROR OCCURRED");
      } else if (response.status === 200) {
        console.log("OK");
      }
    }).catch((error) => {
      console.log("AN ERROR OCCURRED: ", error);
    })
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