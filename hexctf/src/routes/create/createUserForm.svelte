<script lang="ts">
  let users: any = [];

  let username: string;
  let password: string;
  let email: string;

  const handleCreateUser = () => {
    console.log(username, password, email);
  }
</script>

<!-- Generic form to submit user data -->
<form on:submit={handleCreateUser} >
  Username:
  <input type="text" placeholder="Enter a username" bind:value={username}><br>
  Password:
  <input type="password" placeholder="Enter a password" bind:value={password}><br>
  Email:
  <input type="text" placeholder="Enter an email" bind:value={email}><br>
  <button>Create Account</button>
</form>

