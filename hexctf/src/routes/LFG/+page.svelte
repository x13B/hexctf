<script lang="ts">
    import { onMount } from "svelte";
    let users: any = [];

    onMount(async () => {
      try {
        const response = await fetch('../api/getUsers'); 
        if (response.ok) {
          users = await response.json();
          console.log("from function user", users);
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
  {#each users as user (user.UserID)}
    {#if user.isAdmin === true}
      <li>This is the admin: {user.UserID}</li> 
    {:else}
      <li>Non-Admin User: {user.UserID}, password: {user.password}</li>
    {/if}
  {/each}
</ul>