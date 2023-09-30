<script lang="ts">
  import { goto } from '$app/navigation';

  let username = ''
  let password = ''
  
  const register = async (e: SubmitEvent ) => {
    e.preventDefault()
    await (
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
    ).json()

    goto('/login')
  }
</script>

<h1>This is the create an account page.</h1>

<!-- This will display the form used to create an account -->
<main>
    <h1>Register</h1>
    <form on:submit={register}>
        <label>
        Username:
        <input type="text" bind:value={username}/>
        </label>
        <label>
        Password:
        <input type="password" bind:value={password}/>
        </label>
        <input disabled={!username || !password} type="submit" value="Signup"/>
    </form>
</main>