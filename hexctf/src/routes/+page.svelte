<script lang="ts">
	import type { PageData } from "./$types";
  
	export let data: PageData;
	let competition = data.competition;
  </script>

<svelte:head>
	<title>{competition.competitionName}</title>
</svelte:head>

<h1>{competition.competitionName}</h1>
<h2>Welcome</h2>