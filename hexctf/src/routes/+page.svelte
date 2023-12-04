<script lang="ts">
	import type { PageData } from "./$types";
  
	export let data: PageData;
	let competition = data.competition;
	let desc: string = (data.comp_timer == null) ? '' : data.comp_timer.description;
  </script>

<svelte:head>
	<title>{competition.competitionName}</title>
</svelte:head>

<h1>{competition.competitionName}</h1>
<h2>Welcome</h2>
<p>{desc}</p>