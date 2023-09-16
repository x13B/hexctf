<script lang="ts">
    import { onMount } from "svelte";
    let users: any = [];

    onMount(async () => {
      try {
        const response = await fetch('../api/get'); 
        if (response.ok) {
          users = await response.json();
          console.log(users);
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

</script>

<h1>LOOKING FOR GROUP PAGE</h1>
<!-- Iterate through each user and display them -->
<h1>Users</h1>
<ul>
  {#each users as user (user.userID)}
    <!-- <li>{user.username}</li> -->
    <li>User: {user.username}, Email: {user.email}</li>
  {/each}
</ul>