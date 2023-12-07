<script lang="ts">
	import type { PageData } from "./$types";
  
	export let data: PageData;
	let competition = data.competition;
	let desc: string = (data.comp_timer == null) ? '' : data.competition.description;

	function displayParagraphs() {
		if (!desc) {
			return '';
		}
		const bold = /#([^#]+)#/g;
		const headers = /!([^!]+)!/g;
		const italics = /`([^`]+)`/g;
		let formattedDesc = desc.split('\n').map(para => `<p>${para}</p>`).join('');
		formattedDesc = formattedDesc.replace(bold, `<strong>$1</strong>`);
		formattedDesc = formattedDesc.replace(headers, `<h1>$1</h1>`)
		formattedDesc = formattedDesc.replace(italics, `<em>$1</em>`);
		
		return formattedDesc;
	}
  </script>

<svelte:head>
	<title>{competition.competitionName}</title>
</svelte:head>

<!-- <h1>{competition.competitionName}</h1> -->
<div>
	{@html displayParagraphs()}
</div>