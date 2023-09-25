<script lang="ts">
  let formData = {
    username: '',
    password: '',
    email: '',
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    try {
      console.log(formData.username, formData.password, formData.email);
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.error('User registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
</script>

<main>
  <h1>Register</h1>
  <!-- <form on:submit={handleSubmit}> -->
  <form action="">
    <label>
      Username:
      <input type="text" bind:value={formData.username} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={formData.password} />
    </label>
    <label>
      Email:
      <input type="email" bind:value={formData.email} />
    </label>
    <button type="submit">Register</button>
  </form>
</main>
