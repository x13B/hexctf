<script lang="ts">
	import type { PageData } from "./$types";
  
	export let data: PageData;
	let competition = data.competition;
	let desc: string = (data.competition == null) ? '' : data.competition.description;

	function displayParagraphs() {
		if (!desc) {
			return '';
		}
		const bold = /#([^#]+)#/g;
		const headers = /!([^!]+)!/g;
		const small_header = /@([^@]+)@/g;
		let formattedDesc = desc.split('\n').map(para => `<p>${para}</p>`).join('');
		formattedDesc = formattedDesc.replace(bold, `<strong>$1</strong>`);
		formattedDesc = formattedDesc.replace(headers, `<h1>$1</h1>`)
		formattedDesc = formattedDesc.replace(small_header, `<h2>$1</h2>`);
		
		return formattedDesc;
	}
	import homepage_image from "../images/hexctf.jpg";
  </script>

<svelte:head>
	<title>{competition.competitionName}</title>
</svelte:head>
<main>
	<img src={homepage_image} alt="HexCTF"/>
	{@html displayParagraphs()}
</main>