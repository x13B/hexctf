<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<script lang="ts">
	import { username_when_logged_in, check_if_admin } from "./createCompetition/username";
	import { enhance } from "$app/forms";

	import type { PageData } from "./$types";

	export let data: PageData;

	// Allows this value to be used in other pages
	username_when_logged_in.set(data.username);
	check_if_admin.set(data.userId);
</script>

<h1>Welcome</h1>
<h2>HexCTF</h2>

<h1>Profile</h1>
<p>User id: {data.userId}</p>
<p>Username: {data.username}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>