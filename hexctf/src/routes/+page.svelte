<script lang="ts">
	import type { PageData } from "./$types";
  
	export let data: PageData;
	let competition = data.competition;
	let comp_desc: string = (competition.description != null) ? competition.description : '';
  </script>

<svelte:head>
	<title>{competition.competitionName}</title>
</svelte:head>

<h1>{competition.competitionName}</h1>
<h2>Welcome</h2>
<h2>{comp_desc}</h2>