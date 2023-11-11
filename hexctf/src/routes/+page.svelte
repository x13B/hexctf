<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<script lang="ts">
	import { username_when_logged_in, check_if_admin, users_id } from "./(authed)/admin/createCompetition/username";
	import { enhance } from "$app/forms";
	// import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	// Allows this value to be used in other pages
	username_when_logged_in.set(data.username);
	users_id.set(data.userId);
	
// 	// This will check if the user is an admin to set the flag true
// 	onMount(async () => {
//     try {
//       const response = await fetch('../api/getUsers'); 
//       if (response.ok) {
//         let users = await response.json();
// 		console.log(users);

// 		if (data.username === users.id && users.isAdmin === true) {
// 		check_if_admin.set(true);
// 		}
//       } else {
//         console.error('Failed to fetch data:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   });

</script>

<h1>Welcome</h1>
<h2>HexCTF</h2>

<!--<h1>Profile</h1>
<p>User id: {data.userId}</p>
<p>Username: {data.username}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>-->