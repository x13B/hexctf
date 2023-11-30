import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
	
	async function fetchCompetition() {
		const response = await fetch('/api/competition', { method: 'GET' });
		const data = await response.json();
		if (data.status == "failure") { return {"competitionName": "HexCTF"}}

		return data.competition;
	}

	return {
		competition: fetchCompetition()
	};
};