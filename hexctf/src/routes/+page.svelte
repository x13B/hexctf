<script lang="ts">
	import type { PageData } from "./$types";
  
	export let data: PageData;
	let competition = data.competition;
	let desc: string = (data.comp_timer == null) ? '' : data.competition.description;
	console.log(desc);

	function displayParagraphs() {
		return desc.split('\n').map(para => `<p>${para}</p>`).join('');
	}
  </script>

<svelte:head>
	<title>{competition.competitionName}</title>
</svelte:head>

<h1>{competition.competitionName}</h1>
<h2>Welcome</h2>
<div>
	{@html displayParagraphs()}
</div>