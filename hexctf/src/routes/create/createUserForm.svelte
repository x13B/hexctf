<script lang="ts">
  import { onMount } from "svelte";

  let users: any = [];

  let username: string;
  let password: string;
  let email: string;

  // =================================================================
  // This function gets all the users from the database
  // and displays them to the page. 
  // It fetches data from server.js file in /get 
  const submitForm = () => {
    console.log(username, password, email);
  }
  
  onMount(async () => {
    try {
      const response = await fetch('../get'); 
      if (response.ok) {
        users = await response.json();
        console.log("Inside function")
        console.log(users)
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  // This is a test function that should be removed and used 
  // somewhere else in the project.
  // =================================================================
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

<!-- Iterate through each user and display them -->
<h1>Users</h1>
<ul>
  {#each users as user (user.userID)}
    <!-- <li>{user.username}</li> -->
    <li>User: {user.username}, Email: {user.email}</li>
  {/each}
</ul>