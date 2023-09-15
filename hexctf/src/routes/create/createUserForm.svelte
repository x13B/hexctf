<script lang="ts">
    let users: any = [];

    let username: string;
    let password: string;
    let email: string;
    const submitForm = () => {
        console.log(username, password, email);
    }

    async function fetchUsers() {
        const res = await fetch('api/users');
        users = await res.json();
    }
</script>

<!-- Generic form to submit user data -->
<form on:submit|preventDefault={submitForm} >
    Email:
    <input type="text" placeholder="Enter a username" bind:value={username}><br>
    Password:
    <input type="password" placeholder="Enter a password" bind:value={password}><br>
    Email:
    <input type="text" placeholder="Enter an email" bind:value={email}><br>
    <button>Create Account</button>
</form>

<h1>Users</h1>
<ul>
  {#each users as user (user.userID)}
    <li>{user.name}</li>
  {/each}
</ul>